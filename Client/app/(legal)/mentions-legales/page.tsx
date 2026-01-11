import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentions légales | Eterball',
  description:
    'Mentions légales du site Eterball (projet fictif à vocation pédagogique).',
};

export default function MentionsLegalesPage() {
  return (
    <>
      <h1 className="legal__title">Mentions légales</h1>
      <p className="legal__subtitle">
        Site de démonstration — projet pédagogique.
      </p>

      <div className="legal__card">
        <h2 className="legal__h2">Éditeur du site</h2>
        <p className="legal__p">
          Nom : <span className="legal__mono">Jason Villin</span>
          <br />
          Contact : <span className="legal__mono">jason-71@outlook.fr</span>
        </p>

        <p className="legal__p legal__note">
          Le présent site est un <strong>site de démonstration</strong> réalisé
          dans le cadre d’un projet de formation. Il n’a{' '}
          <strong>aucune vocation commerciale</strong>.
        </p>
      </div>

      <div className="legal__card">
        <h2 className="legal__h2">Responsable de la publication</h2>
        <p className="legal__p">
          <span className="legal__mono">Jason Villin</span>
        </p>
      </div>

      <div className="legal__card">
        <h2 className="legal__h2">Hébergement</h2>
        <p className="legal__p">
          Hébergeur : <span className="legal__mono">Vercel</span>
          <br />
          Adresse : <span className="legal__mono">Adresse de l’hébergeur</span>
          <br />
          Téléphone :{' '}
          <span className="legal__mono">Téléphone de l’hébergeur</span>
        </p>
      </div>

      <div className="legal__card">
        <h2 className="legal__h2">Propriété intellectuelle</h2>
        <p className="legal__p">
          Les contenus présents sur le Site (textes, visuels, logos, éléments
          graphiques, code, univers) sont protégés par le droit de la propriété
          intellectuelle.
        </p>
        <p className="legal__p">
          Toute reproduction, modification ou diffusion sans autorisation est
          interdite, sauf dans un cadre strictement pédagogique.
        </p>
      </div>

      <div className="legal__divider" />
      <p className="legal__updated">Dernière mise à jour : 11/01/2026</p>
    </>
  );
}
