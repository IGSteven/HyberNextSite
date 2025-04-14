import { Suspense } from "react"
import VpsPlansLoading from "./vps-plans-loading"
import ClientVpsPlans from "./client-vps-plans"

export const metadata = {
  title: "VPS Hosting - HyberHost",
  description: "High-performance VPS hosting solutions for your business",
}

export default function VpsPage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Virtual Private Servers</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          High-performance VPS hosting with dedicated resources, full root access, and instant scalability.
        </p>
      </div>

      <Suspense fallback={<VpsPlansLoading />}>
        <ClientVpsPlans />
      </Suspense>

      <div className="mt-16 space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Why Choose Our VPS Hosting?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">High Performance</h3>
              <p>
                Our VPS solutions are powered by the latest NVMe SSD storage and high-performance AMD EPYC processors,
                ensuring lightning-fast response times for your applications.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">Full Root Access</h3>
              <p>
                Get complete control over your server environment with full root access. Install any software, configure
                custom settings, and optimize your server exactly how you need it.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">Instant Scalability</h3>
              <p>
                Easily upgrade your resources as your needs grow. Our infrastructure allows for seamless vertical
                scaling without any downtime or migration headaches.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Technical Specifications</h2>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="p-4 text-left">Feature</th>
                  <th className="p-4 text-left">Specification</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="p-4 font-medium">Processors</td>
                  <td className="p-4">AMD EPYC 7003 Series</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Storage</td>
                  <td className="p-4">NVMe SSD Storage</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Network</td>
                  <td className="p-4">10 Gbps Network Connection</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Operating Systems</td>
                  <td className="p-4">Ubuntu, Debian, CentOS, AlmaLinux, Windows Server</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Control Panel</td>
                  <td className="p-4">Custom Control Panel, Optional cPanel/WHM</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Backups</td>
                  <td className="p-4">Daily Backups (Business plans and higher)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
