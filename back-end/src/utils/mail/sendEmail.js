
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}.local` });
import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = async ( { to, from, subject, text, html } ) => {
    const msg = {
        to,
        from,
        subject,
        text,
        html
    };
    return sendgrid.send(msg);
}
