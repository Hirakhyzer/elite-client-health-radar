export const TODAY = "2026-06-30";

export const services = ["ERP / Automation", "AI Systems", "Web Platform", "Brand & Marketing", "Maintenance"];
export const TIERS = ["Platinum", "Gold", "Standard"];
export const ACTION_STATUS = ["Open", "In Progress", "Done"];

export const initialClients = [
  {
    id: "northstar", company: "Northstar Studio", contact: "Maya Chen", initials: "NC", tier: "Platinum", service: "Web Platform", manager: "Amina Noor", contractValue: 36000, recurringValue: 12000, renewalDate: "2026-07-18", started: "2025-07-18", projectProgress: 91, scheduleStatus: "On track", delayDays: 0, openTickets: 1, criticalTickets: 0, overdueInvoices: 0, invoiceBalance: 0, satisfaction: 9, lastContact: "2026-06-26", pendingApprovals: 0, adoption: 88, activeUsers: 37, targetUsers: 42, notes: "Strong executive sponsor. Review annual roadmap in July.", timeline: [
      { date: "2025-07-18", type: "Onboarded", text: "Client onboarding and delivery kickoff completed." },
      { date: "2026-05-29", type: "Milestone", text: "Client portal v2 launched." },
      { date: "2026-06-26", type: "Meeting", text: "Q2 review: client asked for AI reporting roadmap." },
    ], meetings: [
      { id: "m-n1", date: "2026-06-26", title: "Q2 account review", note: "Sponsor is satisfied. Prepare renewal and AI reporting options.", sentiment: "Positive" },
    ], actions: [
      { id: "a-n1", title: "Send July renewal roadmap", owner: "Amina Noor", due: "2026-07-03", status: "Open", type: "Renewal" },
    ],
  },
  {
    id: "atlas", company: "Atlas Holdings", contact: "Daniel Ross", initials: "AH", tier: "Platinum", service: "ERP / Automation", manager: "Amina Noor", contractValue: 42000, recurringValue: 18000, renewalDate: "2026-08-07", started: "2025-08-07", projectProgress: 46, scheduleStatus: "At risk", delayDays: 5, openTickets: 4, criticalTickets: 1, overdueInvoices: 1, invoiceBalance: 4200, satisfaction: 6, lastContact: "2026-06-17", pendingApprovals: 2, adoption: 54, activeUsers: 24, targetUsers: 45, notes: "Payment and integration dependencies need executive attention. Client expects a realistic recovery plan.", timeline: [
      { date: "2025-08-07", type: "Onboarded", text: "Enterprise automation program started." },
      { date: "2026-06-12", type: "Risk", text: "Integration credential delay raised project risk." },
      { date: "2026-06-17", type: "Meeting", text: "Client requested a recovery-plan update." },
    ], meetings: [
      { id: "m-a1", date: "2026-06-17", title: "Recovery discussion", note: "Client needs clear dates, owners, and payment follow-up before confidence improves.", sentiment: "Concerned" },
    ], actions: [
      { id: "a-a1", title: "Send integrated recovery plan", owner: "Amina Noor", due: "2026-07-01", status: "Open", type: "Save plan" },
      { id: "a-a2", title: "Resolve overdue invoice", owner: "Finance", due: "2026-07-02", status: "Open", type: "Finance" },
    ],
  },
  {
    id: "lumen", company: "Lumen Logistics", contact: "Omar Awan", initials: "LL", tier: "Gold", service: "AI Systems", manager: "Hira Khyzer", contractValue: 30000, recurringValue: 15000, renewalDate: "2026-09-15", started: "2025-09-15", projectProgress: 72, scheduleStatus: "On track", delayDays: 0, openTickets: 2, criticalTickets: 0, overdueInvoices: 0, invoiceBalance: 0, satisfaction: 8, lastContact: "2026-06-22", pendingApprovals: 1, adoption: 76, activeUsers: 63, targetUsers: 78, notes: "Healthy delivery. Strong opportunity for workflow automation expansion after launch.", timeline: [
      { date: "2025-09-15", type: "Onboarded", text: "AI operations workspace kickoff." },
      { date: "2026-06-10", type: "Milestone", text: "Exception-summary workflow approved." },
      { date: "2026-06-22", type: "Meeting", text: "Operations team reported time savings in pilot." },
    ], meetings: [
      { id: "m-l1", date: "2026-06-22", title: "Pilot success review", note: "Positive adoption. Discuss automation expansion after go-live.", sentiment: "Positive" },
    ], actions: [
      { id: "a-l1", title: "Prepare automation expansion proposal", owner: "Hira Khyzer", due: "2026-07-09", status: "Open", type: "Upsell" },
    ],
  },
  {
    id: "verdant", company: "Verdant & Co.", contact: "Sofia Malik", initials: "VC", tier: "Gold", service: "Brand & Marketing", manager: "Omar Rahman", contractValue: 18000, recurringValue: 9000, renewalDate: "2026-07-09", started: "2025-07-09", projectProgress: 100, scheduleStatus: "On track", delayDays: 0, openTickets: 0, criticalTickets: 0, overdueInvoices: 0, invoiceBalance: 0, satisfaction: 7, lastContact: "2026-06-01", pendingApprovals: 0, adoption: 60, activeUsers: 6, targetUsers: 10, notes: "Delivery completed but account has been quiet. Renewal outreach needs a results-led conversation.", timeline: [
      { date: "2025-07-09", type: "Onboarded", text: "Brand and growth partnership started." },
      { date: "2026-05-16", type: "Milestone", text: "Campaign asset library delivered." },
      { date: "2026-06-01", type: "Contact", text: "Last account check-in sent." },
    ], meetings: [], actions: [
      { id: "a-v1", title: "Book renewal value review", owner: "Omar Rahman", due: "2026-07-02", status: "Open", type: "Renewal" },
    ],
  },
  {
    id: "forge", company: "Forge Manufacturing", contact: "Priya Mehta", initials: "FM", tier: "Standard", service: "Maintenance", manager: "Nora Lee", contractValue: 12000, recurringValue: 6000, renewalDate: "2026-10-01", started: "2025-10-01", projectProgress: 100, scheduleStatus: "On track", delayDays: 0, openTickets: 6, criticalTickets: 1, overdueInvoices: 2, invoiceBalance: 1900, satisfaction: 5, lastContact: "2026-06-05", pendingApprovals: 0, adoption: 42, activeUsers: 11, targetUsers: 26, notes: "Support friction and payment delays. Need to identify the true account owner and rebuild usage momentum.", timeline: [
      { date: "2025-10-01", type: "Onboarded", text: "Maintenance plan activated." },
      { date: "2026-06-05", type: "Support", text: "Multiple related support tickets opened." },
      { date: "2026-06-21", type: "Finance", text: "Second overdue invoice reminder issued." },
    ], meetings: [], actions: [
      { id: "a-f1", title: "Run support root-cause review", owner: "Nora Lee", due: "2026-07-03", status: "Open", type: "Save plan" },
      { id: "a-f2", title: "Confirm commercial contact", owner: "Finance", due: "2026-07-04", status: "Open", type: "Finance" },
    ],
  },
];

export function cloneInitialState() {
  return JSON.parse(JSON.stringify({ clients: initialClients, savedReports: [] }));
}
