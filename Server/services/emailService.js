const nodemailer = require('nodemailer');

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;

const EMAIL_FROM = process.env.EMAIL_FROM || `Eterball <${SMTP_USER}>`;

// Petite validation au démarrage (évite des bugs silencieux)
function assertEnv() {
  const missing = [];
  if (!SMTP_HOST) missing.push('SMTP_HOST');
  if (!SMTP_USER) missing.push('SMTP_USER');
  if (!SMTP_PASS) missing.push('SMTP_PASS');
  if (!process.env.CLIENT_URL) missing.push('CLIENT_URL');
  if (!process.env.JWT_EMAIL_SECRET) missing.push('JWT_EMAIL_SECRET');

  if (missing.length) {
    console.warn('[emailService] Missing env:', missing.join(', '));
  }
}

assertEnv();

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false, // 587 = STARTTLS
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

async function sendVerificationEmail({ to, verifyUrl }) {
  return transporter.sendMail({
    from: EMAIL_FROM,
    to,
    subject: 'Confirme ton compte Eterball',
    html: `
      <div style="font-family:Arial,sans-serif">
        <h2>Bienvenue sur Eterball 👋</h2>
        <p>Merci pour ton inscription. Clique sur le bouton ci-dessous pour confirmer ton email :</p>
        <p>
          <a href="${verifyUrl}"
             style="display:inline-block;padding:10px 16px;border-radius:8px;background:#22c55e;color:#fff;text-decoration:none;">
            Confirmer mon compte
          </a>
        </p>
        <p>Ce lien expire dans 24h.</p>
      </div>
    `,
  });
}

module.exports = { sendVerificationEmail };
