import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, Clock } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="space-y-8 md:w-1/2 lg:w-1/3">
          <Link
            href="/"
            className="text-xl font-bold bg-gradient-to-r from-hyber-orange to-hyber-red bg-clip-text text-transparent"
          >
            HyberHost
          </Link>
          <p className="text-sm text-muted-foreground mt-4">
            Premium web hosting solutions for businesses of all sizes. Reliable VPS and dedicated servers with 99.9%
            uptime guarantee.
          </p>
          <div className="flex space-x-6">
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <span className="sr-only">Facebook</span>
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <span className="sr-only">Twitter</span>
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <span className="sr-only">Instagram</span>
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>
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
              <li>
                <Link href="/services/cloud" className="text-sm text-muted-foreground hover:text-foreground">
                  Cloud Hosting
                </Link>
              </li>
              <li>
                <Link href="/services/domains" className="text-sm text-muted-foreground hover:text-foreground">
                  Domain Names
                </Link>
              </li>
              <li>
                <Link href="/services/ssl" className="text-sm text-muted-foreground hover:text-foreground">
                  SSL Certificates
                </Link>
              </li>
              <li>
                <Link href="/services/managed" className="text-sm text-muted-foreground hover:text-foreground">
                  Managed Services
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
              <li>
                <Link
                  href="https://clientarea.hyberhost.com/submitticket.php"
                  className="text-sm text-muted-foreground hover:text-foreground"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Submit Ticket
                </Link>
              </li>
              <li>
                <Link href="/network/status" className="text-sm text-muted-foreground hover:text-foreground">
                  System Status
                </Link>
              </li>
              <li>
                <Link href="/support#faq" className="text-sm text-muted-foreground hover:text-foreground">
                  FAQ
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
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/network" className="text-sm text-muted-foreground hover:text-foreground">
                  Network
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold leading-6">Contact</h3>
            <ul role="list" className="mt-6 space-y-4">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">support@hyberhost.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">+44 20 8050 1842</span>
              </li>
              <li className="flex items-start gap-2">
                <a
                  href="/network/status"
                  className="text-sm text-muted-foreground hover:text-foreground flex items-center"
                >
                  <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                  System Status
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl border-t border-gray-200 px-6 py-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} HyberHost, Inc. All rights reserved.
          <br />
          VAT Registration No. GB 444 8609 70
        </div>
        <div className="mt-4 flex space-x-6 md:mt-0">
          <Link href="/legal/terms-and-conditions" className="text-xs text-muted-foreground hover:text-foreground">
            Terms of Service
          </Link>
          <Link href="/legal/privacy-policy" className="text-xs text-muted-foreground hover:text-foreground">
            Privacy Policy
          </Link>
          <Link href="/legal/acceptable-use-policy" className="text-xs text-muted-foreground hover:text-foreground">
            Acceptable Use Policy
          </Link>
          <Link href="/abuse" className="text-xs text-muted-foreground hover:text-foreground">
            Report Abuse
          </Link>
        </div>
      </div>
    </footer>
  )
}
