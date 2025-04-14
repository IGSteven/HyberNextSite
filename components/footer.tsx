import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="space-y-8 md:w-1/2 lg:w-1/3">
          <Link href="/" className="text-xl font-bold">
            HyberHost
          </Link>
          <p className="text-sm text-muted-foreground mt-4">
            Premium web hosting solutions for businesses of all sizes. Reliable VPS and dedicated servers with 99.9%
            uptime guarantee.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-8 md:mt-0 md:w-1/2 lg:w-2/3 lg:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold leading-6">Products</h3>
            <ul role="list" className="mt-6 space-y-4">
              <li>
                <Link href="/services/vps" className="text-sm text-muted-foreground hover:text-foreground">
                  VPS Hosting
                </Link>
              </li>
              <li>
                <Link href="/services/dedicated" className="text-sm text-muted-foreground hover:text-foreground">
                  Dedicated Servers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold leading-6">Support</h3>
            <ul role="list" className="mt-6 space-y-4">
              <li>
                <Link href="/support" className="text-sm text-muted-foreground hover:text-foreground">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold leading-6">Company</h3>
            <ul role="list" className="mt-6 space-y-4">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold leading-6">Legal</h3>
            <ul role="list" className="mt-6 space-y-4">
              <li>
                <Link href="/legal/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/terms-and-conditions"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl border-t border-gray-200 px-6 py-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} HyberHost, Inc. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
