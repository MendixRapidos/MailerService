const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
let Mailer = require('./utils/mailer')
// let Mongo = require('./Modules/MongoDB');
const PORT = 8080;
// const PORT = 5000;

// app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false })); // Set extended to true

let count = 0;

app.use(bodyParser.json());
app.use(cors({ origin: '*' }));

app.get("/verify", (req, res) => {
    res.send("Cloud verification completed");
});



//Campaign Content Sharing
app.post("/email/campaign/:campaignID/:email", async (req, res) => {
    let { id, subject, content } = req.body;
    let { campaignID, email } = req.params;

    console.log("Subject: ", subject);
    console.log("Content: ", content);
    console.log("campaignID: ", campaignID);
    console.log("varientID: ", id);
    console.log("email: ", email);

    let result = await Mailer.CampaignMailer(email, subject, content, campaignID, id)
    console.log(result)
    res.send("Completed");
})

//Campaign Content Tracker
// app.get("/track/campaign/:campaignID/:varientID/:email", async (req, res) => {
//     // var timeStamp = new Date.now();
//     let { campaignID, varientID, email } = req.params;
//     await Mongo.InserttoCampaignResponse(campaignID, varientID, email);
//     // console.log(flag)
// })



//Strategy Content Sharing
app.post("/email/strategy/:strategyID/:email", async (req, res) => {
    let { strategyID, email } = req.params;
    let { id, subject, content } = req.body;

    console.log("Strategy ID: ", strategyID);
    console.log("Email: ", email);
    console.log("varientID: ", id);
    console.log("Subject: ", subject);
    console.log("Content: ", content);

    let result = await Mailer.StrategyMailer(email, subject, content, strategyID, id);
    console.log(result);
    res.send(result);
})

//Strategy Content Tracker
// app.get("/track/strategy/:strategyID/:varientID/:email", async (req, res) => {
//     // var timeStamp = new Date.now();
//     let { strategyID, varientID, email } = req.params;
//     // await Mongo.InserttoStrategyResponse(strategyID, varientID, email);
//     let flag = await Storage.InsertToStrategyResponse(strategyID, varientID, email)
//     console.log(flag)
// })



// app.get("/connection", async (req, res) => {
//     var result = await Mongo.run();
// })

app.get("/", (req, res) => {
    res.send("Working");
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
