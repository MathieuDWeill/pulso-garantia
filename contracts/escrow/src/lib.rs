#![no_std]

use soroban_sdk::{contract, contracterror, contractimpl, contracttype, Address, Env, String, Symbol};

#[derive(Clone)]
#[contracttype]
pub enum DataKey {
    Escrow(u64),
    Counter,
}

#[derive(Clone, PartialEq, Eq, Debug)]
#[contracttype]
pub enum Status {
    Draft,
    Funded,
    Released,
    Refunded,
    Disputed,
}

#[derive(Clone, Debug, PartialEq, Eq)]
#[contracttype]
pub struct Escrow {
    pub id: u64,
    pub buyer: Address,
    pub seller: Address,
    pub arbiter: Address,
    pub amount: i128,
    pub asset_code: Symbol,
    pub milestone: String,
    pub deadline_ledger: u32,
    pub status: Status,
}

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum Error {
    AmountMustBePositive = 1,
    DeadlineMustBeFuture = 2,
    EscrowNotFound = 3,
    Unauthorized = 4,
    InvalidStatus = 5,
    DeadlineNotReached = 6,
}

#[contract]
pub struct PulsoEscrowContract;

#[contractimpl]
impl PulsoEscrowContract {
    pub fn create(
        env: Env,
        buyer: Address,
        seller: Address,
        arbiter: Address,
        amount: i128,
        asset_code: Symbol,
        milestone: String,
        deadline_ledger: u32,
    ) -> Result<u64, Error> {
        buyer.require_auth();
        if amount <= 0 { return Err(Error::AmountMustBePositive); }
        if deadline_ledger <= env.ledger().sequence() { return Err(Error::DeadlineMustBeFuture); }

        let id = env.storage().instance().get(&DataKey::Counter).unwrap_or(0u64) + 1;
        let escrow = Escrow { id, buyer, seller, arbiter, amount, asset_code, milestone, deadline_ledger, status: Status::Draft };

        env.storage().instance().set(&DataKey::Escrow(id), &escrow);
        env.storage().instance().set(&DataKey::Counter, &id);
        env.events().publish((Symbol::new(&env, "created"), id), escrow.status.clone());
        Ok(id)
    }

    pub fn fund(env: Env, id: u64, buyer: Address) -> Result<Escrow, Error> {
        buyer.require_auth();
        let mut escrow = Self::get(env.clone(), id)?;
        if escrow.buyer != buyer { return Err(Error::Unauthorized); }
        if escrow.status != Status::Draft { return Err(Error::InvalidStatus); }
        escrow.status = Status::Funded;
        env.storage().instance().set(&DataKey::Escrow(id), &escrow);
        env.events().publish((Symbol::new(&env, "funded"), id), escrow.amount);
        Ok(escrow)
    }

    pub fn release(env: Env, id: u64, buyer: Address) -> Result<Escrow, Error> {
        buyer.require_auth();
        let mut escrow = Self::get(env.clone(), id)?;
        if escrow.buyer != buyer { return Err(Error::Unauthorized); }
        if escrow.status != Status::Funded { return Err(Error::InvalidStatus); }
        escrow.status = Status::Released;
        env.storage().instance().set(&DataKey::Escrow(id), &escrow);
        env.events().publish((Symbol::new(&env, "released"), id), escrow.seller.clone());
        Ok(escrow)
    }

    pub fn open_dispute(env: Env, id: u64, caller: Address) -> Result<Escrow, Error> {
        caller.require_auth();
        let mut escrow = Self::get(env.clone(), id)?;
        if caller != escrow.buyer && caller != escrow.seller { return Err(Error::Unauthorized); }
        if escrow.status != Status::Funded { return Err(Error::InvalidStatus); }
        escrow.status = Status::Disputed;
        env.storage().instance().set(&DataKey::Escrow(id), &escrow);
        env.events().publish((Symbol::new(&env, "disputed"), id), caller);
        Ok(escrow)
    }

    pub fn resolve_dispute(env: Env, id: u64, arbiter: Address, release_to_seller: bool) -> Result<Escrow, Error> {
        arbiter.require_auth();
        let mut escrow = Self::get(env.clone(), id)?;
        if escrow.arbiter != arbiter { return Err(Error::Unauthorized); }
        if escrow.status != Status::Disputed { return Err(Error::InvalidStatus); }
        escrow.status = if release_to_seller { Status::Released } else { Status::Refunded };
        env.storage().instance().set(&DataKey::Escrow(id), &escrow);
        env.events().publish((Symbol::new(&env, "resolved"), id), escrow.status.clone());
        Ok(escrow)
    }

    pub fn refund_after_deadline(env: Env, id: u64, buyer: Address) -> Result<Escrow, Error> {
        buyer.require_auth();
        let mut escrow = Self::get(env.clone(), id)?;
        if escrow.buyer != buyer { return Err(Error::Unauthorized); }
        if escrow.status != Status::Funded { return Err(Error::InvalidStatus); }
        if env.ledger().sequence() <= escrow.deadline_ledger { return Err(Error::DeadlineNotReached); }
        escrow.status = Status::Refunded;
        env.storage().instance().set(&DataKey::Escrow(id), &escrow);
        env.events().publish((Symbol::new(&env, "refunded"), id), buyer);
        Ok(escrow)
    }

    pub fn get(env: Env, id: u64) -> Result<Escrow, Error> {
        env.storage().instance().get(&DataKey::Escrow(id)).ok_or(Error::EscrowNotFound)
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use soroban_sdk::{symbol_short, testutils::{Address as _, Ledger}, String};

    fn setup() -> (Env, PulsoEscrowContractClient<'static>, Address, Address, Address) {
        let env = Env::default();
        env.mock_all_auths();
        env.ledger().with_mut(|li| { li.sequence_number = 100; });
        let contract_id = env.register(PulsoEscrowContract, ());
        let client = PulsoEscrowContractClient::new(&env, &contract_id);
        let buyer = Address::generate(&env);
        let seller = Address::generate(&env);
        let arbiter = Address::generate(&env);
        (env, client, buyer, seller, arbiter)
    }

    #[test]
    fn create_fund_release() {
        let (env, client, buyer, seller, arbiter) = setup();
        let id = client.create(&buyer, &seller, &arbiter, &850, &symbol_short!(USDC), &String::from_str(&env, "Landing page accepted"), &1000);
        let funded = client.fund(&id, &buyer);
        assert_eq!(funded.status, Status::Funded);
        let released = client.release(&id, &buyer);
        assert_eq!(released.status, Status::Released);
    }

    #[test]
    fn dispute_can_be_resolved_by_arbiter() {
        let (env, client, buyer, seller, arbiter) = setup();
        let id = client.create(&buyer, &seller, &arbiter, &1200, &symbol_short!(USDC), &String::from_str(&env, "Bot deployed"), &1000);
        client.fund(&id, &buyer);
        let disputed = client.open_dispute(&id, &seller);
        assert_eq!(disputed.status, Status::Disputed);
        let resolved = client.resolve_dispute(&id, &arbiter, &true);
        assert_eq!(resolved.status, Status::Released);
    }

    #[test]
    fn deadline_refund_requires_time() {
        let (env, client, buyer, seller, arbiter) = setup();
        let id = client.create(&buyer, &seller, &arbiter, &400, &symbol_short!(USDC), &String::from_str(&env, "Design files"), &110);
        client.fund(&id, &buyer);
        env.ledger().with_mut(|li| { li.sequence_number = 111; });
        let refunded = client.refund_after_deadline(&id, &buyer);
        assert_eq!(refunded.status, Status::Refunded);
    }
}
