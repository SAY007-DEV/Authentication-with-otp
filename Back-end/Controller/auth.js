import crypto from 'crypto';
import User from '../Database/model.js';
import Sendotp from '../Utilitys/SendMail.js';

const Register = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({ email, password });
        await newUser.save();
        return res.status(201).json({ message: 'New user created successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const Otpsend = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }

        const otp = crypto.randomInt(300000, 999999).toString();
        user.otp = otp;
        user.validity = Date.now() + 7 * 60 * 1000; // 7 minutes validity
        await user.save();

        await Sendotp(email, otp);
        return res.status(200).json({ message: "OTP sent to your email" });
    } catch (error) {
        console.error('OTP sending error:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const Verifyotp = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }

        if (!user.otp || !user.validity) {
            return res.status(400).json({ message: "No OTP requested" });
        }

        if (user.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        if (user.validity < Date.now()) {
            return res.status(400).json({ message: "OTP has expired" });
        }

        user.otp = null;
        user.validity = null;
        await user.save();
        
        return res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
        console.error('OTP verification error:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export { Register, Otpsend, Verifyotp };