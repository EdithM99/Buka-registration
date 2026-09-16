import React, { FormEvent, useMemo, useState } from "react";

export type SaleData = {
  id: number;
  customer: string;
  item: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  taxRate: number;
  paymentMethod: string;
  amount: number;
  notes: string;
  date: string;
};

type AddSaleProps = {
  currency: string;
  onBack: () => void;
  onSave: (sale: SaleData) => void;
};

const paymentMethods = [
  { id: "Cash", label: "Cash", icon: "💵" },
  { id: "M-Pesa", label: "M-Pesa", icon: "📱" },
  { id: "EcoCash", label: "EcoCash", icon: "📲" },
  { id: "Bank", label: "Bank", icon: "🏦" },
  { id: "Card", label: "Card", icon: "💳" },
  { id: "Credit", label: "Pay later", icon: "🧾" },
];

const AddSale: React.FC<AddSaleProps> = ({
  currency,
  onBack,
  onSave,
}) => {
  const currencySymbol = currency === "ZAR" ? "R" : "M";

  const [customer, setCustomer] = useState("");
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [unitPrice, setUnitPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [taxEnabled, setTaxEnabled] = useState(false);
  const [taxRate, setTaxRate] = useState("15");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const subtotal = useMemo(() => {
    const qty = Number(quantity) || 0;
    const price = Number(unitPrice) || 0;

    return qty * price;
  }, [quantity, unitPrice]);

  const discountAmount = useMemo(() => {
    const value = Number(discount) || 0;

    return Math.min(Math.max(value, 0), subtotal);
  }, [discount, subtotal]);

  const amountBeforeTax = subtotal - discountAmount;

  const taxAmount = useMemo(() => {
    if (!taxEnabled) return 0;

    return amountBeforeTax * ((Number(taxRate) || 0) / 100);
  }, [taxEnabled, taxRate, amountBeforeTax]);

  const total = amountBeforeTax + taxAmount;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setError("");

    if (!item.trim()) {
      setError("Please enter the item or service.");
      return;
    }

    if (!unitPrice || Number(unitPrice) <= 0) {
      setError("Please enter a valid unit price.");
      return;
    }

    if (!quantity || Number(quantity) <= 0) {
      setError("Please enter a valid quantity.");
      return;
    }

    if (paymentMethod === "Credit" && !customer.trim()) {
      setError("A customer is required when the sale is on credit.");
      return;
    }

    if (total <= 0) {
      setError("The sale total must be greater than zero.");
      return;
    }

    const sale: SaleData = {
      id: Date.now(),
      customer: customer.trim() || "Walk-in customer",
      item: item.trim(),
      quantity: Number(quantity),
      unitPrice: Number(unitPrice),
      discount: discountAmount,
      taxRate: taxEnabled ? Number(taxRate) || 0 : 0,
      paymentMethod,
      amount: total,
      notes: notes.trim(),
      date: new Date().toISOString(),
    };

    onSave(sale);
  };

  return (
    <main className="page-shell sales-page">
      <div className="decor decor-one" />
      <div className="decor decor-two" />

      <section className="sales-container">
        <button className="back-button" type="button" onClick={onBack}>
          ← Back to dashboard
        </button>

        <div className="sales-header">
          <div>
            <span className="eyebrow">SALES</span>
            <h1>Record a sale</h1>
            <p>
              Capture a sale quickly and keep your business records up to date.
            </p>
          </div>

          <div className="sales-heart">♡</div>
        </div>

        <form className="sale-form" onSubmit={handleSubmit}>
          <section className="form-card">
            <div className="section-heading">
              <div>
                <h2>What did you sell?</h2>
                <p>Add the item or service and its price.</p>
              </div>
            </div>

            <div className="form-grid">
              <label className="field field-full">
                <span>Item or service</span>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => setItem(e.target.value)}
                  placeholder="e.g. Hair styling"
                />
              </label>

              <label className="field">
                <span>Quantity</span>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </label>

              <label className="field">
                <span>Unit price</span>
                <div className="money-input">
                  <span>{currencySymbol}</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={unitPrice}
                    onChange={(e) => setUnitPrice(e.target.value)}
                    placeholder="0.00"
                  />
                </div>
              </label>

              <label className="field">
                <span>Discount</span>
                <div className="money-input">
                  <span>{currencySymbol}</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    placeholder="0.00"
                  />
                </div>
              </label>

              <label className="field">
                <span>Customer</span>
                <input
                  type="text"
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  placeholder="Customer name (optional)"
                />
              </label>
            </div>
          </section>

          <section className="form-card">
            <div className="section-heading">
              <div>
                <h2>How was it paid?</h2>
                <p>Choose the payment method used for this sale.</p>
              </div>
            </div>

            <div className="payment-grid">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  type="button"
                  className={`payment-option ${
                    paymentMethod === method.id ? "selected" : ""
                  }`}
                  onClick={() => setPaymentMethod(method.id)}
                >
                  <span className="payment-icon">{method.icon}</span>
                  <span>{method.label}</span>

                  {paymentMethod === method.id && (
                    <span className="payment-check">✓</span>
                  )}
                </button>
              ))}
            </div>
          </section>

          <section className="form-card">
            <div className="section-heading">
              <div>
                <h2>Tax</h2>
                <p>Apply tax if this sale is taxable.</p>
              </div>

              <label className="toggle">
                <input
                  type="checkbox"
                  checked={taxEnabled}
                  onChange={(e) => setTaxEnabled(e.target.checked)}
                />
                <span className="toggle-slider" />
              </label>
            </div>

            {taxEnabled && (
              <div className="tax-row">
                <label className="field tax-field">
                  <span>Tax rate</span>
                  <div className="percent-input">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={taxRate}
                      onChange={(e) => setTaxRate(e.target.value)}
                    />
                    <span>%</span>
                  </div>
                </label>
              </div>
            )}
          </section>

          <section className="form-card">
            <div className="section-heading">
              <div>
                <h2>Notes</h2>
                <p>Add anything you may want to remember about this sale.</p>
              </div>
            </div>

            <textarea
              className="notes-input"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Optional note..."
              rows={4}
            />
          </section>

          <section className="sale-summary-card">
            <div className="summary-title">
              <span>Sale summary</span>
              <span className="summary-method">{paymentMethod}</span>
            </div>

            <div className="summary-line">
              <span>Subtotal</span>
              <strong>
                {currencySymbol}
                {subtotal.toFixed(2)}
              </strong>
            </div>

            <div className="summary-line">
              <span>Discount</span>
              <strong>
                -{currencySymbol}
                {discountAmount.toFixed(2)}
              </strong>
            </div>

            {taxEnabled && (
              <div className="summary-line">
                <span>Tax ({taxRate}%)</span>
                <strong>
                  {currencySymbol}
                  {taxAmount.toFixed(2)}
                </strong>
              </div>
            )}

            <div className="summary-total">
              <span>Total</span>
              <strong>
                {currencySymbol}
                {total.toFixed(2)}
              </strong>
            </div>
          </section>

          {error && <div className="form-error">{error}</div>}

          <div className="sale-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={onBack}
            >
              Cancel
            </button>

            <button type="submit" className="primary-button">
              Save sale
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default AddSale;