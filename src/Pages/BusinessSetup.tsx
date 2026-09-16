import React, { FormEvent, useState } from "react";

type BusinessData = {
  businessName: string;
  category: string;
  ownerName: string;
  location: string;
  startDate: string;
  taxStatus: string;
  currency: string;
  openingCash: string;
  openingBank: string;
  openingMobileMoney: string;
};

type BusinessSetupProps = {
  onComplete: (data: BusinessData) => void;
};

export default function BusinessSetup({
  onComplete,
}: BusinessSetupProps) {
  const [form, setForm] = useState<BusinessData>({
    businessName: "",
    category: "",
    ownerName: "",
    location: "",
    startDate: "",
    taxStatus: "Not VAT registered",
    currency: "LSL",
    openingCash: "",
    openingBank: "",
    openingMobileMoney: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (
    field: keyof BusinessData,
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: "",
    }));
  };

  const validate = () => {
    const next: Record<string, string> = {};

    if (!form.businessName.trim()) {
      next.businessName = "Please enter your business name.";
    }

    if (!form.category) {
      next.category = "Please select your business type.";
    }

    if (!form.ownerName.trim()) {
      next.ownerName = "Please enter the owner's name.";
    }

    if (!form.location.trim()) {
      next.location = "Please enter your business location.";
    }

    if (!form.startDate) {
      next.startDate = "Please select when the business started.";
    }

    if (!form.currency) {
      next.currency = "Please select a currency.";
    }

    return next;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onComplete(form);
  };

  return (
    <main className="business-setup-page">
      <div className="business-setup-background business-bg-one" />
      <div className="business-setup-background business-bg-two" />

      <section className="business-setup-card">
        <div className="business-setup-brand">
          <div className="business-brand-mark">♡</div>

          <div>
            <strong>BUKA</strong>
            <span>small business, made simple</span>
          </div>
        </div>

        <div className="business-progress">
          <div className="progress-line">
            <span />
          </div>

          <p>BUSINESS SETUP · STEP 1 OF 1</p>
        </div>

        <div className="business-heading">
          <p className="business-eyebrow">
            LET'S SET UP YOUR BUSINESS
          </p>

          <h1>Tell us about your business.</h1>

          <p>
            We'll use these details to personalise your Buka
            workspace and keep your business records organised.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="setup-section">
            <div className="setup-section-heading">
              <span>01</span>

              <div>
                <h2>Business details</h2>
                <p>The basics about your business.</p>
              </div>
            </div>

            <div className="setup-grid">
              <label className="full-field">
                <span>Business name</span>

                <input
                  type="text"
                  placeholder="e.g. Edith's Fashion Boutique"
                  value={form.businessName}
                  onChange={(e) =>
                    update("businessName", e.target.value)
                  }
                  className={
                    errors.businessName ? "input-error" : ""
                  }
                />

                {errors.businessName && (
                  <small>{errors.businessName}</small>
                )}
              </label>

              <label>
                <span>Business type / sector</span>

                <select
                  value={form.category}
                  onChange={(e) =>
                    update("category", e.target.value)
                  }
                  className={
                    errors.category ? "input-error" : ""
                  }
                >
                  <option value="">
                    Select your business type
                  </option>
                  <option value="Retail">
                    Retail
                  </option>
                  <option value="Food & Restaurant">
                    Food & Restaurant
                  </option>
                  <option value="Fashion">
                    Fashion & Clothing
                  </option>
                  <option value="Beauty">
                    Beauty & Personal Care
                  </option>
                  <option value="Professional Services">
                    Professional Services
                  </option>
                  <option value="Construction">
                    Construction
                  </option>
                  <option value="Agriculture">
                    Agriculture
                  </option>
                  <option value="Transport">
                    Transport
                  </option>
                  <option value="Other">
                    Other
                  </option>
                </select>

                {errors.category && (
                  <small>{errors.category}</small>
                )}
              </label>

              <label>
                <span>Business location</span>

                <input
                  type="text"
                  placeholder="e.g. Maseru"
                  value={form.location}
                  onChange={(e) =>
                    update("location", e.target.value)
                  }
                  className={
                    errors.location ? "input-error" : ""
                  }
                />

                {errors.location && (
                  <small>{errors.location}</small>
                )}
              </label>

              <label>
                <span>Business owner</span>

                <input
                  type="text"
                  placeholder="e.g. Edith Matsau"
                  value={form.ownerName}
                  onChange={(e) =>
                    update("ownerName", e.target.value)
                  }
                  className={
                    errors.ownerName ? "input-error" : ""
                  }
                />

                {errors.ownerName && (
                  <small>{errors.ownerName}</small>
                )}
              </label>

              <label>
                <span>Business start date</span>

                <input
                  type="date"
                  value={form.startDate}
                  onChange={(e) =>
                    update("startDate", e.target.value)
                  }
                  className={
                    errors.startDate ? "input-error" : ""
                  }
                />

                {errors.startDate && (
                  <small>{errors.startDate}</small>
                )}
              </label>
            </div>
          </div>

          <div className="setup-section">
            <div className="setup-section-heading">
              <span>02</span>

              <div>
                <h2>Tax & currency</h2>
                <p>Choose how your business records money.</p>
              </div>
            </div>

            <div className="setup-grid">
              <label>
                <span>Tax / VAT status</span>

                <select
                  value={form.taxStatus}
                  onChange={(e) =>
                    update("taxStatus", e.target.value)
                  }
                >
                  <option value="Not VAT registered">
                    Not VAT registered
                  </option>
                  <option value="VAT registered">
                    VAT registered
                  </option>
                  <option value="Tax registered">
                    Tax registered
                  </option>
                  <option value="Not sure">
                    I'm not sure
                  </option>
                </select>
              </label>

              <label>
                <span>Preferred currency</span>

                <select
                  value={form.currency}
                  onChange={(e) =>
                    update("currency", e.target.value)
                  }
                >
                  <option value="LSL">
                    LSL — Lesotho Loti
                  </option>
                  <option value="ZAR">
                    ZAR — South African Rand
                  </option>
                </select>
              </label>
            </div>

            <div className="setup-info">
              <span>i</span>

              <p>
                Buka is designed for Lesotho businesses. You can
                primarily work in LSL while keeping ZAR support
                available where needed.
              </p>
            </div>
          </div>

          <div className="setup-section">
            <div className="setup-section-heading">
              <span>03</span>

              <div>
                <h2>Opening balances</h2>
                <p>
                  Optional — you can add these later if you're
                  starting fresh.
                </p>
              </div>
            </div>

            <div className="setup-grid">
              <label>
                <span>Cash balance</span>

                <div className="money-input">
                  <span>{form.currency}</span>

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={form.openingCash}
                    onChange={(e) =>
                      update("openingCash", e.target.value)
                    }
                  />
                </div>
              </label>

              <label>
                <span>Bank balance</span>

                <div className="money-input">
                  <span>{form.currency}</span>

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={form.openingBank}
                    onChange={(e) =>
                      update("openingBank", e.target.value)
                    }
                  />
                </div>
              </label>

              <label className="full-field">
                <span>Mobile money balance</span>

                <div className="money-input">
                  <span>{form.currency}</span>

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={form.openingMobileMoney}
                    onChange={(e) =>
                      update(
                        "openingMobileMoney",
                        e.target.value
                      )
                    }
                  />
                </div>
              </label>
            </div>
          </div>

          <div className="setup-footer">
            <p>
              🔒 Your business information is only visible to
              authorised users of your business.
            </p>

            <button
              type="submit"
              className="primary-button setup-submit"
            >
              Create my Buka workspace
              <span>→</span>
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}