"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function QuotePage() {
  const searchParams = useSearchParams();

  const businessId = searchParams.get("businessId");
  const businessName = searchParams.get("businessName") || "a local contractor";

  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    project_type: "",
    project_details: "",
  });

  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/quote-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          business_id: businessId ? Number(businessId) : null,
          business_name: businessName,
          ...formData,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setStatus("error");
        setMessage(result.error || "Unable to submit your request.");
        return;
      }

      setStatus("success");
      setMessage(
        "Your quote request has been submitted successfully."
      );

      setFormData({
        customer_name: "",
        customer_email: "",
        customer_phone: "",
        project_type: "",
        project_details: "",
      });
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <main>
      <header className="siteHeader">
        <a className="textBrand" href="/">
          <span className="brandMain">Billings Home Pros</span>
          <span className="brandSub">
            LOCAL HOME SERVICES • BILLINGS, MT
          </span>
        </a>

        <nav>
          <a href="/">Home</a>
          <a href="/#services">Services</a>
          <a href="/#pros">For Contractors</a>
        </nav>
      </header>

      <section className="quotePage">
        <div className="quoteFormCard">
          <div className="eyebrow">REQUEST A QUOTE</div>

          <h1>Tell us about your project</h1>

          <p className="quoteBusiness">
            Requesting a quote from <strong>{businessName}</strong>
          </p>

          <form onSubmit={handleSubmit} className="quoteForm">
            <label>
              Your Name *
              <input
                type="text"
                name="customer_name"
                value={formData.customer_name}
                onChange={handleChange}
                required
              />
            </label>

            <div className="quoteFormRow">
              <label>
                Email
                <input
                  type="email"
                  name="customer_email"
                  value={formData.customer_email}
                  onChange={handleChange}
                />
              </label>

              <label>
                Phone
                <input
                  type="tel"
                  name="customer_phone"
                  value={formData.customer_phone}
                  onChange={handleChange}
                />
              </label>
            </div>

            <p className="contactHint">
              Please provide at least an email address or phone number.
            </p>

            <label>
              Project Type
              <input
                type="text"
                name="project_type"
                placeholder="Example: Water heater replacement"
                value={formData.project_type}
                onChange={handleChange}
              />
            </label>

            <label>
              Tell us about the project *
              <textarea
                name="project_details"
                rows="6"
                placeholder="Describe what you need help with..."
                value={formData.project_details}
                onChange={handleChange}
                required
              />
            </label>

            <button
              type="submit"
              className="quoteSubmitButton"
              disabled={status === "submitting"}
            >
              {status === "submitting"
                ? "Sending..."
                : "Send Quote Request"}
            </button>

            {message && (
              <div
                className={
                  status === "success"
                    ? "quoteMessage success"
                    : "quoteMessage error"
                }
              >
                {message}
              </div>
            )}
          </form>
        </div>
      </section>

      <footer>
        <strong>Billings Home Pros</strong>
        <p>
          Connecting Billings-area homeowners with local home-service
          professionals.
        </p>
        <small>© 2026 BillingsHomePros.com</small>
      </footer>
    </main>
  );
}
