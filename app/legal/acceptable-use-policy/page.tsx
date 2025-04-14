import Link from "next/link"

export const metadata = {
  title: "Acceptable Use Policy - HyberHost",
  description: "Acceptable Use Policy for HyberHost services",
}

export default function AcceptableUsePolicyPage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px:8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl font-maven">Acceptable Use Policy</h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">Last updated: April 7, 2025</p>
        </div>

        <div className="mt-16 prose dark:prose-invert max-w-none">
          <p>
            HyberHost Acceptable Use Policy (AUP) is designed to provide a clear understanding of the regulations
            concerning the use of HyberHost services. From time to time HyberHost may impose reasonable rules and
            regulations regarding the use of its services.
          </p>

          <p>
            By registering for and using the services, and thereby accepting the terms and conditions of the Terms of
            Service agreement or its equivalent, you agree to abide by the AUP as modified from time to time. Any
            violation of the AUP may result in the suspension or termination of your account or such other action as
            HyberHost deems appropriate. An unlisted activity may also be a violation of the AUP if it is illegal,
            irresponsible, or disruptive use of the Internet. No credits will be issued for any interruption in service
            resulting from policy violations.
          </p>

          <h2 className="font-maven">Customer Responsibilities</h2>
          <p>
            The customer is solely responsible for any breaches of security affecting servers under customer control. If
            a customer's server is involved in an attack on another server or system, it will be shut down and an
            immediate investigation will be launched to determine the cause/source of the attack. In such event, the
            customer is solely responsible for the cost to rectify any damage done to the customer's server and any
            other requirement affected by the security breach. The labour used to rectify any such damage is categorized
            as emergency security breach recovery and is currently charged at £50 per hour.
          </p>

          <h2 className="font-maven">System and Network Security</h2>
          <p>
            Violations of system or network security are prohibited, and may result in criminal and civil liability.
            HyberHost may investigate incidents involving such violations and may involve and will cooperate with law
            enforcement if a criminal violation is suspected. Examples of system or network security violations include,
            without limitation, the following:
          </p>
          <ul>
            <li>
              Unauthorised access to or use of data, systems or networks, including any attempt to probe, scan or test
              the vulnerability of a system or network or to breach security or authentication measures without express
              authorization of the owner of the system or network.
            </li>
            <li>
              Unauthorised monitoring of data or traffic on any network or system without express authorization of the
              owner of the system or network.
            </li>
            <li>
              Interference with service to any user, host or network including, without limitation, mail bombing,
              flooding, deliberate attempts to overload a system and broadcast attacks.
            </li>
            <li>
              Forging of any TCP-IP packet header or any part of the header information in an email or a newsgroup
              posting.
            </li>
          </ul>

          <p>
            Violators of the policy are responsible, without limitations, for the cost of labour to clean up and correct
            any damage done to the operation of the network and business operations supported by the network, and to
            respond to complaints incurred by HyberHost. Such labour is categorized as emergency security breach
            recovery and is currently charged at $50 per hour. Inquiries regarding security matters may be directed to
            http://hyberhost.com/abuse.
          </p>

          <p>
            HyberHost is concerned with the privacy of online communications and web sites. In general, the Internet is
            neither more nor less secure than other means of communication, including mail, facsimile, and voice
            telephone service, all of which can be intercepted and otherwise compromised. As a matter of prudence,
            however, HyberHost urges its customers to assume that all of their online communications are insecure.
            HyberHost cannot take responsibility for the security of information transmitted over HyberHost's
            facilities.
          </p>

          <h2 className="font-maven">Password Protection</h2>
          <p>
            The customer is responsible for protecting customer's password and for any authorised or unauthorised use
            made of customer's password. The customer will not use or permit anyone to use HyberHost's service to guess
            passwords or to access other systems or networks without authorisation. HyberHost will fully cooperate with
            law enforcement authorities in the detection and prosecution of illegal activity.
          </p>

          <h2 className="font-maven">Contact Information</h2>
          <p>
            Customers are responsible for maintaining their contact information in the ticketing system such that the
            email address is always reachable even in the event of their HyberHost servers being shut down.
          </p>

          <h2 className="font-maven">Internet Etiquette</h2>
          <p>
            The customer is expected to be familiar with and to practice good Internet etiquette (Netiquette). The
            customer will comply with the rules appropriate to any network to which HyberHost may provide access. The
            customer should not post, transmit, or permit Internet access to information the customer desires to keep
            confidential. The customer is not permitted to post any material that is illegal, libellous, and tortuous,
            indecently depicts children or is likely to result in retaliation against HyberHost by offended users.
            HyberHost reserves the right to refuse or terminate service at any time for violation of this section. This
            includes advertising services or sites via IRC or USENET in clear violation of the policies of the IRC
            channel or USENET group.
          </p>

          <h2 className="font-maven">Copyright Infringement – Software Piracy Policy</h2>
          <p>
            The HyberHost network may only be used for lawful purposes. Transmission, distribution, or storage of any
            information, data or material in violation of the laws of the United Kingdom, or by the common law, is
            prohibited. This includes, but is not limited to; material protected by copyright, trademark, trade secret,
            or other intellectual property rights. If you copy, distribute or install software in ways that the licence
            does not allow, you are violating the law.
          </p>

          <h2 className="font-maven">Network Responsibility</h2>
          <p>
            Customers have a responsibility to use the HyberHost network responsibly which includes, but is not limited
            to, respecting the other customers of HyberHost. HyberHost reserves the right to suspend and or cancel
            service with any customer who uses the HyberHost network in such a way that adversely affects other
            HyberHost customers. This includes but is not limited to:
          </p>
          <ul>
            <li>
              Attacking or attempting to gain unauthorised access to servers and services that belong to HyberHost or
              its customers (i.e. computer hacking).
            </li>
            <li>
              Participating in behaviour which results in reprisals that adversely affect the HyberHost's network or
              other customers' access to the HyberHost's network.
            </li>
            <li>
              We do not allow customers to pen-test or stress-test any devices on our network without explicit
              permission.
            </li>
          </ul>

          <p>
            HyberHost will react strongly to any use or attempted use of an Internet account or computer without the
            owner's authorisation. Such attempts include, but are not limited to, Internet Scanning (tricking other
            people into releasing their passwords), password theft, security hole scanning, port scanning, etc. Any
            unauthorised use of accounts or computers by a HyberHost customer, whether or not the attacked account or
            computer belongs to HyberHost, will result in severe action taken against the attacker. Possible actions
            include warnings, account suspension or cancellation, and civil or criminal legal action, depending on the
            seriousness of the attack. Any attempt to undermine or cause harm to a server, or customer, of HyberHost is
            strictly prohibited.
          </p>

          <h2 className="font-maven">DDoS Protection Fair Usage</h2>
          <p>
            All protection services offered by HyberHost are provided on a "best effort" basis. We do not guarantee that
            we can completely eradicate all malicious DDoS traffic and may require a customer to upgrade to an
            "Always-On" solution in order to provide further support with potentially unmitigated attacks.
          </p>
          <ul>
            <li>
              Customers with "On-Demand" protection who receive frequent attacks larger than 5Gbps are required to move
              to an always-on plan to prevent impact to other customers on our network during initial attack time.
              Alternatively can move to a 1-hour "null-route" policy whereby the IP under attack will be null-routed for
              1 hour at the time an attack is received.
            </li>
            <li>
              Customers with "Always-On" Protection that receive frequent AND large sustained attacks will be required
              to move onto an advanced protection plan.
            </li>
            <li>
              Customers with "Always-On" Protection facing repeat attacks in excess of 50Gbps will need to move onto an
              advanced DDoS protection plan – pricing is available on request.
            </li>
            <li>
              The use of IP tunnels to other data-centres or networks for the purpose of utilizing our DDoS protection
              outside of our own network is not permitted unless otherwise explicitly agreed.
            </li>
          </ul>

          <h2 className="font-maven">Lawful Purpose</h2>
          <p>
            All services may be used for lawful purposes only. Transmission, storage, or presentation of any
            information, data or material in violation of any applicable law, regulation, or AUP is prohibited. This
            includes, but is not limited to:
          </p>
          <ul>
            <li>
              Copyrighted material or material protected by trade secret and other statute or dissemination of harmful
              or fraudulent content.
            </li>
            <li>
              Using any HyberHost service or product for the purpose of participating in any activity dealing with
              subject matters that are prohibited under applicable law is prohibited.
            </li>
            <li>Any conduct that constitutes harassment, fraud, stalking or abuse is prohibited.</li>
            <li>
              Using the HyberHost's network to solicit the performance of any illegal activity is also prohibited, even
              if the activity itself is not performed. In addition, knowingly receiving or downloading a file that
              cannot be legally distributed, even without the act of distribution, is prohibited.
            </li>
          </ul>

          <p>
            Servers hosted within HyberHost network are open to the public. You are solely responsible for your usage of
            the HyberHost's network and servers and any statement you make on servers hosted within the HyberHost's
            network may be deemed "publication" of the information entered.
          </p>

          <p>
            Acknowledging the foregoing, you specifically agree not to use our service in any manner that is illegal or
            libellous.
          </p>

          <h2 className="font-maven">Adult Content on the Internet</h2>
          <p>
            HyberHost will provide notification and will inform any customers in writing of improper materials on our
            servers. HyberHost reserves the right to disconnect any customers immediately. Legal adult content is
            permitted on the network.
          </p>

          <h2 className="font-maven">Commercial Advertisements with Email</h2>
          <p>
            HyberHost takes a zero tolerance approach to the sending of Unsolicited Commercial Email (UCE) or SPAM over
            our network. Very simply, this means that customers of HyberHost may not use or permit others to use our
            network to transact in UCE. Customers of HyberHost may not host, or permit hosting of, sites or information
            that is advertised by UCE from other networks. Violations of this policy carry severe penalties, including
            termination of service.
          </p>

          <p>
            Sending a commercial message, especially an advertisement, to more than five recipients, is by itself
            spamming unless the individuals have specifically requested to be added to a mailing list on that topic.
            This includes commercial advertisements and informational messages sent to recipients via electronic mail
            (email) as well as off-topic messages posted in Usenet discussion groups where the recipient has not
            requested or invited the message
          </p>

          <p>
            Mailing lists must be true opt-in mailing lists. Before sending any email to a listed user, a confirmation
            email, with a tracking number, must be sent to the new subscriber, to which they must respond with a
            confirmation that they wish to be added to the list. You must keep these confirmations on file, so that in
            the case that a spam complaint is made against you, you have proof that the user did indeed opt-in.
          </p>

          <p>
            Customers of HyberHost are strictly prohibited from using or permitting others to use UCE or SPAM over our
            network. As our customers, if they are resellers, are ultimately responsible for the actions of their
            clients over the HyberHost network, it is advisable that customers develop a similar, or stricter, policy
            for their clients.
          </p>

          <p>
            Violation of HyberHost SPAM policy will result in severe penalties. Upon notification of an alleged
            violation of our SPAM policy, HyberHost will initiate an immediate investigation (within 48 hours of
            notification). During the investigation, HyberHost may restrict customer access to the network to prevent
            further violations. If a customer is found to be in violation of our SPAM policy, HyberHost may, at its sole
            discretion, restrict, suspend or terminate the customer's account. Further, HyberHost reserves the right to
            pursue civil remedies for any costs associated with the investigation of a substantiated policy violation.
            HyberHost will notify law enforcement officials if the violation is believed to be a criminal offense.
          </p>

          <h2 className="font-maven">General</h2>
          <ul>
            <li>Clients may not use our hosting service for any illegal purposes.</li>
            <li>
              Clients are responsible for all content, activities and operation of any equipment located within the
              datacentre premises
            </li>
            <li>
              Failure to adhere to the AUP may result in disconnection of power and/or removal of equipment from the
              datacentre.
            </li>
            <li>
              HyberHost will not be held liable for any losses incurred should equipment be removed/disconnected owing
              to a breach of the AUP.
            </li>
            <li>HyberHost's decision in all matters pertaining to the AUP will be final.</li>
          </ul>

          <h2 className="font-maven">Suspension</h2>
          <p>
            HyberHost reserves the right to suspend network access to any customer if, in the judgment of the
            HyberHost's network administrators, the customer's server is the source or target of the violation of any of
            the other terms of the AUP or for any other reason which HyberHost reasonably chooses, including but not
            limited to non-payment. If inappropriate activity is detected, all accounts of the customer in question will
            be deactivated until an investigation is complete. Prior notification to the customer is not assured. In
            extreme cases, law enforcement will be contacted regarding the activity. The customer will not be credited
            for the time the customer's machines were suspended.
          </p>

          <h2 className="font-maven">Cancellation</h2>
          <p>
            HyberHost reserves the right to cancel service at any time. If inappropriate activity is detected, all
            accounts of the customer in question will be deactivated until an investigation is complete. Prior
            notification to the customer is not assured. In extreme cases, law enforcement will be contacted regarding
            the activity. All fees paid in advance of cancellation are non-refundable if HyberHost institutes its right
            of cancellation. Any violation of policies which results in extra costs will be billed to the customer (i.e.
            transfer, space etc.). HyberHost requires all customers to provide three days' notice of any cancellations.
          </p>

          <h2 className="font-maven">Indemnification</h2>
          <p>
            The customer acknowledges its indemnification obligations under the HyberHost's Terms of Service. Violations
            of this AUP may result in significant civil and criminal liability of the customer.
          </p>

          <h2 className="font-maven">Disclaimer of Responsibility</h2>
          <p>
            HyberHost is under no duty to look at each customer's or user's activities to determine if a violation of
            the AUP has occurred, nor do we assume any responsibility through our AUP to monitor or police
            Internet-related activities. HyberHost disclaims any responsibility for any such inappropriate use and any
            liability to any person or party for any other person's or party's violation of this policy.
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
