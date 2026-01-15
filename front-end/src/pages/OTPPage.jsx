import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OTPPage = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleRequestOTP = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email!');
      return;
    }
    // Simulate OTP request
    setOtpSent(true);
    toast.success('OTP sent to your email!');
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    if (!otp) {
      toast.error('Please enter the OTP!');
      return;
    }
    setIsVerifying(true);
    // Simulate verification
    setTimeout(() => {
      if (otp === '123456') { // Mock correct OTP
        toast.success('OTP verified successfully!');
        setOtpSent(false);
        setEmail('');
        setOtp('');
      } else {
        toast.error('Invalid OTP!');
      }
      setIsVerifying(false);
    }, 1000);
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

      {/* Form Container */}
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl animate-fadeIn">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          {otpSent ? 'Verify OTP' : 'Request OTP'}
        </h2>
        
        {!otpSent ? (
          <form onSubmit={handleRequestOTP} className="space-y-4">
            <div>
              <label className="block text-white mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
                placeholder="Enter your email"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white font-semibold hover:bg-white/30 transition duration-300 shadow-lg"
            >
              Request OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP} className="space-y-4">
            <div>
              <label className="block text-white mb-2">OTP Code</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
                placeholder="Enter 6-digit OTP"
                maxLength="6"
              />
            </div>
            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white font-semibold hover:bg-white/30 transition duration-300 shadow-lg disabled:opacity-50"
            >
              {isVerifying ? 'Verifying...' : 'Verify OTP'}
            </button>
            <button
              type="button"
              onClick={() => setOtpSent(false)}
              className="w-full py-2 text-white/70 hover:text-white underline text-sm"
            >
              Back to Request
            </button>
          </form>
        )}
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default OTPPage;