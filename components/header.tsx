"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

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
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
              >
                <span className="sr-only">Open main menu</span>
                <Menu className="h-6 w-6" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs">
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
            </SheetContent>
          </Sheet>
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

          <DropdownMenu>
            <DropdownMenuTrigger className="text-sm font-semibold leading-6 font-maven text-foreground hover:text-hyber-orange flex items-center">
              Existing Clients <ChevronDown className="ml-1 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="https://billing.hyber.gg/" target="_blank" rel="noopener noreferrer">
                  Billing Panel
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="https://vm.hyberhost.com/" target="_blank" rel="noopener noreferrer">
                  VPS Panel
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="https://web1.hyber.host:2083/" target="_blank" rel="noopener noreferrer">
                  Web Panel
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
    </header>
  )
}
