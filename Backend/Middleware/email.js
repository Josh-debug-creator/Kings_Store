import nodemailer from 'nodemailer';
import configVariables from '../config/Config.js'
const transporter = nodemailer.createTransport({
 service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export default transporter;
