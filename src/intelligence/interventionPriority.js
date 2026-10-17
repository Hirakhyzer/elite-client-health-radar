export function interventionPriority(accounts) {
  return accounts.map(({ client, health }) => {
    const value = Number(client.recurringValue || 0);
    const risk = 100 - Number(health.renewalProbability || 0);
    const urgency = health.renewalDays <= 60 ? 20 : health.renewalDays <= 90 ? 10 : 0;
    const priorityScore = Math.round(risk * .7 + Math.min(20, value / 1000) + urgency);
    return { clientId: client.id, priorityScore, risk, value };
  }).sort((a, b) => b.priorityScore - a.priorityScore);
}
