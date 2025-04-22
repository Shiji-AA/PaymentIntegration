import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import logoArcite from "../../../assets/logoArcite.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../Redux/Slices/AuthSlice";
import downArrow from "../../../assets/icons/downArrow.png";
import menuIcon from "../../../assets/icons/menuIcon.png";
import phone from '../../../assets/icons/phoneIcon.png'
import mail from '../../../assets/icons/messageBox.png'
import location from '../../../assets/icons/locationIcon.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faXTwitter,
  faLinkedin,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

function Navbar1() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.userdata);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  
  return (
    <div>
      <nav className="flex flex-wrap items-center justify-between px-6 md:px-20 py-4 bg-white border-b border-gray-200 shadow-xl">
        {/* Left Section: Logo + Divider + Nav Links */}
        <div className="flex items-center flex-wrap">
          <img src={logoArcite} alt="ARCITE" className="h-12 w-auto" />
          <div className="hidden md:block h-6 w-[2px] bg-gray-300 mx-4"></div>

          {/* Navigation Links - visible on md and up */}
          <div className="ml-4 hidden md:flex items-center space-x-8">
            <Link
              to="https://technical.arcite.in/"
              className="text-black font-semibold hover:text-teal-700  py-2"
            >
              Home
            </Link>

            {/* ABOUT */}
            <div className="relative group">
              <div className="flex items-center text-black font-semibold hover:text-teal-700 py-2 cursor-pointer">
                About
                <img
                  src={downArrow}
                  alt="down arrow"
                  className="ml-1 h-4 w-4 text-teal-500"
                />
              </div>

              <div
                className="absolute left-0 mt-1 w-64 bg-white border border-gray-200 rounded shadow-lg 
                  z-50 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 
                  transition-all duration-200 ease-out pointer-events-auto"
              >
                <div className="border-t-4 border-teal-500 rounded-t"></div>
                <Link
                  to="https://technical.arcite.in/about-us"
                  className="block px-4 py-2 text-gray-800 hover:bg-teal-100 hover:text-teal-700"
                >
                  Who We Are
                </Link>
                <Link
                  to="https://technical.arcite.in/what-we-offer"
                  className="block px-4 py-2 text-gray-800 hover:bg-teal-100 hover:text-teal-700"
                >
                  What We Offer
                </Link>
                <Link
                  to="https://technical.arcite.in/placement-division"
                  className="block px-4 py-2 text-gray-800 hover:bg-teal-100 hover:text-teal-700"
                >
                  Placement Division
                </Link>
                <Link
                  to="https://technical.arcite.in/arcite-connect"
                  className="block px-4 py-2 text-gray-800 hover:bg-teal-100 hover:text-teal-700"
                >
                  Arcite Connect
                </Link>
              </div>
            </div>

            {/* COURSES */}

            <div className="relative group">
              <div className="flex items-center text-black font-semibold hover:text-teal-700 py-2 cursor-pointer">
                Courses
                <img
                  src={downArrow}
                  alt="down arrow"
                  className="ml-1 h-4 w-4 text-teal-500"
                />
              </div>

              <div
                className="absolute left-0 mt-1 w-64 bg-white border border-gray-200 rounded shadow-lg 
                  z-50 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 
                  transition-all duration-200 ease-out pointer-events-auto"
              >
                <div className="border-t-4 border-teal-500 rounded-t"></div>
                <Link
                  to="/"
                  className="block px-4 py-2 text-gray-800 hover:bg-teal-100 hover:text-teal-700"
                >
                  Civil Engineering
                </Link>
                <Link
                  to="/electrical"
                  className="block px-4 py-2 text-gray-800 hover:bg-teal-100 hover:text-teal-700"
                >
                  Electrical Engineering
                </Link>
                <Link
                  to="/mechanical"
                  className="block px-4 py-2 text-gray-800 hover:bg-teal-100 hover:text-teal-700"
                >
                  Mechanical Engineering
                </Link>
                <Link
                  to="/cse"
                  className="block px-4 py-2 text-gray-800 hover:bg-teal-100 hover:text-teal-700"
                >
                  Computer Science Engineering
                </Link>
                <Link
                  to="/software"
                  className="block px-4 py-2 text-gray-800 hover:bg-teal-100 hover:text-teal-700"
                >
                  Software
                </Link>
              </div>
            </div>

            <Link
              to="https://certipro.arcite.in/"
              className="text-black font-semibold hover:text-teal-700  py-2"
            >
              Certipro
            </Link>
            {/* FEEDS */}
            <div className="relative group">
              <div className="flex items-center text-black font-semibold hover:text-teal-700 py-2 cursor-pointer">
                Feeds
                <img
                  src={downArrow}
                  alt="down arrow"
                  className="ml-1 h-4 w-4 text-teal-500"
                />
              </div>
              <div
                className="absolute left-0 mt-1 w-64 bg-white border border-gray-200 rounded shadow-lg 
                  z-50 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 
                  transition-all duration-200 ease-out pointer-events-auto"
              >
                <div className="border-t-4 border-teal-500 rounded-t"></div>
                <Link
                  to="https://technical.arcite.in/news-feeds"
                  className="block px-4 py-2 text-gray-800 hover:bg-teal-100 hover:text-teal-700"
                >
                  News Feeds
                </Link>
                <Link
                  to="https://technical.arcite.in/gallery"
                  className="block px-4 py-2 text-gray-800 hover:bg-teal-100 hover:text-teal-700"
                >
                  Media Gallery
                </Link>
                <Link
                  to="https://technical.arcite.in/events"
                  className="block px-4 py-2 text-gray-800 hover:bg-teal-100 hover:text-teal-700"
                >
                  Events Gallery
                </Link>
                <Link
                  to="https://technical.arcite.in/webinars"
                  className="block px-4 py-2 text-gray-800 hover:bg-teal-100 hover:text-teal-700"
                >
                  Learn For Free
                </Link>
              </div>
            </div>

            {/* Initiatives */}

            <div className="relative group">
              <div className="flex items-center text-black font-semibold hover:text-teal-700 py-2 cursor-pointer">
                Initiatives
                <img
                  src={downArrow}
                  alt="down arrow"
                  className="ml-1 h-4 w-4 text-teal-500"
                />
              </div>

              <div
                className="absolute left-0 mt-1 w-64 bg-white border border-gray-200 rounded shadow-lg 
                  z-50 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 
                  transition-all duration-200 ease-out pointer-events-auto"
              >
                <div className="border-t-4 border-teal-500 rounded-t"></div>
                <Link
                  to="https://technical.arcite.in/stem"
                  className="block px-4 py-2 text-gray-800 hover:bg-teal-100 hover:text-teal-700"
                >
                  STEM
                </Link>
                <Link
                  to="https://technical.arcite.in/canvas"
                  className="block px-4 py-2 text-gray-800 hover:bg-teal-100 hover:text-teal-700"
                >
                  CANVAS
                </Link>
                <Link
                  to="https://technical.arcite.in/igbc-student-chapter"
                  className="block px-4 py-2 text-gray-800 hover:bg-teal-100 hover:text-teal-700"
                >
                  IGBC Student Chapter
                </Link>
                <Link
                  to="https://technical.arcite.in/organizational-member-of-ici"
                  className="block px-4 py-2 text-gray-800 hover:bg-teal-100 hover:text-teal-700"
                >
                  Organizational Member of ICI
                </Link>
              </div>
            </div>
            <Link
              to="https://technical.arcite.in/contact-us"
              className="text-black font-semibold hover:text-teal-700 py-2"
            >
              Contact
            </Link>
          </div>
        </div>
        {user && (
          <button
            onClick={handleLogout}
            className="bg-teal-400 text-black font-semibold hover:text-white hover:bg-teal-600  py-2 rounded"
          >
            Logout
          </button>
        )}

        {/* Right Section: Menu Icon + Hamburger */}
        <div className="flex items-center space-x-4 ml-auto">
       {/* Menu Box Icon */}
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 text-white rounded-md"
          >
            <img src={menuIcon} alt="Menu" className="h-6 w-6" />
          </button>

          {/* Modal Offcanvas */}
          {isOpen && (
            <div
              className="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-50"
              role="dialog"
              aria-modal="true"
              aria-labelledby="offcanvasmodal"
            >
              <div className="bg-white rounded-lg shadow-xl w-full max-w-md ml-auto overflow-y-auto max-h-screen">
                {/* Header */}
                <div className="flex justify-between items-center p-4 ">
                  <a href="/">
                    <img src={logoArcite} alt="logo" className="h-10" />
                  </a>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-10 h-10 flex items-center justify-center text-white text-xl bg-teal-600 hover:bg-black rounded-full"
                  >
                    ✕
                  </button>
                </div>

                {/* Mobile Menu Placeholder */}
                <div className="p-1 border-b">
                  <div className="mobile-menu fix">
                  <div className="p-4 border-b">
  <ul className="space-y-2 text-sm text-gray-800 font-medium">
    <li>
      <Link to="https://technical.arcite.in/" className="block py-2 hover:text-teal-700">
        Home
      </Link>
    </li>
    <li>
      <details className="group">
        <summary className="cursor-pointer py-2 hover:text-teal-700 flex items-center justify-between">
          About
          <img src={downArrow} alt="arrow" className="h-4 w-4 ml-2" />
        </summary>
        <ul className="ml-4 mt-2 space-y-2">
          <li><Link to="https://technical.arcite.in/about-us" className="block hover:text-teal-700">Who We Are</Link></li>
          <li><Link to="https://technical.arcite.in/what-we-offer" className="block hover:text-teal-700">What We Offer</Link></li>
          <li><Link to="https://technical.arcite.in/placement-division" className="block hover:text-teal-700">Placement Division</Link></li>
          <li><Link to="https://technical.arcite.in/arcite-connect" className="block hover:text-teal-700">Arcite Connect</Link></li>
        </ul>
      </details>
    </li>
    <li>
      <details className="group">
        <summary className="cursor-pointer py-2 hover:text-teal-700 flex items-center justify-between">
          Courses
          <img src={downArrow} alt="arrow" className="h-4 w-4 ml-2" />
        </summary>
        <ul className="ml-4 mt-2 space-y-2">
          <li><Link to="/civil" className="block hover:text-teal-700">Civil Engineering</Link></li>
          <li><Link to="/electrical" className="block hover:text-teal-700">Electrical Engineering</Link></li>
          <li><Link to="/mechanical" className="block hover:text-teal-700">Mechanical Engineering</Link></li>
          <li><Link to="/cse" className="block hover:text-teal-700">Computer Science Engineering</Link></li>
          <li><Link to="/software" className="block hover:text-teal-700">Software</Link></li>
        </ul>
      </details>
    </li>
    <li>
      <Link to="https://certipro.arcite.in/" className="block py-2 hover:text-teal-700">
        Certipro
      </Link>
    </li>
    <li>
      <details className="group">
        <summary className="cursor-pointer py-2 hover:text-teal-700 flex items-center justify-between">
          Feeds
          <img src={downArrow} alt="arrow" className="h-4 w-4 ml-2" />
        </summary>
        <ul className="ml-4 mt-2 space-y-2">
          <li><Link to="https://technical.arcite.in/news-feeds" className="block hover:text-teal-700">News Feeds</Link></li>
          <li><Link to="https://technical.arcite.in/gallery" className="block hover:text-teal-700">Media Gallery</Link></li>
          <li><Link to="https://technical.arcite.in/events" className="block hover:text-teal-700">Events Gallery</Link></li>
          <li><Link to="https://technical.arcite.in/webinars" className="block hover:text-teal-700">Learn For Free</Link></li>
        </ul>
      </details>
    </li>
    <li>
      <details className="group">
        <summary className="cursor-pointer py-2 hover:text-teal-700 flex items-center justify-between">
          Initiatives
          <img src={downArrow} alt="arrow" className="h-4 w-4 ml-2" />
        </summary>
        <ul className="ml-4 mt-2 space-y-2">
          <li><Link to="https://technical.arcite.in/stem" className="block hover:text-teal-700">STEM</Link></li>
          <li><Link to="https://technical.arcite.in/canvas" className="block hover:text-teal-700">CANVAS</Link></li>
          <li><Link to="https://technical.arcite.in/igbc-student-chapter" className="block hover:text-teal-700">IGBC Student Chapter</Link></li>
          <li><Link to="https://technical.arcite.in/organizational-member-of-ici" className="block hover:text-teal-700">Organizational Member of ICI</Link></li>
        </ul>
      </details>
    </li>
    <li>
      <Link to="https://technical.arcite.in/contact-us" className="block py-2 hover:text-teal-700">
        Contact
      </Link>
    </li>
    {user && (
      <li>
        <button
          onClick={handleLogout}
          className="w-full text-left py-2 text-black font-semibold hover:text-white hover:bg-teal-600"
        >
          Logout
        </button>
      </li>
    )}
  </ul>
</div>
</div>
</div>

                {/* Description */}
                <div className="p-4 hidden lg:block">
                  <p className="text-justify text-sm text-gray-700">
                    We provide the student community with 100 percent
                    practically oriented training so that they are forged into
                    industry professionals to have a successful career in their
                    respective industry.
                  </p>
                </div>
                {/* Map */}
                <div className="p-4 hidden lg:block">
                  <iframe
                    className="w-full h-48 rounded-md"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15767.45432323183!2d76.6018816!3d8.8922731!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05fda158dd943b%3A0x8e0edcd5df08ce54!2sARCITE%20SCHOOL%20OF%20MEDIA!5e0!3m2!1sen!2sin!4v1680462604656!5m2!1sen!2sin"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>

                {/* Contact Info */}
                <div className="px-4 py-6">
                  <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                    <img
  src={location}
  alt="Menu"
  className="h-8 w-8 p-[7px] border border-gray-300 rounded-md mr-2"
/>

                      <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://goo.gl/maps/2Yp6cbXpG44B4rdA8"
                        className="text-sm font-semibold text-gray-700 hover:underline"
                      >
                        2nd Floor, SAS Arcade, Opp. Vyapara Bhavan, Kottiyam,
                        Kollam, Kerala 691571
                      </a>
                    </li>
                    <li className="flex items-start">
                    <img src={phone} alt="Menu" className="h-8 w-8 p-[7px] border border-gray-300 rounded-md mr-2" />
                      <a
                        href="tel:917994211144"
                        className="text-sm font-semibold text-gray-700 hover:underline"
                      >
                        +91-799 421 1144
                      </a>
                    </li>
                    <li className="flex items-start">
                    <img src={mail} alt="Menu" className="h-8 w-8 p-[7px] border border-gray-300 rounded-md mr-2" />
                      <a
                        href="mailto:info@arcite.in"
                        className="text-sm font-semibold text-gray-700 hover:underline"
                      >
                        info@arcite.in
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Social Media Links */}
                <div className="px-4 pb-6 pt-2">
                  <ul className="flex space-x-4  text-teal-600 text-lg">
                    <li>
                      <a
                        href="https://www.facebook.com/arciteschooloftechnicaleducation"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-white  hover:bg-teal-500 p-3 bg-gray-200 rounded-md"
                      >
                        <FontAwesomeIcon icon={faFacebookF} />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.instagram.com/arcite.in"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-white  hover:bg-teal-500 p-3 bg-gray-200 rounded-md"
                      >
                        <FontAwesomeIcon icon={faInstagram} />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://youtube.com/channel/UCUwyhU-_akWoja6HTuH3RxQ"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-white hover:bg-teal-500 p-3 bg-gray-200 rounded-md"
                      >
                        <FontAwesomeIcon icon={faXTwitter} />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.linkedin.com/company/arc-institute-of-technical-education"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-white  hover:bg-teal-500 p-3 bg-gray-200 rounded-md"
                      >
                        <FontAwesomeIcon icon={faLinkedin} />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://twitter.com/arcite_in"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-white  hover:bg-teal-500 p-3 bg-gray-200 rounded-md"
                      >
                        <FontAwesomeIcon icon={faYoutube} />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar1;
