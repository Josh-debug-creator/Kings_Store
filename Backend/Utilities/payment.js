// import configVariables from '../config/config.js'

// const payStack = async (request) => {
//     const mySecretKey = configVariables.PAY
// const initializePayment = (form, mycallback) => {
//     const options = {
//         url: "https://api.paysack.co.transaction/initialize",
//         headers:{
//             authorization:mySecretKey ,
//             "content-type": "application/json",
//             "cache-control":"no-cache" 

//         },
//         form
//     }

//     const callback   (error, response, body) => {
//         return mycallback(error, body)

//     }
//     request.post(options, callback)
// }
// const verifyPayment = (ref, mycallback) => {
//     const options = {
//         url: "https://api.paystack.co/transaction/verify/"+encodeURLComponent(ref)
//     }
// }
// }


// let Paystack = require('paystack-node')
// const environment = process.env.NODE_ENV

// const paystack = new Paystack("Your_Private_Key", environment)

// exports.verify = async (req, res) => {
    
//     const ref = req.params.ref;
//     // ==== Paystack verify call ===== ///
//     let output;

//     await paystack.verifyTransaction({
//         reference: ref
//     })

//         .then(function (response) {
//             console.log(response.body.data);
//             output = response.body.data;
//         }).catch(function (error) {
//             status = 400
//             output = {
//                 status: 'failed',
//                 error: error
//             };
//             console.log(error)
//         })

//     /* 
//     Note: You will need to install express session or a session package
//     to make the out put accessible in the confirmation route or can use alternative methods

//     //session payload
//      req.session.output = output */

//     res.redirect('/confirmation')

//     //paystack verify payment
// router.post('/verify/:ref', paystack.verify)

// router.get('/confirmation', (req, res) => {
//     const output = req.session.output

//     console.log("===========confirmation==============")
//     console.log(output.status)
//     res.render('confirmation', { ...output })




    // controllers/controllers.js file

require('dotenv').config();
import express from "express";
import https from 'https'
import configVariables from "../Config/config";


const payStack = {

  acceptPayment: async(req, res) => {
    try {
      // request body from the clients
      const email = req.body.email;
      const amount = req.body.amount;
      // params
      const params = JSON.stringify({
        "email": email,
        "amount": amount * 100
      })
      // options
      const options = {
        hostname: "api.paystack.co",
        port: 443,
        path: "/transaction/initialize",
        method: "POST",
        headers: {
          Authorization: configVariables.PAYSTACK_SECRET_KEY, // where you place your secret key copied from your dashboard
          "Content-Type": "application/json",
        },
      };
      // client request to paystack API
      const clientReq = https.request(options, apiRes => {
        let data = ''
        apiRes.on('data', (chunk) => {
          data += chunk
        });
        apiRes.on('end', () => {
          console.log(JSON.parse(data));
          return res.status(200).json(data);
        })
      }).on('error', error => {
        console.error(error)
      })
      clientReq.write(params)
      clientReq.end()
      
    } catch (error) {
      // Handle any errors that occur during the request
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  },
}

const initializePayment = payStack;
module.exports = initializePayment;