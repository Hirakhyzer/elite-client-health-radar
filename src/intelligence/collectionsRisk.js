export function collectionsRisk(client) {
  const overdue = Number(client.overdueInvoices || 0);
  const balance = Number(client.invoiceBalance || 0);
  const recurring = Math.max(1, Number(client.recurringValue || 0));
  const exposureRatio = balance / recurring;
  const score = Math.min(100, Math.round(overdue * 22 + Math.min(55, exposureRatio * 25)));
  return { score, exposureRatio, balance, band: score >= 65 ? "High" : score >= 35 ? "Watch" : "Low" };
}
