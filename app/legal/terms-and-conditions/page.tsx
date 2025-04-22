import Link from "next/link"

export const metadata = {
  title: "Terms and Conditions",
  description: "Terms and conditions for using HyberHost services",
}

export default function TermsPage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl font-maven">Terms and Conditions</h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">Last updated: April 7, 2025</p>
        </div>

        <div className="mt-16 prose dark:prose-invert max-w-none">
          <p>
            By registering and utilizing our services, you agree to the following terms and conditions outlined in this
            document, effective as of the date you purchase services from HyberHost. This agreement establishes the
            terms and conditions governing your use of HyberHost's hosting services (referred to as the "Services"), and
            constitutes the entire agreement between you and HyberHost pertaining to these Services.
          </p>

          <p>
            Upon purchasing any Services, you acknowledge and agree to be bound by all the terms and conditions outlined
            in this agreement, including any new, different, or additional terms, conditions, or policies that HyberHost
            may establish and post on its website from time to time.
          </p>

          <h2 className="font-maven">1 - The Service</h2>

          <p>1.1 HyberHost reserves the right to decline services and goods to the customer.</p>

          <p>
            1.2 HyberHost reserves the right to perform notified maintenance on all services provided to the customer
            and will, wherever possible, provide advance notice of such maintenance.
          </p>

          <p>
            1.3 The customer must ensure they provide HyberHost with a valid name, address, telephone, and email contact
            address. The customer must inform HyberHost of any changes in their contact details within three days of any
            changes.
          </p>

          <p>
            1.4 The customer must ensure their usage of the service provided by HyberHost is within the guidelines set
            out in HyberHost's Acceptable Usage Policy or AUP.
          </p>

          <p>
            1.5 Unless otherwise stated, the service HyberHost provides is unmanaged. While the company will attempt to
            provide support for any third-party software and programs, no guarantee is made on the level of support
            HyberHost provides for any third-party software.
          </p>

          <p>1.6 Any problems caused by the customer to the service may result in extra charges to the customer.</p>

          <p>
            1.7 HyberHost shall have the right upon prior written notice to relocate the customer equipment. In the
            event of an emergency, HyberHost may relocate the customer equipment within such time as may be reasonable
            and without prior written notice as the circumstances reasonably warrant.
          </p>

          <h2 className="font-maven">2 - Payment and Termination</h2>

          <p>
            2.1 The Customer shall pay the charges for the services set out when signing up for the services on the
            order form.
          </p>

          <p>
            2.2 The customer is entering a thirty-day monthly rolling contract unless specified in an additional service
            agreement between HyberHost and the customer.
          </p>

          <p>
            2.3 The customer shall provide no less than three days cancellation notice before their billing anniversary
            date. The customer will provide this notification via email to cancellations@hyberhost.com or by means of a
            cancellation support ticket through the customers control panel account at https://billing.hyberhost.com.
          </p>

          <p>
            2.4 HyberHost shall be entitled thirty days before and at any time after the expiry of the service term to
            increase service charges for a service upon thirty days written notice to the customer.
          </p>

          <p>
            2.5 HyberHost shall invoice the customer fourteen days before their service renewal date unless specified in
            an alternative agreement.
          </p>

          <p>
            2.6 HyberHost requires all invoices to be paid within fourteen days of creation unless another agreement is
            in place between HyberHost and the customer.
          </p>

          <p>
            2.7 HyberHost reserves the right to suspend and/or disconnect any services for a customer with invoices that
            have not been paid by their due date.
          </p>

          <p>
            2.8 HyberHost reserves the right to prohibit the customer access to their equipment or data if the customer
            has overdue invoices.
          </p>

          <p>
            2.9 Interest shall accrue on overdue invoices from the due date until payment (whether before or after
            judgment) at the rate of 1.5% per month. Interest shall accrue not withstanding termination of this
            agreement or any service for whatever reason.
          </p>

          <p>
            2.10 All sums due to HyberHost are exclusive of value added tax and any other applicable sales tax or duty
            which shall be invoiced and payable at the then prevailing rate.
          </p>

          <p>
            2.11 The customer hereby acknowledges and agrees that its obligations to pay all amounts and charges due
            hereunder, and the rights of HyberHost to such payments shall be absolute, unconditional and irrevocable and
            shall not be affected by any circumstances of any character, including, without limitation, any set-off,
            abatement, counterclaim, suspension, recoupment, reductions, rescission, defence or other right or claim
            that customer may have against HyberHost.
          </p>

          <p>
            2.12 Upon cancellation of service HyberHost will not be able to provide the customer with any refund for
            services which have been provisioned to the customer.
          </p>

          <p>
            2.13 The customer shall submit any billing disputes to HyberHost no later than three days of an invoice due
            date.
          </p>

          <h2 className="font-maven">3 - Service Suspension</h2>

          <p>
            3.1 HyberHost may, at its sole discretion and without prejudice to any right which it might have to
            terminate this agreement or a service, elect to suspend forthwith provision of any service until further
            notice in the event that:
          </p>

          <p>a) HyberHost is entitled to terminate this agreement or such service; or</p>

          <p>
            b) HyberHost is obliged to comply with an order, instruction or request of government, an emergency service
            organisation or other competent administrative authority which affects its ability to provide the service.
          </p>

          <p>
            3.2 HyberHost may from time to time suspend a service in accordance with any applicable SLA to carry out any
            necessary maintenance work to the network or the service equipment.
          </p>

          <p>
            3.3 In the event the suspension is implemented as a consequence of the breach, fault, act or omission of the
            customer, the customer shall pay HyberHost all reasonable costs and expenses incurred by the implementation
            of such suspension and/or recommencement of the provision of the service and HyberHost may recover any other
            losses suffered as a result of such breach, fault, act or omission.
          </p>

          <p>
            3.4 HyberHost shall not be liable for any loss, damage or inconvenience suffered by the customer as a result
            of any suspension pursuant to clause 3.1 save where the circumstances set out in clause 3.1 are solely
            attributable to the negligence of HyberHost.
          </p>

          <p>
            3.5 Any communications between HyberHost and the customer are strictly confidential. Disclosure of telephone
            calls, quotations, support tickets or email communication between the parties to media organisations, other
            businesses, discussion forums or any other third parties is strictly prohibited and may result in immediate
            service suspension.
          </p>

          <h2 className="font-maven">4 - Indemnity</h2>

          <p>
            4.1 The customer agrees to fully indemnify and keep HyberHost, its subsidiaries, affiliates, officers,
            partners, employees and agents fully indemnified from and against all actions, demands, costs (on a full
            indemnity basis), losses, penalties, damages, liability, claims and expenses (including but not limited to
            legal fees) whatsoever incurred by it or them and arising from any of the following:
          </p>

          <p>
            a) The customers breach of the contract and/or this agreement or its negligence or other act, omission or
            default;
          </p>

          <p>
            b) The operation or break down of any equipment or software owned or used by the customer but not the
            hardware and/or software;
          </p>

          <p>c) The customers use or misuse of the services;</p>

          <p>
            d) The customer infringing (whether innocently or knowingly) third party rights (including without limit
            IPRs).
          </p>

          <h2 className="font-maven">5 - Disclaimer</h2>

          <p>
            5.1 The customer acknowledges that the allocation of risk in the contract reflects the price paid for the
            services, hardware and software and that it is not within the control of HyberHost how or for what purposes
            they are used. If any exclusion or limit of liability in the contract is held to be invalid and HyberHost
            becomes liable for loss or damage that may lawfully be limited then such liability shall be limited to the
            amount paid by the customer for the services.
          </p>

          <p>
            5.2 HyberHost shall have no liability to the customer for any loss arising from any material, data or
            instructions supplied whether digitally or otherwise by the customer or on its behalf which is incomplete,
            inaccurate, illegible, out of sequence or in the wrong form or arising from late arrival or non-arrival or
            any other fault by the customer or on its behalf. No action, claim or demand arising out of or in connection
            with the contract or this agreement may be brought by the customer against HyberHost more than one year
            after the cause of action has occurred.
          </p>

          <p>
            5.3 HyberHost is not responsible for any delay, malfunction, non-performance and/or other degradation of
            performance of any of the services, hardware or software caused by or resulting from any alteration,
            modification and/or amendments due to changes and specifications requested or implemented by the customer
            whether or not beyond those already supplied.
          </p>

          <p>
            5.4 Neither HyberHost nor anyone else who has been involved in the creation, production or supply of the
            services, hardware or software shall be liable to the customer or any other person for any loss in contract,
            tort (including negligence or breach of statutory duty) or otherwise howsoever and whatever the cause
            thereof by reason of or in connection with this agreement, the contract or the services, hardware or
            software for any:
          </p>

          <p>a) economic loss of any kind whatsoever, or</p>

          <p>b) loss of profit, data, business contracts, revenues or anticipated savings, or</p>

          <p>c) damage to the customer's reputation or goodwill, or</p>

          <p>d) loss resulting from any claim made by any third party, or</p>

          <p>e) special, indirect or consequential loss or damage of any nature whatsoever.</p>

          <p>
            The customer shall indemnify HyberHost from and against any claim which may be made against HyberHost in
            respect thereof. Some jurisdictions do not allow the exclusion or limitation of implied warranties or of
            liability for consequential or incidental damages and therefore the above may not apply to the customer.
          </p>

          <h2 className="font-maven">6 - Uptime Guarantee and Service Level Agreement (SLA)</h2>

          <p>
            "Uptime" refers to the amount of time the Services are available, as measured solely and only by HyberHost
            internal monitoring systems. "Downtime" refers to the amount of time the Services are unavailable, as
            measured solely and only by HyberHost internal monitoring systems.
          </p>

          <p>
            6.1 HyberHost guarantees that its networking and connectivity services will be available 100% of the time.
            In the event such level of service is not provided, HyberHost will credit the customer's account in an
            amount as determined in the chart below, reflecting credit percentages of the monthly fees paid for the
            services, but not payments made for any of the following products and services: domain name registration,
            software licenses, IP address charges, set up fees, shipping and handling, SSL certificate fees, labour
            charges, and other services which are unrelated to uptime:
          </p>

          <ul>
            <li>99.1% to 99.9% will result in a credit of 5%</li>
            <li>98% to 99% will result in a credit of 10%</li>
            <li>95% to 97.9% will result in a credit of 25%</li>
            <li>90% to 94.9% will result in a credit of 50%</li>
            <li>89% or below will result in a credit of 100%</li>
          </ul>

          <p>
            6.2 The customer must request a credit by emailing accounts@hyberhost.com. The email must include the dates
            and times of the downtime and the name and IP address of the server or servers which experienced the
            downtime. The request must be received by HyberHost within ten business days after the incident of downtime.
            If the unavailability is confirmed by HyberHost, a credit will be applied to the customer's account within
            thirty days of receipt of the customer's credit request.
          </p>

          <p>
            6.3 The total amount credited to the customer in a particular month under this agreement shall not exceed
            the total amount of fees paid by the customer for such month for the affected services. Credits are
            exclusive of any applicable taxes charged to the customer or collected by HyberHost.
          </p>

          <p>
            6.4 The provisions of the agreement pertaining to Force Majeure are unaffected by these terms referring to
            uptime guarantee. Moreover, downtime caused by any of the following shall not result in any obligation by
            HyberHost to provide credit to you:
          </p>

          <ol>
            <li>Emergency maintenance.</li>
            <li>Scheduled maintenance.</li>
            <li>System upgrades.</li>
            <li>Domain name system (DNS) problems outside of HyberHost control.</li>
            <li>Issues with FTP, POP, IMAP, or SMTP customer access.</li>
            <li>Acts or omissions by you or any of your employees or agents, resulting in downtime.</li>
            <li>
              Any negligence, willful misconduct, or use of the services in breach of HyberHost Acceptable Use Policy.
            </li>
            <li>
              Problems with users' web browsers, DNS, or other caching that might make it appear the services are
              unavailable even though others can still access the HyberHost servers.
            </li>
            <li>
              Downtime caused by customer modifications to game servers, and any resulting issues attributable to such
              modifications. HyberHost will not be responsible for covering downtime caused by game server mods
              implemented by the customer.
            </li>
          </ol>

          <h2 className="font-maven">7 - Hardware Replacement Guarantee</h2>

          <p>
            HyberHost strives to maintain the integrity of the hardware used to provide its services, and any downtime
            caused by hardware failure shall be credited pursuant to this agreement. HyberHost offers different support
            levels, as outlined in detail at https://hyberhost.com/support-levels/. The specific terms of the Hardware
            Replacement Guarantee will vary based on the support level selected by the customer at the time of service
            order.
          </p>

          <p>
            The customer shall refer to the support levels detailed at https://hyberhost.com/support-levels/ to
            determine the applicable terms for hardware replacement based on their selected support level. The response
            time for hardware replacement and the associated credits will be determined in accordance with the support
            level chosen by the customer.
          </p>

          <p>
            To receive a credit, you must make a request by sending an email message to accounts@hyberhost.com. Each
            request in connection with this agreement must include the dates and times of the hardware replacement
            situation, the name and IP address of the server or servers which experienced delayed replacement. The
            request must be received by HyberHost within ten business days after the incident. Upon confirmation by
            HyberHost Limited, credit will be applied to your HyberHost account within thirty days of receipt of your
            credit request.
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
