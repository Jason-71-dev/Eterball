'use-client';

import Link from 'next/link';
import './Footer.scss';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__top">
        {/* Colonne 1 */}
        <div className="footer__col">
          <h3>LE JEU ETERBALL</h3>
          <ul>
            <li>
              <Link href="/download">Télécharger le jeu</Link>
            </li>
            <li>
              <Link href="/classes">Classes</Link>
            </li>
            <li>
              <Link href="/download">Tutoriels</Link>
            </li>
            <li>
              <Link href="/download">Boutique</Link>
            </li>
          </ul>
        </div>

        {/* Colonne 2 */}
        <div className="footer__col">
          <h3>INFORMATIONS</h3>
          <ul>
            <li>
              <Link href="/regles">Règles de conduite</Link>
            </li>
            <li>
              <Link href="/securite">Sécurité</Link>
            </li>
            <li>
              <Link href="/codes-cadeaux">Codes cadeaux</Link>
            </li>
          </ul>
        </div>

        {/* Colonne 3 */}
        <div className="footer__col">
          <h3>MON COMPTE</h3>
          <ul>
            <li>
              <Link href="/securite-compte">Sécurité du compte</Link>
            </li>
            <li>
              <Link href="/login">Se connecter</Link>
            </li>
          </ul>
        </div>

        {/* Colonne 4 */}
        <div className="footer__col">
          <h3>SUPPORT</h3>
          <ul>
            <li>
              <Link href="/download">Impossible de jouer</Link>
            </li>
            <li>
              <Link href="/classes">Mot de passe perdu</Link>
            </li>
            <li>
              <Link href="/download">Compte volé</Link>
            </li>
            <li>
              <Link href="/download">Nous contacter</Link>
            </li>
          </ul>
        </div>

        {/* Colonne 5 (bouton + réseaux) */}
        <div className="footer__cta">
          <Link href="/download" className="download-btn">
            Télécharger le jeu
          </Link>
          <Link href="/support" className="support-text">
            Un problème ? Contactez le support.
          </Link>
        </div>
      </div>

      {/* Bas du footer */}
      <div className="footer__bottom">
        <div className="footer__legal">
          <Image
            src="/Logo(2).png"
            alt="Eterball"
            className="logo"
            width={70}
            height={70}
          />
          <p>
            2025 Eterball. Tous droits réservés.{' '}
            <Link href="/conditions-utilisation">
              Conditions d&apos;utilisations
            </Link>{' '}
            -<Link href="/confidentialite">Politique de confidentialité</Link> -{' '}
            <Link href="/conditions-ventes">Conditions Générales de Vente</Link>{' '}
            -<Link href="/mentions-legales">Mentions Légales</Link> -{' '}
            <Link href="/cookies">Cookies</Link>
          </p>
        </div>

        <div className="footer__pegi">
          <Image src="/PEGI_12.png" alt="PEGI 12" width={40} height={40} />
          <Image
            src="/120px-Online_n.webp"
            alt="PEGI Online"
            width={40}
            height={40}
          />
          <Image
            src="/PEGI_Violence.svg_.webp"
            alt="PEGI Violence"
            width={40}
            height={40}
          />
          <Image
            src="/PEGI_Profanity.svg_.webp"
            alt="PEGI Chat"
            width={40}
            height={40}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
