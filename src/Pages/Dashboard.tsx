import React from "react";

type DashboardProps = {
  businessName: string;
  category: string;
  currency: string;
};

function Dashboard({
  businessName,
  category,
  currency,
}: DashboardProps) {
  const currencySymbol = currency === "ZAR" ? "R" : "M";

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
          <button className="nav-item active">
            <span>⌂</span>
            Dashboard
          </button>

          <button className="nav-item">
            <span>↗</span>
            Sales
          </button>

          <button className="nav-item">
            <span>−</span>
            Expenses
          </button>

          <button className="nav-item">
            <span>▦</span>
            Products
          </button>

          <button className="nav-item">
            <span>♧</span>
            Customers
          </button>

          <button className="nav-item">
            <span>▤</span>
            Reports
          </button>
        </nav>

        <div className="sidebar-bottom">
          <button className="nav-item">
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
            <p className="eyebrow">MONDAY, 14 SEPTEMBER 2026</p>

            <h1>
              Good afternoon, <em>{businessName.split(" ")[0]}</em> 👋
            </h1>

            <p>Here's how your business is doing today.</p>
          </div>

          <div className="header-actions">
            <button className="icon-button">⌕</button>
            <button className="icon-button">♧</button>

            <div className="profile-avatar">
              {businessName.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          <div className="quick-actions">
            <button className="quick-action primary">
              <span>＋</span>
              Record sale
            </button>

            <button className="quick-action">
              <span>＋</span>
              Add expense
            </button>

            <button className="quick-action">
              <span>＋</span>
              Add product
            </button>
          </div>

          <section className="stats-grid">
            <div className="stat-card">
              <div className="stat-top">
                <span>Today's sales</span>
                <span className="stat-icon">↗</span>
              </div>

              <strong>
                {currencySymbol} 4,850
              </strong>

              <small className="positive">↑ 12.5% from yesterday</small>
            </div>

            <div className="stat-card">
              <div className="stat-top">
                <span>Expenses</span>
                <span className="stat-icon">−</span>
              </div>

              <strong>
                {currencySymbol} 1,240
              </strong>

              <small>8 transactions today</small>
            </div>

            <div className="stat-card highlight">
              <div className="stat-top">
                <span>Estimated profit</span>
                <span className="stat-icon">✦</span>
              </div>

              <strong>
                {currencySymbol} 3,610
              </strong>

              <small className="positive">74% margin</small>
            </div>

            <div className="stat-card">
              <div className="stat-top">
                <span>Outstanding</span>
                <span className="stat-icon">◷</span>
              </div>

              <strong>
                {currencySymbol} 2,350
              </strong>

              <small>5 customers</small>
            </div>
          </section>

          <div className="dashboard-columns">
            <section className="dashboard-card sales-card">
              <div className="card-heading">
                <div>
                  <p className="eyebrow">THIS WEEK</p>
                  <h2>Sales overview</h2>
                </div>

                <button className="view-button">View report →</button>
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

                  <div className="today-bar" style={{ height: "96%" }}>
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

                <button className="view-button">See all →</button>
              </div>

              <div className="transaction-list">
                <div className="transaction">
                  <div className="transaction-icon">♡</div>

                  <div>
                    <strong>Thato M.</strong>
                    <span>2 × Summer Dress</span>
                  </div>

                  <b>+{currencySymbol} 1,200</b>
                </div>

                <div className="transaction">
                  <div className="transaction-icon">✦</div>

                  <div>
                    <strong>Mpho Café</strong>
                    <span>Wholesale order</span>
                  </div>

                  <b>+{currencySymbol} 850</b>
                </div>

                <div className="transaction">
                  <div className="transaction-icon">−</div>

                  <div>
                    <strong>Supplier payment</strong>
                    <span>Stock purchase</span>
                  </div>

                  <b className="expense">−{currencySymbol} 430</b>
                </div>

                <div className="transaction">
                  <div className="transaction-icon">♡</div>

                  <div>
                    <strong>Lerato K.</strong>
                    <span>Beauty products</span>
                  </div>

                  <b>+{currencySymbol} 650</b>
                </div>
              </div>
            </section>
          </div>

          <section className="dashboard-card attention-card">
            <div>
              <span className="attention-icon">!</span>

              <div>
                <p className="eyebrow">NEEDS YOUR ATTENTION</p>
                <h2>3 products are running low</h2>
                <p>
                  Restock your best sellers before you run out.
                </p>
              </div>
            </div>

            <button className="view-button">View products →</button>
          </section>
        </div>
      </section>
    </main>
  );
}
export default Dashboard;