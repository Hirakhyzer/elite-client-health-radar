export function expansionReadiness(client, health) {
  const conditions = { healthy: health.score >= 80, adoption: Number(client.adoption || 0) >= 70, satisfaction: Number(client.satisfaction || 0) >= 8, noOverdueInvoices: Number(client.overdueInvoices || 0) === 0, noCriticalTickets: Number(client.criticalTickets || 0) === 0 };
  const score = Math.round(Object.values(conditions).filter(Boolean).length / Object.keys(conditions).length * 100);
  return { score, ready: score >= 80, blockers: Object.entries(conditions).filter(([, value]) => !value).map(([key]) => key) };
}
