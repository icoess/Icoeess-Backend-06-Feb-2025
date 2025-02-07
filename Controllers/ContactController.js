const nodemailer = require("nodemailer")
const dotenv = require("dotenv")
dotenv.config()

const Transporter = nodemailer.createTransport({
    service:process.env.SERVICE,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    }
})

const ContactDetailssend = async (req, res) => {

    try {

        const { fullname, number, email, message } = req.body

        if (!fullname) {
            return res.status(400).json({ message: "Full name is required" })
        }
        if (!number) {
            return res.status(400).json({ message: "Number is required" })
        }
        else if (number.length != 10) {
            return res.status(400).json({ message: "Number must in 10 digits" })
        }
        if (!email) {
            return res.status(400).json({ message: "Email is required" })
        }
        if (!message) {
            return res.status(400).json({ message: "Message is required" })
        }

        const Owner = await Transporter.sendMail({
            from: process.env.USER,
            to: process.env.OWNER,
            subject: "New Inquiry from ICOESS Solutions Contact Form",
            html: `<p>Hi Girjesh,</p>
            
            <p>You have a new inquiry submission from ICOESS Solutions contact form. Here are the contact person details:</p>
            
            <ul>
            <li><strong>Full Name</strong> : ${fullname}</li>
            <li><strong>Number</strong> : ${number}</li>
            <li><strong>Email</strong> : ${email}</li>
            <li><strong>Message</strong> : ${message}</li>
            </ul>

            <p>Please review and respond accordingly.</p>
            <p><strong>Best Regards,</strong><br>ICOESS Solutions Pvt. Ltd.</p>

            `
        })

        const Receiver = await Transporter.sendMail({
            from: process.env.USER,
            to: `${email}`,
            subject: "ICOESS Solutions: Thank You for Reaching Out!",
            html: `<p>Hi ${fullname}</p>

            <p>Thank you for contacting us! We’ve received your message, and our team will get back to you as soon as possible.</p>
            <p>If your inquiry is urgent, please feel free to call us directly at <a href="tel:+919981810146">+919981810146</a></p>
            <br>
            <p><strong>Best Regards,</strong><br>ICOESS Solutions Pvt. Ltd.</p>
            <a href="https://icoesolution.com">https://icoesolution.com</a><br>
            <a href="tel:+919981810146">+919981810146</a><br>
            <a href="mailto:girjesh.mishra@icoesolution.com">girjesh.mishra@icoesolution.com</a>
            `
        })

        res.status(200).json({ message: "Sent Successfully" })
    }
    catch (err) {
        res.status(400).json({ message: `Have a server issue : ${err}` })
        console.error(err)
    }
}

module.exports = ContactDetailssend