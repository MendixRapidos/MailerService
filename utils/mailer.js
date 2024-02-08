// const sgMail = require('@sendgrid/mail')
const nodemailer = require('nodemailer');
const emailValidator = require('deep-email-validator');
// let Mongo = require('./MongoDB');
require('dotenv').config();

async function CampaignMailer(emailid, subject, content, campaignID, varientID) {

    let flag;

    // let cloudAddress = 'https://nodemailer-dev-400109.el.r.appspot.com/';
    let cloudAddress = '';

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "campaign.lifecycle@gmail.com",
            pass: "zptazhhynvqljmew"
        }
    });

    var mailOptionsPublic = {
        from: 'campaign.lifecycle@gmail.com',
        to: emailid,
        subject: subject,
        html:
            `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body onload="load()">
            <div>
                ${content}
                
            </div>
        
        </body>
        </html>
    `,
    }

    //Tracker
    // <img src="${cloudAddress}/track/campaign/${campaignID}/${varientID}/${emailid}" alt="">

    // console.log(mailOptionsPublic)
    async function isEmailValid(email) {
        return await emailValidator.validate(email)
    }



    // const { valid, reason, validators } = await isEmailValid(emailid);

    // if (valid) {
    //     transporter.sendMail(mailOptionsPublic, async function (error, info) {
    //         console.log(info)
    //         console.log('TRiggered')

    //         if (error) {
    //             console.log(error.message)
    //             console.log(reason)
    //             flag = 'error'
    //         }
    //         else {
    //             flag = 'success'
    //             console.log('Success');
    //         }
    //     });
    // }
    // else {
    //     console.log(validators)
    //     Mongo.InvalidMail('Campaign', campaignID, varientID, emailid);
    // }
    // return flag;

    let promise = new Promise(async (resolve, reject) => {
        transporter.sendMail(mailOptionsPublic, async function (error, info) {
            console.log(info)
            console.log('TRiggered');

            if (error) {
                console.log(error.message)
                // flag = 'error'
                resolve(error.message)
            }
            else {
                // flag = 'success'
                // console.log('Success');
                resolve('Success')
            }
        });
    })

    return promise
}


async function StrategyMailer(emailid, subject, content, strategyID, varientID) {

    let flag;

    let cloudAddress = 'https://nodemailer-dev-400109.el.r.appspot.com/';

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "campaign.lifecycle@gmail.com",
            pass: "zptazhhynvqljmew"
        }
    });

    var mailOptionsPublic = {
        from: 'campaign.lifecycle@gmail.com',
        to: emailid,
        subject: subject,
        html:
            `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body onload="load()">
            <div>
                ${content}
                
            </div>
            <img src="${cloudAddress}/track/strategy/${strategyID}/${varientID}/${emailid}"
            alt="">
        
        </body>
        </html>
    `,
    }

    // console.log(mailOptionsPublic)
    async function isEmailValid(email) {
        return await emailValidator.validate({ email: email, smtpTimeout: 10000, validateSMTP: true })
    }

    // let promise = new Promise(async (resolve, reject) => {
    //     const { valid, reason, validators } = await isEmailValid(emailid);

    // if (valid) {
    // transporter.sendMail(mailOptionsPublic, async function (error, info) {
    //     console.log(info)
    //     console.log('TRiggered');

    //     if (error) {
    //         console.log(error.message)
    //         // flag = 'error'
    //         resolve(error.message)
    //     }
    //     else {
    //         // flag = 'success'
    //         // console.log('Success');
    //         resolve('Success')
    //     }
    // });
    // }
    // else {
    //     console.log(validators.smtp.reason)
    //     // console.log(validators);
    //     Mongo.InvalidMail('Strategy', strategyID, varientID, emailid);
    //     resolve(validators.smtp.reason);
    // }
    // })

    let promise = new Promise(async (resolve, reject) => {
        transporter.sendMail(mailOptionsPublic, async function (error, info) {
            console.log(info)
            console.log('TRiggered');

            if (error) {
                console.log(error.message)
                // flag = 'error'
                resolve(error.message)
            }
            else {
                // flag = 'success'
                // console.log('Success');
                resolve('Success')
            }
        });
    })

    return promise
}

module.exports = {
    CampaignMailer, StrategyMailer
}