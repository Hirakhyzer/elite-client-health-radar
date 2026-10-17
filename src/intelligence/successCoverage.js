export function successCoverage(clients) {
  const rows = clients.map((client) => {
    const actions = client.actions || [];
    const open = actions.filter((action) => !action.done);
    const owned = open.filter((action) => action.owner).length;
    return { clientId: client.id, open: open.length, owned, coverage: open.length ? owned / open.length * 100 : 100 };
  });
  return { rows, uncoveredClients: rows.filter((row) => row.coverage < 100).map((row) => row.clientId) };
}
