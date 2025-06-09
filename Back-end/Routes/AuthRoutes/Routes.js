import express from 'express'
import { Register, Verifyotp, Otpsend } from '../../Controller/auth.js';
const router= express.Router();

router.post('/register',Register);

router.post('/Verify-otp',Verifyotp);

router.post('/otp',Otpsend);

export default router;
