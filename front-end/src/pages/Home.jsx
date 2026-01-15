import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const handleWelcome = () => {
    toast.success('Welcome to the Home Page!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center relative overflow-hidden">
      {/* Snow Animation */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-70 animate-fall"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 w-full max-w-lg mx-4 shadow-2xl animate-fadeIn text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Welcome Home</h1>
        <p className="text-white/80 mb-6">
          This is your home page with a snowy theme. Explore the features below or navigate to other sections.
        </p>
        <div className="space-y-4">
          <button
            onClick={handleWelcome}
            className="w-full py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white font-semibold hover:bg-white/30 transition duration-300 shadow-lg"
          >
            Say Hello
          </button>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="py-2 px-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white font-semibold hover:bg-white/30 transition duration-300 shadow-lg text-center"
            >
              Go to Register
            </a>
            <a
              href="/otp"
              className="py-2 px-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white font-semibold hover:bg-white/30 transition duration-300 shadow-lg text-center"
            >
              Go to OTP
            </a>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Home;