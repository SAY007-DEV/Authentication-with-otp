import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const Sendotp = async (email, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS // Use the App Password here
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // Verify transporter configuration
        await transporter.verify();

        const mailOptions = {
            from: `"Auth System" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Your OTP for Authentication',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">OTP Verification</h2>
                    <p>Your OTP for authentication is:</p>
                    <h1 style="color: #4CAF50; font-size: 32px; letter-spacing: 5px;">${otp}</h1>
                    <p>This OTP is valid for 7 minutes.</p>
                    <p>If you didn't request this OTP, please ignore this email.</p>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        return true;
    } catch (error) {
        console.error('Error sending OTP email:', error);
        throw new Error(`Failed to send OTP email: ${error.message}`);
    }
};

export default Sendotp;