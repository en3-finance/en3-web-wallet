import { useMemo, useState } from "react";
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

type AuditEvent = {
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
  auditTrail: AuditEvent[];
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

function App() {
  const [copied, setCopied] = useState(false);
  const primaryBalance = wallet.balances[0];
  const orderedTransactions = useMemo(() => sortByNewest(transactions), []);
  const orderedEvents = useMemo(() => sortByNewest(policy.events), []);
  const orderedAuditTrail = useMemo(() => sortByNewest(policy.auditTrail.map((event) => ({
    ...event,
    createdAt: event.timestamp
  }))), []);

  async function copyDepositAddress() {
    try {
      await navigator.clipboard?.writeText(wallet.depositAddress);
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
          <h1>{customer.programName}</h1>
          <p className="lede">
            Demo customer account for bank, fintech, and payment product review.
            All balances, addresses, approvals, and events are mock sandbox data.
          </p>
        </div>
        <div className="status-stack" aria-label="Reference status">
          <span className="status-pill status-good">{customer.accountStatus}</span>
          <span className="status-pill status-reference">Reference only</span>
        </div>
      </header>

      <section className="notice" aria-label="Public repository boundary">
        <strong>No real funds, no real RPC, no seed phrases, no private keys.</strong>
        This public demo shows account and payment flows only. Production custody,
        signing, policy enforcement, risk logic, treasury, ledger, and deployments
        remain private by design.
      </section>

      <section className="dashboard-grid" aria-label="Wallet reference dashboard">
        <AccountPanel balance={primaryBalance} />
        <DepositPanel copied={copied} onCopy={copyDepositAddress} />
        <PaymentPanel />
        <ControlPlanePanel auditTrail={orderedAuditTrail} />
        <HistoryPanel transactions={orderedTransactions} />
        <EventsPanel events={orderedEvents} />
        <SupportPanel />
        <ArchitecturePanel />
      </section>
    </main>
  );
}

function AccountPanel({ balance }: { balance: AssetBalance }) {
  return (
    <section className="panel panel-large" aria-labelledby="account-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Account overview</p>
          <h2 id="account-title">{wallet.accountLabel}</h2>
        </div>
        <span className="status-pill status-good">Open</span>
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

function DepositPanel({ copied, onCopy }: { copied: boolean; onCopy: () => void }) {
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
        Use this reference address to demonstrate deposit instructions in a
        partner product. It is not connected to a live network.
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

function PaymentPanel() {
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

function ControlPlanePanel({ auditTrail }: { auditTrail: Array<AuditEvent & { createdAt: string }> }) {
  return (
    <section className="panel" aria-labelledby="policy-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Policy and approval</p>
          <h2 id="policy-title">Control-plane state</h2>
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
      <ol className="timeline compact-timeline" aria-label="Audit trail">
        {auditTrail.map((event) => (
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

function SupportPanel() {
  return (
    <section className="panel" aria-labelledby="support-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Support and recovery</p>
          <h2 id="support-title">{customer.supportState}</h2>
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

function ArchitecturePanel() {
  return (
    <section className="panel architecture-panel" aria-labelledby="architecture-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Powered by En3 API</p>
          <h2 id="architecture-title">Reference integration boundary</h2>
        </div>
      </div>
      <p>
        A partner backend would call En3 APIs and SDKs for wallet orchestration,
        receive webhook events, and present policy, approval, simulation, and
        audit states in its own customer experience.
      </p>
      <ul className="architecture-list">
        <li>Browser app: partner-branded account and payment experience.</li>
        <li>Partner backend: authentication, customer mapping, and product rules.</li>
        <li>En3 control plane: IAM/RBAC, approvals, simulation, events, and audit interfaces.</li>
        <li>Private boundary: custody, signing, policy enforcement, ledger, treasury, and deployments.</li>
      </ul>
    </section>
  );
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
