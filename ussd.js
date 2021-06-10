const express = require("express");

const app = express();

let port = process.env.PORT || 5000;

// Set up base middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configure AT SDK
const credentials = {
    apiKey: "",
    username: ""
};

const AfricasTalking = require("africastalking")(credentials);

// Get required AT services
const sms = AfricasTalking.SMS;
const airtime = AfricasTalking.AIRTIME;
const payments = AfricasTalking.PAYMENTS;

// Create routes

app.get("/", (req, res) => {
    console.log(`Hey, I'm alive! :D`);
});

app.post("/ussd", (req, res) => {
    const { sessionId, phoneNumber, serviceCode, text } = req.body;

    let response = "";

    if ( text == "" ) {
        response = "CON Welcome to the eCase Shop! \n 1. Buy a case\n 2. Get receipt\n 3. Get a reward!";
    } else if ( text == "1" ) {
        response = "CON Which phone model do you have?\n 1. iPhone 12 Pro\n 2. iPhone 12";
    } else if ( text == "1*1" ) {
        response = "CON This case costs KES 500. Would you like to complete the purchase?\n 1. Yes\n 2. No";
    } else if ( text == "1*1*1" ) {
        response = "END Thanks for making the purchase! Please complete the purchase on the dialogue on your phone.";
        // TODO: Add Payments here

    } else if ( text == "1*2" ) {
        response = "CON This case costs KES 500. Would you like to complete the purchase?\n 1. Yes\n 2. No";
    } else if ( text == "1*2*1" ) {
        response = "END Thanks for making the purchase! Please complete the purchase on the dialogue on your phone.";
        // TODO: Add payments here

    } else if ( text == "2" ) {
        response = "END Sending your receipt in a moment to your SMS inbox";
        // Add SMS functionality here

    } else if ( text == "3" ) {
        response = "END We've sent you some airtime as a reward. Thanks for being a loyal customer!";
        // TODO: Add Airtime functionality here

    } else {
        response = "END Something must have gone wrong. Please redial the USSD to get started";
        // TODO: Send SMS apologizing for a less than great experience
    }

    res.send(response);
});

app.listen(port, () => {
    console.log(`App running on port: ${port}`);
});