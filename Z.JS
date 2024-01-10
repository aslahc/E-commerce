const otpCache = {};

// emai sending
const sendEmailWithVerification = async (email) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Generate OTP
    const otp = otpGenerator.generate(6, {
      upperCase: false,
      specialChars: false,
    });

    otpCache[email] = otp;

  

    // Set up email data
    let mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Email Verification Code",
      html: `<h3><span style='color: #FF0000;'>ABC Furniture</span> </h3>
       <h5>Account Verification Code 📩</h5>
       <h1>${otp}</h1>
       `,
    };

    // Send the email
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.log(Error: ${error.message});
  }
};