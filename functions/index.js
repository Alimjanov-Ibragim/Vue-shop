const functions = require("firebase-functions");
var stripe = require("stripe")("sk_test_NYOgTxdnKVvQXYOXixR5oos200K8ptsJSD");
const cors = require("cors")({ origin: true });
const admin = require("firebase-admin");
admin.initializeApp();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

exports.CheckoutSession = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    let myProducts = request.query.products;
    myProducts = Object.entries(JSON.parse(myProducts));
    // response.send(myProducts);

    const productsArray = [];
    myProducts.forEach(item => {
      const p = admin
        .firestore()
        .doc(`products/${item[0]}`)
        .get();
      productsArray.push(p);
    });

    const all = await Promise.all(productsArray);
    console.log(all);
    const results = [];

    stripe.checkout.sessions.create(
      {
        success_url: "https://example.com/success",
        cancel_url: "https://example.com/cancel",
        payment_method_types: ["card"],
        line_items: results
      },
      function(err, session) {
        // asynchronously called
        response.send(session);
      }
    );
  });
});
