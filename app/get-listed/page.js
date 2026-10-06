"use client";

import { useState } from "react";

export default function GetListedPage() {
  const [requestType, setRequestType] = useState("claim");

  const [featuredBusinessName, setFeaturedBusinessName] = useState("");
  const [featuredStatus, setFeaturedStatus] = useState("idle");
  const [featuredMessage, setFeaturedMessage] = useState("");

  const [formData, setFormData] = useState({
    business_name: "",
    contact_name: "",
    contact_email: "",
    contact_phone: "",
    website: "",
    category: "",
    service_area: "",
    message: "",
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

  async function handleFeaturedCheckout() {
    if (!featuredBusinessName.trim()) {
      setFeaturedStatus("error");
      setFeaturedMessage("Please enter your business name.");
      return;
    }

    setFeaturedStatus("loading");
    setFeaturedMessage("");

    try {
      const response = await fetch("/api/create-featured-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          businessName: featuredBusinessName,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setFeaturedStatus("error");
        setFeaturedMessage(
          result.error || "Unable to start checkout."
        );
        return;
      }

      window.location.href = result.url;
    } catch {
      setFeaturedStatus("error");
      setFeaturedMessage(
        "Something went wrong. Please try again."
      );
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/contractor-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          request_type: requestType,
          ...formData,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setStatus("error");
        setMessage(
          result.error || "Unable to submit your request."
        );
        return;
      }

      setStatus("success");

      setMessage(
        requestType === "claim"
          ? "Your claim request has been submitted. We'll review and verify your connection to the business. Once approved, your listing can be upgraded to Featured."
          : "Your business listing request has been submitted for review."
      );

      setFormData({
        business_name: "",
        contact_name: "",
        contact_email: "",
        contact_phone: "",
        website: "",
        category: "",
        service_area: "",
        message: "",
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
          <a href="/#services">Find a Pro</a>
          <a href="/get-listed">For Contractors</a>
        </nav>
      </header>

      <section className="quotePage">
        <div className="quoteFormCard">
          <div className="eyebrow">
            FOR BILLINGS HOME-SERVICE PROFESSIONALS
          </div>

          <h1>Reach More Billings-Area Homeowners</h1>

          <p className="quoteBusiness">
            Billings Home Pros helps local homeowners find trusted
            professionals for the work they need. Claim your existing
            listing or add your business to make sure customers can find
            accurate information about your services.
          </p>

          <div className="contractorBenefits">
            <span>✓ Local Billings-area visibility</span>
            <span>✓ Showcase your services</span>
            <span>✓ Receive quote requests</span>
          </div>

          <div className="listingTrustNote">
            <strong>Claiming or adding a business is free.</strong>
            <span>
              We review submissions to help keep Billings Home Pros accurate
              and useful for local homeowners.
            </span>
          </div>

          <p className="requestChoiceHelp">
            Choose the option that fits your business:
          </p>

          <div className="contractorRequestChoices">
            <button
              type="button"
              className={
                requestType === "claim"
                  ? "requestChoice activeRequestChoice"
                  : "requestChoice"
              }
              onClick={() => setRequestType("claim")}
            >
              Claim an Existing Business
            </button>

            <button
              type="button"
              className={
                requestType === "new_listing"
                  ? "requestChoice activeRequestChoice"
                  : "requestChoice"
              }
              onClick={() => setRequestType("new_listing")}
            >
              Add My Business
            </button>
          </div>

          <form onSubmit={handleSubmit} className="quoteForm">
            <label>
              Business Name *
              <input
                type="text"
                name="business_name"
                value={formData.business_name}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Your Name *
              <input
                type="text"
                name="contact_name"
                value={formData.contact_name}
                onChange={handleChange}
                required
              />
            </label>

            <div className="quoteFormRow">
              <label>
                Email *
                <input
                  type="email"
                  name="contact_email"
                  value={formData.contact_email}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Phone
                <input
                  type="tel"
                  name="contact_phone"
                  value={formData.contact_phone}
                  onChange={handleChange}
                />
              </label>
            </div>

            <label>
              Business Website
              <input
                type="url"
                name="website"
                placeholder="https://"
                value={formData.website}
                onChange={handleChange}
              />
            </label>

            <label>
              Primary Service
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select a service</option>
                <option value="plumbing">Plumbing</option>
                <option value="hvac">Heating & Cooling</option>
                <option value="electrical">Electrical</option>
                <option value="roofing">Roofing</option>
                <option value="contractors-remodeling">
                  Contractors & Remodeling
                </option>
                <option value="other">Other</option>
              </select>
            </label>

            <label>
              Service Area
              <input
                type="text"
                name="service_area"
                placeholder="Example: Billings, Laurel and surrounding areas"
                value={formData.service_area}
                onChange={handleChange}
              />
            </label>

            <label>
              {requestType === "claim"
                ? "Anything we should know about your claim?"
                : "Tell us about your business and services"}

              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
              />
            </label>

            <button
              type="submit"
              className="quoteSubmitButton"
              disabled={status === "submitting"}
            >
              {status === "submitting"
                ? "Sending..."
                : requestType === "claim"
                ? "Submit Claim Request"
                : "Submit Listing Request"}
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

          <div className="featuredUpgrade">
            <div className="eyebrow">
              STAND OUT TO LOCAL HOMEOWNERS
            </div>

            <h2>Upgrade to a Featured Listing</h2>

            <p>
              Put your business above standard listings and make it easier
              for Billings-area homeowners to find you. Your business must
              already be listed on Billings Home Pros before upgrading.
            </p>

                <div className="featuredBenefits">
  <span>✓ Priority placement above standard listings</span>
  <span>✓ Featured badge that stands out to homeowners</span>
  <span>✓ Receive homeowner quote requests</span>
</div>
            <div className="featuredPrice">
              <strong>$29.99</strong>
              <span>/ month</span>
            </div>

            <input
              type="text"
              className="featuredBusinessInput"
              placeholder="Enter your business name"
              value={featuredBusinessName}
              onChange={(event) =>
                setFeaturedBusinessName(event.target.value)
              }
            />

            <button
              type="button"
              className="featuredUpgradeButton"
              onClick={handleFeaturedCheckout}
              disabled={featuredStatus === "loading"}
            >
              {featuredStatus === "loading"
                ? "Opening Checkout..."
                : "Upgrade to Featured"}
            </button>

            {featuredMessage && (
              <p className="featuredMessage">
                {featuredMessage}
              </p>
            )}

            <small>Cancel anytime.</small>
          </div>
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
