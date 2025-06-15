import { assets } from "../assets/assets";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='bg-primary text-white px-5 sm:px-10 pt-16 mt-40'>
      {/* Footer Main Section */}
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 mb-10 text-sm'>
        
        {/* Left Side */}
        <div>
          <img className='mb-5 w-40' src={assets.logo} alt="Prescripto Logo" />
          <p className='w-full md:w-2/3 text-gray-200 leading-6'>
            Prescripto is a smart doctor appointment booking platform designed to simplify healthcare access. We connect patients with trusted medical professionals, offering seamless scheduling and personalized care—all in one place.
          </p>
        </div>

        {/* Middle Side */}
        <div>
          <p className='text-xl font-semibold mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-200'>
            <li className="hover:text-white cursor-pointer transition">Home</li>
            <li className="hover:text-white cursor-pointer transition">About us</li>
            <li className="hover:text-white cursor-pointer transition">Delivery</li>
            <li className="hover:text-white cursor-pointer transition">Privacy policy</li>
          </ul>
        </div>

        {/* Right Side */}
        <div>
          <p className='text-xl font-semibold mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-200'>
            <li>+1-212-456-7890</li>
            <li>greatstackdev@gmail.com</li>
          </ul>

          <div className='flex gap-4 mt-4 text-gray-200'>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="hover:text-white cursor-pointer transition" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="hover:text-white cursor-pointer transition" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="hover:text-white cursor-pointer transition" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn className="hover:text-white cursor-pointer transition" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div>
        <hr className="border-gray-300 opacity-40" />
        <p className='py-5 text-center text-sm text-gray-200'>
          © 2024 Prescripto.com — All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
