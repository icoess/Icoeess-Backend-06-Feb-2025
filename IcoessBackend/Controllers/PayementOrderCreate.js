// const Razorpay = require("../auth/Paymentauth");
const razorpay = require("razorpay")
const dotenv = require("dotenv");
dotenv.config()

const Razorpay = new razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET
})

const Ordercreate = async (req, res) => {

    try {

        const { fullname, number, email, registrationamount } = req.body

        if (!registrationamount) {
            return res.status(402).json({ message: "please fill valid registrationamount" })
        }
        if (!fullname) {
            return res.status(402).json({ message: "Please fill Your name" })
        }
        if (!number) {
            return res.status(402).json({ message: "Please fill your number" })
        }
        if (!email) {
            return res.status(402).json({ message: "Please fill your email" })
        }

        const options = {
            amount: registrationamount * 100,
            currency: "INR",
            receipt: `rc${Date.now()+"ICOESS"}`
        }

        const data = await Razorpay.orders.create(options)

        res.status(200).json({ message: "Payemnt order is created successfull", data: data })
    } catch (error) {
        console.log("Error is :", error)
        res.status(500).json({ message: "Payment order is not created Please try again!" })
    }

}
module.exports = Ordercreate;