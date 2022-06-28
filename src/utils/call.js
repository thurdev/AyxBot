const Vonage = require('@vonage/server-sdk')
const path = require('path');

class Call {
    constructor({
        phone, message
    }) {
        this.phone = phone;
        this.message = message;

        if(process.env.CALL_MODULE == 'vonage'){
            this.vonage = new Vonage({
                apiKey: process.env.VONAGE_API_KEY,
                apiSecret: process.env.VONAGE_API_SECRET,
                applicationId: process.env.VONAGE_APPLICATION_ID,
                privateKey: __dirname + '\\private.key'
            })
        }else if(process.env.CALL_MODULE == 'twilio'){
            // TODO TWILIO
        }
    }
    
    send() {
        return new Promise((resolve, reject) => {
            if(process.env.CALL_MODULE == 'vonage'){
                this.vonage.calls.create({
                    to: [{ type: 'phone', number: this.phone }],
                    from: { type: 'phone', number: process.env.CALL_FROM },
                    ncco: [{ action: "talk", text: this.message }]
                }, (error, response) => {
                    if (error){
                        if(error.body.type == 'UNAUTHORIZED'){
                            reject('Invalid API key or secret');
                        }else{
                            reject(error.body.title);
                        }
                    }
                    if (response) resolve(response);
                })
            }else if(process.env.CALL_MODULE == 'twilio'){
                // TODO TWILIO
            }
        })
    }
}

module.exports = Call