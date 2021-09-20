const instance = require('./utils/razorpay');
const crypto = require('crypto');
module.exports = {
    order: async (req, res) => {
        const { body } = req;
        const params = body;
        try {

            instance.orders
                .create(params)
                .then((data) => {
                    res.status(200).send({ sub: data, status: "success" });
                })
                .catch((error) => {
                    res.send({ sub: error, status: "failed" });
                });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },
    verify: async (req, res) => {
        const body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
        try {
            const expectedSignature = crypto
                .createHmac("sha256", process.env.KEY_SECRET)
                .update(body.toString())
                .digest("hex");
            console.log("sig" + req.body.razorpay_signature);
            console.log("sig" + expectedSignature);
            let response = { status: "failure" };
            if (expectedSignature === req.body.razorpay_signature)
                response = { status: "success" };
            res.send(response);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }
}