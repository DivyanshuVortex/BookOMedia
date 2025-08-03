import { Resend } from "resend";
import util from "util";
import dotenv from "dotenv";
import otpStore from "./map.js";
dotenv.config();

const resend = new Resend("re_8qebzcUm_PimbghSFF9uZ5Vfsp3qXh4rZ");

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(email, otp);
    setTimeout(
      () => {
        otpStore.delete(email);
      },
      10 * 60 * 1000
    );

    const { error } = await resend.emails.send({
      from: "BookMedia <bookmedia@resend.dev>",
      to: [email],
      subject: "Your OTP Code",
      html: `<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color: #f4f4f5;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f4f5;">
      <tr>
        <td align="center" style="padding: 40px 20px;">
          <table width="480" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); overflow: hidden;">
            <tr>
              <td>
                <img src="https://images.unsplash.com/photo-1439792675105-701e6a4ab6f0?q=80&w=1173&blur=10&auto=format&fit=crop&ixlib=rb-4.1.0"
                  alt="Background Header" width="100%" style="display: block; max-height: 180px; object-fit: cover;" />
              </td>
            </tr>
            <tr>
              <td align="center" style="padding: 30px;">
                <h2 style="font-size: 24px; color: #0f172a;">🔐 Verify Your Email</h2>
                <p style="font-size: 16px; color: #334155;">Use the OTP below to complete your verification:</p>
                <div style="font-size: 28px; font-weight: bold; letter-spacing: 4px; background-color: #e2e8f0; color: #1e293b; padding: 14px 24px; border-radius: 6px; display: inline-block; margin: 20px 0;">
                  ${otp}
                </div>
                <p style="font-size: 14px; color: #475569;">This OTP is valid for <strong>10 minutes</strong>.</p>
                <p style="font-size: 13px; color: #64748b; margin-top: 30px;">If you didn’t request this email, you can safely ignore it.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`,
    });

    if (error) {
      console.error("Resend API error:", util.inspect(error, { depth: null }));
      return res.status(400).json({ error: "Failed to send email" });
    }

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error("Email sending failed:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
