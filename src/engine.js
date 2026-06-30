import { TODAY } from "./data";

export const money = (value) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Number(value) || 0);
export const percent = (value) => `${Math.round(Number(value) || 0)}%`;
export const dateLabel = (value) => value ? new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(`${value}T12:00:00`)) : "—";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export function daysBetween(from, to = TODAY) {
  return Math.round((new Date(`${to}T12:00:00`) - new Date(`${from}T12:00:00`)) / 86400000);
}

export function daysUntil(date, today = TODAY) {
  return Math.round((new Date(`${date}T12:00:00`) - new Date(`${today}T12:00:00`)) / 86400000);
}

export function scoreClient(client, today = TODAY) {
  const daysSinceContact = Math.max(0, daysBetween(client.lastContact, today));
  const schedulePenalty = client.scheduleStatus === "At risk" ? 14 : client.scheduleStatus === "Delayed" ? 24 : 0;
  const delayPenalty = Math.min(18, Math.max(0, client.delayDays) * 2);
  const supportPenalty = Math.min(16, (client.openTickets || 0) * 1.8 + (client.criticalTickets || 0) * 7);
  const financePenalty = Math.min(18, (client.overdueInvoices || 0) * 6 + Math.min(8, (client.invoiceBalance || 0) / 1200));
  const satisfactionPenalty = Math.max(0, (8 - Number(client.satisfaction || 0)) * 5);
  const contactPenalty = daysSinceContact > 21 ? Math.min(15, 7 + Math.floor((daysSinceContact - 21) / 7) * 2) : 0;
  const approvalsPenalty = Math.min(8, (client.pendingApprovals || 0) * 3);
  const adoptionPenalty = Math.max(0, (65 - Number(client.adoption || 0)) * .18);
  const rawPenalty = schedulePenalty + delayPenalty + supportPenalty + financePenalty + satisfactionPenalty + contactPenalty + approvalsPenalty + adoptionPenalty;
  const score = Math.round(clamp(100 - rawPenalty, 0, 100));
  const churnRisk = score >= 75 ? "Low" : score >= 52 ? "Medium" : "High";
  const signal = score >= 82 ? "Healthy" : score >= 65 ? "Watch" : score >= 45 ? "At risk" : "Critical";
  const renewalDays = daysUntil(client.renewalDate, today);
  const renewalProbability = Math.round(clamp(score * .72 + Number(client.satisfaction || 0) * 3 + Math.min(12, Number(client.adoption || 0) * .12) - (renewalDays < 0 ? 8 : 0), 5, 98));
  const expansionScore = Math.round(clamp((score * .3) + (Number(client.adoption || 0) * .35) + (Number(client.satisfaction || 0) * 4) + (client.tier === "Platinum" ? 10 : client.tier === "Gold" ? 5 : 0), 0, 100));
  const components = [
    { label: "Delivery", value: clamp(100 - schedulePenalty - delayPenalty - approvalsPenalty, 0, 100), detail: client.scheduleStatus === "On track" ? "Milestones are protected" : `${client.delayDays || 0} delivery-risk days and ${client.pendingApprovals || 0} pending approvals` },
    { label: "Support", value: clamp(100 - supportPenalty, 0, 100), detail: `${client.openTickets || 0} open ticket${client.openTickets === 1 ? "" : "s"} · ${client.criticalTickets || 0} critical` },
    { label: "Finance", value: clamp(100 - financePenalty, 0, 100), detail: client.overdueInvoices ? `${client.overdueInvoices} overdue invoice${client.overdueInvoices === 1 ? "" : "s"}` : "Account is current" },
    { label: "Relationship", value: clamp(100 - satisfactionPenalty - contactPenalty, 0, 100), detail: `${client.satisfaction}/10 satisfaction · contacted ${daysSinceContact}d ago` },
    { label: "Adoption", value: clamp(100 - adoptionPenalty, 0, 100), detail: `${client.activeUsers || 0}/${client.targetUsers || 0} target users active` },
  ];
  const signals = [];
  if (client.criticalTickets) signals.push({ type: "support", title: `${client.criticalTickets} critical support issue${client.criticalTickets > 1 ? "s" : ""}`, detail: "Assign an accountable technical owner and provide a recovery update." });
  if (client.overdueInvoices) signals.push({ type: "finance", title: `${money(client.invoiceBalance)} needs finance follow-up`, detail: "Confirm the commercial contact and align payment recovery with account communication." });
  if (client.delayDays || client.scheduleStatus !== "On track") signals.push({ type: "delivery", title: "Delivery confidence needs attention", detail: `${client.delayDays || 0} days of schedule pressure and ${client.pendingApprovals || 0} pending approvals.` });
  if (daysSinceContact > 21) signals.push({ type: "relationship", title: "Relationship has gone quiet", detail: `No meaningful client contact for ${daysSinceContact} days.` });
  if (client.satisfaction < 7) signals.push({ type: "relationship", title: "Satisfaction is below the healthy range", detail: "Run a structured account review before discussing renewal or expansion." });
  if (!signals.length) signals.push({ type: "success", title: "Account indicators are healthy", detail: "Keep the renewal or expansion conversation moving while confidence is high." });
  return { score, churnRisk, signal, renewalDays, renewalProbability, expansionScore, components, signals, daysSinceContact };
}

export function recommendedOffers(client, health) {
  const offers = [];
  if (health.signal === "Healthy" && health.expansionScore >= 70) {
    if (["ERP / Automation", "Web Platform"].includes(client.service)) offers.push({ title: "AI operations insight layer", value: Math.round(client.recurringValue * .6), reason: "Strong adoption and positive relationship signal make AI insight expansion timely." });
    if (client.service === "AI Systems") offers.push({ title: "Workflow automation expansion", value: Math.round(client.recurringValue * .55), reason: "Good usage suggests the client may benefit from connected automated workflows." });
    if (client.service === "Brand & Marketing") offers.push({ title: "Quarterly growth-retainer extension", value: Math.round(client.recurringValue * .75), reason: "Use completed work and outcomes to open an ongoing growth conversation." });
  }
  if (health.signal !== "Healthy") offers.push({ title: "90-day success and stabilization plan", value: Math.round(client.recurringValue * .35), reason: "Recover trust, clear blockers, and demonstrate measurable value before a renewal discussion." });
  if (client.adoption < 65) offers.push({ title: "Adoption and enablement sprint", value: Math.round(client.recurringValue * .25), reason: "Increase active usage with training, process design, and executive usage reporting." });
  return offers.slice(0, 3);
}

export function savePlan(client, health) {
  const actions = [];
  if (client.criticalTickets || client.openTickets >= 4) actions.push({ owner: "Support lead", title: "Run a 48-hour technical recovery review", detail: "Group issues, name an accountable owner, and send a client-visible action update." });
  if (client.overdueInvoices) actions.push({ owner: "Finance + Account manager", title: "Align payment recovery with value conversation", detail: "Confirm billing contact, remove uncertainty, and avoid a purely transactional follow-up." });
  if (client.delayDays || client.scheduleStatus !== "On track") actions.push({ owner: "Project manager", title: "Publish a recovery plan with dates and owners", detail: "Separate confirmed work from dependency-dependent work, then set a client update cadence." });
  if (health.daysSinceContact > 14 || client.satisfaction < 7) actions.push({ owner: client.manager, title: "Book an executive account check-in", detail: "Listen for risks, restate success goals, and agree the next measurable outcome." });
  if (client.adoption < 65) actions.push({ owner: "Client success", title: "Launch adoption recovery sprint", detail: "Identify inactive user groups, deliver enablement, and measure weekly activation." });
  if (!actions.length) actions.push({ owner: client.manager, title: "Run proactive value review", detail: "Capture outcomes, discuss the next roadmap milestone, and prepare renewal options." });
  return actions;
}

export function portfolioSummary(clients) {
  const accounts = clients.map((client) => { const health = scoreClient(client); return { client, health, offers: recommendedOffers(client, health) }; });
  const atRisk = accounts.filter(({ health }) => health.churnRisk === "High" || health.signal === "Critical");
  const renewals = accounts.filter(({ health }) => health.renewalDays <= 90 && health.renewalDays >= -30);
  const renewalValue = renewals.reduce((sum, { client }) => sum + (client.recurringValue || 0), 0);
  const predictedRenewal = renewals.reduce((sum, { client, health }) => sum + (client.recurringValue || 0) * health.renewalProbability / 100, 0);
  const expansionPipeline = accounts.reduce((sum, { offers }) => sum + offers.reduce((subtotal, offer) => subtotal + offer.value, 0), 0);
  return { accounts, atRisk, renewals, renewalValue, predictedRenewal, expansionPipeline, healthy: accounts.filter(({ health }) => health.signal === "Healthy").length };
}

export function clientSafeReview(client, health, offers) {
  return {
    company: client.company,
    service: client.service,
    relationship: health.signal === "Healthy" ? "Your account is progressing well." : "Your account review highlights a few areas we are actively improving together.",
    progress: `${client.projectProgress}%`,
    nextMilestone: client.timeline?.slice(-1)[0]?.text || "Account review and next milestone planning.",
    renewal: health.renewalDays <= 90 ? `Your renewal conversation is approaching in ${Math.max(0, health.renewalDays)} days.` : "Your renewal planning will be scheduled at the appropriate time.",
    recommendation: offers[0] ? { title: offers[0].title, reason: offers[0].reason } : null,
  };
}

export function planToText(client, health, offers) {
  const rescue = savePlan(client, health);
  return [
    "ELITE ERA DEVELOPMENT L.L.C — CLIENT HEALTH & RENEWAL RADAR REPORT",
    "Made by Hira Khyzer",
    "",
    `Client: ${client.company}`,
    `Service: ${client.service}`,
    `Account manager: ${client.manager}`,
    "",
    "--- HEALTH SUMMARY ---",
    `Health score: ${health.score}/100 (${health.signal})`,
    `Churn risk: ${health.churnRisk}`,
    `Satisfaction: ${client.satisfaction}/10`,
    `Renewal probability: ${health.renewalProbability}%`,
    `Renewal date: ${client.renewalDate}`,
    "",
    "--- ACCOUNT SIGNALS ---",
    ...health.signals.map((signal) => `- ${signal.title}: ${signal.detail}`),
    "",
    "--- SAVE PLAN ---",
    ...rescue.map((item) => `- ${item.owner}: ${item.title}. ${item.detail}`),
    "",
    "--- EXPANSION IDEAS ---",
    ...(offers.length ? offers.map((offer) => `- ${offer.title} (${money(offer.value)}): ${offer.reason}`) : ["- No immediate expansion recommendation."]),
    "",
  ].join("\n");
}

export function downloadFile(name, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = name;
  anchor.click();
  URL.revokeObjectURL(url);
}
