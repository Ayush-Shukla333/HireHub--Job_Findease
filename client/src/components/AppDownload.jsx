import AppPreview from '../assets/Hirehub.png';
import { BriefcaseIcon, BellIcon } from '@heroicons/react/24/outline';
import Footer from './Footer';

const features = [
  {
    icon: <BriefcaseIcon className="h-6 w-6 text-white" />,
    title: "Easy Apply",
    desc: "Apply to jobs with one tap."
  },
  {
    icon: <BellIcon className="h-6 w-6 text-white" />,
    title: "Instant Notifications",
    desc: "Get notified about new jobs instantly."
  },
  {
    icon: (
      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      </svg>
    ),
    title: "Personalized Jobs",
    desc: "Jobs tailored for you."
  }
];

const AppDownload = () => {
  return (
    <>
      {/* App Download Section */}
      <section className="relative bg-gradient-to-r from-blue-200 via-purple-200 to-blue-300
 text-black py-6 px-5 md:px-10 mt-15 mb-15 rounded-lg mx-4 md:mx-12">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-8 relative z-10">

          {/* Left Section */}
          <div className="space-y-3 text-center md:text-left md:w-2/5">
            {/* Logo */}


            <h2 className="text-lg md:text-2xl font-bold text-gray-600">Take your job search anywhere !!</h2>
            <p className="text-sm opacity-90 max-w-md mx-auto md:mx-0">
              Download our mobile app and apply for jobs on the go. Fast, easy, and personalized for you.
            </p>

            {/* Trust badge */}
            <div className="text-xs md:text-sm font-semibold bg-yellow-100 rounded px-2 py-1 inline-block shadow text-black">
              Trusted by 100,000+ job seekers
            </div>

            {/* Store Buttons */}
            <div className="flex justify-center md:justify-start space-x-15 mt-2">
              <a href="#">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Get it on Google Play"
                  className="h-8 sm:h-10 md:h-8 hover:scale-105 transition-transform"
                />
              </a>
              <a href="#">
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="Download on the App Store"
                  className="h-8 sm:h-10 md:h-8 hover:scale-105 transition-transform"
                />
              </a>
            </div>
          </div>

          {/* Right Section - Features */}
          <div className="flex flex-row gap-4 md:gap-6 md:w-3/5 justify-end overflow-x-auto md:overflow-visible scrollbar-hide w-full pb-2">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white/10 rounded-md p-4 text-center shadow-md w-36 md:w-40 hover:scale-105 transition-transform"
              >
                <div className="mb-1">{feature.icon}</div>
                <h4 className="font-bold text-sm mb-1">{feature.title}</h4>
                <p className="opacity-80 text-xs">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AppDownload;
