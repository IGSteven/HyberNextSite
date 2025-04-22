import Link from "next/link"

export const metadata = {
  title: "GDPR Compliance",
  description: "Our data protection commitments and GDPR compliance information",
}

export default function GdprCompliancePage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl font-maven">GDPR Compliance</h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">Last updated: April 12, 2025</p>
        </div>

        <div className="mt-16 prose dark:prose-invert max-w-none">
          <h2 className="font-maven">1. Introduction</h2>
          <p>
            At HyberHost, we are committed to ensuring the privacy and protection of your personal data in compliance
            with the General Data Protection Regulation (GDPR) and the UK GDPR. This document outlines our approach to
            GDPR compliance and provides information on how we process personal data.
          </p>

          <p>
            This GDPR Compliance document should be read alongside our Privacy Policy, which provides more detailed
            information about how we collect, use, and protect your personal data.
          </p>

          <h2 className="font-maven">2. Our Role Under GDPR</h2>
          <p>HyberHost acts as both a data controller and a data processor depending on the context:</p>
          <ul>
            <li>
              <strong>As a Data Controller:</strong> We determine the purposes and means of processing personal data
              that we collect directly from you (e.g., account information, billing details).
            </li>
            <li>
              <strong>As a Data Processor:</strong> We process personal data on behalf of our customers who use our
              hosting services to store and process their own data.
            </li>
          </ul>

          <h2 className="font-maven">3. Our Data Protection Principles</h2>
          <p>We adhere to the following principles when processing personal data:</p>
          <ul>
            <li>
              <strong>Lawfulness, fairness, and transparency:</strong> We process data lawfully, fairly, and in a
              transparent manner.
            </li>
            <li>
              <strong>Purpose limitation:</strong> We collect data for specified, explicit, and legitimate purposes.
            </li>
            <li>
              <strong>Data minimization:</strong> We limit data collection to what is necessary for the purposes for
              which it is processed.
            </li>
            <li>
              <strong>Accuracy:</strong> We take reasonable steps to ensure personal data is accurate and kept up to
              date.
            </li>
            <li>
              <strong>Storage limitation:</strong> We retain data only as long as necessary for the purposes for which
              it is processed.
            </li>
            <li>
              <strong>Integrity and confidentiality:</strong> We process data securely to protect against unauthorized
              or unlawful processing and against accidental loss, destruction, or damage.
            </li>
            <li>
              <strong>Accountability:</strong> We take responsibility for and can demonstrate compliance with these
              principles.
            </li>
          </ul>

          <h2 className="font-maven">4. Lawful Bases for Processing</h2>
          <p>We process personal data under one or more of the following lawful bases:</p>
          <ul>
            <li>
              <strong>Contract:</strong> Processing necessary for the performance of a contract with you.
            </li>
            <li>
              <strong>Legal obligation:</strong> Processing necessary for compliance with legal obligations.
            </li>
            <li>
              <strong>Legitimate interests:</strong> Processing necessary for our legitimate interests or those of a
              third party.
            </li>
            <li>
              <strong>Consent:</strong> Processing based on your specific, informed, and unambiguous consent.
            </li>
          </ul>

          <h2 className="font-maven">5. Data Subject Rights</h2>
          <p>Under the GDPR, you have the following rights regarding your personal data:</p>
          <ul>
            <li>
              <strong>Right to be informed:</strong> You have the right to know how we collect and use your personal
              data.
            </li>
            <li>
              <strong>Right of access:</strong> You have the right to request a copy of the personal data we hold about
              you.
            </li>
            <li>
              <strong>Right to rectification:</strong> You have the right to have inaccurate personal data corrected.
            </li>
            <li>
              <strong>Right to erasure:</strong> You have the right to request deletion of your personal data in certain
              circumstances.
            </li>
            <li>
              <strong>Right to restrict processing:</strong> You have the right to request the restriction of processing
              in certain circumstances.
            </li>
            <li>
              <strong>Right to data portability:</strong> You have the right to receive your personal data in a
              structured, commonly used format.
            </li>
            <li>
              <strong>Right to object:</strong> You have the right to object to processing based on legitimate interests
              or direct marketing.
            </li>
            <li>
              <strong>Rights related to automated decision making:</strong> You have rights regarding automated decision
              making and profiling.
            </li>
          </ul>

          <p>
            To exercise any of these rights, please contact our Data Protection Officer at dpo@hyberhost.com. We will
            respond to your request within one month.
          </p>

          <h2 className="font-maven">6. Data Protection Officer</h2>
          <p>
            We have appointed a Data Protection Officer (DPO) who is responsible for overseeing questions in relation to
            this GDPR Compliance document and our privacy practices. If you have any questions about this document or
            how we handle your personal data, please contact our DPO at:
          </p>
          <p>
            Email: dpo@hyberhost.com
            <br />
            Address: HyberHost Ltd, 123 Tech Street, London, EC1A 1BB, United Kingdom
          </p>

          <h2 className="font-maven">7. Data Processing Agreements</h2>
          <p>
            As a data processor, we enter into Data Processing Agreements (DPAs) with our customers who act as data
            controllers. These agreements outline the terms under which we process personal data on behalf of our
            customers and ensure compliance with GDPR requirements.
          </p>
          <p>If you are a customer and require a DPA, please contact our legal team at legal@hyberhost.com.</p>

          <h2 className="font-maven">8. International Data Transfers</h2>
          <p>
            HyberHost operates data centers in the United Kingdom and Canada. When transferring personal data outside
            the UK or European Economic Area (EEA), we ensure appropriate safeguards are in place, such as:
          </p>
          <ul>
            <li>Standard Contractual Clauses (SCCs) approved by the European Commission</li>
            <li>Binding Corporate Rules (BCRs) where applicable</li>
            <li>Adequacy decisions by the European Commission or UK authorities</li>
          </ul>

          <h2 className="font-maven">9. Data Security Measures</h2>
          <p>
            We implement appropriate technical and organizational measures to ensure a level of security appropriate to
            the risk, including:
          </p>
          <ul>
            <li>Encryption of personal data</li>
            <li>Regular testing and evaluation of security measures</li>
            <li>Access controls and authentication procedures</li>
            <li>Regular security assessments and audits</li>
            <li>Staff training on data protection and security</li>
            <li>Incident response procedures</li>
          </ul>

          <h2 className="font-maven">10. Data Breach Notification</h2>
          <p>
            In the event of a personal data breach, we will notify the relevant supervisory authority without undue
            delay and, where feasible, not later than 72 hours after becoming aware of the breach, unless the breach is
            unlikely to result in a risk to the rights and freedoms of individuals.
          </p>
          <p>
            If the breach is likely to result in a high risk to the rights and freedoms of individuals, we will also
            notify the affected individuals without undue delay.
          </p>

          <h2 className="font-maven">11. Data Protection Impact Assessments</h2>
          <p>
            We conduct Data Protection Impact Assessments (DPIAs) when processing is likely to result in a high risk to
            the rights and freedoms of individuals, particularly when using new technologies or when processing
            sensitive personal data on a large scale.
          </p>

          <h2 className="font-maven">12. Records of Processing Activities</h2>
          <p>
            We maintain records of our processing activities as required by Article 30 of the GDPR, including the
            purposes of processing, categories of data subjects and personal data, recipients of personal data,
            international transfers, retention periods, and security measures.
          </p>

          <h2 className="font-maven">13. Changes to This Document</h2>
          <p>
            We may update this GDPR Compliance document from time to time to reflect changes in our practices or
            regulatory requirements. We will notify you of any significant changes by posting the new document on our
            website or by other appropriate means.
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
