import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente | Eterball',
  description:
    'Conditions de vente (version fictive) — la boutique Eterball est une démonstration pédagogique sans paiement réel.',
};

const ConditionsVentesPage = () => {
  return (
    <>
      <h1 className="legal__title">Conditions Générales de Vente</h1>
      <p className="legal__subtitle">
        Version fictive — aucune transaction réelle n’est possible sur ce site.
      </p>

      <div className="legal__card">
        <p className="legal__p legal__note">
          <strong>Important :</strong> la boutique affichée sur Eterball est
          présentée uniquement à des fins pédagogiques. Aucun paiement, aucun
          achat et aucune livraison réelle ne sont effectués.
        </p>

        <nav className="legal__toc" aria-label="Sommaire">
          <a className="legal__chip" href="#objet">
            1. Objet
          </a>
          <a className="legal__chip" href="#produits">
            2. Produits
          </a>
          <a className="legal__chip" href="#prix">
            3. Prix
          </a>
          <a className="legal__chip" href="#paiement">
            4. Paiement
          </a>
          <a className="legal__chip" href="#retractation">
            5. Rétractation
          </a>
          <a className="legal__chip" href="#contact">
            6. Contact
          </a>
        </nav>
      </div>

      <section id="objet" className="legal__section">
        <h2 className="legal__h2">1. Objet</h2>
        <p className="legal__p">
          Les présentes Conditions Générales de Vente (ci-après « CGV »)
          décrivent de manière illustrative les règles applicables à une
          boutique en ligne, dans le cadre d’un projet pédagogique.
        </p>
        <p className="legal__p">
          Elles n’ont pas vocation à encadrer une activité commerciale réelle.
        </p>
      </section>

      <section id="produits" className="legal__section">
        <h2 className="legal__h2">2. Produits / services</h2>
        <p className="legal__p">
          Les éléments présentés (objets virtuels, monnaie fictive, packs,
          abonnements) sont affichés à titre de démonstration.
        </p>
        <p className="legal__p">
          Aucune fourniture réelle de produit ou service n’est effectuée.
        </p>
      </section>

      <section id="prix" className="legal__section">
        <h2 className="legal__h2">3. Prix</h2>
        <p className="legal__p">
          Les prix affichés sont fictifs et n’ont aucune valeur contractuelle.
        </p>
      </section>

      <section id="paiement" className="legal__section">
        <h2 className="legal__h2">4. Paiement</h2>
        <p className="legal__p">
          Aucun module de paiement n’est intégré et aucune transaction
          financière n’est possible sur le Site.
        </p>
      </section>

      <section id="retractation" className="legal__section">
        <h2 className="legal__h2">5. Droit de rétractation</h2>
        <p className="legal__p">
          Le Site ne proposant pas de ventes réelles, les dispositions relatives
          au droit de rétractation ne s’appliquent pas dans ce contexte.
        </p>
      </section>

      <section id="contact" className="legal__section">
        <h2 className="legal__h2">6. Contact</h2>
        <p className="legal__p">
          Pour toute question :{' '}
          <span className="legal__mono">jason-71@outlook.fr</span>
        </p>
      </section>

      <div className="legal__divider" />
      <p className="legal__updated">Dernière mise à jour : 11/01/2026</p>
    </>
  );
};

export default ConditionsVentesPage;
