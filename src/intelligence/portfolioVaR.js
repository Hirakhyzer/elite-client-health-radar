export function retentionValueAtRisk(accounts) {
  const rows = accounts.map(({ client, health }) => {
    const value = Number(client.recurringValue || 0);
    const probability = Number(health.renewalProbability || 0) / 100;
    return { id: client.id, value, expectedRetention: value * probability, valueAtRisk: value * (1 - probability) };
  });
  return { rows, totalValue: rows.reduce((sum, row) => sum + row.value, 0), expectedRetention: rows.reduce((sum, row) => sum + row.expectedRetention, 0), valueAtRisk: rows.reduce((sum, row) => sum + row.valueAtRisk, 0) };
}
