import React from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar1";

function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <div className="bg-white min-h-screen py-12 px-6 sm:px-12 md:px-24 lg:px-48 text-gray-800">
        <div className="max-w-4xl mx-auto border border-gray-300 rounded-lg p-8 shadow">
          <h1 className="text-3xl font-bold mb-4 text-center text-teal-700">Privacy Policy</h1>
          <p className="text-sm text-center text-gray-500 mb-8">Effective Date: April 21, 2025</p>

          <div className="space-y-6 text-sm leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-teal-600 mb-2">1. Introduction</h2>
              <p>
                ARCITE Educational Solutions Pvt. Ltd. (“ARCITE”, “we”, “our”, or “us”) respects your privacy and is committed to protecting your personal data. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website https://www.arcite.in or engage with our services.
              </p>
              <p>
                By using our services or accessing our website, you agree to the terms of this Privacy Policy. If you do not agree, please do not use our services or website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-teal-600 mb-2">2. Information We Collect</h2>
              <p className="font-medium">2.1 Personal Information</p>
              <ul className="list-disc ml-6">
                <li>Full Name</li>
                <li>Contact Number</li>
                <li>Email Address</li>
                <li>Residential Address</li>
                <li>Educational Qualifications</li>
                <li>Work Experience</li>
                <li>Identity proofs (if required for verification)</li>
                <li>Application or inquiry details</li>
              </ul>
              <p className="mt-2 font-medium">2.2 Automatically Collected Information</p>
              <ul className="list-disc ml-6">
                <li>IP Address</li>
                <li>Browser Type and Version</li>
                <li>Device Information</li>
                <li>Geographic Location</li>
                <li>Referral URL</li>
                <li>Time and Date of Access</li>
                <li>Pages Visited</li>
              </ul>
              <p className="mt-2 font-medium">2.3 Cookies and Tracking</p>
              <p>
                We use cookies and other tracking technologies to improve user experience, analyze trends, and personalize content. You can control cookies through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-teal-600 mb-2">3. How We Use Your Information</h2>
              <ul className="list-disc ml-6">
                <li>To respond to your queries and requests</li>
                <li>To provide educational and training services</li>
                <li>To process admission, registration, and course enrollment</li>
                <li>To manage student or applicant profiles</li>
                <li>To send newsletters, updates, and promotional materials (with your consent)</li>
                <li>To analyze website performance and user behavior</li>
                <li>To comply with legal and regulatory obligations</li>
              </ul>
            </section>

            {/* Continue for all sections (4-13) using the same structure */}
            <section>
              <h2 className="text-xl font-semibold text-teal-600 mb-2">4.Legal Basis for Processing Personal Data</h2>
              <ul className="list-disc ml-6">
                <li>Your consent (e.g., subscribing to newsletters)</li>
                <li>Performance of a contract (e.g., course registration or employment)</li>
                <li>Legal obligations (e.g., tax or regulatory requirements)</li>
                <li>Legitimate interests (e.g., improving services, preventing fraud)</li>              
              </ul>
            </section>

            <section>
  <h2 className="text-lg font-semibold text-teal-600 mt-4">5. How We Share Your Information</h2>
  <p>We do not sell or rent your personal data. However, we may share your information in the following circumstances:</p>
  <ul className="list-disc ml-6 mt-2">
    <li>With internal teams for processing applications and service delivery</li>
    <li>With trusted third-party service providers (e.g., IT services, payment gateways, cloud hosting) under confidentiality agreements</li>
    <li>With government authorities or legal entities when required by law or legal process</li>
    <li>In the event of a business transfer, such as a merger or acquisition</li>
  </ul>
</section>

<section>
  <h2 className="text-lg font-semibold text-teal-600 mt-4">6. Data Retention</h2>
  <p>
    We retain personal data only as long as necessary for the purposes it was collected — including legal, accounting,
    or regulatory requirements. After the retention period, we securely delete or anonymize your data.
  </p>
</section>

<section>
  <h2 className="text-lg font-semibold text-teal-600 mt-4">7. Data Security</h2>
  <p>We implement technical and organizational safeguards to protect your data, including:</p>
  <ul className="list-disc ml-6 mt-2">
    <li>Secure server infrastructure</li>
    <li>Data encryption during transmission</li>
    <li>Access control mechanisms</li>
    <li>Regular data backups and audits</li>
  </ul>
  <p className="mt-2">
    However, no method of electronic transmission or storage is 100% secure. We encourage users to exercise caution
    when sharing personal information online.
  </p>
</section>


<section>
  <h2 className="text-lg font-semibold text-teal-600 mt-4">8. Your Data Protection Rights</h2>
  <p>You have the following rights under applicable data protection laws:</p>
  <ul className="list-disc ml-6 mt-2">
    <li>Right to access your personal data</li>
    <li>Right to rectify inaccurate or incomplete data</li>
    <li>Right to erasure of your data under certain conditions</li>
    <li>Right to restrict or object to processing</li>
    <li>Right to data portability</li>
    <li>Right to withdraw consent at any time</li>
    <li>Right to lodge a complaint with a data protection authority</li>
  </ul>
  <p className="mt-2">
    To exercise these rights, please contact us at <a href="mailto:info@arcite.in" className="text-teal-600 underline">info@arcite.in</a>.
  </p>
</section>

<section>
  <h2 className="text-lg font-semibold text-teal-600 mt-4">9. Children’s Privacy</h2>
  <p>
    Our services are not intended for children under the age of 13. We do not knowingly collect data from children.
    If we become aware that a child under 13 has provided personal data, we will take appropriate steps to delete
    the information from our systems.
  </p>
</section>

<section>
  <h2 className="text-lg font-semibold text-teal-600 mt-4">10. Third-Party Websites</h2>
  <p>
    Our website may contain links to third-party websites. We are not responsible for the content or privacy
    practices of those sites. We encourage users to read the privacy policies of any external websites they visit
    from arcite.in.
  </p>
</section>


<section>
  <h2 className="text-lg font-semibold text-teal-600 mt-4">11. International Data Transfers</h2>
  <p>
    If you are accessing our website from outside India, please note that your data may be transferred to, stored, and
    processed in India, where our servers and central database are located. By using our services, you consent to this
    transfer and processing of your information in accordance with this Privacy Policy.
  </p>
</section>

<section>
  <h2 className="text-lg font-semibold text-teal-600 mt-4">12. Updates to This Privacy Policy</h2>
  <p>
    We may update this Privacy Policy from time to time to reflect changes in our practices or for legal, regulatory,
    or operational reasons. The revised policy will be effective immediately upon posting with an updated “Effective Date.”
    We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your data.
  </p>
</section>



            <section>
              <h2 className="text-xl font-semibold text-teal-600 mb-2">13. Contact Information</h2>
              <p>
                If you have questions or concerns about this Privacy Policy or how your data is handled, you may contact us at:
              </p>
              <p className="mt-2">📍 ARCITE Educational Solutions Pvt. Ltd.</p>
              <p>📧 Email: info@arcite.in</p>
              <p>📞 Phone: +91-799 421 1144</p>
              <p>🌐 Website: <a href="https://www.arcite.in" className="text-blue-600 underline">https://www.arcite.in</a></p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PrivacyPolicy;
