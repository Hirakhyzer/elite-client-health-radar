export function adoptionTrend(points) {
  if (!points.length) return { latest: 0, delta: 0, direction: "Stable" };
  const first = Number(points[0].value || 0);
  const latest = Number(points.at(-1).value || 0);
  const delta = latest - first;
  return { latest, delta, direction: delta > 5 ? "Growing" : delta < -5 ? "Declining" : "Stable" };
}
