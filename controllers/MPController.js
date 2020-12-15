const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN || "",
});

exports.checkout = (req, res) => {
  console.log(req.body);
  let preference = {
    items: [
      {
        title: req.body.title,
        unit_price: parseInt(req.body.price),
        quantity: 1,
      },
    ],
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.json({redirectUrl: response.body.init_point});
    })
    .catch(function (error) {
      console.log(error);
    });

    
};