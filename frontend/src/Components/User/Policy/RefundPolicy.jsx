import React from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar1";

function RefundPolicy() {
  return (
    <>
    <Navbar/>
        <div className="bg-white min-h-screen py-12 px-6 sm:px-12 md:px-24 lg:px-48 text-gray-800">
      <div className="max-w-4xl mx-auto border-2 border-gray-300 rounded-lg p-8 shadow-sm">
        <h1 className="text-3xl font-bold mb-6 text-center text-teal-700">Refund Policy</h1>

        <p className="mb-6 text-sm text-gray-600 text-center">
          Last updated: April 21, 2025
        </p>

        <p className="mb-4 text-sm leading-relaxed">
          At ARCITE, we are committed to providing high-quality education and excellent service. However, we understand that there may be circumstances where a refund is necessary. Please review our refund policy below.
        </p>

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-teal-600 mb-2">1. Eligibility for Refund</h2>
            <ul className="list-disc ml-6 text-sm leading-relaxed">
              <li>Refunds can only be requested within <strong>7 days</strong> of course enrollment.</li>
              <li>No refunds will be granted once a certificate of completion is issued.</li>
              <li>Only courses purchased directly through our platform are eligible for refunds.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-teal-600 mb-2">2. How to Request a Refund</h2>
            <ul className="list-disc ml-6 text-sm leading-relaxed">
              <li>Email us at <strong>support@arcite.in</strong> with your course details and reason for the refund.</li>
              <li>Include your payment receipt or transaction ID.</li>
              <li>Allow up to 5–7 business days for processing.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-teal-600 mb-2">3. Non-Refundable Situations</h2>
            <ul className="list-disc ml-6 text-sm leading-relaxed">
              <li>Refunds are not applicable for trial versions, free courses, or downloadable content.</li>
              <li>Refunds will not be processed for users violating our Terms & Conditions.</li>
              <li>In case of technical issues, users must first contact our support for resolution.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-teal-600 mb-2">4. Contact for Refund Queries</h2>
            <p className="text-sm leading-relaxed">
              If you have any questions about our refund policy or need help with a refund request, feel free to reach out:
            </p>
            <p className="text-sm mt-2">📧 support@arcite.in</p>
            <p className="text-sm">📞 +91-799 421 1144</p>
          </section>
        </div>
      </div>
    </div>
    <Footer/>
    </>

  );
}

export default RefundPolicy;
