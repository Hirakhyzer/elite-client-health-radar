export function relationshipRisk(client) {
  const contacts = Number(client.keyContacts || 1);
  const executive = Boolean(client.executiveSponsor);
  const satisfaction = Number(client.satisfaction || 0);
  const score = Math.min(100, Math.round((contacts <= 1 ? 30 : 0) + (!executive ? 25 : 0) + Math.max(0, 8 - satisfaction) * 7));
  return { score, band: score >= 65 ? "High" : score >= 35 ? "Watch" : "Low", singleThreaded: contacts <= 1 };
}
