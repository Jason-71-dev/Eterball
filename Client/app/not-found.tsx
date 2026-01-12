'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import './not-found.scss';

export default function NotFound() {
  const router = useRouter();

  return (
    <section className="nf-full">
      {/* IMAGE FULLSCREEN */}
      <Image
        src="/404.png"
        alt="Erreur 404 - Mauvaise direction"
        fill
        priority
        className="nf-full__bg"
      />

      {/* OVERLAY */}
      <div className="nf-full__overlay">
        <div className="nf-full__content">
          <span className="nf-full__badge">Erreur 404</span>

          <h1 className="nf-full__title">
            Mauvaise direction<span>.</span>
          </h1>

          <p className="nf-full__subtitle">
            Tu es sorti du terrain… cette page n’existe pas.
          </p>

          <div className="nf-full__actions">
            <button
              className="nf-full__btn nf-full__btn--ghost"
              onClick={() => router.back()}
            >
              ← Retour
            </button>

            <Link className="nf-full__btn nf-full__btn--primary" href="/">
              Accueil
            </Link>

            <Link className="nf-full__btn" href="/actus">
              Actus
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
