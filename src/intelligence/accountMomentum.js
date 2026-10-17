export function accountMomentum(signals) {
  const adoption = Number(signals.adoptionDelta || 0);
  const satisfaction = Number(signals.satisfactionDelta || 0) * 5;
  const tickets = -Number(signals.ticketDelta || 0) * 3;
  const engagement = Number(signals.engagementDelta || 0);
  const score = adoption + satisfaction + tickets + engagement;
  return { score, direction: score >= 8 ? "Positive" : score <= -8 ? "Negative" : "Neutral" };
}
