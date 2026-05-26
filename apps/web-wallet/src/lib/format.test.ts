import { describe, expect, it } from "vitest";
import {
  formatCurrencyAmount,
  formatDateTime,
  formatStatus,
  formatUsdEstimate,
  maskReference,
  sortByNewest
} from "./format";

describe("format helpers", () => {
  it("formats stablecoin amounts for account and balance sections", () => {
    expect(formatCurrencyAmount("25000.00", "USDC")).toBe("25,000.00 USDC");
    expect(formatUsdEstimate("17.50")).toBe("$17.50");
  });

  it("formats simulation, approval, and transaction states for partner-readable labels", () => {
    expect(formatStatus("transaction_requires_approval")).toBe("Transaction Requires Approval");
    expect(formatStatus("sandbox-policy-review")).toBe("Sandbox Policy Review");
  });

  it("formats timestamps and masks long sandbox references", () => {
    expect(formatDateTime("2026-05-25T12:00:00Z")).toContain("UTC");
    expect(maskReference("en3_sandbox_deposit_usdc_001", 8, 5)).toBe("en3_sand...c_001");
  });

  it("orders transactions and events by newest timestamp", () => {
    const ordered = sortByNewest([
      { id: "older", createdAt: "2026-05-24T10:00:00Z" },
      { id: "newer", createdAt: "2026-05-25T10:00:00Z" }
    ]);

    expect(ordered.map((item) => item.id)).toEqual(["newer", "older"]);
  });
});
