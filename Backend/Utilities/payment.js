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






