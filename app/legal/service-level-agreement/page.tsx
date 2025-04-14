import Link from "next/link"

export const metadata = {
  title: "Service Level Agreement - HyberHost",
  description: "Service Level Agreement (SLA) for HyberHost services",
}

export default function ServiceLevelAgreementPage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl font-maven">Service Level Agreement (SLA)</h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">Last updated: April 12, 2025</p>
        </div>

        <div className="mt-16 prose dark:prose-invert max-w-none">
          <h2 className="font-maven">1. Introduction</h2>
          <p>
            This Service Level Agreement ("SLA") is part of the agreement between HyberHost ("we", "us", or "our") and
            the customer ("you" or "your") regarding the provision of hosting services. This SLA outlines the service
            levels we commit to provide and the remedies available to you if we fail to meet these commitments.
          </p>

          <h2 className="font-maven">2. Definitions</h2>
          <p>For the purposes of this SLA, the following definitions apply:</p>
          <ul>
            <li>
              <strong>"Uptime"</strong> refers to the amount of time the Services are available, as measured solely and
              only by HyberHost internal monitoring systems.
            </li>
            <li>
              <strong>"Downtime"</strong> refers to the amount of time the Services are unavailable, as measured solely
              and only by HyberHost internal monitoring systems.
            </li>
            <li>
              <strong>"Monthly Uptime Percentage"</strong> means the total number of minutes in a calendar month minus
              the number of minutes of Downtime experienced in a calendar month, divided by the total number of minutes
              in a calendar month.
            </li>
            <li>
              <strong>"Emergency Maintenance"</strong> refers to unplanned maintenance necessary to address critical
              security or performance issues.
            </li>
            <li>
              <strong>"Scheduled Maintenance"</strong> refers to planned maintenance communicated to customers in
              advance.
            </li>
          </ul>

          <h2 className="font-maven">3. Service Commitment</h2>
          <p>
            HyberHost guarantees that its networking and connectivity services will be available 100% of the time. We
            strive to maintain this level of service, but in the event such level of service is not provided, HyberHost
            will provide service credits as outlined in this SLA.
          </p>

          <h2 className="font-maven">4. Service Credits</h2>
          <p>
            In the event that HyberHost does not meet the 100% uptime guarantee, we will credit your account according
            to the following schedule, reflecting credit percentages of the monthly fees paid for the services:
          </p>

          <table className="border-collapse border border-gray-300 dark:border-gray-700 w-full">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Monthly Uptime Percentage</th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Service Credit Percentage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">99.1% to 99.9%</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">5%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">98% to 99%</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">10%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">95% to 97.9%</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">25%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">90% to 94.9%</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">50%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">89% or below</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">100%</td>
              </tr>
            </tbody>
          </table>

          <p>
            Service credits apply only to fees paid for the specific service that failed to meet the SLA (e.g., VPS
            hosting, dedicated server hosting) and do not apply to any other services or fees paid for any of the
            following products and services:
          </p>
          <ul>
            <li>Domain name registration</li>
            <li>Software licenses</li>
            <li>IP address charges</li>
            <li>Set up fees</li>
            <li>Shipping and handling</li>
            <li>SSL certificate fees</li>
            <li>Labor charges</li>
            <li>Other services unrelated to uptime</li>
          </ul>

          <h2 className="font-maven">5. Credit Request Process</h2>
          <p>
            To receive a service credit, you must submit a request by sending an email to accounts@hyberhost.com. Your
            request must include:
          </p>
          <ul>
            <li>The dates and times of the downtime</li>
            <li>The name and IP address of the server or servers which experienced the downtime</li>
            <li>Any relevant logs or other evidence of the downtime (if available)</li>
          </ul>

          <p>
            The request must be received by HyberHost within ten (10) business days after the incident of downtime. If
            the unavailability is confirmed by HyberHost, a credit will be applied to your account within thirty (30)
            days of receipt of your credit request.
          </p>

          <h2 className="font-maven">6. Credit Limitations</h2>
          <p>
            The total amount credited to you in a particular month under this SLA shall not exceed the total amount of
            fees paid by you for the affected service for such month. Credits are exclusive of any applicable taxes
            charged to you or collected by HyberHost.
          </p>

          <h2 className="font-maven">7. SLA Exclusions</h2>
          <p>
            The Service Commitment does not apply to any unavailability, suspension, or termination of services, or any
            other performance issues that are:
          </p>
          <ol>
            <li>Caused by factors outside of our reasonable control, including any force majeure events</li>
            <li>That result from any actions or inactions by you or any third party</li>
            <li>That result from your equipment, software, or other technology</li>
            <li>
              Arising from our suspension or termination of your right to use the services in accordance with our Terms
              of Service
            </li>
            <li>During scheduled downtime for maintenance</li>
          </ol>

          <p>
            Additionally, downtime caused by any of the following shall not result in any obligation by HyberHost to
            provide credit to you:
          </p>
          <ol>
            <li>Emergency maintenance</li>
            <li>Scheduled maintenance</li>
            <li>System upgrades</li>
            <li>Domain name system (DNS) problems outside of HyberHost control</li>
            <li>Issues with FTP, POP, IMAP, or SMTP customer access</li>
            <li>Acts or omissions by you or any of your employees or agents, resulting in downtime</li>
            <li>
              Any negligence, willful misconduct, or use of the services in breach of HyberHost's Acceptable Use Policy
            </li>
            <li>
              Problems with users' web browsers, DNS, or other caching that might make it appear the services are
              unavailable even though others can still access the HyberHost servers
            </li>
            <li>
              Downtime caused by customer modifications to game servers, and any resulting issues attributable to such
              modifications
            </li>
          </ol>

          <h2 className="font-maven">8. Hardware Replacement Guarantee</h2>
          <p>
            HyberHost strives to maintain the integrity of the hardware used to provide its services, and any downtime
            caused by hardware failure shall be credited pursuant to this agreement. HyberHost offers different support
            levels, as outlined in detail at https://hyberhost.com/support-levels/.
          </p>

          <p>
            The specific terms of the Hardware Replacement Guarantee will vary based on the support level selected by
            you at the time of service order. You should refer to the support levels detailed at
            https://hyberhost.com/support-levels/ to determine the applicable terms for hardware replacement based on
            your selected support level.
          </p>

          <p>
            The response time for hardware replacement and the associated credits will be determined in accordance with
            the support level chosen by you.
          </p>

          <h2 className="font-maven">9. Support Response Time SLA</h2>
          <p>
            HyberHost is committed to providing timely responses to support requests. Our response time commitments vary
            based on the support level and ticket priority:
          </p>

          <table className="border-collapse border border-gray-300 dark:border-gray-700 w-full">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Priority Level</th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Standard Support</th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Premium Support</th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Enterprise Support</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Critical</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">8 hours</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">2 hours</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">30 minutes</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">High</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">12 hours</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">4 hours</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">1 hour</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Medium</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">24 hours</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">8 hours</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">4 hours</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Low</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">48 hours</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">24 hours</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">8 hours</td>
              </tr>
            </tbody>
          </table>

          <h2 className="font-maven">10. Modifications to the SLA</h2>
          <p>
            HyberHost reserves the right to modify this SLA at any time. We will notify customers of any material
            changes to this SLA by posting the revised SLA on our website and/or by email. The revised SLA will become
            effective thirty (30) days after such notification.
          </p>

          <h2 className="font-maven">11. Contact Information</h2>
          <p>
            If you have any questions about this SLA, please contact our support team at support@hyberhost.com or our
            billing team at accounts@hyberhost.com.
          </p>
        </div>

        <div className="mt-16 flex justify-center">
          <Link href="/legal" className="text-hyber-orange hover:text-hyber-red">
            Back to Legal Documents
          </Link>
        </div>
      </div>
    </div>
  )
}
