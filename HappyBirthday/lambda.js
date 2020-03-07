let AWS = require('aws-sdk');
const sns = new AWS.SNS();


exports.handler = function (event, context, callback) {

    let receiver = event['receiver'];
    let sender = event['sender'];

    let isPromotional = true;
    // let url = axios.get("https://api.woofbot.io/v1/breeds/corgi/image");

    // The call to our API has succeeded. In this case, we are given an
    // object called `response` to play around with.
    let message = "Happy birthday!";
    console.log("Sending message", message, "to receiver", receiver);

    sns.publish({
        Message: message,
        PhoneNumber: receiver,
        MessageAttributes: {
            'AWS.SNS.SMS.SMSType': {
                DataType: "String",
                StringValue: "Promotional"
            },
            'AWS.SNS.SMS.SenderID': {
                DataType: "String",
                StringValue: sender
            }
        }
    }).promise()
        .then(data => {
            console.log("Sent message to", receiver);
            callback(null, data);
        })
        .catch(err => {
            console.log("Sending failed", err);
            callback(err);
        });
}