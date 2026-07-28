import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Explicit (this is already Next.js's default) so page URLs never gain a
  // trailing slash — e.g. /properties, not /properties/. Made explicit here
  // per a theory that NTREIS Matrix's "Referring Page" domain check could be
  // sensitive to a trailing-slash mismatch on the referring URL.
  trailingSlash: false,
};

export default nextConfig;
