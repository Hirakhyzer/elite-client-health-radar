export function supportTrend(periods) {
  if (!periods.length) return { average: 0, delta: 0, direction: "Stable" };
  const values = periods.map((row) => Number(row.tickets || 0) + Number(row.critical || 0) * 3);
  const average = values.reduce((sum, value) => sum + value, 0) / values.length;
  const delta = values.at(-1) - values[0];
  return { average, delta, direction: delta > 2 ? "Worsening" : delta < -2 ? "Improving" : "Stable" };
}
