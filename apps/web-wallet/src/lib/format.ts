export function formatCurrencyAmount(value: string, asset: string): string {
  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    return `${value} ${asset}`;
  }

  return `${new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount)} ${asset}`;
}

export function formatUsdEstimate(value: string): string {
  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    return value;
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

export function formatStatus(value: string): string {
  return value
    .split(/[_.-]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function formatDateTime(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
    timeZoneName: "short"
  }).format(date);
}

export function maskReference(value: string, visibleStart = 10, visibleEnd = 6): string {
  if (value.length <= visibleStart + visibleEnd + 3) {
    return value;
  }

  return `${value.slice(0, visibleStart)}...${value.slice(-visibleEnd)}`;
}

export function sortByNewest<T extends { createdAt?: string; timestamp?: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const aTime = Date.parse(a.createdAt ?? a.timestamp ?? "");
    const bTime = Date.parse(b.createdAt ?? b.timestamp ?? "");

    return (Number.isNaN(bTime) ? 0 : bTime) - (Number.isNaN(aTime) ? 0 : aTime);
  });
}
