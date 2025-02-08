const twillo = require("twilio")

const SendMessage = async (req, res) => {

    try {

        const { fullname, number, email, amount, course, dob, message, trnxid } = req.body

        const auth = {
            accountSid: "",
            accountToken: ""
        }

        const client = new twillo(auth.accountSid, auth.accountToken)

        const registrationMessageReceiver = `

    Hi ${fullname}

    Your Registration Details given below:
    
    Name: ${fullname}
    Phone: ${number}
    Email: ${email}
    Course: ${course}
    Date of Birth: ${dob}
    Amount Paid: ${amount}
    Transaction ID: ${trnxid}
    
    Message: ${message}`;


        const registrationMessageOwner = `

    A new student registered successfully. 
    
    Registration Details given below:
    
    Name: ${fullname}
    Phone: ${number}
    Email: ${email}
    Course: ${course}
    Date of Birth: ${dob}
    Amount Paid: ${amount}
    Transaction ID: ${trnxid}
    
    Message: ${message}`;

        if (!number) {
            return res.status(400).json({ message: "number is not valid please enter valid number" })
        }

        const Owner = await client.messages.create({
            from: "8269249320",
            to: "",
            body: registrationMessageOwner
        })


        const Receiver = await client.messages.create({
            from: "8269249320",
            to: `${number}`,
            body: registrationMessageReceiver
        })

        res.status(200).json({ message: "Mesage sent successfull!" })
    }
    catch (err) {
        res.status(401).json({ message: "Unsuccessfull please try again" })
        console.log(err)
    }
}

module.exports = SendMessage;