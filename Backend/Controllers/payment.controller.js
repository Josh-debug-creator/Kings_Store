// require('dotenv').config();
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


// Try this code
// app.post("/paystack/pay", (req, res) => {
//   const form = _.pick(req.body, ["amount", "email", "full_name"]);
//   form.metadata = {
//     full_name: form.full_name,
//   };
//   form.amount *= 100;

//   initializePayment(form, (error, body) => {
//     if (error) {
//       //handle errors
//       console.log(error);
//       return res.redirect("/error");
//       return;
//     }
//     response = JSON.parse(body);
//     res.redirect(response.data.authorization_url);
//   });
// });

// app.get("/paystack/callback", (req, res) => {
//   const ref = req.query.reference;
//   verifyPayment(ref, (error, body) => {
//     if (error) {
//       //handle errors appropriately
//       console.log(error);
//       return res.redirect("/error");
//     }
//     response = JSON.parse(body);

//     const data = _.at(response.data, [
//       "reference",
//       "amount",
//       "customer.email",
//       "metadata.full_name",
//     ]);

//     [reference, amount, email, full_name] = data;

//     newPayTadi = { reference, amount, email, full_name };

//     const paytadi = new PayTadi(newPayTadi);

//     paytadi
//       .save()
//       .then((paytadi) => {
//         if (!paytadi) {
//           return res.redirect("/error");
//         }
//         res.redirect("/receipt/" + paytadi._id);
//       })
//       .catch((e) => {
//         res.redirect("/error");
//       });
//   });
// });

// app.get("/receipt/:id", (req, res) => {
//   const id = req.params.id;
//   PayTadi.findById(id)
//     .then((PayTadi) => {
//       if (!PayTadi) {
//         //handle error when the paytadi is not found
//         res.redirect("/error");
//       }
//       res.render("success.pug", { PayTadi });
//     })
//     .catch((e) => {
//       res.redirect("/error");
//     });
// });
