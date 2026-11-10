import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/LegalPage";
import { contactEmail, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions | Obsidx",
  description: "The terms that apply when you use the Obsidx website or apply to work with Obsidx.",
};

const Email = () => <a href={`mailto:${contactEmail}`}>{contactEmail}</a>;

const sections: LegalSection[] = [
  {
    id: "about-this-website",
    title: "About This Website",
    body: (
      <p>
        The website explains how Obsidx partners with creators and lets you apply to work with us. Nothing on the website is
        an offer to enter a partnership. Any partnership is governed by a separate written agreement between you and Obsidx,
        and if that agreement conflicts with these Terms, the agreement takes priority.
      </p>
    ),
  },
  {
    id: "applying",
    title: "Applying to Work With Obsidx",
    body: (
      <ul>
        <li>You must be at least 18 and able to enter a binding agreement.</li>
        <li>
          The information you give must be accurate, and you must have the right to share it. If you apply for a business,
          you confirm you are authorized to act for it.
        </li>
        <li>
          Applying does not guarantee a call, a place, or a partnership. We work with a limited number of creators and decide
          at our discretion which applications to take forward.
        </li>
        <li>Seat counts and availability shown on the website are indicative and may change at any time.</li>
        <li>
          We handle the information in your application as described in our <a href="/privacy">Privacy Policy</a>.
        </li>
      </ul>
    ),
  },
  {
    id: "earnings-disclaimer",
    title: "Results and Earnings Disclaimer",
    body: (
      <>
        <p>
          Examples, figures, and screenshots on the website show what has been possible for specific partners. They are not
          typical, and they are not a promise or guarantee of what you will earn. Results depend on many factors outside our
          control, including your audience, niche, offer, market conditions, and the time and effort you commit.
        </p>
        <p>
          Nothing on the website is financial, investment, legal, or tax advice. Speak to a qualified professional before
          making decisions that depend on it.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    body: (
      <>
        <p>
          The website and its content, including text, graphics, illustrations, the Obsidx name and logo, and the design of
          the site, belong to Obsidx or its licensors and are protected by intellectual property laws. You may view and share
          pages from the website for your own non-commercial purposes. You may not copy, adapt, republish, or sell any part
          of it without our written permission.
        </p>
        <p>
          Names and logos of third-party tools shown on the website belong to their owners. They identify tools we work with
          and do not imply endorsement or partnership.
        </p>
      </>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable Use",
    body: (
      <>
        <p>When you use the website, you agree not to:</p>
        <ul>
          <li>Submit false, misleading, or spam applications, or apply for someone else without their permission.</li>
          <li>Copy, scrape, or harvest content or data from the website with automated tools.</li>
          <li>Interfere with the website&rsquo;s security or operation, or try to gain unauthorized access to it.</li>
          <li>Send anything harmful, unlawful, or that infringes anyone&rsquo;s rights.</li>
          <li>Use the website in any way that breaks the law.</li>
        </ul>
      </>
    ),
  },
  {
    id: "third-party-links",
    title: "Third-Party Links and Services",
    body: (
      <p>
        The website links to third-party websites and platforms, such as social media profiles. We do not control them and
        are not responsible for their content, policies, or practices.
      </p>
    ),
  },
  {
    id: "availability",
    title: "Availability of the Website",
    body: (
      <p>
        We may change, suspend, or remove any part of the website at any time. We aim to keep it available and accurate, but
        we do not guarantee that it will always be available, error-free, or up to date.
      </p>
    ),
  },
  {
    id: "disclaimer",
    title: "Disclaimer",
    body: (
      <p>
        The website is provided &ldquo;as is&rdquo; and &ldquo;as available.&rdquo; To the fullest extent permitted by law,
        we make no warranties of any kind about the website or its content, whether express or implied.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    body: (
      <p>
        To the fullest extent permitted by law, Obsidx is not liable for any indirect, incidental, special, or consequential
        loss, or for any loss of profit, revenue, data, or business opportunity, arising from your use of the website or your
        reliance on its content. Nothing in these Terms limits liability that cannot be limited by law, such as liability for
        fraud, or for death or personal injury caused by negligence.
      </p>
    ),
  },
  {
    id: "indemnity",
    title: "Indemnity",
    body: (
      <p>
        You agree to cover reasonable losses and costs that Obsidx incurs because you broke these Terms or misused the
        website.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to These Terms",
    body: (
      <p>
        We may update these Terms from time to time. The &ldquo;Last updated&rdquo; date at the top shows when they last
        changed. If you keep using the website after a change, you accept the updated Terms.
      </p>
    ),
  },
  {
    // TODO: name the country (and courts) once the Obsidx legal entity is confirmed.
    id: "governing-law",
    title: "Governing Law",
    body: (
      <p>
        These Terms are governed by the laws of the country where Obsidx is registered, and its courts have jurisdiction over
        any dispute about them. If you are a consumer, you also keep any protection given to you by the mandatory laws of the
        country where you live.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact Us",
    body: (
      <p>
        Questions about these Terms: <Email />.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      intro={
        <p>
          These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your use of {siteUrl} and the process of applying to work
          with Obsidx (&ldquo;Obsidx,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). By using the website or
          submitting an application, you agree to these Terms. If you do not agree, please do not use the website.
        </p>
      }
      sections={sections}
    />
  );
}
