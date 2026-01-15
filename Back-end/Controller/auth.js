import crypto from 'crypto';
import User from '../Database/model.js';
import Otp from '../Database/otp.js';
import Sendotp from '../Utilitys/SendMail.js';

const Register = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password ) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    try {
        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const otpRecord = await Otp.findOne({ email: normalizedEmail });
        if (!otpRecord) {
            return res.status(400).json({ message: 'OTP expired or not requested' });
        }

        if (otpRecord.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        const newUser = new User({ email: normalizedEmail, password });
        await newUser.save();
        await Otp.deleteOne({ email: normalizedEmail }); 
        return res.status(201).json({ message: 'New user created successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const Otpsend = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    const normalizedEmail = email.toLowerCase().trim();

    try {
        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const otp = crypto.randomInt(300000, 999999).toString();
        
        // Upsert OTP (Create or Update)
        await Otp.findOneAndUpdate(
            { email: normalizedEmail },
            { email: normalizedEmail, otp, createdAt: Date.now() },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        await Sendotp(normalizedEmail, otp);
        return res.status(200).json({ message: "OTP sent to your email" });
    } catch (error) {
        console.error('OTP sending error:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const Verifyotp = async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ message: "Email and OTP are required" });
    }

    const normalizedEmail = email.toLowerCase().trim();

    try {
        const user = await User.findOne({ email: normalizedEmail });
        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }

        // Find OTP from Otp collection
        const otpRecord = await Otp.findOne({ email: normalizedEmail });
        if (!otpRecord) {
            return res.status(400).json({ message: "OTP expired or not requested" });
        }

        if (otpRecord.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        // OTP is valid (createdAt auto-expires by Mongo), so just delete after verifying
        await Otp.deleteOne({ email: normalizedEmail });

        return res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
        console.error('OTP verification error:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export { Register, Otpsend, Verifyotp };