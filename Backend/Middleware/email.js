import nodemailer from 'nodemailer';
import configVariables from '../Config/config.js';

const transporter = nodemailer.createTransport({
 service: 'Gmail',
  auth: {
    user: configVariables.EMAIL_USER,
    pass: configVariables.EMAIL_PASS
  }
});

export default transporter;
