const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = "mongodb+srv://Officepc:Officepc@cluster0.faxvj.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

client.connect((err) => {
    return ("Error with MongoDB Connection: ", err);
});
// Send a ping to confirm a successful connection
var db = client.db("Mendix_Mailer");
db.command({ ping: 1 });
console.log("Pinged your deployment. You successfully connected to MongoDB!");

async function run() {

    let responseData = db.collection("Campaign_Response")
    try {
        var cursor = responseData.find({});
        for await (const doc of cursor) {
            console.log(doc);
        }
    }
    catch (error) {
        return error;
    }
}

async function InserttoCampaignResponse(_campaignID, _varientID, _email) {
    let responseData = db.collection("Campaign_Response");
    let flag;

    var query = { campaignID: parseInt(_campaignID), varientID: parseInt(_varientID), email: _email };
    var cursor = responseData.find(query);

    if (await cursor.hasNext()) {
        for await (const doc of cursor) {
            doc.count += 1
            const updateResult = await responseData.updateOne(query, { $set: doc })
            console.log(updateResult.acknowledged)
            flag = updateResult.acknowledged;
        }
    }
    else {
        const timestamp = Date.now();
        const dateObject = new Date(timestamp);
        const date = dateObject.getDate();
        const month = dateObject.getMonth() + 1;
        const year = dateObject.getFullYear();
        const fullDate = date + "-" + month + "-" + year;

        var newDoc = { email: _email, campaignID: parseInt(_campaignID), varientID: parseInt(_varientID), count: 1, viewedDate: fullDate };

        const insertResult = await responseData.insertOne(newDoc);
        console.log(insertResult.acknowledged)
        flag = insertResult.acknowledged
    }
}

async function InserttoStrategyResponse(_strategyID, _varientID, _email) {
    let responseData = db.collection("Strategy_Response");

    var query = { strategyID: parseInt(_strategyID), varientID: parseInt(_varientID), email: _email };
    var cursor = responseData.find(query);

    if (await cursor.hasNext()) {
        for await (const doc of cursor) {
            doc.count += 1
            const updateResult = await responseData.updateOne(query, { $set: doc })
            console.log(updateResult.acknowledged)
            flag = updateResult.acknowledged;
        }
    }
    else {
        const timestamp = Date.now();
        const dateObject = new Date(timestamp);
        const date = dateObject.getDate();
        const month = dateObject.getMonth() + 1;
        const year = dateObject.getFullYear();
        const fullDate = date + "-" + month + "-" + year;

        var newDoc = { email: _email, strategyID: parseInt(_strategyID), varientID: parseInt(_varientID), count: 1, viewedDate: fullDate };

        const insertResult = await responseData.insertOne(newDoc);
        console.log(insertResult.acknowledged)
        flag = insertResult.acknowledged
    }
}

async function InvalidMail(_execution, _id, _varientID, _email) {

    var responseData;

    if (_execution == 'Campaign') {
        responseData = db.collection("Campaign_Response");
        var newDoc = { email: _email, campaignID: parseInt(_id), varientID: parseInt(_varientID), count: 0, viewedDate: "Invalid Email" };

        const insertResult = await responseData.insertOne(newDoc);
        // console.log(insertResult.acknowledged)
        return insertResult.acknowledged
    }
    else {
        responseData = db.collection("Strategy_Response");
        var newDoc = { email: _email, strategyID: parseInt(_id), varientID: parseInt(_varientID), count: 0, viewedDate: "Invalid Email" };

        const insertResult = await responseData.insertOne(newDoc);
        // console.log(insertResult.acknowledged)
        return insertResult.acknowledged
    }
}

module.exports = {
    run, InserttoCampaignResponse, InserttoStrategyResponse, InvalidMail
}