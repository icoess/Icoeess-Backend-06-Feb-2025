const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

// Setup Nodemailer transporter
const Transporter = nodemailer.createTransport({
    service: "gmail",
    // port: process.env.PORTGMAIL,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS,
    },
});

const ApplyInquiry = async (req, res) => {

    try {
        const { fullname, email, number, course,message } = req.body

        if (!fullname) {
            res.status(401).json({ message: "Fullname is required" })
        }
        if(!email){
            res.status(401).json({ message: "Email is required" })
        }
        if(!number){
            res.status(401).json({ message: "Number is required" })
        }
        if(!course){
            res.status(401).json({ message: "Course is required" })
        }

        const Owner = await Transporter.sendMail({
            from: process.env.USER,
            to: process.env.OWNER,
            subject: "Inquiry form",
            html: `<p>Testing Inquiry</p>`
        })

        const Receiver = await Transporter.sendMail({
            from: process.env.USER,
            to: `${email}`,
            subject: "Inquiry form",
            html: `<p>Hi ${fullname}</p>`
        })

        res.status(200).json({status:"success",message:"Mail sent successfully"})
    }
    catch(err) {
        console.log("Error is",err)
        res.status(401).json({message:`Something else ${err}`})
    }
}

module.exports=ApplyInquiry;