import Link from "next/link"

export const metadata = {
  title: "Cookie Policy - HyberHost",
  description: "Information about how HyberHost uses cookies and similar technologies",
}

export default function CookiePolicyPage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl font-maven">Cookie Policy</h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">Last updated: April 12, 2025</p>
        </div>

        <div className="mt-16 prose dark:prose-invert max-w-none">
          <h2 className="font-maven">1. Introduction</h2>
          <p>
            This Cookie Policy explains how HyberHost ("we", "us", or "our") uses cookies and similar technologies to
            recognize you when you visit our website at hyberhost.com ("Website"). It explains what these technologies
            are and why we use them, as well as your rights to control our use of them.
          </p>

          <p>
            In some cases, we may use cookies to collect personal information, or information that becomes personal
            information if we combine it with other data. In such cases, our Privacy Policy will apply in addition to
            this Cookie Policy.
          </p>

          <h2 className="font-maven">2. What Are Cookies?</h2>
          <p>
            Cookies are small data files that are placed on your computer or mobile device when you visit a website.
            Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well
            as to provide reporting information.
          </p>

          <p>
            Cookies set by the website owner (in this case, HyberHost) are called "first-party cookies". Cookies set by
            parties other than the website owner are called "third-party cookies". Third-party cookies enable
            third-party features or functionality to be provided on or through the website (e.g., advertising,
            interactive content, and analytics). The parties that set these third-party cookies can recognize your
            computer both when it visits the website in question and also when it visits certain other websites.
          </p>

          <h2 className="font-maven">3. Why Do We Use Cookies?</h2>
          <p>
            We use first and third-party cookies for several reasons. Some cookies are required for technical reasons in
            order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies.
            Other cookies also enable us to track and target the interests of our users to enhance the experience on our
            Online Properties. Third parties serve cookies through our Website for advertising, analytics, and other
            purposes. This is described in more detail below.
          </p>

          <h2 className="font-maven">4. Types of Cookies We Use</h2>
          <p>
            The specific types of first and third-party cookies served through our Website and the purposes they perform
            are described below:
          </p>

          <h3 className="font-maven">4.1 Essential Cookies</h3>
          <p>
            These cookies are strictly necessary to provide you with services available through our Website and to use
            some of its features, such as access to secure areas. Because these cookies are strictly necessary to
            deliver the Website, you cannot refuse them without impacting how our Website functions.
          </p>
          <ul>
            <li>
              <strong>Session Cookies:</strong> These cookies are temporary and expire once you close your browser.
            </li>
            <li>
              <strong>Authentication Cookies:</strong> These help us identify registered users and remember their login
              information.
            </li>
            <li>
              <strong>Security Cookies:</strong> These cookies help detect and prevent security risks.
            </li>
          </ul>

          <h3 className="font-maven">4.2 Performance and Functionality Cookies</h3>
          <p>
            These cookies are used to enhance the performance and functionality of our Website but are non-essential to
            their use. However, without these cookies, certain functionality may become unavailable.
          </p>
          <ul>
            <li>
              <strong>Preference Cookies:</strong> These remember your settings and preferences to enhance your
              experience.
            </li>
            <li>
              <strong>Language Cookies:</strong> These remember your language preference.
            </li>
          </ul>

          <h3 className="font-maven">4.3 Analytics and Customization Cookies</h3>
          <p>
            These cookies collect information that is used either in aggregate form to help us understand how our
            Website is being used or how effective our marketing campaigns are, or to help us customize our Website for
            you.
          </p>
          <ul>
            <li>
              <strong>Google Analytics:</strong> We use Google Analytics to understand how visitors interact with our
              website.
            </li>
            <li>
              <strong>Hotjar:</strong> We use Hotjar to better understand our users' needs and to optimize this service
              and experience.
            </li>
          </ul>

          <h3 className="font-maven">4.4 Advertising Cookies</h3>
          <p>
            These cookies are used to make advertising messages more relevant to you. They perform functions like
            preventing the same ad from continuously reappearing, ensuring that ads are properly displayed for
            advertisers, and in some cases selecting advertisements that are based on your interests.
          </p>
          <ul>
            <li>
              <strong>Google Ads:</strong> Used to track conversions and serve targeted ads.
            </li>
            <li>
              <strong>Facebook Pixel:</strong> Used to track conversions from Facebook ads and optimize ad targeting.
            </li>
          </ul>

          <h2 className="font-maven">5. How Can You Control Cookies?</h2>
          <p>
            You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by
            setting your preferences in the Cookie Consent Manager that we display when you first visit our Website.
          </p>

          <p>
            You can also set or amend your web browser controls to accept or refuse cookies. If you choose to reject
            cookies, you may still use our website though your access to some functionality and areas of our website may
            be restricted. As the means by which you can refuse cookies through your web browser controls vary from
            browser-to-browser, you should visit your browser's help menu for more information.
          </p>

          <p>
            Most advertising networks offer you a way to opt out of targeted advertising. If you would like to find out
            more information, please visit:
          </p>
          <ul>
            <li>
              Digital Advertising Alliance:{" "}
              <a href="http://www.aboutads.info/choices/" className="text-hyber-orange hover:text-hyber-red">
                http://www.aboutads.info/choices/
              </a>
            </li>
            <li>
              European Interactive Digital Advertising Alliance:{" "}
              <a href="http://www.youronlinechoices.com/" className="text-hyber-orange hover:text-hyber-red">
                http://www.youronlinechoices.com/
              </a>
            </li>
          </ul>

          <h2 className="font-maven">6. How Often Will We Update This Cookie Policy?</h2>
          <p>
            We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies
            we use or for other operational, legal, or regulatory reasons. Please therefore revisit this Cookie Policy
            regularly to stay informed about our use of cookies and related technologies.
          </p>
          <p>The date at the top of this Cookie Policy indicates when it was last updated.</p>

          <h2 className="font-maven">7. Where Can You Get Further Information?</h2>
          <p>
            If you have any questions about our use of cookies or other technologies, please email us at
            privacy@hyberhost.com.
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
