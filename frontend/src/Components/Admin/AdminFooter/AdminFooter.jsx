import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import logoArcite2 from "../../../assets/logoArcite.png";
import {
  faFacebookF,
  faInstagram,
  faXTwitter,
  faLinkedin,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faPhone,
  faMapMarkerAlt,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

function AdminFooter() {
  return (
    <footer className="relative text-gray-800">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
    
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-white opacity-10"></div>

      {/* Footer Content */}
      <div className="relative max-w-screen-xl px-4 py-6 mx-auto sm:px-6 lg:px-16">

        
      <div className="grid grid-cols-1 gap-0 lg:grid-cols-3">
  {/* First Section: Logo and Description */}
  <div className="lg:col-span-2">
    <img src={logoArcite2} className="mr-5 h-6 sm:h-9" alt="logo" />
    <p className=" font-custom font-normal text-sm md:text-sm mt-6 text-gray-800 leading-relaxed max-w-[500px] sm:max-w-[500px] mx-auto sm:mx-0 text-justify">
  StepGlobal is designed to connect job seekers with opportunities
  across the globe. It aims to establish a comprehensive job portal,
  bridging geographical gaps and empowering candidates to find
  industry-relevant jobs, no matter where they are.
</p>

  </div>

  {/* Middle Section: Follow Us and Contact Us */}
  <div className="grid grid-cols-1 gap-8 lg:col-span-1 sm:grid-cols-2 lg:grid-cols-2">
    <div>
      <h2 className="font-semibold mb-4 text-md  text-gray-800">
        Follow Us
      </h2>
      <ul className="space-y-3">
        {[ 
          { href: "https://www.facebook.com/arciteschooloftechnicaleducation/", icon: faFacebookF, label: "Facebook" },
          { href: "https://www.instagram.com/arcite.in/", icon: faInstagram, label: "Instagram" },
          { href: "https://x.com/arcite_in", icon: faXTwitter, label: "Twitter" },
          { href: "https://www.linkedin.com/company/arc-institute-of-technical-education/", icon: faLinkedin, label: "LinkedIn" },
          { href: "https://www.youtube.com/@arciteschooloftechnicaledu6571", icon: faYoutube, label: "YouTube" },
        ].map(({ href, icon, label }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 transition-all hover:text-teal-300 hover:translate-x-2"
            >
              <FontAwesomeIcon
                icon={icon}
                size="sm"
                className="text-tealLight hover:bg-tealLight hover:text-teal-900 p-1 rounded-full transition-colors"
              />
              <span className="text-sm">{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
    <div>
      <h2 className=" font-semibold mb-4 text-md  text-gray-800">
        Contact Us
      </h2>
      <ul className="space-y-3">
        {[ 
          { icon: faPhone, text: "9633221153" },
          { icon: faMapMarkerAlt, text: "Kerala, India" },
          { icon: faEnvelope, text: "info@stepglobal.in" },
        ].map(({ icon, text }) => (
          <li key={text} className="flex items-center gap-4 text-sm">
            <FontAwesomeIcon icon={icon} className="text-teal-300" />
            <span>{text}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
</div>




        <span className="font-custom font-normal text-gray-800 text-center sm:text-left text-sm block mt-4">
          © 2025{" "}
          <a href="#">
            An{" "}
            <a
              href="https://www.arcite.in/"
              className="text-tealLight"
              style={{ display: "inline-flex", alignItems: "center" }}
            >
              ARCITE
            </a>{" "}
            Initiative
          </a>
        </span>
      </div>
    </footer>
  );
}

export default AdminFooter;