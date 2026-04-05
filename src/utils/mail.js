import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import { ApiError } from "./ApiError.js";

const sendEmail = async (options) => {
    const mailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "My testing phase",
            link: "https://voyareyewear.com",
        },
    });

    const emailTextual = mailGenerator.generatePlaintext(
        options.mailgenContent,
    );
    const emailHTML = mailGenerator.generate(options.mailgenContent);

    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_HOST,
        port: process.env.MAILTRAP_PORT,
        auth: {
            user: process.env.MAILTRAP_USERNAME,
            pass: process.env.MAILTRAP_PASSWORD,
        },
    });

    const mail = {
        from: "careers@microsoft.com",
        to: options.email,
        subject: options.subject,
        text: emailTextual,
        html: emailHTML,
    };

    try {
        await transporter.sendMail(mail);
    } catch (err) {
        throw new ApiError(
            500,
            "Failed to send the email. Please try again later.",
        );
        console.error("Error sending the email: ", err);
    }
};

const emailVerificationTemplate = (username, verificationLink) => {
    return {
        body: {
            name: username,
            intro: "Welcome to our app! We're very excited to have you on board.",
            action: {
                instructions:
                    "To verify your email address, please click the button below:",
                button: {
                    color: "#22BC66",
                    text: "verify email",
                    link: verificationLink,
                },
            },
            outro: {
                text: "Need help, or have any questions? Just reply to this email, we'd love to help.",
            },
        },
    };
};

const forgotPasswordTemplate = (username, passwordResetUrl) => {
    return {
        body: {
            name: username,
            intro: "You have requested to reset your password.",
            action: {
                instructions:
                    "To reset your password, please click the button below:",
                button: {
                    color: "#22BC66",
                    text: "reset password",
                    link: passwordResetUrl,
                },
            },
            outro: {
                text: "Need help, or have any questions? Just reply to this email, we'd love to help.",
            },
        },
    };
};

export { emailVerificationTemplate, forgotPasswordTemplate, sendEmail };
