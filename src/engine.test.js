import { describe, expect, it } from "vitest";
import { cloneInitialState } from "./data";
import { clientSafeReview, portfolioSummary, recommendedOffers, savePlan, scoreClient } from "./engine";

describe("client health and renewal engine", () => {
  it("calculates a bounded score, churn risk, and renewal forecast", () => {
    const state = cloneInitialState();
    const health = scoreClient(state.clients[0]);
    expect(health.score).toBeGreaterThanOrEqual(0);
    expect(health.score).toBeLessThanOrEqual(100);
    expect(["Low", "Medium", "High"]).toContain(health.churnRisk);
    expect(health.renewalProbability).toBeGreaterThan(0);
  });

  it("penalizes support, finance, and delivery pressure", () => {
    const state = cloneInitialState();
    const stable = scoreClient(state.clients[0]);
    const riskyClient = { ...state.clients[0], scheduleStatus: "Delayed", delayDays: 12, openTickets: 6, criticalTickets: 2, overdueInvoices: 2, invoiceBalance: 6000, satisfaction: 4 };
    const risky = scoreClient(riskyClient);
    expect(risky.score).toBeLessThan(stable.score);
    expect(risky.churnRisk).not.toBe("Low");
  });

  it("creates a recovery plan for a pressured account", () => {
    const state = cloneInitialState();
    const client = state.clients.find((item) => item.id === "atlas");
    const health = scoreClient(client);
    const actions = savePlan(client, health);
    expect(actions.length).toBeGreaterThan(0);
    expect(actions.some((action) => action.title.includes("recovery") || action.title.includes("payment"))).toBe(true);
  });

  it("creates offers for a healthy client and protects a weak client", () => {
    const state = cloneInitialState();
    const healthy = state.clients.find((item) => item.id === "northstar");
    const risky = state.clients.find((item) => item.id === "forge");
    expect(recommendedOffers(healthy, scoreClient(healthy)).length).toBeGreaterThan(0);
    expect(recommendedOffers(risky, scoreClient(risky))[0].title).toContain("success");
  });

  it("creates a client-safe review without internal scoring fields", () => {
    const state = cloneInitialState();
    const client = state.clients[0];
    const health = scoreClient(client);
    const review = clientSafeReview(client, health, recommendedOffers(client, health));
    expect(review.company).toBe(client.company);
    expect(review.progress).toBeTruthy();
    expect(review.churnRisk).toBeUndefined();
  });

  it("summarizes renewal value and client portfolio accounts", () => {
    const state = cloneInitialState();
    const summary = portfolioSummary(state.clients);
    expect(summary.accounts).toHaveLength(state.clients.length);
    expect(summary.renewalValue).toBeGreaterThan(0);
    expect(summary.predictedRenewal).toBeGreaterThan(0);
  });
});
