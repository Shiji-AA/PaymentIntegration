import React from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar1";

function PrivacyPolicy() {
  return (
    <>
    <Navbar/>

<div className="bg-white min-h-screen py-12 px-6 sm:px-12 md:px-24 lg:px-48 text-gray-800">
      <div className="max-w-4xl mx-auto border-2 border-gray-300 rounded-lg p-8 shadow-sm">
        <h1 className="text-3xl font-bold mb-6 text-center text-teal-700">Privacy Policy</h1>

        <p className="mb-6 text-sm text-gray-600 text-center">
          Last updated: April 21, 2025
        </p>

        <p className="mb-4 text-sm leading-relaxed">
          At ARCITE, your privacy is important to us. This Privacy Policy
          explains how we collect, use, and protect your personal information
          when you use our online educational services.
        </p>

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-teal-600 mb-2">1. Information We Collect</h2>
            <ul className="list-disc ml-6 text-sm leading-relaxed">
              <li>Personal details (name, email, phone number, etc.) during registration</li>
              <li>Course activity, progress, and preferences</li>
              <li>Payment information for course enrollments</li>
              <li>Device and usage data (browser, IP, pages visited, etc.)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-teal-600 mb-2">2. How We Use Your Information</h2>
            <ul className="list-disc ml-6 text-sm leading-relaxed">
              <li>To deliver and manage your course experience</li>
              <li>To send updates, newsletters, or promotional content</li>
              <li>To improve our platform, content, and user experience</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-teal-600 mb-2">3. Data Sharing & Protection</h2>
            <ul className="list-disc ml-6 text-sm leading-relaxed">
              <li>We do <strong>not</strong> sell or rent your data</li>
              <li>Data may be shared with third-party services we use (e.g., payment processors)</li>
              <li>All data is stored securely using encryption and access control</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-teal-600 mb-2">4. Your Rights</h2>
            <ul className="list-disc ml-6 text-sm leading-relaxed">
              <li>Access, update, or delete your personal information</li>
              <li>Unsubscribe from marketing communications at any time</li>
              <li>Request data export or account deletion</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-teal-600 mb-2">5. Contact Us</h2>
            <p className="text-sm leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="text-sm mt-2">📧 info@arcite.in</p>
            <p className="text-sm">📞 +91-799 421 1144</p>
          </section>
        </div>
      </div>
    </div>
    <Footer/>

    </>
 
  );
}

export default PrivacyPolicy;
