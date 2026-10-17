export function forecastCalibration(outcomes) {
  if (!outcomes.length) return { brier: 0, bias: 0, count: 0 };
  const rows = outcomes.map((row) => ({ p: Number(row.probability || 0) / 100, y: row.renewed ? 1 : 0 }));
  const brier = rows.reduce((sum, row) => sum + (row.p - row.y) ** 2, 0) / rows.length;
  const bias = rows.reduce((sum, row) => sum + (row.p - row.y), 0) / rows.length;
  return { brier, bias, count: rows.length };
}
