"use client";

import { useState } from "react";

export default function GooglePlacesAdminPage() {
  const [adminKey, setAdminKey] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("landscaping");
  const [batchOffset, setBatchOffset] = useState(0);
  const [batchResult, setBatchResult] = useState(null);
  const [batchLoading, setBatchLoading] = useState(false);

  async function search(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const response = await fetch("/api/admin/google-place-candidates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminKey}`,
        },
        body: JSON.stringify({ name: name.trim(), phone: phone.trim() }),
        cache: "no-store",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(response.status === 401 ? "Incorrect admin key." : data.error || "Lookup failed.");
      setResult(data);
    } catch (err) {
      setError(err.message || "Lookup failed.");
    } finally {
      setLoading(false);
    }
  }

  async function searchBatch(offset = 0) {
    setBatchLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/google-place-batch", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${adminKey}` },
        body: JSON.stringify({ category, offset }),
        cache: "no-store",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(response.status === 401 ? "Incorrect admin key." : data.error || "Batch lookup failed.");
      setBatchOffset(offset);
      setBatchResult(data);
    } catch (err) { setError(err.message || "Batch lookup failed."); }
    finally { setBatchLoading(false); }
  }

  return (
    <main style={{ maxWidth: 780, margin: "40px auto", padding: "0 20px", color: "#152f3d" }}>
      <h1>Google Places Matching</h1>
      <p>Administrator lookup only. Searches do not change contractor listings.</p>
      <form onSubmit={search} style={{ display: "grid", gap: 16, maxWidth: 520 }}>
        <label>Admin key
          <input aria-label="Admin key" type="password" autoComplete="off" required value={adminKey} onChange={(e) => setAdminKey(e.target.value)} style={inputStyle} />
        </label>
        <label>Contractor name
          <input required maxLength={150} value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} placeholder="Billings Landscaping, LLC" />
        </label>
        <label>Phone number
          <input required maxLength={40} type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} style={inputStyle} placeholder="406-697-7553" />
        </label>
        <button type="submit" disabled={loading} style={{ padding: 14, background: "#174d64", color: "white", border: 0, borderRadius: 6, cursor: "pointer" }}>
          {loading ? "Searching…" : "Search Google Places"}
        </button>
      </form>
      <section style={{ borderTop: "2px solid #b9c6ca", marginTop: 36, paddingTop: 20 }}>
        <h2>Batch matching (read-only)</h2>
        <p>Search five unmatched businesses at a time. Results are for review only; nothing is saved.</p>
        <label>Category
          <select value={category} onChange={(e) => { setCategory(e.target.value); setBatchOffset(0); setBatchResult(null); }} style={inputStyle}>
            {["landscaping","painting","fencing","handyman","concrete","electrical","plumbing","hvac","roofing","contractors-remodeling"].map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
        <button type="button" disabled={!adminKey || batchLoading} onClick={() => searchBatch(0)} style={{ marginTop: 12, padding: 12 }}>
          {batchLoading ? "Searching…" : "Search first five unmatched"}
        </button>
        {batchResult && (
          <div aria-live="polite">
            <h3>Batch results</h3>
            {batchResult.results.map((business) => (
              <article key={business.id} style={{ padding: 14, margin: "12px 0", border: "1px solid #b9c6ca", borderRadius: 6 }}>
                <strong>#{business.id} — {business.name}</strong> ({business.phone})
                {business.error && <p>{business.error}</p>}
                {!business.error && <p>{business.exactPhoneMatches?.length || 0} exact phone match(es)</p>}
                {(business.candidates || []).map((place) => (
                  <p key={place.placeId}>
                    {place.name} — {place.phone} — {place.address}<br />
                    Status: {place.businessStatus}; Phone: {place.phoneMatches ? "MATCH" : "different"}; Name: {place.nameMatches ? "MATCH" : "review"}<br />
                    Place ID: <code style={{ overflowWrap: "anywhere" }}>{place.placeId}</code>
                  </p>
                ))}
                {!business.error && !business.candidates?.length && <p>No candidates returned.</p>}
              </article>
            ))}
            {batchResult.hasMore && <button type="button" disabled={batchLoading} onClick={() => searchBatch(batchResult.nextOffset)}>Next five</button>}
          </div>
        )}
      </section>
      {error && <p role="alert" style={{ color: "#9d2323" }}>{error}</p>}
      {result && (
        <section aria-live="polite" style={{ marginTop: 30 }}>
          <h2>Results ({result.candidates?.length || 0})</h2>
          <p>{result.exactPhoneMatches?.length || 0} exact phone match(es). Review name, address and status before approving any match.</p>
          {!result.candidates?.length && <p>No candidates found. Do not assume the business is invalid.</p>}
          {result.candidates?.map((place) => (
            <article key={place.placeId} style={{ border: "1px solid #c7d1d6", borderRadius: 8, padding: 18, marginBottom: 12 }}>
              <h3 style={{ marginTop: 0 }}>{place.name}</h3>
              <p>{place.address}<br />{place.phone}<br />{place.businessStatus}</p>
              <p><strong>Phone:</strong> {place.phoneMatches ? "Exact match" : "Does not match"} · <strong>Name:</strong> {place.nameMatches ? "Exact match" : "Review"}</p>
              <p><strong>Google Place ID:</strong> <code style={{ overflowWrap: "anywhere" }}>{place.placeId}</code></p>
              {place.website && <p><a href={place.website} target="_blank" rel="noopener noreferrer">Business website ↗</a></p>}
              <small>Read-only preview. No changes saved.</small>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

const inputStyle = { display: "block", width: "100%", padding: 12, marginTop: 6, border: "1px solid #9eafb7", borderRadius: 6, boxSizing: "border-box" };
