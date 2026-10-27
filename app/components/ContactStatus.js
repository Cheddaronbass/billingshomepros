export default function ContactStatus({ business }) {
  const established = business.contact_status === "contact_verified" && Boolean(business.contact_verified_at);
  const issue = business.contact_status === "contact_issue";
  // Do not label ordinary unverified directory entries negatively.
  if (!established && !issue) return null;
  const confirmedEmail = established && business.lead_email_verified;
  const label = issue ? "Contact details under review" : confirmedEmail ? "Contact verified" : "Contact established";
  const explanation = issue
    ? "We are reviewing contact details."
    : confirmedEmail
      ? "We received a direct business email response. This does not verify licensing, quality, or availability."
      : "The business contacted Billings Home Pros directly. Email ownership and business claim may still be pending.";
  return (
    <span title={explanation} style={{display:"inline-flex",alignItems:"center",gap:6,marginTop:8,padding:"5px 10px",borderRadius:20,border:"1px solid "+(established?"#188eac":"#77777755"),color:established?"#11a8cc":"inherit",fontSize:12,fontWeight:600}}>
      {established ? "✓" : "○"} {label}
    </span>
  );
}
