import User from '@/models/userModel';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

export const sendEmail = async ({email,emailType,userId}:any)=>{
    try {

        const hashedToken = await bcrypt.hash(userId.toString(),10);

        if(emailType==='VERIFY'){
            await User.findByIdAndUpdate(userId,
                {verifyToken:hashedToken,verifyTokenExpiry:Date.now()+3600000})
        }
        else if(emailType==='RESET'){
            await User.findByIdAndUpdate(userId,
                {forgotPasswordToken:hashedToken,forgotPasswordTokenExpiry:Date.now()+3600000})
        }


        // Looking to send emails in production? Check out our Email API/SMTP product!
            var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "95923f98672295",
                pass: "7ac504f7e15250"
            }
            });

        const mailOptions = {
            from: '"raj@gmail.com',
            to: email,
            subject: emailType==='VERIFY'? "verify your email" : "reset your password",
            html: `<p>click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType==='VERIFY'?"verify your email":"reset your password"} 
            or copy and paste the link below in your browser.
            <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }

        const mailResponse = await transport.sendMail(mailOptions)
        return mailResponse
    } catch (error:any) {
        throw new Error(error.message)
    }
}