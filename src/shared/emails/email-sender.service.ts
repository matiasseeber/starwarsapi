import { Injectable } from '@nestjs/common';
import * as nodemailer from "nodemailer";
import * as handlebars from "handlebars";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class EmailService {
    async sendEmail(email: string, subject: string, templateName: String, replacements: any) {
        try {
            const __dirname = path.resolve();
            const filePath = path.join(__dirname + "/src/shared/emails/templates/" + templateName + ".hjs");
            const source = fs.readFileSync(filePath, 'utf-8').toString();
            const template = handlebars.compile(source);

            const htmlToSend = template(replacements);

            let transporter = nodemailer.createTransport({
                service: process.env.EMAIL_SERVICE || "gmail", // Your email service (e.g., Gmail, Outlook)
                auth: {
                    user: process.env.FROM_EMAIL, // Your email address
                    pass: process.env.EMAIL_PASSWORD, // Your email password (use an app-specific password for Gmail)
                },
                tls: {
                    rejectUnauthorized: false,
                },
            });

            // Email content
            let mailOptions = {
                from: process.env.fromEmail,
                to: email,
                subject: subject,
                html: htmlToSend,
            };

            return transporter.sendMail(mailOptions);
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}