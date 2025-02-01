const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

function replaceContent(content, creds) {
    let allKeysArr = Object.keys(creds);
    // console.log("replace content",allKeysArr)
    allKeysArr.forEach(function (key) {
        content = content.replace(`#{${key}}`, creds[key]);
    });
    return content;
}

async function EmailHelper(templateName, receiverEmail, creds) {
    try {
        const templatepath = path.join(__dirname, "email_template", templateName);
        let content = await fs.promises.readFile(templatepath, "utf-8");
        // console.log("file content", content)
        console.log("email helper recived creds",creds)
        // Create the transporter
        const mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'gireeshlearning24@gmail.com',
                pass: 'czrz qkbv uyua ifjz' // Use a secure method to store this
            }
        });

        // Mail details
        const mailDetails = {
            from: 'gireeshlearning24@gmail.com',
            to: receiverEmail,
            subject: 'Scaler Book my show otp',
            text: 'Node.js testing mail for GeeksforGeeks',
            html: replaceContent(content, creds) // Replace content with dynamic data
        };

        // Send email
        const info = await mailTransporter.sendMail(mailDetails);
        // console.log('Email sent successfully:', info.response);
    } catch (err) {
        console.log("Email helper function failed", err);
    }
}

// const nodemailer=require("nodemailer")
// const fs=require("fs")
// const path=require("path")

// function repalceContent(content,creds){
//     let allKeysArr=Object.keys(creds);
//     allKeysArr.forEach(function (key){
//         content=content.replace(`#${key}`, creds[key]);
//     });
//     return content
// }

// async function EmailHelper(templateName, reciverEmail, creds){
//     try{
//         const templatepath=path.join(__dirname, "email_template", templateName)
//         let content= await fs.promises.readFile(templatepath, "utf-8");
//         const mailDetails = {
//             from: 'gireeshvysyaraju@gmail.com',
//             to: reciverEmail,
//             subject: 'Scaler Book my show otp',
//             text: 'Node.js testing mail for GeeksforGeeks',
//             html :repalceContent(content,creds)
//         };
//         const mailTransporter =nodemailer.createTransport(
//         {
//             service: 'gmail',
//             auth: {
//                 user: 'gireeshvysyarju@gmail.com',
//                 pass: 'kayw cile fmod ibgl'
//             }
//         }
//     );

//     const transporter= nodemailer.createTransport(mailTransporter);
//     await transporter.sendMail(mailDetails,
//         function (err, data) {
//             if (err) {
//                 console.log('Error Occurs in mail sent', err);
//             } else {
//                 console.log('Email sent successfully');
//             }
//         });
//     }
//     catch(err){
//         console.log("email helper funcation failed",err)
//     }
// }

// const nodemailer = require('nodemailer');

// let mailTransporter =
//     nodemailer.createTransport(
//         {
//             service: 'gmail',
//             auth: {
//                 user: 'gireeshvysyarju@gmail.com',
//                 pass: 'kayw cile fmod ibgl'
//             }
//         }
//     );

// let mailDetails = {
//     from: 'gireeshvysyaraju@gmail.com',
//     to: 'saigireesh@gmail.com',
//     subject: 'Scaler Book my show otp',
//     text: 'Node.js testing mail for GeeksforGeeks'
// };

// mailTransporter
//     .sendMail(mailDetails,
//         function (err, data) {
//             if (err) {
//                 console.log('Error Occurs');
//             } else {
//                 console.log('Email sent successfully');
//             }
//         });

module.exports=EmailHelper