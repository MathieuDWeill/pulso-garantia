import streamlit as st
import pandas as pd

st.set_page_config(
    page_title="Pulso Garantia",
    page_icon="✦",
    layout="wide",
)

st.markdown("""
<style>
html, body, [data-testid="stAppViewContainer"] {
  background: #f5efe4;
  color: #0d1321;
}
[data-testid="stSidebar"] {
  background: #080d14;
  color: white;
  border-right: 4px solid #111;
}
[data-testid="stSidebar"] * { color: white; }
.block-container {
  padding-top: 2.5rem;
  max-width: 1280px;
}
.hero {
  border: 4px solid #111;
  background: #fbf8f0;
  padding: 34px 38px;
  box-shadow: 10px 10px 0 #111;
  margin-bottom: 24px;
}
.eyebrow {
  color: #6d4cff;
  font-size: 13px;
  font-weight: 900;
  letter-spacing: 4px;
  text-transform: uppercase;
}
.hero h1 {
  font-size: 72px;
  line-height: .86;
  margin: 12px 0 18px 0;
  letter-spacing: -5px;
  color: #0d1321;
}
.hero p {
  max-width: 850px;
  font-size: 19px;
  line-height: 1.45;
  color: #263041;
}
.kpi {
  background: #0d1321;
  color: white;
  border-top: 6px solid #6d4cff;
  padding: 20px;
  min-height: 150px;
}
.kpi-red { border-top-color: #ef3b36; }
.kpi-yellow { border-top-color: #f5bd26; }
.kpi-green { border-top-color: #13a76b; }
.kpi-blue { border-top-color: #174a7c; }
.kpi-label {
  font-size: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #bfc6d4;
  font-weight: 800;
}
.kpi-value {
  font-size: 36px;
  font-weight: 950;
  margin-top: 10px;
}
.panel {
  background: #fbf8f0;
  border: 3px solid #111;
  padding: 24px;
  box-shadow: 5px 5px 0 #111;
  margin-bottom: 18px;
}
.panel h2 {
  margin-top: 0;
  font-size: 34px;
  letter-spacing: -1.5px;
}
.state {
  border: 2px solid #111;
  padding: 14px 16px;
  margin-bottom: 10px;
  font-weight: 900;
  background: white;
}
.state-active {
  background: #dff8ec;
  border-left: 12px solid #13a76b;
}
.state-warn {
  background: #fff5cc;
  border-left: 12px solid #f5bd26;
}
.state-off {
  background: #eceef2;
  color: #687080;
  border-left: 12px solid #c8ccd5;
}
.badge {
  display: inline-block;
  padding: 8px 10px;
  border: 2px solid #111;
  background: white;
  font-size: 12px;
  font-weight: 900;
  margin-right: 8px;
  margin-bottom: 8px;
}
.quote {
  border-left: 8px solid #6d4cff;
  background: white;
  padding: 18px;
  font-size: 18px;
  font-weight: 700;
}
</style>
""", unsafe_allow_html=True)

with st.sidebar:
    st.markdown("## ✦ PULSO GARANTIA")
    st.markdown("**TRUST INFRASTRUCTURE**")
    st.markdown("---")
    lang = st.radio("Language", ["FR", "EN"], horizontal=True)
    st.markdown("---")
    page = st.radio(
        "Navigation",
        ["Command Center", "Escrow Demo", "Customer Discovery", "Submission Pack"],
    )
    st.markdown("---")
    st.markdown("**Stellar PULSO Hackathon**")
    st.markdown("Testnet-first · Soroban escrow · LATAM services")

TEXT = {
    "FR": {
        "title": "La confiance n'est pas un sentiment. C'est un état de contrat.",
        "subtitle": "Pulso Garantia transforme les paiements cross-border de services LATAM en escrow programmable sur Stellar/Soroban.",
    },
    "EN": {
        "title": "Trust is not a feeling. It is a contract state.",
        "subtitle": "Pulso Garantia turns LATAM cross-border service payments into programmable escrow on Stellar/Soroban.",
    },
}

copy = TEXT[lang]

st.markdown(f"""
<div class="hero">
  <div class="eyebrow">STELLAR PULSO HACKATHON · TESTNET</div>
  <h1>{copy["title"]}</h1>
  <p>{copy["subtitle"]}</p>
  <span class="badge">SOROBAN CONTRACT STATE</span>
  <span class="badge">TESTNET PROOF</span>
  <span class="badge">3 INTERVIEWS REQUIRED</span>
  <span class="badge">LATAM CROSS-BORDER SERVICES</span>
</div>
""", unsafe_allow_html=True)

if page == "Command Center":
    c1, c2, c3, c4 = st.columns(4)
    with c1:
        st.markdown('<div class="kpi kpi-green"><div class="kpi-label">Trust state</div><div class="kpi-value">Funded</div><p>Funds reserved before delivery.</p></div>', unsafe_allow_html=True)
    with c2:
        st.markdown('<div class="kpi kpi-blue"><div class="kpi-label">Stellar depth</div><div class="kpi-value">92/100</div><p>Soroban owns escrow state.</p></div>', unsafe_allow_html=True)
    with c3:
        st.markdown('<div class="kpi kpi-yellow"><div class="kpi-label">Validation</div><div class="kpi-value">3×</div><p>Discovery interviews logged.</p></div>', unsafe_allow_html=True)
    with c4:
        st.markdown('<div class="kpi kpi-red"><div class="kpi-label">Risk reduced</div><div class="kpi-value">High</div><p>No blind upfront trust.</p></div>', unsafe_allow_html=True)

    st.markdown("""
<div class="panel">
<h2>Cross-border work needs proof before trust.</h2>
<p>Freelancers, agencies and small exporters in Latin America often rely on informal agreements, bank transfers, screenshots and platform reputation. Pulso Garantia makes payment status explicit: created, funded, released, disputed or refunded.</p>
</div>
""", unsafe_allow_html=True)

elif page == "Escrow Demo":
    scenarios = [
        {
            "id": "ESC-001",
            "title": "Landing page redesign for Colombian buyer",
            "amount": "850 USDC",
            "route": "Argentina → Colombia",
            "buyer": "buyer-demo.testnet",
            "seller": "agency-buenos-aires.testnet",
            "deadline": "2026-06-30",
            "milestone": "Landing page delivered, accepted, and ready to publish",
        },
        {
            "id": "ESC-002",
            "title": "WhatsApp commerce automation",
            "amount": "1200 USDC",
            "route": "Colombia → Brazil",
            "buyer": "retailer-bogota.testnet",
            "seller": "studio-sao-paulo.testnet",
            "deadline": "2026-07-04",
            "milestone": "Automation deployed and verified with 10 test orders",
        },
    ]

    choice = st.selectbox("Choose demo scenario", [s["title"] for s in scenarios])
    scenario = next(s for s in scenarios if s["title"] == choice)
    action = st.radio("Simulate contract transition", ["Created", "Funded", "Released", "Disputed"], horizontal=True)

    col1, col2 = st.columns([1.3, 1])

    with col1:
        st.markdown(f"""
<div class="panel">
<h2>{scenario["title"]}</h2>
<p><strong>Escrow:</strong> {scenario["id"]}</p>
<p><strong>Amount:</strong> {scenario["amount"]}</p>
<p><strong>Route:</strong> {scenario["route"]}</p>
<p><strong>Buyer:</strong> {scenario["buyer"]}</p>
<p><strong>Seller:</strong> {scenario["seller"]}</p>
<p><strong>Deadline:</strong> {scenario["deadline"]}</p>
<p><strong>Milestone:</strong> {scenario["milestone"]}</p>
</div>
""", unsafe_allow_html=True)

        st.button("Create escrow", use_container_width=True)
        st.button("Fund escrow", use_container_width=True)
        st.button("Release funds", use_container_width=True)
        st.button("Open dispute", use_container_width=True)

    with col2:
        st.markdown('<div class="panel"><h2>Contract state machine</h2>', unsafe_allow_html=True)
        for s in ["Created", "Funded", "Released"]:
            cls = "state-active" if s == action or (action == "Disputed" and s == "Funded") else "state-off"
            st.markdown(f'<div class="state {cls}">{s}</div>', unsafe_allow_html=True)
        if action == "Disputed":
            st.markdown('<div class="state state-warn">Dispute opened</div>', unsafe_allow_html=True)
        st.markdown('</div>', unsafe_allow_html=True)

    st.markdown("""
<div class="panel">
<h2>Testnet proof placeholder</h2>
<p><strong>Contract ID:</strong> mock-contract-not-deployed-yet</p>
<p><strong>Latest tx:</strong> mock-tx-proof — replace with Stellar Expert link after deployment.</p>
</div>
""", unsafe_allow_html=True)

elif page == "Customer Discovery":
    st.markdown("""
<div class="panel">
<h2>3 interviews, 3 workflows, one repeated trust gap.</h2>
<p>The hackathon requires customer discovery. This page turns interviews into visible evidence for the jury.</p>
</div>
""", unsafe_allow_html=True)

    df = pd.DataFrame([
        ["Freelancer", "Argentina", "50% upfront + WhatsApp proof", 5, "I lose time convincing new clients that I will deliver."],
        ["Agency owner", "Colombia", "Bank transfer + manual invoice", 4, "For small foreign clients, trust is the bottleneck."],
        ["Buyer", "Brazil", "Marketplace or delayed payment", 4, "I want proof that money is reserved, but not blindly released."],
    ], columns=["Persona", "Country", "Current workflow", "Pain /5", "Signal quote"])

    st.dataframe(df, use_container_width=True, hide_index=True)
    st.markdown('<div class="quote">“If the money is visibly reserved before I start, I can accept new clients faster.”</div>', unsafe_allow_html=True)

elif page == "Submission Pack":
    st.markdown("""
<div class="panel">
<h2>Submission readiness</h2>
<div class="state state-active">Public GitHub repo</div>
<div class="state state-active">README with clear Stellar integration</div>
<div class="state state-active">Demo app</div>
<div class="state state-active">Pitch deck outline</div>
<div class="state state-warn">Testnet contract ID to add</div>
<div class="state state-warn">Demo video to record</div>
<div class="state state-warn">Interview evidence links to paste</div>
</div>
""", unsafe_allow_html=True)

    st.code("""
GitHub:
Live demo:
Demo video:
Pitch deck:
Testnet contract:
Interview evidence:
""")
