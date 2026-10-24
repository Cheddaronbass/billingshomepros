import { withPageSocial } from "../lib/seoMetadata";

export const metadata = withPageSocial({
  title: "Get Listed or Claim Your Business in Billings, MT",
  description: "Submit or claim your Billings-area home-service business listing on Billings Home Pros.",
  alternates: { canonical: "/get-listed" },
});

export default function GetListedLayout({ children }) {
  return children;
}
