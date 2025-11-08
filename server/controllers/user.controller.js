const UserModel = require("../models/user.model");
const TempUserModel = require("../models/tempuser.model");
const UserServices = require("../services/user.service");
const transporter = require("../services/send-mail.service");

module.exports.RegisterUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(406).json({
        message: "Invalid request parameters passed Only Strings Allowed!",
      });
    }

    const ValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!ValidEmail.test(email)) {
      return res.status(406).json({
        message: "Invalid Email Address!",
      });
    }

    const AllowedEmails = [
      "gmail.com",
      "yahoo.com",
      "hotmail.com",
      "outlook.com",
      "live.com",
      "icloud.com",
      "mail.com",
    ];

    if (!AllowedEmails.includes(email.split("@")[1])) {
      return res.status(406).json({
        message: "Invalid Email Address!",
      });
    }

    const ifuser = await UserModel.findOne({ email });

    if (ifuser) {
      return res.status(400).json({
        message: "User already exists Just Login Instead!",
      });
    }

    const iftempUser = await TempUserModel.findOne({ email });

    if (iftempUser) {
      return res.status(202).json({
        message: "user Exist Already! Just Verify Your Email!",
        data: iftempUser,
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = new Date().getTime() + 5 * 60 * 1000;

    const tempuser = await UserServices.CreateTempUser({
      name,
      email,
      password,
      otp,
      otpExpiry,
    });

    const info = transporter.sendMail({
      from: "RAVX OS <endgamingai2@gmail.com>",
      to: email,
      subject: "🔐 RAVX OS - OTP Verification Required",
      html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RAVX OS - OTP Verification</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'JetBrains Mono', monospace;
            background: #000000;
            color: #22d3ee; /* cyan-400 */
            line-height: 1.6;
            padding: 20px;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #000000;
            border: 2px solid #22d3ee;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 0 50px rgba(34, 211, 238, 0.2);
        }
        
        .header {
            background: #000000;
            padding: 30px;
            text-align: center;
            border-bottom: 2px solid #22d3ee;
            position: relative;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, 
                transparent 0%, 
                #22d3ee 20%, 
                #06b6d4 50%, 
                #22d3ee 80%, 
                transparent 100%);
            animation: scanline 3s linear infinite;
        }
        
        @keyframes scanline {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        
        .logo {
            font-size: 32px;
            font-weight: 700;
            color: #22d3ee;
            margin-bottom: 10px;
            letter-spacing: 3px;
            text-shadow: 0 0 10px rgba(34, 211, 238, 0.5);
        }
        
        .tagline {
            color: #22d3ee;
            font-size: 14px;
            font-weight: 300;
            letter-spacing: 4px;
            text-transform: uppercase;
            opacity: 0.8;
        }
        
        .content {
            padding: 40px 30px;
            background: #000000;
        }
        
        .terminal-window {
            background: #000000;
            border: 2px solid #22d3ee;
            border-radius: 8px;
            padding: 25px;
            margin-bottom: 25px;
            position: relative;
        }
        
        .terminal-header {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 1px solid #155e75;
        }
        
        .terminal-dots {
            display: flex;
            gap: 6px;
            margin-right: 15px;
        }
        
        .dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
        }
        
        .dot-red { background: #ef4444; }
        .dot-yellow { background: #eab308; }
        .dot-green { background: #22c55e; }
        
        .terminal-title {
            color: #22d3ee;
            font-size: 14px;
            font-weight: 600;
        }
        
        .otp-display {
            text-align: center;
            margin: 40px 0;
            padding: 20px;
        }
        
        .otp-code {
            font-size: 48px;
            font-weight: 700;
            letter-spacing: 10px;
            color: #22d3ee;
            padding: 20px;
            border: 3px solid #22d3ee;
            border-radius: 12px;
            display: inline-block;
            background: rgba(34, 211, 238, 0.05);
            text-shadow: 0 0 20px rgba(34, 211, 238, 0.8);
            animation: glow 2s ease-in-out infinite alternate;
        }
        
        @keyframes glow {
            from {
                box-shadow: 0 0 20px rgba(34, 211, 238, 0.3),
                           0 0 30px rgba(34, 211, 238, 0.2),
                           0 0 40px rgba(34, 211, 238, 0.1);
            }
            to {
                box-shadow: 0 0 30px rgba(34, 211, 238, 0.6),
                           0 0 40px rgba(34, 211, 238, 0.4),
                           0 0 50px rgba(34, 211, 238, 0.2);
            }
        }
        
        .message {
            color: #22d3ee;
            font-size: 16px;
            text-align: center;
            margin-bottom: 25px;
            line-height: 1.8;
            opacity: 0.9;
        }
        
        .info-box {
            background: rgba(34, 211, 238, 0.05);
            border: 1px solid #22d3ee;
            border-radius: 8px;
            padding: 25px;
            margin: 30px 0;
        }
        
        .info-title {
            color: #22d3ee;
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 15px;
            text-shadow: 0 0 10px rgba(34, 211, 238, 0.5);
        }
        
        .info-content {
            color: #22d3ee;
            font-size: 14px;
            line-height: 1.8;
            opacity: 0.9;
        }
        
        .info-content strong {
            color: #22d3ee;
            opacity: 1;
        }
        
        .warning {
            background: rgba(239, 68, 68, 0.05);
            border: 1px solid #ef4444;
            border-radius: 8px;
            padding: 20px;
            margin: 25px 0;
        }
        
        .warning-title {
            color: #ef4444;
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 10px;
        }
        
        .warning-content {
            color: #fca5a5;
            font-size: 14px;
            line-height: 1.8;
        }
        
        .footer {
            background: #000000;
            padding: 30px;
            text-align: center;
            border-top: 2px solid #22d3ee;
        }
        
        .footer-text {
            color: #22d3ee;
            font-size: 12px;
            line-height: 1.6;
            margin-bottom: 15px;
            opacity: 0.8;
        }
        
        .social-links {
            display: flex;
            justify-content: center;
            gap: 25px;
            margin-top: 20px;
        }
        
        .social-link {
            color: #22d3ee;
            text-decoration: none;
            font-size: 12px;
            transition: all 0.3s ease;
            opacity: 0.8;
        }
        
        .social-link:hover {
            opacity: 1;
            text-shadow: 0 0 10px rgba(34, 211, 238, 0.5);
        }
        
        .system-info {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin-top: 25px;
            padding-top: 25px;
            border-top: 1px solid #155e75;
        }
        
        .system-item {
            text-align: center;
        }
        
        .system-label {
            color: #22d3ee;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 8px;
            opacity: 0.7;
        }
        
        .system-value {
            color: #22d3ee;
            font-size: 12px;
            font-weight: 600;
            opacity: 0.9;
        }
        
        .divider {
            height: 1px;
            background: linear-gradient(90deg, 
                transparent 0%, 
                #22d3ee 50%, 
                transparent 100%);
            margin: 25px 0;
            opacity: 0.5;
        }
        
        @media (max-width: 600px) {
            body {
                padding: 10px;
            }
            
            .container {
                margin: 0;
                border-radius: 8px;
            }
            
            .header {
                padding: 25px 20px;
            }
            
            .content {
                padding: 30px 20px;
            }
            
            .otp-code {
                font-size: 36px;
                letter-spacing: 8px;
                padding: 15px;
            }
            
            .system-info {
                grid-template-columns: 1fr;
                gap: 15px;
            }
            
            .social-links {
                flex-direction: column;
                gap: 10px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <div class="logo">RAVX OS</div>
            <div class="tagline">AI Operating System</div>
        </div>
        
        <!-- Content -->
        <div class="content">
            <!-- Terminal Window -->
            <div class="terminal-window">
                <div class="terminal-header">
                    <div class="terminal-dots">
                        <div class="dot dot-red"></div>
                        <div class="dot dot-yellow"></div>
                        <div class="dot dot-green"></div>
                    </div>
                    <div class="terminal-title">root@ravx-os:~/# otp_verification</div>
                </div>
                
                <div class="message">
                    SECURE ACCESS VERIFICATION REQUIRED<br>
                    Enter the following OTP to authenticate your identity
                </div>
                
                <!-- OTP Display -->
                <div class="otp-display">
                    <div class="otp-code">${otp}</div>
                </div>
                
                <div class="message">
                    This OTP is valid for <strong>5 minutes</strong><br>
                  Do not share this code with anyone
                </div>
            </div>
            
            <!-- Divider -->
            <div class="divider"></div>
            
            <!-- Information Box -->
            <div class="info-box">
                <div class="info-title">🔒 Security Notice</div>
                <div class="info-content">
                    • This OTP is for your RAVX OS account verification<br>
                    • The code will expire in 5 minutes for security<br>
                    • If you didn't request this, please ignore this email<br>
                    • Contact support immediately if you suspect foul play
                </div>
            </div>
            
            <!-- Warning Box -->
            <div class="warning">
                <div class="warning-title">⚠️ Important Security Alert</div>
                <div class="warning-content">
                    RAVX OS will never ask for your password or OTP via email.<br>
                    Always verify you're on the official RAVX OS platform.
                </div>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <div class="footer-text">
                This is an automated message from RAVX OS Security System<br>
                Please do not reply to this email
            </div>
            
            <!-- System Info -->
            <div class="system-info">
                <div class="system-item">
                    <div class="system-label">Timestamp</div>
                    <div class="system-value">${new Date().toLocaleString()}</div>
                </div>
                <div class="system-item">
                    <div class="system-label">Request IP</div>
                    <div class="system-value">SECURED</div>
                </div>
                <div class="system-item">
                    <div class="system-label">System</div>
                    <div class="system-value">RAVX-OS v4.2.1</div>
                </div>
                <div class="system-item">
                    <div class="system-label">Encryption</div>
                    <div class="system-value">AES-256</div>
                </div>
            </div>
            
            <div class="social-links">
                <a href="#" class="social-link">Support</a>
                <a href="#" class="social-link">Documentation</a>
                <a href="#" class="social-link">Status</a>
                <a href="#" class="social-link">Security</a>
            </div>
        </div>
    </div>
</body>
</html>
  `,
    });

    res.status(201).json({
      message:
        "User Created Successfully! Check Your Email For OTP Verification",
      data: tempuser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports.ResendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (typeof email !== "string") {
      return res.status(406).json({
        message: "Invalid request parameters passed Only Strings Allowed!",
      });
    }

    const iftempUser = await TempUserModel.findOne({ email });

    if (!iftempUser) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = new Date().getTime() + 5 * 60 * 1000;

    const info = transporter.sendMail({
      from: "RAVX OS <endgamingai2@gmail.com>",
      to: email,
      subject: "🔐 RAVX OS - OTP Verification Required",
      html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RAVX OS - OTP Verification</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'JetBrains Mono', monospace;
            background: #000000;
            color: #22d3ee; /* cyan-400 */
            line-height: 1.6;
            padding: 20px;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #000000;
            border: 2px solid #22d3ee;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 0 50px rgba(34, 211, 238, 0.2);
        }
        
        .header {
            background: #000000;
            padding: 30px;
            text-align: center;
            border-bottom: 2px solid #22d3ee;
            position: relative;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, 
                transparent 0%, 
                #22d3ee 20%, 
                #06b6d4 50%, 
                #22d3ee 80%, 
                transparent 100%);
            animation: scanline 3s linear infinite;
        }
        
        @keyframes scanline {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        
        .logo {
            font-size: 32px;
            font-weight: 700;
            color: #22d3ee;
            margin-bottom: 10px;
            letter-spacing: 3px;
            text-shadow: 0 0 10px rgba(34, 211, 238, 0.5);
        }
        
        .tagline {
            color: #22d3ee;
            font-size: 14px;
            font-weight: 300;
            letter-spacing: 4px;
            text-transform: uppercase;
            opacity: 0.8;
        }
        
        .content {
            padding: 40px 30px;
            background: #000000;
        }
        
        .terminal-window {
            background: #000000;
            border: 2px solid #22d3ee;
            border-radius: 8px;
            padding: 25px;
            margin-bottom: 25px;
            position: relative;
        }
        
        .terminal-header {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 1px solid #155e75;
        }
        
        .terminal-dots {
            display: flex;
            gap: 6px;
            margin-right: 15px;
        }
        
        .dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
        }
        
        .dot-red { background: #ef4444; }
        .dot-yellow { background: #eab308; }
        .dot-green { background: #22c55e; }
        
        .terminal-title {
            color: #22d3ee;
            font-size: 14px;
            font-weight: 600;
        }
        
        .otp-display {
            text-align: center;
            margin: 40px 0;
            padding: 20px;
        }
        
        .otp-code {
            font-size: 48px;
            font-weight: 700;
            letter-spacing: 10px;
            color: #22d3ee;
            padding: 20px;
            border: 3px solid #22d3ee;
            border-radius: 12px;
            display: inline-block;
            background: rgba(34, 211, 238, 0.05);
            text-shadow: 0 0 20px rgba(34, 211, 238, 0.8);
            animation: glow 2s ease-in-out infinite alternate;
        }
        
        @keyframes glow {
            from {
                box-shadow: 0 0 20px rgba(34, 211, 238, 0.3),
                           0 0 30px rgba(34, 211, 238, 0.2),
                           0 0 40px rgba(34, 211, 238, 0.1);
            }
            to {
                box-shadow: 0 0 30px rgba(34, 211, 238, 0.6),
                           0 0 40px rgba(34, 211, 238, 0.4),
                           0 0 50px rgba(34, 211, 238, 0.2);
            }
        }
        
        .message {
            color: #22d3ee;
            font-size: 16px;
            text-align: center;
            margin-bottom: 25px;
            line-height: 1.8;
            opacity: 0.9;
        }
        
        .info-box {
            background: rgba(34, 211, 238, 0.05);
            border: 1px solid #22d3ee;
            border-radius: 8px;
            padding: 25px;
            margin: 30px 0;
        }
        
        .info-title {
            color: #22d3ee;
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 15px;
            text-shadow: 0 0 10px rgba(34, 211, 238, 0.5);
        }
        
        .info-content {
            color: #22d3ee;
            font-size: 14px;
            line-height: 1.8;
            opacity: 0.9;
        }
        
        .info-content strong {
            color: #22d3ee;
            opacity: 1;
        }
        
        .warning {
            background: rgba(239, 68, 68, 0.05);
            border: 1px solid #ef4444;
            border-radius: 8px;
            padding: 20px;
            margin: 25px 0;
        }
        
        .warning-title {
            color: #ef4444;
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 10px;
        }
        
        .warning-content {
            color: #fca5a5;
            font-size: 14px;
            line-height: 1.8;
        }
        
        .footer {
            background: #000000;
            padding: 30px;
            text-align: center;
            border-top: 2px solid #22d3ee;
        }
        
        .footer-text {
            color: #22d3ee;
            font-size: 12px;
            line-height: 1.6;
            margin-bottom: 15px;
            opacity: 0.8;
        }
        
        .social-links {
            display: flex;
            justify-content: center;
            gap: 25px;
            margin-top: 20px;
        }
        
        .social-link {
            color: #22d3ee;
            text-decoration: none;
            font-size: 12px;
            transition: all 0.3s ease;
            opacity: 0.8;
        }
        
        .social-link:hover {
            opacity: 1;
            text-shadow: 0 0 10px rgba(34, 211, 238, 0.5);
        }
        
        .system-info {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin-top: 25px;
            padding-top: 25px;
            border-top: 1px solid #155e75;
        }
        
        .system-item {
            text-align: center;
        }
        
        .system-label {
            color: #22d3ee;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 8px;
            opacity: 0.7;
        }
        
        .system-value {
            color: #22d3ee;
            font-size: 12px;
            font-weight: 600;
            opacity: 0.9;
        }
        
        .divider {
            height: 1px;
            background: linear-gradient(90deg, 
                transparent 0%, 
                #22d3ee 50%, 
                transparent 100%);
            margin: 25px 0;
            opacity: 0.5;
        }
        
        @media (max-width: 600px) {
            body {
                padding: 10px;
            }
            
            .container {
                margin: 0;
                border-radius: 8px;
            }
            
            .header {
                padding: 25px 20px;
            }
            
            .content {
                padding: 30px 20px;
            }
            
            .otp-code {
                font-size: 36px;
                letter-spacing: 8px;
                padding: 15px;
            }
            
            .system-info {
                grid-template-columns: 1fr;
                gap: 15px;
            }
            
            .social-links {
                flex-direction: column;
                gap: 10px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <div class="logo">RAVX OS</div>
            <div class="tagline">AI Operating System</div>
        </div>
        
        <!-- Content -->
        <div class="content">
            <!-- Terminal Window -->
            <div class="terminal-window">
                <div class="terminal-header">
                    <div class="terminal-dots">
                        <div class="dot dot-red"></div>
                        <div class="dot dot-yellow"></div>
                        <div class="dot dot-green"></div>
                    </div>
                    <div class="terminal-title">root@ravx-os:~/# otp_verification</div>
                </div>
                
                <div class="message">
                    SECURE ACCESS VERIFICATION REQUIRED<br>
                    Enter the following OTP to authenticate your identity
                </div>
                
                <!-- OTP Display -->
                <div class="otp-display">
                    <div class="otp-code">${otp}</div>
                </div>
                
                <div class="message">
                    This OTP is valid for <strong>5 minutes</strong><br>
                  Do not share this code with anyone
                </div>
            </div>
            
            <!-- Divider -->
            <div class="divider"></div>
            
            <!-- Information Box -->
            <div class="info-box">
                <div class="info-title">🔒 Security Notice</div>
                <div class="info-content">
                    • This OTP is for your RAVX OS account verification<br>
                    • The code will expire in 5 minutes for security<br>
                    • If you didn't request this, please ignore this email<br>
                    • Contact support immediately if you suspect foul play
                </div>
            </div>
            
            <!-- Warning Box -->
            <div class="warning">
                <div class="warning-title">⚠️ Important Security Alert</div>
                <div class="warning-content">
                    RAVX OS will never ask for your password or OTP via email.<br>
                    Always verify you're on the official RAVX OS platform.
                </div>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <div class="footer-text">
                This is an automated message from RAVX OS Security System<br>
                Please do not reply to this email
            </div>
            
            <!-- System Info -->
            <div class="system-info">
                <div class="system-item">
                    <div class="system-label">Timestamp</div>
                    <div class="system-value">${new Date().toLocaleString()}</div>
                </div>
                <div class="system-item">
                    <div class="system-label">Request IP</div>
                    <div class="system-value">SECURED</div>
                </div>
                <div class="system-item">
                    <div class="system-label">System</div>
                    <div class="system-value">RAVX-OS v4.2.1</div>
                </div>
                <div class="system-item">
                    <div class="system-label">Encryption</div>
                    <div class="system-value">AES-256</div>
                </div>
            </div>
            
            <div class="social-links">
                <a href="#" class="social-link">Support</a>
                <a href="#" class="social-link">Documentation</a>
                <a href="#" class="social-link">Status</a>
                <a href="#" class="social-link">Security</a>
            </div>
        </div>
    </div>
</body>
</html>
  `,
    });

    const ResendOtp = await UserServices.ResendOTP({
      email,
      otp,
      otpExpiry,
    });

    res.status(200).json({
      message: "OTP Resent Successfully! Check Your Email",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports.VerifyUser = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (typeof email !== "string" || typeof otp !== "string") {
      return res.status(406).json({
        message: "Invalid request parameters passed Only Strings Allowed!",
      });
    }

    const ifUser = await UserModel.findOne({ email });

    if (ifUser) {
      return res.status(400).json({
        message: "User already exists Just Login Instead!",
      });
    }

    const iftempUser = await TempUserModel.findOne({ email });

    if (!iftempUser) {
      return res.status(404).json({
        message: "Timeout! Try Again!",
      });
    }

    const user = await UserServices.verifyotp({
      email,
      otp,
    });

    const token = await user.JWT_GEN();

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "User Verified Successfully",
      data: user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports.LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (typeof email !== "string" || typeof password !== "string") {
      return res.status(406).json({
        message: "Invalid request parameters passed Only Strings Allowed!",
      });
    }

    const ValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!ValidEmail.test(email)) {
      return res.status(406).json({
        message: "Invalid Email Address!",
      });
    }

    const User = await UserModel.findOne({ email });

    if (!User) {
      return res.status(404).json({
        message: "Invalid Email or Password!",
      });
    }

    const MatchedPassword = await User.comparePassword(password);

    if (!MatchedPassword) {
      return res.status(401).json({
        message: "Invalid Email or Password!",
      });
    }

    const token = await User.JWT_GEN();

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Welcome Back! Login Successful",
      data: User,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports.ForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (typeof email !== "string") {
      return res.status(406).json({
        message: "Invalid request parameters passed Only Strings Allowed!",
      });
    }

    const ValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!ValidEmail.test(email)) {
      return res.status(406).json({
        message: "Invalid Email Address!",
      });
    }

    const tempUser = await TempUserModel.findOne({ email });

    if (tempUser) {
      return res.status(201).json({
        message: "User already exists Just Proceed to Reset Password!",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = new Date().getTime() + 5 * 60 * 1000;

    const info = transporter.sendMail({
      from: "RAVX OS <endgamingai2@gmail.com>",
      to: email,
      subject: "🔐 RAVX OS - OTP Verification Required",
      html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RAVX OS - OTP Verification</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'JetBrains Mono', monospace;
            background: #000000;
            color: #22d3ee; /* cyan-400 */
            line-height: 1.6;
            padding: 20px;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #000000;
            border: 2px solid #22d3ee;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 0 50px rgba(34, 211, 238, 0.2);
        }
        
        .header {
            background: #000000;
            padding: 30px;
            text-align: center;
            border-bottom: 2px solid #22d3ee;
            position: relative;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, 
                transparent 0%, 
                #22d3ee 20%, 
                #06b6d4 50%, 
                #22d3ee 80%, 
                transparent 100%);
            animation: scanline 3s linear infinite;
        }
        
        @keyframes scanline {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        
        .logo {
            font-size: 32px;
            font-weight: 700;
            color: #22d3ee;
            margin-bottom: 10px;
            letter-spacing: 3px;
            text-shadow: 0 0 10px rgba(34, 211, 238, 0.5);
        }
        
        .tagline {
            color: #22d3ee;
            font-size: 14px;
            font-weight: 300;
            letter-spacing: 4px;
            text-transform: uppercase;
            opacity: 0.8;
        }
        
        .content {
            padding: 40px 30px;
            background: #000000;
        }
        
        .terminal-window {
            background: #000000;
            border: 2px solid #22d3ee;
            border-radius: 8px;
            padding: 25px;
            margin-bottom: 25px;
            position: relative;
        }
        
        .terminal-header {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 1px solid #155e75;
        }
        
        .terminal-dots {
            display: flex;
            gap: 6px;
            margin-right: 15px;
        }
        
        .dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
        }
        
        .dot-red { background: #ef4444; }
        .dot-yellow { background: #eab308; }
        .dot-green { background: #22c55e; }
        
        .terminal-title {
            color: #22d3ee;
            font-size: 14px;
            font-weight: 600;
        }
        
        .otp-display {
            text-align: center;
            margin: 40px 0;
            padding: 20px;
        }
        
        .otp-code {
            font-size: 48px;
            font-weight: 700;
            letter-spacing: 10px;
            color: #22d3ee;
            padding: 20px;
            border: 3px solid #22d3ee;
            border-radius: 12px;
            display: inline-block;
            background: rgba(34, 211, 238, 0.05);
            text-shadow: 0 0 20px rgba(34, 211, 238, 0.8);
            animation: glow 2s ease-in-out infinite alternate;
        }
        
        @keyframes glow {
            from {
                box-shadow: 0 0 20px rgba(34, 211, 238, 0.3),
                           0 0 30px rgba(34, 211, 238, 0.2),
                           0 0 40px rgba(34, 211, 238, 0.1);
            }
            to {
                box-shadow: 0 0 30px rgba(34, 211, 238, 0.6),
                           0 0 40px rgba(34, 211, 238, 0.4),
                           0 0 50px rgba(34, 211, 238, 0.2);
            }
        }
        
        .message {
            color: #22d3ee;
            font-size: 16px;
            text-align: center;
            margin-bottom: 25px;
            line-height: 1.8;
            opacity: 0.9;
        }
        
        .info-box {
            background: rgba(34, 211, 238, 0.05);
            border: 1px solid #22d3ee;
            border-radius: 8px;
            padding: 25px;
            margin: 30px 0;
        }
        
        .info-title {
            color: #22d3ee;
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 15px;
            text-shadow: 0 0 10px rgba(34, 211, 238, 0.5);
        }
        
        .info-content {
            color: #22d3ee;
            font-size: 14px;
            line-height: 1.8;
            opacity: 0.9;
        }
        
        .info-content strong {
            color: #22d3ee;
            opacity: 1;
        }
        
        .warning {
            background: rgba(239, 68, 68, 0.05);
            border: 1px solid #ef4444;
            border-radius: 8px;
            padding: 20px;
            margin: 25px 0;
        }
        
        .warning-title {
            color: #ef4444;
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 10px;
        }
        
        .warning-content {
            color: #fca5a5;
            font-size: 14px;
            line-height: 1.8;
        }
        
        .footer {
            background: #000000;
            padding: 30px;
            text-align: center;
            border-top: 2px solid #22d3ee;
        }
        
        .footer-text {
            color: #22d3ee;
            font-size: 12px;
            line-height: 1.6;
            margin-bottom: 15px;
            opacity: 0.8;
        }
        
        .social-links {
            display: flex;
            justify-content: center;
            gap: 25px;
            margin-top: 20px;
        }
        
        .social-link {
            color: #22d3ee;
            text-decoration: none;
            font-size: 12px;
            transition: all 0.3s ease;
            opacity: 0.8;
        }
        
        .social-link:hover {
            opacity: 1;
            text-shadow: 0 0 10px rgba(34, 211, 238, 0.5);
        }
        
        .system-info {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin-top: 25px;
            padding-top: 25px;
            border-top: 1px solid #155e75;
        }
        
        .system-item {
            text-align: center;
        }
        
        .system-label {
            color: #22d3ee;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 8px;
            opacity: 0.7;
        }
        
        .system-value {
            color: #22d3ee;
            font-size: 12px;
            font-weight: 600;
            opacity: 0.9;
        }
        
        .divider {
            height: 1px;
            background: linear-gradient(90deg, 
                transparent 0%, 
                #22d3ee 50%, 
                transparent 100%);
            margin: 25px 0;
            opacity: 0.5;
        }
        
        @media (max-width: 600px) {
            body {
                padding: 10px;
            }
            
            .container {
                margin: 0;
                border-radius: 8px;
            }
            
            .header {
                padding: 25px 20px;
            }
            
            .content {
                padding: 30px 20px;
            }
            
            .otp-code {
                font-size: 36px;
                letter-spacing: 8px;
                padding: 15px;
            }
            
            .system-info {
                grid-template-columns: 1fr;
                gap: 15px;
            }
            
            .social-links {
                flex-direction: column;
                gap: 10px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <div class="logo">RAVX OS</div>
            <div class="tagline">AI Operating System</div>
        </div>
        
        <!-- Content -->
        <div class="content">
            <!-- Terminal Window -->
            <div class="terminal-window">
                <div class="terminal-header">
                    <div class="terminal-dots">
                        <div class="dot dot-red"></div>
                        <div class="dot dot-yellow"></div>
                        <div class="dot dot-green"></div>
                    </div>
                    <div class="terminal-title">root@ravx-os:~/# otp_verification</div>
                </div>
                
                <div class="message">
                    SECURE ACCESS VERIFICATION REQUIRED<br>
                    Enter the following OTP to authenticate your identity
                </div>
                
                <!-- OTP Display -->
                <div class="otp-display">
                    <div class="otp-code">${otp}</div>
                </div>
                
                <div class="message">
                    This OTP is valid for <strong>5 minutes</strong><br>
                  Do not share this code with anyone
                </div>
            </div>
            
            <!-- Divider -->
            <div class="divider"></div>
            
            <!-- Information Box -->
            <div class="info-box">
                <div class="info-title">🔒 Security Notice</div>
                <div class="info-content">
                    • This OTP is for your RAVX OS account verification<br>
                    • The code will expire in 5 minutes for security<br>
                    • If you didn't request this, please ignore this email<br>
                    • Contact support immediately if you suspect foul play
                </div>
            </div>
            
            <!-- Warning Box -->
            <div class="warning">
                <div class="warning-title">⚠️ Important Security Alert</div>
                <div class="warning-content">
                    RAVX OS will never ask for your password or OTP via email.<br>
                    Always verify you're on the official RAVX OS platform.
                </div>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <div class="footer-text">
                This is an automated message from RAVX OS Security System<br>
                Please do not reply to this email
            </div>
            
            <!-- System Info -->
            <div class="system-info">
                <div class="system-item">
                    <div class="system-label">Timestamp</div>
                    <div class="system-value">${new Date().toLocaleString()}</div>
                </div>
                <div class="system-item">
                    <div class="system-label">Request IP</div>
                    <div class="system-value">SECURED</div>
                </div>
                <div class="system-item">
                    <div class="system-label">System</div>
                    <div class="system-value">RAVX-OS v4.2.1</div>
                </div>
                <div class="system-item">
                    <div class="system-label">Encryption</div>
                    <div class="system-value">AES-256</div>
                </div>
            </div>
            
            <div class="social-links">
                <a href="#" class="social-link">Support</a>
                <a href="#" class="social-link">Documentation</a>
                <a href="#" class="social-link">Status</a>
                <a href="#" class="social-link">Security</a>
            </div>
        </div>
    </div>
</body>
</html>
  `,
    });

    const ForgotPasswordOtp = await UserServices.ForgotPasswordOtpSend({
      email,
      otp,
      otpExpiry,
    });

    res.status(200).json({
      message: "OTP Sent Successfully! Check Your Email",
      ForgotPasswordOtp,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports.UpdateNewPassword = async (req, res) => {
  try {
    const { email, otp, password } = req.body;

    if (
      typeof email !== "string" ||
      typeof otp !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(406).json({
        message: "Invalid request parameters passed Only Strings Allowed!",
      });
    }

    const ValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!ValidEmail.test(email)) {
      return res.status(406).json({
        message: "Invalid Email Address!",
      });
    }

    const UpdatePassword = await UserServices.UpdateNewPassword({
      email,
      otp,
      password,
    });

    res.status(200).json({
      message: "Password Updated Successfully! Login With New Password",
      UpdatePassword,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports.Logoutuser = async (req, res) => {
  try {
    res.clearCookie("token");

    res.status(200).json({
      message: "Logout Successful",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports.GetUserProfile = async (req, res) => {
  try {
    const UserId = req.user._id;

    if (!UserId) {
      return res.status(400).json({
        message: "Invalid User ID.",
      });
    }

    if (typeof UserId !== "string") {
      return res.status(406).json({
        message: "Invalid request parameters passed Only Strings Allowed!",
      });
    }

    const User = await UserModel.findById(UserId);

    if (!User) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    res.status(200).json({
      message: "User Profile Fetched Successfully!",
      User,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
