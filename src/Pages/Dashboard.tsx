import React, { useState } from "react";

type DashboardProps = {
  businessName: string;
  category: string;
  currency: string;
};

type Transaction = {
  id: number;
  name: string;
  description: string;
  amount: number;
  type: "sale" | "expense";
};

function Dashboard({
  businessName,
  category,
  currency,
}: DashboardProps) {
  const currencySymbol = currency === "ZAR" ? "R" : "M";

  const [activeNav, setActiveNav] = useState("Dashboard");
  const [showSaleModal, setShowSaleModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      name: "Thato M.",
      description: "2 × Summer Dress",
      amount: 1200,
      type: "sale",
    },
    {
      id: 2,
      name: "Mpho Café",
      description: "Wholesale order",
      amount: 850,
      type: "sale",
    },
    {
      id: 3,
      name: "Supplier payment",
      description: "Stock purchase",
      amount: 430,
      type: "expense",
    },
    {
      id: 4,
      name: "Lerato K.",
      description: "Beauty products",
      amount: 650,
      type: "sale",
    },
  ]);

  const totalSales = transactions
    .filter((transaction) => transaction.type === "sale")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const estimatedProfit = totalSales - totalExpenses;

  const formatMoney = (amount: number) => {
    return `${currencySymbol} ${amount.toLocaleString("en-ZA")}`;
  };

  const addSale = () => {
    const newSale: Transaction = {
      id: Date.now(),
      name: "New customer",
      description: "Sale recorded",
      amount: 500,
      type: "sale",
    };

    setTransactions((current) => [newSale, ...current]);
    setShowSaleModal(false);
  };

  const addExpense = () => {
    const newExpense: Transaction = {
      id: Date.now(),
      name: "Business expense",
      description: "Expense recorded",
      amount: 250,
      type: "expense",
    };

    setTransactions((current) => [newExpense, ...current]);
    setShowExpenseModal(false);
  };

  const navItems = [
    { name: "Dashboard", icon: "⌂" },
    { name: "Sales", icon: "↗" },
    { name: "Expenses", icon: "−" },
    { name: "Customers", icon: "♧" },
    { name: "Suppliers", icon: "▤" },
    { name: "Invoices", icon: "▧" },
    { name: "Money", icon: "◉" },
    { name: "Reports", icon: "▥" },
  ];

  return (
    <main className="dashboard-page">
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">
          <div className="brand-mark">♡</div>

          <div>
            <strong>BUKA</strong>
            <span>small business, made simple</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.name}
              className={`nav-item ${
                activeNav === item.name ? "active" : ""
              }`}
              onClick={() => setActiveNav(item.name)}
            >
              <span>{item.icon}</span>
              {item.name}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button
            className={`nav-item ${
              activeNav === "Settings" ? "active" : ""
            }`}
            onClick={() => setActiveNav("Settings")}
          >
            <span>⚙</span>
            Settings
          </button>

          <div className="sidebar-business">
            <div className="business-avatar">
              {businessName.charAt(0).toUpperCase()}
            </div>

            <div>
              <strong>{businessName}</strong>
              <span>{category}</span>
            </div>
          </div>
        </div>
      </aside>

      <section className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <p className="eyebrow">
              MONDAY, 14 SEPTEMBER 2026
            </p>

            <h1>
              Good afternoon,{" "}
              <em>{businessName.split(" ")[0]}</em> 👋
            </h1>

            <p>
              Here's how your business is doing today.
            </p>
          </div>

          <div className="header-actions">
            <button
              className="icon-button"
              aria-label="Search"
            >
              ⌕
            </button>

            <button
              className="icon-button"
              aria-label="Notifications"
            >
              ♧
            </button>

            <div className="profile-avatar">
              {businessName.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          {/* QUICK ACTIONS */}

          <div className="quick-actions">
            <button
              className="quick-action primary"
              onClick={() => setShowSaleModal(true)}
            >
              <span>＋</span>
              Record sale
            </button>

            <button
              className="quick-action"
              onClick={() => setShowExpenseModal(true)}
            >
              <span>＋</span>
              Add expense
            </button>

            <button
              className="quick-action"
              onClick={() => setActiveNav("Money")}
            >
              <span>◉</span>
              Money accounts
            </button>
          </div>

          {/* STATS */}

          <section className="stats-grid">
            <div className="stat-card">
              <div className="stat-top">
                <span>Today's sales</span>
                <span className="stat-icon">↗</span>
              </div>

              <strong>{formatMoney(totalSales)}</strong>

              <small className="positive">
                ↑ 12.5% from yesterday
              </small>
            </div>

            <div className="stat-card">
              <div className="stat-top">
                <span>Expenses</span>
                <span className="stat-icon">−</span>
              </div>

              <strong>{formatMoney(totalExpenses)}</strong>

              <small>
                {
                  transactions.filter(
                    (transaction) =>
                      transaction.type === "expense"
                  ).length
                }{" "}
                transactions today
              </small>
            </div>

            <div className="stat-card highlight">
              <div className="stat-top">
                <span>Estimated profit</span>
                <span className="stat-icon">✦</span>
              </div>

              <strong>{formatMoney(estimatedProfit)}</strong>

              <small className="positive">
                Based on today's activity
              </small>
            </div>

            <div className="stat-card">
              <div className="stat-top">
                <span>Receivables</span>
                <span className="stat-icon">◷</span>
              </div>

              <strong>{currencySymbol} 2,350</strong>

              <small>5 customers owe you</small>
            </div>
          </section>

          {/* MONEY ACCOUNTS */}

          <section className="dashboard-card money-summary-card">
            <div className="card-heading">
              <div>
                <p className="eyebrow">YOUR MONEY</p>
                <h2>Money accounts</h2>
              </div>

              <button
                className="view-button"
                onClick={() => setActiveNav("Money")}
              >
                Manage accounts →
              </button>
            </div>

            <div className="money-account-grid">
              <div className="money-account">
                <span className="money-account-icon">
                  💵
                </span>

                <div>
                  <span>Cash</span>
                  <strong>{currencySymbol} 3,200</strong>
                </div>
              </div>

              <div className="money-account">
                <span className="money-account-icon">
                  📱
                </span>

                <div>
                  <span>M-Pesa</span>
                  <strong>{currencySymbol} 4,850</strong>
                </div>
              </div>

              <div className="money-account">
                <span className="money-account-icon">
                  📱
                </span>

                <div>
                  <span>EcoCash</span>
                  <strong>{currencySymbol} 1,420</strong>
                </div>
              </div>

              <div className="money-account">
                <span className="money-account-icon">
                  🏦
                </span>

                <div>
                  <span>Bank</span>
                  <strong>{currencySymbol} 8,750</strong>
                </div>
              </div>
            </div>
          </section>

          {/* SALES + TRANSACTIONS */}

          <div className="dashboard-columns">
            <section className="dashboard-card sales-card">
              <div className="card-heading">
                <div>
                  <p className="eyebrow">THIS WEEK</p>
                  <h2>Sales overview</h2>
                </div>

                <button
                  className="view-button"
                  onClick={() => setActiveNav("Reports")}
                >
                  View report →
                </button>
              </div>

              <div className="chart">
                <div className="chart-grid">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>

                <div className="chart-bars">
                  <div style={{ height: "38%" }}>
                    <span>M</span>
                  </div>

                  <div style={{ height: "52%" }}>
                    <span>T</span>
                  </div>

                  <div style={{ height: "45%" }}>
                    <span>W</span>
                  </div>

                  <div style={{ height: "74%" }}>
                    <span>T</span>
                  </div>

                  <div style={{ height: "61%" }}>
                    <span>F</span>
                  </div>

                  <div style={{ height: "88%" }}>
                    <span>S</span>
                  </div>

                  <div
                    className="today-bar"
                    style={{ height: "96%" }}
                  >
                    <span>S</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="dashboard-card">
              <div className="card-heading">
                <div>
                  <p className="eyebrow">RECENT</p>
                  <h2>Transactions</h2>
                </div>

                <button
                  className="view-button"
                  onClick={() => setActiveNav("Sales")}
                >
                  See all →
                </button>
              </div>

              <div className="transaction-list">
                {transactions.slice(0, 5).map((transaction) => (
                  <div
                    className="transaction"
                    key={transaction.id}
                  >
                    <div className="transaction-icon">
                      {transaction.type === "sale"
                        ? "↗"
                        : "−"}
                    </div>

                    <div>
                      <strong>{transaction.name}</strong>
                      <span>{transaction.description}</span>
                    </div>

                    <b
                      className={
                        transaction.type === "expense"
                          ? "expense"
                          : ""
                      }
                    >
                      {transaction.type === "sale"
                        ? "+"
                        : "−"}
                      {formatMoney(transaction.amount)}
                    </b>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RECEIVABLES + PAYABLES */}

          <div className="dashboard-columns">
            <section className="dashboard-card balance-card">
              <div className="balance-heading">
                <div>
                  <p className="eyebrow">MONEY OWED TO YOU</p>
                  <h2>Receivables</h2>
                </div>

                <strong>{currencySymbol} 2,350</strong>
              </div>

              <div className="balance-row">
                <span>Thato M.</span>
                <b>{currencySymbol} 1,200</b>
              </div>

              <div className="balance-row">
                <span>Lerato K.</span>
                <b>{currencySymbol} 650</b>
              </div>

              <div className="balance-row">
                <span>Mpho Café</span>
                <b>{currencySymbol} 500</b>
              </div>

              <button
                className="view-button full-width-button"
                onClick={() => setActiveNav("Customers")}
              >
                View customers →
              </button>
            </section>

            <section className="dashboard-card balance-card">
              <div className="balance-heading">
                <div>
                  <p className="eyebrow">MONEY YOU OWE</p>
                  <h2>Payables</h2>
                </div>

                <strong>{currencySymbol} 1,180</strong>
              </div>

              <div className="balance-row">
                <span>Fashion Suppliers</span>
                <b>{currencySymbol} 680</b>
              </div>

              <div className="balance-row">
                <span>Beauty Wholesale</span>
                <b>{currencySymbol} 300</b>
              </div>

              <div className="balance-row">
                <span>Packaging Supplier</span>
                <b>{currencySymbol} 200</b>
              </div>

              <button
                className="view-button full-width-button"
                onClick={() => setActiveNav("Suppliers")}
              >
                View suppliers →
              </button>
            </section>
          </div>

          {/* ATTENTION */}

          <section className="dashboard-card attention-card">
            <div>
              <span className="attention-icon">!</span>

              <div>
                <p className="eyebrow">
                  NEEDS YOUR ATTENTION
                </p>

                <h2>
                  3 transactions need review
                </h2>

                <p>
                  Check your outstanding items before your next
                  reconciliation.
                </p>
              </div>
            </div>

            <button
              className="view-button"
              onClick={() => setActiveNav("Reports")}
            >
              Review items →
            </button>
          </section>
        </div>
      </section>

      {/* SALE MODAL */}

      {showSaleModal && (
        <div
          className="dashboard-modal-overlay"
          onClick={() => setShowSaleModal(false)}
        >
          <div
            className="dashboard-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setShowSaleModal(false)}
            >
              ×
            </button>

            <p className="eyebrow">QUICK SALE</p>

            <h2>Record a sale</h2>

            <p>
              The full sale workflow will be connected here next.
              For now, this demonstrates the dashboard interaction.
            </p>

            <div className="modal-preview">
              <span>Payment account</span>
              <strong>Cash</strong>
            </div>

            <div className="modal-preview">
              <span>Amount</span>
              <strong>{currencySymbol} 500</strong>
            </div>

            <button
              className="primary-button modal-action"
              onClick={addSale}
            >
              Save sale
              <span>→</span>
            </button>
          </div>
        </div>
      )}

      {/* EXPENSE MODAL */}

      {showExpenseModal && (
        <div
          className="dashboard-modal-overlay"
          onClick={() => setShowExpenseModal(false)}
        >
          <div
            className="dashboard-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setShowExpenseModal(false)}
            >
              ×
            </button>

            <p className="eyebrow">QUICK EXPENSE</p>

            <h2>Add an expense</h2>

            <p>
              The full expense workflow will be connected here
              next. For now, this demonstrates the dashboard
              interaction.
            </p>

            <div className="modal-preview">
              <span>Category</span>
              <strong>Business expense</strong>
            </div>

            <div className="modal-preview">
              <span>Amount</span>
              <strong>{currencySymbol} 250</strong>
            </div>

            <button
              className="primary-button modal-action"
              onClick={addExpense}
            >
              Save expense
              <span>→</span>
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default Dashboard;