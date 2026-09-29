export const metadata = {
  title: "Billings Home Pros",
  description:
    "Find trusted home-service professionals in Billings and the surrounding Yellowstone County area.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
