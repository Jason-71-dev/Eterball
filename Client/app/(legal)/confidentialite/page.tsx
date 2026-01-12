import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de confidentialité | Eterball',
  description:
    'Politique de confidentialité du site Eterball (projet fictif à vocation pédagogique).',
};

const ConfidentialitePage = () => {
  return (
    <>
      <h1 className="legal__title">Politique de confidentialité</h1>
      <p className="legal__subtitle">
        Informations relatives aux données personnelles — projet pédagogique.
      </p>

      <div className="legal__card">
        <p className="legal__p legal__note">
          <strong>Contexte :</strong> Eterball est un site de démonstration. Les
          données éventuellement collectées servent uniquement à illustrer des
          fonctionnalités (compte utilisateur, connexion, session).
        </p>

        <nav className="legal__toc" aria-label="Sommaire">
          <a className="legal__chip" href="#responsable">
            1. Responsable
          </a>
          <a className="legal__chip" href="#donnees">
            2. Données
          </a>
          <a className="legal__chip" href="#finalites">
            3. Finalités
          </a>
          <a className="legal__chip" href="#base-legale">
            4. Base légale
          </a>
          <a className="legal__chip" href="#conservation">
            5. Conservation
          </a>
          <a className="legal__chip" href="#droits">
            6. Droits
          </a>
          <a className="legal__chip" href="#cnil">
            7. CNIL
          </a>
        </nav>
      </div>

      <section id="responsable" className="legal__section">
        <h2 className="legal__h2">1. Responsable du traitement</h2>
        <p className="legal__p">
          Responsable : <span className="legal__mono">Jason Villin</span>
          <br />
          Contact : <span className="legal__mono">jason-71@outlook.fr</span>
        </p>
      </section>

      <section id="donnees" className="legal__section">
        <h2 className="legal__h2">2. Données collectées</h2>
        <p className="legal__p">
          Selon les fonctionnalités disponibles, le Site peut collecter :
        </p>
        <ul className="legal__list">
          <li>pseudonyme ;</li>
          <li>adresse email ;</li>
          <li>données techniques (adresse IP, logs, cookies techniques).</li>
        </ul>
        <p className="legal__p">
          Le Site ne vise pas à collecter de données sensibles.
        </p>
      </section>

      <section id="finalites" className="legal__section">
        <h2 className="legal__h2">3. Finalités</h2>
        <p className="legal__p">
          Les données sont traitées uniquement afin de :
        </p>
        <ul className="legal__list">
          <li>simuler un parcours de création/connexion de compte ;</li>
          <li>assurer le bon fonctionnement technique du Site ;</li>
          <li>sécuriser l’accès (prévention des abus techniques).</li>
        </ul>
        <p className="legal__p">
          Aucune utilisation commerciale n’est réalisée.
        </p>
      </section>

      <section id="base-legale" className="legal__section">
        <h2 className="legal__h2">4. Base légale</h2>
        <p className="legal__p">
          Selon les cas, le traitement peut reposer sur :
        </p>
        <ul className="legal__list">
          <li>l’intérêt légitime (sécurité, fonctionnement technique) ;</li>
          <li>
            l’exécution d’un service demandé (création/usage d’un compte fictif)
            ;
          </li>
          <li>
            le consentement (si des cookies non essentiels étaient ajoutés).
          </li>
        </ul>
      </section>

      <section id="conservation" className="legal__section">
        <h2 className="legal__h2">5. Durée de conservation</h2>
        <p className="legal__p">
          Les données sont conservées pour une durée limitée, strictement
          nécessaire à la démonstration du projet, ou jusqu’à demande de
          suppression.
        </p>
      </section>

      <section id="droits" className="legal__section">
        <h2 className="legal__h2">6. Droits des utilisateurs</h2>
        <p className="legal__p">
          Conformément au RGPD, l’utilisateur dispose notamment des droits
          suivants : accès, rectification, effacement, opposition.
        </p>
        <p className="legal__p">
          Pour exercer ces droits :{' '}
          <span className="legal__mono">[ton email]</span>
        </p>
      </section>

      <section id="cnil" className="legal__section">
        <h2 className="legal__h2">7. Autorité de contrôle</h2>
        <p className="legal__p">
          L’autorité compétente en France est la CNIL (Commission Nationale de
          l’Informatique et des Libertés).
        </p>
      </section>

      <div className="legal__divider" />
      <p className="legal__updated">Dernière mise à jour : 11/01/2026</p>
    </>
  );
};

export default ConfidentialitePage;
