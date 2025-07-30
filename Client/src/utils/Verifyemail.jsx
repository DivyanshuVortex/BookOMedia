import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/LoginContext';

const VerifyEmail = () => {
  const { user, token } = useAuth(); // assuming your context provides this
  const [otp, setOtp] = useState('');
  const [status, setStatus] = useState(null); // 'sent', 'verified', 'error', etc.
  const [step, setStep] = useState('email'); // email / otp
  const navigate = useNavigate();

  const email = user?.email;

  useEffect(() => {
    if (!email) {
      setStatus('error');
    }
  }, [email]);

  const sendOTP = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('http://localhost:3000/api/user/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // if you secure it with auth
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setStep('otp');
        setStatus('sent');
      } else {
        setStatus('error');
        console.error(data.error || data.message);
      }
    } catch (err) {
      console.error(err.message);
      setStatus('error');
    }
  };

  const verifyOTP = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('http://localhost:3000/api/user/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // if required
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus('verified');
        setTimeout(() => navigate('/signin'), 1000);
      } else {
        setStatus('verify-failed');
        console.error(data.error || data.message);
      }
    } catch (err) {
      console.error(err.message);
      setStatus('verify-failed');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="relative z-10 max-w-md w-full bg-gray-950/80 rounded-xl shadow-md p-8 text-white backdrop-blur-sm">
        <h2 className="text-2xl font-bold mb-4">
          {step === 'email' ? '🔐 Request Email Verification' : '✅ Enter OTP'}
        </h2>

        {!email ? (
          <p className="text-red-400 text-sm">❌ No email found in session. Please login first.</p>
        ) : step === 'email' ? (
          <>
            <p className="text-sm text-gray-400 mb-6">
              Click below to send an OTP to your registered email.
            </p>
            <form onSubmit={sendOTP} className="space-y-4">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-blue-600 hover:bg-blue-700 transition-colors py-3 rounded-md font-semibold"
              >
                {status === 'loading' ? 'Sending...' : `Send OTP to ${email}`}
              </button>
            </form>
          </>
        ) : (
          <>
            <p className="text-sm text-gray-400 mb-6">
              Enter the OTP sent to <span className="text-blue-400">{email}</span>
            </p>
            <form onSubmit={verifyOTP} className="space-y-4">
              <input
                type="text"
                required
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-green-600 hover:bg-green-700 transition-colors py-3 rounded-md font-semibold"
              >
                {status === 'loading' ? 'Verifying...' : 'Verify OTP'}
              </button>
            </form>
          </>
        )}

        {/* Status Messages */}
        {status === 'sent' && step === 'otp' && (
          <p className="mt-4 text-green-400 text-sm">✅ OTP sent successfully!</p>
        )}
        {status === 'verified' && (
          <p className="mt-4 text-green-500 text-sm">🎉 Your email has been verified! Redirecting...</p>
        )}
        {status === 'verify-failed' && (
          <p className="mt-4 text-red-400 text-sm">❌ Invalid OTP. Try again.</p>
        )}
        {status === 'error' && (
          <p className="mt-4 text-red-400 text-sm">❌ Something went wrong. Try again.</p>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
