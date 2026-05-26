import { useEffect, useMemo, useState } from "react";
import policyStateData from "../../../mock/policy-state.json";
import transactionsData from "../../../mock/transactions.json";
import userData from "../../../mock/user.json";
import walletStateData from "../../../mock/wallet-state.json";
import {
  formatCurrencyAmount,
  formatDateTime,
  formatStatus,
  formatUsdEstimate,
  maskReference,
  sortByNewest
} from "./lib/format";

type DemoCustomer = {
  id: string;
  name: string;
  customerType: string;
  programName: string;
  accountStatus: string;
  supportState: string;
  supportSummary: string;
  relationshipManager: string;
};

type AssetBalance = {
  asset: string;
  displayName: string;
  network: string;
  available: string;
  pending: string;
  settlement: string;
  status: string;
};

type WalletState = {
  userId: string;
  walletId: string;
  accountLabel: string;
  depositAddress: string;
  depositNetwork: string;
  approvalState: string;
  balances: AssetBalance[];
};

type PaymentDraft = {
  id: string;
  recipientName: string;
  destinationAddress: string;
  amount: string;
  asset: string;
  network: string;
  memo: string;
  estimatedFee: string;
  settlementEstimate: string;
};

type SimulationCheck = {
  name: string;
  status: string;
  detail: string;
};

declare const __EN3_API_BASE_URL__: string;

type ApprovalNote = {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
};

type WebhookEvent = {
  id: string;
  type: string;
  timestamp: string;
  summary: string;
  relatedTransactionId?: string;
};

type PolicyState = {
  policyId: string;
  policyName: string;
  riskLevel: string;
  approvalState: string;
  approverRole: string;
  paymentDraft: PaymentDraft;
  simulation: {
    id: string;
    status: string;
    summary: string;
    nextStep: string;
    checks: SimulationCheck[];
  };
  approvalNotes: ApprovalNote[];
  events: WebhookEvent[];
};

type Transaction = {
  id: string;
  direction: "incoming" | "outgoing";
  asset: string;
  amount: string;
  network: string;
  status: string;
  counterparty: string;
  createdAt: string;
  updatedAt: string;
  description: string;
};

const customer = userData as DemoCustomer;
const wallet = walletStateData as WalletState;
const policy = policyStateData as PolicyState;
const transactions = transactionsData as Transaction[];

type SandBankSnapshot = {
  customer: DemoCustomer;
  wallet: WalletState;
  policy: PolicyState;
  transactions: Transaction[];
};

const mockSnapshot: SandBankSnapshot = {
  customer,
  wallet,
  policy,
  transactions
};

function App() {
  const [copied, setCopied] = useState(false);
  const [snapshot, setSnapshot] = useState<SandBankSnapshot>(mockSnapshot);
  const [dataMode, setDataMode] = useState<"mock" | "sandbox-api" | "sandbox-api-fallback">("mock");
  const primaryBalance = snapshot.wallet.balances[0];
  const orderedTransactions = useMemo(() => sortByNewest(snapshot.transactions), [snapshot.transactions]);
  const orderedEvents = useMemo(() => sortByNewest(snapshot.policy.events), [snapshot.policy.events]);
  const orderedApprovalNotes = useMemo(() => sortByNewest(snapshot.policy.approvalNotes.map((event) => ({
    ...event,
    createdAt: event.timestamp
  }))), [snapshot.policy.approvalNotes]);

  useEffect(() => {
    const apiBaseUrl = __EN3_API_BASE_URL__.trim();

    if (!apiBaseUrl) {
      return;
    }

    const controller = new AbortController();

    fetch(`${apiBaseUrl.replace(/\/$/, "")}/sandbank-demo`, {
      signal: controller.signal,
      headers: { Accept: "application/json" }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Sandbox API returned ${response.status}`);
        }

        return response.json() as Promise<SandBankSnapshot>;
      })
      .then((nextSnapshot) => {
        setSnapshot(nextSnapshot);
        setDataMode("sandbox-api");
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setDataMode("sandbox-api-fallback");
        }
      });

    return () => controller.abort();
  }, []);

  async function copyDepositAddress() {
    try {
      await navigator.clipboard?.writeText(snapshot.wallet.depositAddress);
    } catch {
      // Clipboard access is optional in local demos.
    }

    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <main className="app-shell">
      <header className="topbar" aria-label="Account header">
        <div>
          <p className="eyebrow">White-label web wallet reference</p>
          <h1>SandBank</h1>
          <p className="lede">
            Customer-facing digital-asset account reference app for account,
            payment, balance, recipient, approval, and settlement flows.
          </p>
        </div>
        <div className="status-stack" aria-label="Reference status">
          <span className="status-pill status-good">{formatStatus(snapshot.customer.accountStatus)}</span>
          <span className="status-pill status-reference">{dataModeLabel(dataMode)}</span>
        </div>
      </header>

      <section className="notice" aria-label="Public repository boundary">
        <strong>Public boundary: synthetic SandBank account data only.</strong>
        This demo shows customer-facing account and payment UX. It does not include
        production custody, real keys, real RPC, private policy or risk internals,
        ledger internals, partner strategy, fundraising, M&amp;A, ADI, grant, or
        strategic acquirer context.
      </section>

      <section className="dashboard-grid" aria-label="Wallet reference dashboard">
        <AccountPanel customer={snapshot.customer} wallet={snapshot.wallet} balance={primaryBalance} />
        <DepositPanel wallet={snapshot.wallet} copied={copied} onCopy={copyDepositAddress} />
        <PaymentPanel policy={snapshot.policy} />
        <ApprovalPanel policy={snapshot.policy} approvalNotes={orderedApprovalNotes} />
        <HistoryPanel transactions={orderedTransactions} />
        <EventsPanel events={orderedEvents} />
        <SupportPanel customer={snapshot.customer} />
        <ArchitecturePanel dataMode={dataMode} />
      </section>
    </main>
  );
}

function AccountPanel({
  customer,
  wallet,
  balance
}: {
  customer: DemoCustomer;
  wallet: WalletState;
  balance: AssetBalance;
}) {
  return (
    <section className="panel panel-large" aria-labelledby="account-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Account overview</p>
          <h2 id="account-title">{wallet.accountLabel}</h2>
        </div>
        <span className="status-pill status-good">{formatStatus(customer.accountStatus)}</span>
      </div>

      <dl className="account-facts">
        <div>
          <dt>Demo customer</dt>
          <dd>{customer.name}</dd>
        </div>
        <div>
          <dt>Customer type</dt>
          <dd>{customer.customerType}</dd>
        </div>
        <div>
          <dt>Wallet account ID</dt>
          <dd>{wallet.walletId}</dd>
        </div>
      </dl>

      <div className="balance-strip" aria-label="Balance summary">
        <div>
          <span>Available payment balance</span>
          <strong>{formatCurrencyAmount(balance.available, balance.asset)}</strong>
        </div>
        <div>
          <span>Pending settlement</span>
          <strong>{formatCurrencyAmount(balance.pending, balance.asset)}</strong>
        </div>
      </div>

      <div className="asset-card" aria-label="Stablecoin asset card">
        <div>
          <p className="eyebrow">Stablecoin asset</p>
          <h3>{balance.displayName}</h3>
          <p>{balance.settlement}</p>
        </div>
        <dl>
          <div>
            <dt>Asset</dt>
            <dd>{balance.asset}</dd>
          </div>
          <div>
            <dt>Network</dt>
            <dd>{balance.network}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>{formatStatus(balance.status)}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

function DepositPanel({
  wallet,
  copied,
  onCopy
}: {
  wallet: WalletState;
  copied: boolean;
  onCopy: () => void;
}) {
  const balance = wallet.balances[0];

  return (
    <section className="panel" aria-labelledby="deposit-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Deposit flow</p>
          <h2 id="deposit-title">Sandbox deposit address</h2>
        </div>
        <span className="status-pill status-reference">Mock only</span>
      </div>
      <p className="muted">
        This synthetic address demonstrates deposit instructions for the
        SandBank account. It does not accept real funds.
      </p>
      <div className="reference-box">
        <span>{maskReference(wallet.depositAddress, 14, 6)}</span>
        <button type="button" onClick={onCopy}>
          {copied ? "Copied" : "Copy address"}
        </button>
      </div>
      <dl className="detail-list">
        <div>
          <dt>Asset</dt>
          <dd>{balance.asset}</dd>
        </div>
        <div>
          <dt>Network</dt>
          <dd>{wallet.depositNetwork}</dd>
        </div>
        <div>
          <dt>Instruction state</dt>
          <dd>No real funds accepted</dd>
        </div>
      </dl>
    </section>
  );
}

function PaymentPanel({ policy }: { policy: PolicyState }) {
  const draft = policy.paymentDraft;
  const simulation = policy.simulation;

  return (
    <section className="panel panel-large" aria-labelledby="payment-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Send payment</p>
          <h2 id="payment-title">Outgoing payment review</h2>
        </div>
        <span className="status-pill status-warning">{formatStatus(simulation.status)}</span>
      </div>

      <div className="payment-grid">
        <dl className="detail-list">
          <div>
            <dt>Recipient</dt>
            <dd>{draft.recipientName}</dd>
          </div>
          <div>
            <dt>Destination</dt>
            <dd>{maskReference(draft.destinationAddress, 12, 6)}</dd>
          </div>
          <div>
            <dt>Amount</dt>
            <dd>{formatCurrencyAmount(draft.amount, draft.asset)}</dd>
          </div>
          <div>
            <dt>Estimated fee</dt>
            <dd>{formatUsdEstimate(draft.estimatedFee)}</dd>
          </div>
          <div>
            <dt>Network</dt>
            <dd>{draft.network}</dd>
          </div>
          <div>
            <dt>Memo</dt>
            <dd>{draft.memo}</dd>
          </div>
        </dl>

        <div className="simulation-result" aria-label="Transaction simulation result">
          <p className="eyebrow">Simulation result</p>
          <h3>{simulation.summary}</h3>
          <p>{simulation.nextStep}</p>
          <ul className="check-list">
            {simulation.checks.map((check) => (
              <li key={check.name}>
                <span className={`check-dot ${statusTone(check.status)}`} />
                <div>
                  <strong>{check.name}</strong>
                  <span>{formatStatus(check.status)} - {check.detail}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ApprovalPanel({
  policy,
  approvalNotes
}: {
  policy: PolicyState;
  approvalNotes: Array<ApprovalNote & { createdAt: string }>;
}) {
  return (
    <section className="panel" aria-labelledby="approval-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Approval pending</p>
          <h2 id="approval-title">Payment review state</h2>
        </div>
        <span className="status-pill status-warning">{formatStatus(policy.riskLevel)}</span>
      </div>
      <dl className="detail-list">
        <div>
          <dt>Policy</dt>
          <dd>{policy.policyName}</dd>
        </div>
        <div>
          <dt>Approval state</dt>
          <dd>{formatStatus(policy.approvalState)}</dd>
        </div>
        <div>
          <dt>Reviewer role</dt>
          <dd>{policy.approverRole}</dd>
        </div>
      </dl>
      <ol className="timeline compact-timeline" aria-label="Approval notes">
        {approvalNotes.map((event) => (
          <li key={event.id}>
            <time>{formatDateTime(event.timestamp)}</time>
            <strong>{event.actor}</strong>
            <span>{event.action}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

function HistoryPanel({ transactions }: { transactions: Transaction[] }) {
  return (
    <section className="panel panel-large" aria-labelledby="history-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Transaction history</p>
          <h2 id="history-title">Recent account activity</h2>
        </div>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Direction</th>
              <th scope="col">Counterparty</th>
              <th scope="col">Amount</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{formatDateTime(transaction.createdAt)}</td>
                <td>{formatStatus(transaction.direction)}</td>
                <td>
                  <strong>{transaction.counterparty}</strong>
                  <span>{transaction.description}</span>
                </td>
                <td>{formatCurrencyAmount(transaction.amount, transaction.asset)}</td>
                <td>
                  <span className={`status-pill ${statusTone(transaction.status)}`}>
                    {formatStatus(transaction.status)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function EventsPanel({ events }: { events: WebhookEvent[] }) {
  return (
    <section className="panel" aria-labelledby="events-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Webhook events</p>
          <h2 id="events-title">Integration timeline</h2>
        </div>
      </div>
      <ol className="timeline" aria-label="Webhook event timeline">
        {events.map((event) => (
          <li key={event.id}>
            <time>{formatDateTime(event.timestamp)}</time>
            <strong>{event.type}</strong>
            <span>{event.summary}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

function SupportPanel({ customer }: { customer: DemoCustomer }) {
  return (
    <section className="panel" aria-labelledby="support-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Support and recovery</p>
          <h2 id="support-title">{formatStatus(customer.supportState)}</h2>
        </div>
      </div>
      <p className="muted">{customer.supportSummary}</p>
      <dl className="detail-list">
        <div>
          <dt>Partner support</dt>
          <dd>{customer.relationshipManager}</dd>
        </div>
        <div>
          <dt>Recovery model</dt>
          <dd>Account support workflow only</dd>
        </div>
      </dl>
    </section>
  );
}

function ArchitecturePanel({ dataMode }: { dataMode: "mock" | "sandbox-api" | "sandbox-api-fallback" }) {
  return (
    <section className="panel architecture-panel" aria-labelledby="architecture-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Powered by En3 API</p>
          <h2 id="architecture-title">Reference integration boundary</h2>
        </div>
      </div>
      <p>
        SandBank can run this reference in mock mode or point it at a lightweight
        sandbox API snapshot with EN3_API_BASE_URL. The public app only presents
        account, recipient, payment, approval, settlement, and event states.
      </p>
      <ul className="architecture-list">
        <li>Data mode: {dataModeLabel(dataMode)}.</li>
        <li>Browser app: SandBank-branded account and payment experience.</li>
        <li>Sandbox API: optional JSON snapshot for customer account review.</li>
        <li>Private boundary: custody, signing, risk internals, ledger internals, and deployments.</li>
      </ul>
    </section>
  );
}

function dataModeLabel(mode: "mock" | "sandbox-api" | "sandbox-api-fallback"): string {
  if (mode === "sandbox-api") {
    return "Live sandbox API mode";
  }

  if (mode === "sandbox-api-fallback") {
    return "Sandbox API fallback to mock mode";
  }

  return "Mock mode";
}

function statusTone(status: string): string {
  if (status.includes("settled") || status.includes("passed") || status.includes("open")) {
    return "status-good";
  }

  if (status.includes("failed") || status.includes("blocked") || status.includes("rejected")) {
    return "status-danger";
  }

  if (status.includes("review") || status.includes("approval") || status.includes("requires")) {
    return "status-warning";
  }

  return "status-reference";
}

export default App;
