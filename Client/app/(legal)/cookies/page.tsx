import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookies | Eterball',
  description:
    'Politique de cookies du site Eterball (projet fictif à vocation pédagogique).',
};

export default function CookiesPage() {
  return (
    <>
      <h1 className="legal__title">Politique de cookies</h1>
      <p className="legal__subtitle">
        Informations sur l’usage des cookies — projet pédagogique.
      </p>

      <div className="legal__card">
        <nav className="legal__toc" aria-label="Sommaire">
          <a className="legal__chip" href="#definition">
            1. Définition
          </a>
          <a className="legal__chip" href="#utilisation">
            2. Utilisation
          </a>
          <a className="legal__chip" href="#gestion">
            3. Gestion
          </a>
        </nav>
      </div>

      <section id="definition" className="legal__section">
        <h2 className="legal__h2">1. Qu’est-ce qu’un cookie ?</h2>
        <p className="legal__p">
          Un cookie est un petit fichier enregistré sur le terminal de
          l’utilisateur (ordinateur, mobile) lors de la consultation d’un site.
          Il permet notamment de mémoriser des informations techniques.
        </p>
      </section>

      <section id="utilisation" className="legal__section">
        <h2 className="legal__h2">2. Cookies utilisés sur le site</h2>
        <p className="legal__p">
          Le Site peut utiliser uniquement des cookies{' '}
          <strong>techniques</strong>
          nécessaires à son bon fonctionnement (ex : session, authentification,
          sécurité).
        </p>
        <p className="legal__p legal__note">
          Le Site n’a pas vocation à utiliser des cookies publicitaires ni du
          traçage à des fins commerciales. Si des outils statistiques tiers
          étaient ajoutés, un mécanisme de consentement serait mis en place.
        </p>
      </section>

      <section id="gestion" className="legal__section">
        <h2 className="legal__h2">3. Gérer ou supprimer les cookies</h2>
        <p className="legal__p">
          L’utilisateur peut configurer son navigateur pour bloquer ou supprimer
          les cookies. Le refus des cookies techniques peut toutefois dégrader
          certaines fonctionnalités du Site.
        </p>
      </section>

      <div className="legal__divider" />
      <p className="legal__updated">Dernière mise à jour : 11/01/2026</p>
    </>
  );
}
