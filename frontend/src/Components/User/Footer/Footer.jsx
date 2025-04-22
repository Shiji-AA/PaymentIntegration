import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faXTwitter,
  faLinkedin,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

import { Link } from "react-router-dom";
import logoArcite from "../../../assets/logoArcite.png";

function Footer() {
  return (
    <div className="border-t border-gray-200">
      <footer className="bg-gray-100 dark:bg-black">
        <div className="mx-auto w-full max-w-screen-xl px-8 lg:px-16 py-8">
          <div className="grid md:grid-cols-6 gap-8">
            {/* First div - takes 2 columns */}
            <div className="col-span-2">
              <Link to="" className="flex items-center mb-4">
                <img src={logoArcite} className="h-12 w-36 mr-3" alt="ARCITE" />
              </Link>
              <p className="text-sm text-gray-700 dark:text-gray-400 leading-6 text-justify max-w-md">
                ARCITE, an ISO 9001-2015 certified institution, was founded in
                2015 with the goal of fostering a better engineering culture by
                providing quality and affordable training programs to the
                emerging engineering community.
              </p>

              <div className="mt-12">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                  Follow Us
                </h3>
                <div className="flex gap-4 mt-3">
                  {[
                    {
                      href: "https://www.facebook.com/arciteschooloftechnicaleducation/",
                      icon: faFacebookF,
                      bg: "#e7f3ff",
                      color: "#3b5998",
                    },
                    {
                      href: "https://www.instagram.com/arcite.in/",
                      icon: faInstagram,
                      bg: "#FFE5E5",
                      color: "#B22222",
                    },
                    {
                      href: "https://x.com/arcite_in",
                      icon: faXTwitter,
                      bg: "#e7f3ff",
                      color: "#3b5998",
                    },
                    {
                      href: "https://www.youtube.com/@arciteschooloftechnicaledu6571",
                      icon: faYoutube,
                      bg: "#FFE5E5",
                      color: "#B22222",
                    },
                    {
                      href: "https://www.linkedin.com/company/arc-institute-of-technical-education/",
                      icon: faLinkedin,
                      bg: "#e7f3ff",
                      color: "#3b5998",
                    },
                  ].map(({ href, icon, bg, color }, index) => (
                    <a key={index} href={href} target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon
                        icon={icon}
                        className="p-2 rounded-md"
                        style={{ backgroundColor: bg, color }}
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Second div - takes 1 column */}
            <div className="col-span-1">
              <h3 className="mb-4 text-lg font-semibold text-gray-1000 dark:text-white">
                Departments
              </h3>
              <ul className="text-gray-900 dark:text-gray-600 space-y-2">
                {["Mechanical Engineering", "Electrical Engineering", "Civil Engineering", "Data Science", "Media"].map((dept, index) => (
                  <li key={index} className="text-sm">{dept}</li>
                ))}


                  {/* More Section Heading */}
  <li className="pt-4 text-gray-1000 dark:text-white font-semibold text-lg">More</li>

{/* More Links */}
<li>
  <Link to="/refundPolicy" className="text-sm hover:text-teal-600 transition-colors">Refund Policy</Link>
</li>
<li>
  <Link to="/terms-and-conditions" className="text-sm hover:text-teal-600 transition-colors">Terms & Conditions</Link>
</li>
<li>
  <Link to="/privacyPolicy" className="text-sm hover:text-teal-600 transition-colors">Privacy Policy</Link>
</li>
              </ul>
            </div>

            {/* Third div - takes 1 column */}
            <div className="col-span-1">
              <h3 className="mb-4 text-lg font-semibold text-gray-1000 dark:text-white">
                Our Concerns
              </h3>
              <ul className="text-gray-900 dark:text-gray-600 space-y-2">
                <li>
                  <a
                    href="https://technical.arcite.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm transition-colors duration-200 hover:text-teal-600"
                  >
                    ARCITE School of Technical Education
                  </a>
                </li>
                <li>
                  <a
                    href="https://k12.arcite.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm transition-colors duration-200 hover:text-teal-600"
                  >
                    ARCITE K12
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.arcite.in/school_media/home"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm transition-colors duration-200 hover:text-teal-600"
                  >
                    ARCITE School of Media
                  </a>
                </li>
                <li>
                  <a
                    href="https://data-science.arcite.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm transition-colors duration-200 hover:text-teal-600"
                  >
                    ARCITE School of Data Science
                  </a>
                </li>
              
              </ul>
            </div>

            {/* Fourth div - takes 2 columns */}
            <div className="col-span-2">
              <h3 className="mb-4 text-lg font-semibold text-gray-1000 dark:text-white">
                Contact Us
              </h3>
              <ul className="text-gray-900 dark:text-gray-400 space-y-3">
                {[
                  {
                    icon: "📍",
                    text: "Kottiyam Campus: Second floor SAS Arcade Opp. Vyapara Bhavan, Kottiyam, Kollam, Kerala 691571",
                  },
                  {
                    icon: "📍",
                    text: "Kochi Campus: Second floor SAS Arcade Opp. Vyapara Bhavan, Kottiyam, Kollam, Kerala 691571",
                  },
                  {
                    icon: "📍",
                    text: "Kadappakkada Campus: Second floor SAS Arcade Opp. Vyapara Bhavan, Kottiyam, Kollam, Kerala 691571",
                  },
                  {
                    icon: "✉️",
                    text: "info@arcite.in",
                  },
                  {
                    icon: "📞",
                    text: "+91-799 421 1144",
                  },
                ].map(({ icon, text }, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-lg">{icon}</span>
                    <p className="text-sm max-w-sm">{text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="sm:flex sm:items-center sm:justify-center border-t border-gray-300 pt-6 mt-6">
            <span className="text-sm text-gray-900 sm:text-center dark:text-gray-400">
              © 2025 <a href="https://arcite.in/" className="text-teal-800">Powered By ARCITE</a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;