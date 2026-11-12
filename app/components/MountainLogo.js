// Shared approved mountain artwork; remove its black matte at render time.
export default function MountainLogo({ className, dark = false }) {
  const id = dark ? "mountain-logo-header" : "mountain-logo-hero";
  return (
    <svg className={className} viewBox="150 15 1370 840" role="img" aria-label="Billings Home Pros">
      <defs>
        <filter id={id} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  1 1 1 0 -0.12" />
          {dark && <feColorMatrix type="matrix" values="0.04 0 0 0 0  -0.88 1 0 0 0  -0.8 0 1 0 0  0 0 0 1 0" />}
        </filter>
      </defs>
      <image href="/bhp-mountain-logo-master.png" width="1606" height="979" filter={`url(#${id})`} />
    </svg>
  );
}
