import { sendEmail } from "../utils/mail/sendEmail";

export const testEmailRoute = {
    method: "POST",
    path: "/api/test-email",
    handler: async (req, res) => {
        try {
            await sendEmail({
                to: "akarapinar53@gmail.com",
                from: "akarapinrar@gmail.com",
                subject: "Does this work?",
                text: "If you see this, it works!",
                html: "<h1>If you see this, it works!</h1>"
            });
            res.status(200).json({
                message: "Email sent successfully"
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: "Error sending email",
                error: err
            });
        }
    },
};