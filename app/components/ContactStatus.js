export default function ContactStatus({ business, card = false }) {
  const established = business.contact_status === "contact_verified" && Boolean(business.contact_verified_at);
  const explanation = business.lead_email_verified
    ? "Contact verified: we received a direct business email response. This does not verify licensing, insurance, quality, or availability."
    : "Contact established: this business contacted Billings Home Pros directly. Email ownership and business claim may still be pending.";
  if (card) {
    if (established) return <span className="bhpContactBadge" title={explanation} aria-label={explanation}><span aria-hidden="true">✓</span> {business.lead_email_verified ? "BHP Contact Verified" : "Contact Established"}</span>;
    if (business.claimed) return null;
    return <div className="bhpClaimPrompt"><span>Own this business?</span><a href={`/get-listed?businessName=${encodeURIComponent(business.name)}`}>Claim your listing →</a></div>;
  }
  if (!established) return null;
  return <span title={explanation} role="img" aria-label={explanation} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#9199a3", fontSize: 18, fontWeight: 700, lineHeight: 1, marginLeft: 6, verticalAlign: "middle" }}>✓</span>;
}
