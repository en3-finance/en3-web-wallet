# Web Wallet Reference Flow

1. User signs in through the bank or fintech application.
2. The product backend maps the user to an En3 wallet id.
3. The wallet screen displays balances and recent transaction status from sandbox APIs.
4. The deposit screen displays a sandbox deposit address.
5. The send flow collects destination, asset, network, and amount.
6. The transaction is submitted and simulated.
7. Policy or risk state can move the transaction to approval or review.
8. Settlement webhooks update the visible transaction lifecycle.

The public flow is a reference UX and integration pattern only.
