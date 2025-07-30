// controllers/verifyOtp.js
import otpStore from "../utils/map.js"; // if using shared store

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  const storedOtp = otpStore.get(email);
  console.log(otpStore.get("divyanshuchandra9027@gmail.com"))

  if (!storedOtp) {
    return res.status(410).json({ message: "OTP expired or not found" });
  }

  if (storedOtp !== otp) {
    return res.status(401).json({ message: "Invalid OTP" });
  }

  otpStore.delete(email); // Optional: clear OTP once used
  res.status(200).json({ verified: true, message: "OTP verified successfully" });
};
