import React from 'react';
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar1";

function TermsnConditions() {
  return (
    <>
    <Navbar/>
        <div className="bg-white min-h-screen py-12 px-6 sm:px-12 md:px-24 lg:px-48 text-gray-800">
      <div className="max-w-4xl mx-auto border-2 border-gray-300 rounded-lg p-8 shadow-sm">
        <h1 className="text-3xl font-bold mb-6 text-center text-teal-700">Terms & Conditions</h1>

        <p className="mb-6 text-sm text-gray-600 text-center">
          Last updated: April 21, 2025
        </p>

        <div className="space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-teal-600 mb-2">1. Acceptance of Terms</h2>
            <p>
              By accessing or using our platform, you agree to be bound by these Terms and Conditions, including any additional guidelines or future modifications.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-teal-600 mb-2">2. Use of Platform</h2>
            <p>
              You agree to use the platform for lawful purposes only. You may not use the services for any illegal or unauthorized activity, including violation of intellectual property rights.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-teal-600 mb-2">3. User Accounts</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. You must notify us immediately of any unauthorized use.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-teal-600 mb-2">4. Course Access & Licensing</h2>
            <p>
              Purchasing a course grants you a non-transferable, non-exclusive license to access the content for personal learning. Redistribution or resale of course materials is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-teal-600 mb-2">5. Limitation of Liability</h2>
            <p>
              ARCITE is not liable for any indirect, incidental, or consequential damages arising from the use of our services. All courses are offered “as is” without any warranties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-teal-600 mb-2">6. Modifications</h2>
            <p>
              We reserve the right to update these terms at any time. Continued use of the platform after such changes constitutes your acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-teal-600 mb-2">7. Contact Us</h2>
            <p>
              If you have any questions or concerns about these Terms & Conditions, feel free to reach out:
            </p>
            <p className="mt-2">📧 support@arcite.in</p>
            <p>📞 +91-799 421 1144</p>
          </section>
        </div>
      </div>
    </div>
    <Footer/>
    
    </>

  );
}

export default TermsnConditions;
