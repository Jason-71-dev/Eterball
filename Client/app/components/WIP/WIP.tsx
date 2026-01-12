'use client';

import Link from 'next/link';
import './wip.scss';

type WIPProps = {
  title?: string;
  message?: string;
  showHomeLink?: boolean;
};

const WIP = ({
  title = 'Page en cours de développement',
  message = 'Cette page est actuellement en construction. Reviens bientôt.',
  showHomeLink = true,
}: WIPProps) => {
  return (
    <main className="wip">
      <section className="wip__card">
        <span className="wip__badge">WIP</span>

        <h1 className="wip__title">{title}</h1>
        <p className="wip__message">{message}</p>

        {showHomeLink && (
          <div className="wip__actions">
            <Link href="/" className="wip__button">
              Retour à l’accueil
            </Link>
          </div>
        )}
      </section>
    </main>
  );
};

export default WIP;
