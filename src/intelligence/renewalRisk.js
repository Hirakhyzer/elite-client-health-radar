export function renewalRisk(client, health) {
  const days = Number(health.renewalDays || 0);
  const probability = Number(health.renewalProbability || 0);
  const value = Number(client.recurringValue || 0);
  const urgency = days <= 30 ? 25 : days <= 60 ? 15 : days <= 90 ? 8 : 0;
  const score = Math.min(100, Math.round((100 - probability) * .75 + urgency));
  return { score, valueAtRisk: value * (1 - probability / 100), band: score >= 65 ? "High" : score >= 40 ? "Watch" : "Low" };
}
