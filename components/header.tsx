"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
  { name: "Support", href: "/support" },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="bg-background border-b">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="text-xl font-bold bg-gradient-to-r from-hyber-orange to-hyber-red bg-clip-text text-transparent">
              HyberHost
            </span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </Button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-semibold leading-6 font-maven ${
                pathname === item.href ? "text-hyber-orange" : "text-foreground hover:text-hyber-orange"
              }`}
            >
              {item.name}
            </Link>
          ))}

          <div className="relative group">
            <button className="text-sm font-semibold leading-6 font-maven text-foreground hover:text-hyber-orange flex items-center">
              Existing Clients <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            <div className="absolute hidden group-hover:block right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10">
              <Link
                href="https://billing.hyber.gg/"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Billing Panel
              </Link>
              <Link
                href="https://vm.hyberhost.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                VPS Panel
              </Link>
              <Link
                href="https://web1.hyber.host:2083/"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Web Panel
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4 lg:items-center">
          <Button asChild variant="ghost" className="text-sm font-semibold">
            <Link href="/login">Log in</Link>
          </Button>
          <Button asChild className="bg-hyber-orange hover:bg-hyber-red">
            <Link href="/register">Sign up</Link>
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50 bg-background">
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-xs">
              <div className="flex items-center justify-between">
                <Link href="/" className="-m-1.5 p-1.5">
                  <span className="text-xl font-bold bg-gradient-to-r from-hyber-orange to-hyber-red bg-clip-text text-transparent">
                    HyberHost
                  </span>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </Button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${
                          pathname === item.href ? "text-hyber-orange" : "text-foreground hover:bg-accent"
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}

                    <div className="-mx-3 px-3 py-2">
                      <div className="text-base font-semibold leading-7 mb-2">Existing Clients</div>
                      <div className="space-y-1 pl-2">
                        <Link
                          href="https://billing.hyber.gg/"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-foreground hover:bg-accent"
                        >
                          Billing Panel
                        </Link>
                        <Link
                          href="https://vm.hyberhost.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-foreground hover:bg-accent"
                        >
                          VPS Panel
                        </Link>
                        <Link
                          href="https://web1.hyber.host:2083/"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-foreground hover:bg-accent"
                        >
                          Web Panel
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="py-6 space-y-2">
                    <Button
                      asChild
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Link href="/login" className="text-base font-semibold">
                        Log in
                      </Link>
                    </Button>
                    <Button
                      asChild
                      className="w-full bg-hyber-orange hover:bg-hyber-red"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Link href="/register" className="text-base font-semibold">
                        Sign up
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
