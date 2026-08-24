const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator');
const { Artisan } = require('../models');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// POST /api/artisans/:id/contact
// Envoie un e-mail à l'artisan à partir du formulaire de contact (nom, email, objet, message)
exports.contactArtisan = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const artisan = await Artisan.findByPk(req.params.id);
    if (!artisan) {
      return res.status(404).json({ message: 'Artisan non trouvé' });
    }

    const { nom, email, objet, message } = req.body;

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: artisan.email,
      replyTo: email,
      subject: `[Trouve ton artisan] ${objet}`,
      text: `Message de ${nom} (${email}) :\n\n${message}`,
    });

    res.status(200).json({ message: 'Votre message a bien été envoyé.' });
  } catch (error) {
    next(error);
  }
};
