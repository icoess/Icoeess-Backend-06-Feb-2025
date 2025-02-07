const express = require("express");
const PaymentOrderController = require("../Controllers/PayementOrderCreate")
const Mailsender = require("../Controllers/RegisterMailsent")
const SmsSender = require("../Controllers/MessageSend")
const ContactMailSend = require("../Controllers/ContactController");
const Applyjob = require("../Controllers/Applyjobs")
const ApplyInquiry = require("../Controllers/ApplyInquiry")
const router = express.Router()

router.post("/ordercreate", PaymentOrderController);
router.post("/mailsend", Mailsender || SmsSender);
router.post("/contactmail", ContactMailSend);
router.post("/applyjob", Applyjob);
router.post("/applyinquiry", ApplyInquiry);

module.exports = router;