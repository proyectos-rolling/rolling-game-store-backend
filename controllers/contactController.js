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
  const name = req.body.name || "Usuario";

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

  //si el mail es test@error.com, fuerzo un error a fines de testeo
  if (mailOptions.from === "test@error.com") {
    res.status(500).json({ msg: "Oops! Hubo un error, intenta de nuevo" });
    return;
  }

  //sino mando el mail (pudiendo rescatar un error real)
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).json({ msg: "Oops! Hubo un error, intenta de nuevo" });
    } else {
      console.log("Email sent: " + info.response);
      res
        .status(200)
        .json({ msg: "Perfecto! Nos estaremos comunicando a la brevedad!" });
    }
  });
};
