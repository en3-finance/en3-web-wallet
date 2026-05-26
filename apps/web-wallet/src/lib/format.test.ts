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
    expect(formatCurrencyAmount("18420.75", "USDC")).toBe("18,420.75 USDC");
    expect(formatUsdEstimate("17.50")).toBe("$17.50");
  });

  it("formats simulation, approval, and transaction states for partner-readable labels", () => {
    expect(formatStatus("payment.approval_pending")).toBe("Payment Approval Pending");
    expect(formatStatus("settlement-review")).toBe("Settlement Review");
  });

  it("formats timestamps and masks long sandbox references", () => {
    expect(formatDateTime("2026-05-25T12:00:00Z")).toContain("UTC");
    expect(maskReference("sandbank_sandbox_deposit_usdc_001", 8, 5)).toBe("sandbank...c_001");
  });

  it("orders transactions and events by newest timestamp", () => {
    const ordered = sortByNewest([
      { id: "older", createdAt: "2026-05-24T10:00:00Z" },
      { id: "newer", createdAt: "2026-05-25T10:00:00Z" }
    ]);

    expect(ordered.map((item) => item.id)).toEqual(["newer", "older"]);
  });
});
