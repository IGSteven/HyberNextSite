import Link from "next/link"

export const metadata = {
  title: "Privacy Policy",
  description: "How we collect, use, and protect your personal information",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl font-maven">Privacy Policy</h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">Last updated: April 7, 2025</p>
        </div>

        <div className="mt-16 prose dark:prose-invert max-w-none">
          <p>
            This Privacy Policy explains how we collect, use, and protect your personal information in line with the UK
            General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
          </p>

          <p>
            Please read this policy carefully. It applies to the services we provide to individuals, sole traders, and
            partnerships. It does not apply to information we hold about incorporated companies or other organisations
            unless we also process personal data in those contexts.
          </p>

          <h2 className="font-maven">1. When This Policy Applies</h2>
          <p>This Privacy Policy applies whether you are:</p>
          <ul>
            <li>A customer using our services directly.</li>
            <li>Someone using our services paid for by someone else.</li>
            <li>Contacting us via phone, email, or webchat.</li>
            <li>Browsing or making enquiries on our website.</li>
          </ul>

          <p>
            If you provide personal data about someone else (such as a joint account holder or authorised user), please
            ensure they have read this privacy policy and are happy for you to share their data with us.
          </p>

          <h2 className="font-maven">2. Your Data Rights</h2>
          <p>Under the UK GDPR, you have rights over your personal data, including:</p>
          <ul>
            <li>The right to access your data.</li>
            <li>The right to correct inaccurate data.</li>
            <li>The right to request erasure (where applicable).</li>
            <li>The right to object to or restrict processing.</li>
            <li>The right to data portability.</li>
            <li>The right to lodge a complaint with the Information Commissioner's Office (ICO).</li>
          </ul>

          <p>
            To exercise your rights or for general data enquiries, please contact our Data Protection Officer (DPO) at:
            <br />📧 dpo@hyberhost.com
          </p>

          <h2 className="font-maven">3. What Personal Information We Collect</h2>
          <p>We may collect and process the following categories of personal data:</p>
          <ul>
            <li>
              <strong>Identity & Contact Data:</strong> name, address, phone number, email, account credentials.
            </li>
            <li>
              <strong>Financial Data:</strong> billing address, payment method, bank/card details.
            </li>
            <li>
              <strong>Communication Records:</strong> emails, calls, web chats.
            </li>
            <li>
              <strong>Usage Data:</strong> services you use, login times, support interactions.
            </li>
            <li>
              <strong>Technical Data:</strong> IP addresses, login location, browser information.
            </li>
          </ul>

          <h2 className="font-maven">4. How We Use Your Data</h2>

          <h3 className="font-maven">a) To provide our services and fulfil contracts</h3>
          <p>We use your information to:</p>
          <ul>
            <li>Set up and manage your account.</li>
            <li>Send service-related communications (e.g. maintenance, changes).</li>
            <li>Provide access to the customer portal.</li>
            <li>Invoice you and process your payments.</li>
          </ul>
          <p>
            <strong>Legal basis:</strong> Performance of a contract (Article 6(1)(b) UK GDPR)
          </p>

          <h3 className="font-maven">b) For fraud prevention and credit checks</h3>
          <p>
            Before and during service provision, we may carry out checks to detect fraud or financial risk. This
            includes sharing data with fraud prevention agencies.
          </p>
          <p>
            <strong>Legal basis:</strong> Legitimate interests (Article 6(1)(f))
          </p>
          <p>
            <strong>Retention:</strong> Up to 6 years if risk is identified.
          </p>
          <p>
            Whenever such data is transferred outside the UK/EEA, we ensure it is protected using approved safeguards
            (e.g. Standard Contractual Clauses).
          </p>

          <h3 className="font-maven">c) To recover debts</h3>
          <p>
            If you fall behind on payments, we may engage debt recovery agencies and share relevant details. We may also
            transfer or sell debt to third parties.
          </p>
          <p>
            <strong>Legal basis:</strong> Legitimate interests
          </p>

          <h3 className="font-maven">d) To prevent and detect crime and protect our infrastructure</h3>
          <p>We monitor usage for cybersecurity threats, malware detection, and abuse prevention.</p>
          <p>
            <strong>Legal basis:</strong> Legitimate interests
          </p>
          <p>We use the minimum amount of data necessary to ensure the security of our services.</p>

          <h3 className="font-maven">e) To meet legal obligations</h3>
          <p>We may be required to disclose data to:</p>
          <ul>
            <li>Regulators</li>
            <li>Law enforcement</li>
            <li>HMRC or courts, if legally compelled</li>
          </ul>
          <p>We will only do this in accordance with applicable UK laws.</p>
          <p>
            <strong>Legal basis:</strong> Legal obligation (Article 6(1)(c))
          </p>

          <h2 className="font-maven">5. How We Protect Your Data</h2>
          <p>
            We take your privacy seriously and use a range of security measures to protect your personal data,
            including:
          </p>
          <ul>
            <li>Secure encryption protocols (TLS/SSL)</li>
            <li>Firewalls and intrusion prevention</li>
            <li>Data access controls and audits</li>
            <li>Staff training on data protection</li>
          </ul>
          <p>We also verify your identity before processing data requests or account access.</p>

          <h2 className="font-maven">6. How Long We Keep Your Data</h2>
          <p>We retain your data only as long as necessary:</p>
          <table className="border-collapse border border-gray-300 dark:border-gray-700 w-full">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Data Type</th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Retention Period</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Account details</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">6 years after contract ends</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Billing records</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">6 years from invoice date</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Support communications</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">2 years from last contact</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Fraud-related data</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Up to 6 years</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Legal claims</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">6 years after resolution</td>
              </tr>
            </tbody>
          </table>
          <p>We securely delete or anonymise data after these periods, unless required to keep it for longer by law.</p>

          <h2 className="font-maven">7. International Transfers</h2>
          <p>Where personal data is transferred outside the UK or EEA, we ensure it is protected through:</p>
          <ul>
            <li>Adequacy decisions</li>
            <li>Standard Contractual Clauses (SCCs)</li>
            <li>Binding Corporate Rules (where applicable)</li>
          </ul>

          <h2 className="font-maven">8. Complaints or Concerns</h2>
          <p>
            If you have questions, concerns or complaints about how we process your personal data, contact our DPO at:
          </p>
          <p>
            📧 dpo@hyberhost.com
            <br />📧 privacy@hyberhost.com (for general queries)
          </p>
          <p>If you're not satisfied with our response, you can contact the UK data protection regulator:</p>
          <p>
            Information Commissioner's Office (ICO)
            <br />📍 Wycliffe House, Water Lane, Wilmslow, Cheshire SK9 5AF
            <br />🌐 www.ico.org.uk
            <br />📞 0303 123 1113
          </p>

          <h2 className="font-maven">9. Changes to This Policy</h2>
          <p>
            We may update this policy from time to time. We will notify you of significant changes through our website
            or via email.
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
