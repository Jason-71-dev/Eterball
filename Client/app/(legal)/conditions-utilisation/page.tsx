import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Conditions d'utilisation | Eterball",
  description:
    'Conditions Générales d’Utilisation du site Eterball (projet fictif à vocation pédagogique).',
};

const ConditionsUtilisationPage = () => {
  return (
    <>
      <h1 className="legal__title">Conditions Générales d’Utilisation</h1>
      <p className="legal__subtitle">
        Document à vocation pédagogique — site de démonstration (aucune activité
        commerciale réelle).
      </p>

      <div className="legal__card">
        <p className="legal__p legal__note">
          <strong>Important :</strong> Eterball est un projet fictif réalisé
          dans le cadre d’une formation. Les fonctionnalités présentées
          (comptes, boutique, monnaie virtuelle, inventaire) sont simulées à des
          fins de démonstration.
        </p>

        <nav className="legal__toc" aria-label="Sommaire">
          <a className="legal__chip" href="#objet">
            1. Objet
          </a>
          <a className="legal__chip" href="#acces">
            2. Accès
          </a>
          <a className="legal__chip" href="#comptes">
            3. Comptes
          </a>
          <a className="legal__chip" href="#comportement">
            4. Règles
          </a>
          <a className="legal__chip" href="#pi">
            5. Propriété
          </a>
          <a className="legal__chip" href="#responsabilite">
            6. Responsabilité
          </a>
          <a className="legal__chip" href="#droit">
            7. Droit applicable
          </a>
        </nav>
      </div>

      <section id="objet" className="legal__section">
        <h2 className="legal__h2">1. Objet</h2>
        <p className="legal__p">
          Les présentes Conditions Générales d’Utilisation (ci-après « CGU »)
          définissent les modalités d’accès et d’utilisation du site Eterball
          (ci-après « le Site »).
        </p>
        <p className="legal__p">
          Le Site a pour finalité la présentation et la démonstration d’un
          univers de jeu fictif. Il ne constitue pas un service commercial et
          n’emporte aucune relation contractuelle de vente.
        </p>
      </section>

      <section id="acces" className="legal__section">
        <h2 className="legal__h2">2. Accès au site</h2>
        <p className="legal__p">
          Le Site est accessible gratuitement à tout utilisateur disposant d’un
          accès à Internet. Certaines pages peuvent simuler des fonctionnalités
          (création de compte, inventaire, boutique fictive).
        </p>
        <p className="legal__p">
          L’éditeur se réserve le droit d’interrompre temporairement l’accès au
          Site pour maintenance, correction, mise à jour ou amélioration.
        </p>
      </section>

      <section id="comptes" className="legal__section">
        <h2 className="legal__h2">3. Comptes utilisateurs</h2>
        <p className="legal__p">
          Lorsque le Site propose une création de compte, celle-ci a pour but de
          démontrer un parcours utilisateur. Les comptes sont fictifs et ne
          confèrent aucun droit réel.
        </p>
        <h3 className="legal__h3">3.1. Exactitude des informations</h3>
        <p className="legal__p">
          L’utilisateur s’engage à ne pas utiliser d’informations trompeuses ou
          usurpant l’identité d’un tiers.
        </p>
        <h3 className="legal__h3">3.2. Suspension / suppression</h3>
        <p className="legal__p">
          L’éditeur peut suspendre ou supprimer un compte en cas d’usage abusif,
          de tentative d’intrusion, ou de non-respect des CGU.
        </p>
      </section>

      <section id="comportement" className="legal__section">
        <h2 className="legal__h2">4. Règles de comportement</h2>
        <p className="legal__p">L’utilisateur s’engage notamment à :</p>
        <ul className="legal__list">
          <li>ne pas perturber le fonctionnement du Site ;</li>
          <li>ne pas tenter d’accéder à des données non autorisées ;</li>
          <li>ne pas injecter de code malveillant ;</li>
          <li>respecter le caractère pédagogique et fictif du projet.</li>
        </ul>
      </section>

      <section id="pi" className="legal__section">
        <h2 className="legal__h2">5. Propriété intellectuelle</h2>
        <p className="legal__p">
          Le contenu du Site (textes, visuels, logos, éléments graphiques, code,
          univers, mécaniques de jeu) est protégé par le droit de la propriété
          intellectuelle.
        </p>
        <p className="legal__p">
          Toute reproduction, diffusion ou utilisation non autorisée est
          interdite, sauf exception légale ou accord explicite de l’éditeur.
        </p>
      </section>

      <section id="responsabilite" className="legal__section">
        <h2 className="legal__h2">6. Responsabilité</h2>
        <p className="legal__p">
          Le Site étant un projet de démonstration, l’éditeur ne garantit pas
          l’absence d’erreurs, d’interruptions ou d’indisponibilités.
        </p>
        <p className="legal__p">
          L’éditeur ne saurait être tenu responsable des dommages directs ou
          indirects résultant de l’utilisation du Site, notamment en cas de
          dysfonctionnement technique.
        </p>
      </section>

      <section id="droit" className="legal__section">
        <h2 className="legal__h2">7. Droit applicable</h2>
        <p className="legal__p">
          Les présentes CGU sont soumises au droit français. En cas de litige et
          à défaut de résolution amiable, les juridictions compétentes seront
          celles du ressort de l’éditeur.
        </p>
      </section>

      <div className="legal__divider" />
      <p className="legal__updated">Dernière mise à jour : 11/01/2026</p>
    </>
  );
};

export default ConditionsUtilisationPage;
