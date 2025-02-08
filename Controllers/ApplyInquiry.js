const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

// Setup Nodemailer transporter
const Transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS,
    },
});

const ApplyInquiry = async (req, res) => {

    try {
        const { fullname, email, number, course, message } = req.body

        if (!fullname) {
            res.status(401).json({ message: "Fullname is required" })
        }
        if (!email) {
            res.status(401).json({ message: "Email is required" })
        }
        if (!number) {
            res.status(401).json({ message: "Number is required" })
        }
        if (!course) {
            res.status(401).json({ message: "Course is required" })
        }

        const Owner = await Transporter.sendMail({
            from: process.env.USER,
            to: process.env.OWNER,
            subject: `New Course Inquiry for '${course}'`,
            html: `<p>A new student inquired for '${course}'</p>
            <p><strong>Below are the details:</strong></p>
            <ul>
                <li><strong>Full Name:</strong> ${fullname}</li>
                <li><strong>Phone Number:</strong> ${number}</li>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Selected Course:</strong> ${course}</li>
                <li><strong>Message:</strong> ${message}</li>
            </ul>
            <p>Please review and respond.</p>
            <p><strong>Best Regards,</strong><br>ICOESS Solutions Pvt. Ltd.</p>
            `
        })

        const Receiver = await Transporter.sendMail({
            from: process.env.USER,
            to: `${email}`,
            subject: `ICOESS Solutions: Your Inquiry for '${course}' successfully submitted.`,
            html: `
            <p>Dear ${fullname},</p>

            <p>Thank you for inquiring with Icoess Solutions. Our representitive will be in touch with you soon.</p>

            <ul>
                <li><strong>Full Name:</strong> ${fullname}</li>
                <li><strong>Phone Number:</strong> ${number}</li>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Selected Course: ${course}</strong></li>
                <li><strong>Message:</strong> ${message}</li>
            </ul>

            <span><strong>Best Regards,</strong><br>ICOESS Solutions Pvt. Ltd.</span><br>
            <a href="https://icoesolution.com">https://icoesolution.com</a><br><br>
            <span>Whatsapp : </span><a href="https://wa.me/+919811160436">+919811160436</a><br>
            <span>Mobile : </span><a href="tel:+919981810146">+919981810146</a><br>
            <span>Email : </span><a href="mailto:girjesh.mishra@icoesolution.com">girjesh.mishra@icoesolution.com</a><br>
            <p><strong>Note: </strong>This is Auto generated Email, Please do not reply, our representative will be in touch with you shortly.</p>

            `
        })

        res.status(200).json({ status: "success", message: "Mail sent successfully" })
    }
    catch (err) {
        console.log("Error is", err)
        res.status(401).json({ message: `Something else ${err}` })
    }
}

module.exports = ApplyInquiry;