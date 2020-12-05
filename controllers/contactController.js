const nodemailer = require("nodemailer");

exports.sendMail = async (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const { email, phone, comment, whatsapp } = req.body;
  const name = req.body.name || "Usuario"

  const mailOptions = {
    from: email,
    to: "rollingamestore@gmail.com",
    replyTo: email,
    subject: `Contacto de ${name} (${email})`,
  };
  if (whatsapp) {
    mailOptions.html = `
  <h3><a href="https://wa.me/${phone}?text=${encodeURI(
      `Hola ${name}! Te contacto en respuesta a tu comentario en http://rollingame.cyou:

----------
${comment}
----------

`
    )}">Responder por Whatsapp</a></h3>
 <p><strong>Comentario</strong>: ${comment}</p>`;
  } else {
    mailOptions.html = `
  <p><strong>Celular</strong>: +${phone}</p>
  <p><strong>Comentario</strong>: ${comment}</p>`;
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    } else {
      console.log("Email sent: " + info.response);
      res.sendStatus(200);
    }
  });
};
