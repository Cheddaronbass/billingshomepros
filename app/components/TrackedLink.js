
"use client";

export default function TrackedLink({
  href,
  className,
  eventName,
  businessId,
  businessName,
  category,
  target,
  rel,
  children,
}) {
  function handleClick() {
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, {
        business_id: String(businessId),
        business_name: businessName,
        business_category: category,
      });
    }
  }

  return (
    <a
      href={href}
      className={className}
      target={target}
      rel={rel}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
