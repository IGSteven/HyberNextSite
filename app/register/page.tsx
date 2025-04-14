"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the WHMCS registration page
    window.location.href = "https://clientarea.hyberhost.com/register.php"
  }, [router])

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecting to registration page...</h1>
        <p className="text-muted-foreground">
          If you are not redirected automatically, please{" "}
          <a href="https://clientarea.hyberhost.com/register.php" className="text-hyber-orange hover:text-hyber-red">
            click here
          </a>
          .
        </p>
      </div>
    </div>
  )
}
