const nodemailer = require("nodemailer");
const dotenv = require("dotenv")
dotenv.config()


const transporter = nodemailer.createTransport({
    service:process.env.SERVICE,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS,
    },
});

const Mailsend = async (req, res) => {
    try {

        const { fullname, number, email, totalamount, registrationamount, course, dob, message, trnxid, receiptno } = req.body

        const Owner = await transporter.sendMail({
            from: process.env.USER,
            to: process.env.OWNER,
            subject: `Student Registration inquiry for '${course}'`,
            html: `<p>A new student has successfully registered at Icoess Solutions Pvt. Ltd.</p>
            <p><strong>Below are the details:</strong></p>
            <ul>
                <li><strong>Full Name:</strong> ${fullname}</li>
                <li><strong>Phone Number:</strong> ${number}</li>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Date of Birth:</strong> ${dob}</li>
                <li><strong>Selected Course:</strong> ${course}</li>
                <li><strong>Message:</strong> ${message}</li>
                <li><strong>Total Amount:</strong> ₹${totalamount}</li>
                <li><strong>Registration Amount:</strong> ₹${registrationamount}</li>
                <li><strong>Receipt Number:</strong> ${receiptno}</li>
                <li><strong>Transaction ID:</strong> ${trnxid}</li>
            </ul>
            <p>Please review the registration details and take the necessary actions.</p>
            <p><strong>Best Regards,</strong><br>Icoess Solutions Pvt. Ltd.</p>
            `,
        });

        const Receiver = await transporter.sendMail({
            from: 'dileeptiwari8962@gmail.com',
            to: `${email}`,
            subject: `ICOESS Solutions: Successful Registration of '${course}' `,
            html: `
            <p>Dear ${fullname},</p>

            <p>Thank you for registering with Icoess Solutions Pvt. Ltd. We are pleased to confirm that your registration has been successfully processed. Below are the details of your registration:</p>

            <ul>
                <li><strong>Full Name:</strong> ${fullname}</li>
                <li><strong>Phone Number:</strong> ${number}</li>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Date of Birth:</strong> ${dob}</li>
                <li><strong>Selected Course:</strong> ${course}</li>
                <li><strong>Message:</strong> ${message}</li>
                <li><strong>Total Amount:</strong> ${totalamount}</li>
                <li><strong>Registration Amount:</strong> ₹${registrationamount}</li>
                <li><strong>Receipt Number:</strong> ${receiptno}</li>
                <li><strong>Transaction ID:</strong> ${trnxid}</li>
            </ul>

            <p>Your registration for the selected course is now complete. We will be in touch with you shortly to provide further details regarding your course schedule and additional instructions.</p>

            <p>If you have any questions or need further assistance, feel free to contact us at - </p>
            <p>Mobile: <a href="tel:+919981810146">+919981810146</a>
            <p>Whatsapp: <a href="https://wa.me/+919981810146">+919981810146</a></p>

            <p><strong>Best Regards,</strong><br>Icoess Solutions Pvt. Ltd.</p>
        `,
        });


        res.status(200).json({ message: "Mail sent Successfull",status:"success" })
    } catch (err) {
        res.status(500).json({ message: "Mail not sent please try again", Error: err })
    }


}

module.exports = Mailsend;