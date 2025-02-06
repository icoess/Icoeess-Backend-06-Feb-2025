const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");
dotenv.config();

// Setup Nodemailer transporter
const Transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: process.env.PORTGMAIL,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

// Setup Multer to handle file uploads (specifically resume)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Store uploaded files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Ensure unique file names
  },
});

const upload = multer({ storage: storage }).single("resume"); // 'resume' is the name of the file input field in the frontend

const Jobdetails = async (req, res) => {
  try {
    // Use multer to handle the file upload before processing the form data
    upload(req, res, async (err) => {
      if (err) {
        console.error("File upload error:", err);
        return res.status(400).json({ message: "File upload failed" });
      }

      // Extract form data from request body
      const { fullname, number, email, department, jobtitle, experience } = req.body;

      // Validation for form data
      if (!fullname) return res.status(400).json({ message: "Full name is required" });
      if (!number) return res.status(400).json({ message: "Number is required" });
      if (number.length !== 10) return res.status(400).json({ message: "Number must be 10 digits" });
      if (!email) return res.status(400).json({ message: "Email is required" });
      if (!department) return res.status(400).json({ message: "Department is required" });
      if (!jobtitle) return res.status(400).json({ message: "Job title is required" });
      if (!experience) return res.status(400).json({ message: "Experience is required" });
      if (!req.file) return res.status(400).json({ message: "Resume is required" });

      // Prepare the email content for the owner
      const OwnerMail = await Transporter.sendMail({
        from: process.env.USER,
        to: process.env.OWNER,
        subject: `New Job Application from ${fullname}`,
        html: `<p>A new job application has been received!</p>
               <p><strong>Name:</strong> ${fullname}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Phone:</strong> ${number}</p>
               <p><strong>Department:</strong> ${department}</p>
               <p><strong>Job Title:</strong> ${jobtitle}</p>
               <p><strong>Experience:</strong> ${experience}</p>
               <p><strong>Resume:</strong> <a href="${req.protocol}://${req.get('host')}/uploads/${req.file.filename}">View Resume</a></p>`,
      });

      // Prepare the email content for the applicant
      const ReceiverMail = await Transporter.sendMail({
        from: process.env.USER,
        to: email,
        subject: "Job Application Confirmation",
        html: `<p>Dear ${fullname},</p>
               <p>Thank you for applying for the ${jobtitle} position at our company. We have received your application, after review we will we in touch with you shortly.</p>
               <p>Best regards,<br>ICOESS Solutions</p>
               <p>Mobile : +919981810146</p>
               <p>Visit:<a href="https://icoesolution.com">https://icoesolution.com/</a></p>`,
      });

      // Send success response
      res.status(200).json({ message: "Sent Successfully" });
    });
  } catch (err) {
    console.error("Server issue:", err);
    res.status(400).json({ message: `Server issue: ${err.message}` });
  }
};

module.exports = Jobdetails;

