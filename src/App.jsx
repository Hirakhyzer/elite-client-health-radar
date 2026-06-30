import { useEffect, useMemo, useState } from "react";
import { cloneInitialState } from "./data";
import { downloadFile, planToText, portfolioSummary, recommendedOffers, scoreClient } from "./engine";
import { loadWorkspace, saveWorkspace } from "./store";
import { Button } from "./ui";
import { Dashboard } from "./views/Dashboard";
import { Accounts } from "./views/Accounts";
import { Renewals } from "./views/Renewals";
import { ClientReview } from "./views/ClientReview";
import { Reports } from "./views/Reports";

export default function App() {
  const [state, setState] = useState(loadWorkspace);
  const [tab, setTab] = useState("dashboard");
  const [selectedId, setSelectedId] = useState(() => loadWorkspace().clients[0]?.id || "");
  const [toast, setToast] = useState("");
  const selected = state.clients.find((item) => item.id === selectedId) || state.clients[0];
  const selectedHealth = useMemo(() => scoreClient(selected), [selected]);
  const selectedOffers = useMemo(() => recommendedOffers(selected, selectedHealth), [selected, selectedHealth]);
  const summary = useMemo(() => portfolioSummary(state.clients), [state.clients]);

  useEffect(() => { saveWorkspace(state); }, [state]);
  useEffect(() => { if (!toast) return undefined; const timer = window.setTimeout(() => setToast(""), 2700); return () => window.clearTimeout(timer); }, [toast]);
  const notify = (message) => setToast(message);
  const selectClient = (id) => setSelectedId(id);
  const updateClient = (id, changes) => setState((current) => ({ ...current, clients: current.clients.map((client) => client.id === id ? { ...client, ...changes } : client) }));

  function addAction(id, action) {
    const client = state.clients.find((item) => item.id === id);
    if (!client) return;
    updateClient(id, { actions: [...client.actions, action] });
    notify("Account action added");
  }

  function addMeeting(id, meeting) {
    const client = state.clients.find((item) => item.id === id);
    if (!client) return;
    updateClient(id, { meetings: [...client.meetings, meeting], lastContact: meeting.date, timeline: [...client.timeline, { date: meeting.date, type: "Meeting", text: meeting.title }] });
    notify("Client meeting recorded");
  }

  function saveReport() {
    const report = { id: `health-${Date.now()}`, company: selected.company, manager: selected.manager, score: selectedHealth.score, signal: selectedHealth.signal, churnRisk: selectedHealth.churnRisk, renewalProbability: selectedHealth.renewalProbability, createdAt: new Date().toLocaleString() };
    setState((current) => ({ ...current, savedReports: [report, ...current.savedReports].slice(0, 20) }));
    notify("Client report saved");
  }

  function removeReport(id) {
    setState((current) => ({ ...current, savedReports: current.savedReports.filter((report) => report.id !== id) }));
    notify("Saved report removed");
  }

  function exportText() {
    const slug = selected.company.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    downloadFile(`${slug}-account-report.txt`, planToText(selected, selectedHealth, selectedOffers), "text/plain");
    notify("TXT report downloaded");
  }

  function exportJson() {
    const slug = selected.company.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    downloadFile(`${slug}-account-analysis.json`, JSON.stringify({ generatedAt: new Date().toLocaleString(), company: "Elite Era Development L.L.C", client: selected, health: selectedHealth, offers: selectedOffers }, null, 2), "application/json");
    notify("JSON analysis downloaded");
  }

  function resetWorkspace() {
    if (!window.confirm("Reset all account radar demo data in this browser?")) return;
    const reset = cloneInitialState();
    setState(reset);
    setSelectedId(reset.clients[0].id);
    setTab("dashboard");
    notify("Demo workspace reset");
  }

  const tabs = [["dashboard", "Command center", "◆"], ["accounts", "Account workspace", "◉"], ["renewals", "Renewal radar", "◷"], ["client", "Client review", "▣"], ["reports", "Reports", "▤"]];
  const props = { state, summary, selected, selectedHealth, selectedOffers, setTab, selectClient, updateClient, addAction, addMeeting, saveReport, removeReport, exportText, exportJson, resetWorkspace };
  const pages = { dashboard: <Dashboard {...props}/>, accounts: <Accounts {...props}/>, renewals: <Renewals {...props}/>, client: <ClientReview {...props}/>, reports: <Reports {...props}/> };

  return <div className="app-shell"><aside className="sidebar"><div className="brand"><div className="brand-mark">E</div><div><span>Elite Era Development L.L.C</span><strong>Client Health Radar</strong></div></div><nav>{tabs.map(([id, label, icon]) => <button key={id} className={tab === id ? "active" : ""} onClick={() => setTab(id)}><i>{icon}</i>{label}</button>)}</nav><div className="side-card"><span>Selected account</span><strong>{selected.company}</strong><small>{selectedHealth.score}/100 health · {selectedHealth.churnRisk} churn</small><div className="side-health"><i className={selectedHealth.signal === "Healthy" ? "good" : selectedHealth.signal === "Critical" ? "risk" : "watch"}/><b>{selectedHealth.signal}</b><em>{selected.recurringValue}</em></div></div><div className="side-profile"><span className="profile-avatar">HK</span><div><strong>Hira Khyzer</strong><small>Founder · Elite Era</small></div></div></aside><main className="workspace"><header className="topbar"><div><p className="eyebrow">Client success and retention operating system</p><h2>{selected.company}</h2></div><div className="topbar-actions"><span className="autosave">● Saved locally</span><Button variant="outline" onClick={exportText}>Export report</Button><Button onClick={() => setTab("accounts")}>Open account</Button></div></header><div className="mobile-tabs">{tabs.map(([id, label]) => <button key={id} className={tab === id ? "active" : ""} onClick={() => setTab(id)}>{label}</button>)}</div><section className="workspace-content">{pages[tab]}</section><footer className="footer"><strong>Made by Hira Khyzer</strong><span>Elite Era Development L.L.C</span><b>#f4af00</b></footer></main>{toast && <div className="toast">{toast}</div>}</div>;
}
