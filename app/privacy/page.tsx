import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/LegalPage";
import { contactEmail, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy | Obsidx",
  description: "How Obsidx collects, uses and protects your personal data when you visit the site or apply to work with us.",
};

const Email = () => <a href={`mailto:${contactEmail}`}>{contactEmail}</a>;

// Written for what the site actually does today: the /apply form (components/ApplicationForm.tsx)
// and hosting logs, with no analytics or tracking cookies. Update sections 2, 5 and 6 if that changes.
const sections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who We Are",
    body: (
      <>
        <p>
          Obsidx (&ldquo;Obsidx,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) partners with established
          creators to build and run digital products and recurring revenue systems. We are responsible for the personal data
          described in this policy.
        </p>
        <p>
          If you have a question about this policy or want to use any of your rights, email <Email />. We reply within one
          month.
        </p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    body: (
      <>
        <h3>When you apply</h3>
        <ul>
          <li>Your full name.</li>
          <li>Your email address or other preferred contact details.</li>
          <li>The platform where most of your audience is, and your social handle.</li>
          <li>Your follower count and audience engagement rate.</li>
          <li>Your current monthly revenue range.</li>
        </ul>
        <p>We only ask for what we need to understand whether a partnership could work.</p>
        <h3>When you contact us</h3>
        <p>The content of the emails and messages you send us, and the details you include in them.</p>
        <h3>When you browse the site</h3>
        <p>
          Our hosting provider automatically records standard technical information when a page loads, such as your IP
          address, browser and device type, the page requested, and the time of the request. We use it to keep the site
          secure and working.
        </p>
        <p>
          We do not take payments through this website, and we do not ask for sensitive data such as health information or
          government ID numbers.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use-it",
    title: "How We Use Your Information",
    body: (
      <>
        <ul>
          <li>To review your application and decide whether there is a fit.</li>
          <li>To contact you about your application, including to arrange a call.</li>
          <li>To prepare for and deliver a partnership if we agree to work together.</li>
          <li>To answer questions and messages you send us.</li>
          <li>To keep the website secure, prevent spam, and fix problems.</li>
          <li>To meet our legal, tax, and accounting obligations.</li>
        </ul>
        <p>We do not sell your personal data, and we do not use your application details for advertising.</p>
      </>
    ),
  },
  {
    id: "legal-bases",
    title: "Legal Bases for Processing",
    body: (
      <>
        <p>If you are in the European Economic Area or the United Kingdom, we rely on these legal bases:</p>
        <ul>
          <li>
            <strong>Steps before a contract:</strong> reviewing your application and discussing a partnership at your request.
          </li>
          <li>
            <strong>Performance of a contract:</strong> delivering a partnership we have agreed with you.
          </li>
          <li>
            <strong>Legitimate interests:</strong> running and securing the website, keeping accurate records, and improving
            how we work, where those interests are not overridden by your rights.
          </li>
          <li>
            <strong>Legal obligation:</strong> meeting tax, accounting, and other legal requirements.
          </li>
          <li>
            <strong>Consent:</strong> where we ask for it. You can withdraw consent at any time.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies",
    body: (
      <p>
        This website does not use advertising or tracking cookies, and we do not use analytics tools that follow you across
        other sites. If we add analytics or similar tools, we will update this policy first and, where the law requires, ask
        for your consent.
      </p>
    ),
  },
  {
    id: "sharing",
    title: "Who We Share It With",
    body: (
      <>
        <p>We share personal data only when we need to:</p>
        <ul>
          <li>
            With service providers that help us run Obsidx, such as our website host, the form and automation tools that
            receive applications, and our email and file storage providers. They may only use your data to provide their
            services to us.
          </li>
          <li>With professional advisers, such as accountants and lawyers, who are bound by confidentiality.</li>
          <li>With authorities, when the law requires it or to protect our rights, our partners, or others.</li>
          <li>With a buyer or successor if Obsidx is involved in a merger, acquisition, or sale of assets.</li>
        </ul>
        <p>We never share your personal data with third parties for their own marketing.</p>
      </>
    ),
  },
  {
    id: "international-transfers",
    title: "International Transfers",
    body: (
      <p>
        Some of our service providers process data outside your country, including outside the EEA or UK. When that happens,
        we rely on appropriate safeguards, such as the European Commission&rsquo;s Standard Contractual Clauses or an
        adequacy decision.
      </p>
    ),
  },
  {
    id: "retention",
    title: "How Long We Keep It",
    body: (
      <>
        <p>
          We keep personal data only for as long as we need it for the purposes in this policy. Application details are kept
          while we review your application and for a reasonable period afterwards in case a place opens up, unless you ask us
          to delete them sooner.
        </p>
        <p>
          If we work together, we keep records for as long as the partnership lasts and afterwards for as long as the law
          requires, for example for tax and accounting. When we no longer need data, we delete or anonymize it.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "How We Protect It",
    body: (
      <p>
        We use reasonable technical and organizational measures to protect personal data, including encrypted connections and
        access limited to the people who need it. No method of sending or storing data is completely secure, so we cannot
        guarantee absolute security.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your Rights",
    body: (
      <>
        <p>Depending on where you live, you may have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you.</li>
          <li>Correct data that is wrong or incomplete.</li>
          <li>Ask us to delete your data.</li>
          <li>Object to, or ask us to restrict, how we use it.</li>
          <li>Receive your data in a portable format.</li>
          <li>Withdraw consent at any time, where we rely on consent.</li>
        </ul>
        <p>
          To use any of these rights, email <Email />. We may need to confirm your identity first. You can also complain to
          your local data protection authority, but we would appreciate the chance to resolve your concern first.
        </p>
      </>
    ),
  },
  {
    id: "california",
    title: "California Residents",
    body: (
      <p>
        If you live in California, you have the right to know what personal information we collect and how we use it, to ask
        us to correct or delete it, and not to be treated differently for using these rights. We do not sell or share personal
        information for cross-context behavioral advertising, as those terms are defined in the California Consumer Privacy
        Act.
      </p>
    ),
  },
  {
    id: "children",
    title: "Children",
    body: (
      <p>
        Obsidx works with adult creators. Our website and services are not intended for anyone under 18, and we do not
        knowingly collect their personal data. If you believe a child has sent us personal data, contact us and we will delete
        it.
      </p>
    ),
  },
  {
    id: "other-sites",
    title: "Links to Other Sites",
    body: (
      <p>
        Our website links to social media platforms and other sites we do not control. Their own privacy policies apply when
        you visit them.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    body: (
      <p>
        We may update this policy from time to time. The &ldquo;Last updated&rdquo; date at the top shows when it last
        changed. If we make significant changes, we will make them clear on this page.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact Us",
    body: (
      <p>
        Questions about this policy or your personal data: <Email />.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro={
        <p>
          This policy explains what personal data Obsidx collects when you visit {siteUrl} or apply to work with us, why we
          collect it, who we share it with, and the choices you have.
        </p>
      }
      sections={sections}
    />
  );
}
