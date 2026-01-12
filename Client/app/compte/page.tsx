'use client';

import Link from 'next/link';
import { useSelector } from 'react-redux';
import './account.scss';
import type { RootState } from '../store/auth';

function readLocalEmail(): string {
  try {
    if (typeof window === 'undefined') return '—';
    const raw = localStorage.getItem('user');
    const parsed = raw ? JSON.parse(raw) : null;
    return parsed?.email ?? '—';
  } catch {
    return '—';
  }
}

const AccountPage = () => {
  const isConnected = useSelector((s: RootState) => s.auth.isConnected);
  const user = useSelector((s: RootState) => s.auth.user);
  const email = readLocalEmail();

  return (
    <main id="accountPage">
      <section className="account-hero">
        <div className="hero-inner">
          <h1>
            Salut Eterballier,
            <br />
            ici tu peux gérer ton compte
          </h1>
        </div>
      </section>

      {isConnected && (
        <section className="account-content">
          <div className="account-grid">
            {/* Informations de compte */}
            <section className="card" aria-label="Informations de compte">
              <div className="card-title sub">Information du compte</div>
              <div className="card-body">
                <div className="row">
                  <div className="label">Adresse e-mail</div>
                  <div className="value">
                    {email}
                    <span className="dot" aria-hidden="true" />
                  </div>
                </div>

                <div className="row">
                  <div className="label">Nom d&apos;utilisateur</div>
                  <div className="value">{user?.name ?? '—'}</div>
                </div>

                <div className="row">
                  <div className="label">Eter</div>
                  <div className="value">
                    {typeof user?.balance === 'number' ? user.balance : 0}
                  </div>
                </div>
              </div>

              <div className="card-actions">
                <button type="button" className="btn-secondary">
                  Modifier les informations
                </button>
              </div>
            </section>

            {/* Booster et paiement */}
            <section className="card" aria-label="Booster et paiement">
              <div className="card-title sub">Booster</div>
              <div className="card-body">
                <p className="muted">
                  Temps restant du booster
                  <br />1 an, 1 mois et 3 heures
                </p>
              </div>

              <div className="card-actions">
                <button type="button" className="btn-secondary">
                  Augmenter la durée
                </button>
              </div>

              <div className="card-divider" />
              <div className="card-title sub">Historique d'achats</div>
              <div className="card-body">
                <p className="muted">
                  Consulter l&apos;historique de vos achats.
                  <br />
                  En cas de transaction non effectuée, contactez le support.
                </p>
              </div>

              <div className="card-actions">
                <button type="button" className="btn-secondary">
                  Voir l&apos;historique
                </button>
              </div>
            </section>

            {/* Sécurité / Inventaire / Personnages */}
            <section className="card" aria-label="Sécurité et gestion">
              <div className="card-title sub">Mot de passe</div>
              <div className="card-body">
                <p className="muted">
                  Vous pouvez modifier votre mot de passe à tout moment.
                  <br />
                  Conseil : utilisez un mot de passe unique et robuste.
                </p>
              </div>

              <div className="card-actions">
                <button type="button" className="btn-secondary">
                  Modifier mon mot de passe
                </button>
              </div>

              <div className="card-divider" />

              <div className="card-title sub">Inventaire</div>

              <div className="card-body">
                <p className="muted">
                  Consulte les objets achetés dans la boutique et tes
                  récompenses.
                </p>
              </div>

              <div className="card-actions">
                <Link href="/inventaire">
                  <button className="btn-secondary">Voir mon inventaire</button>
                </Link>
              </div>

              <div className="card-divider" />

              <div className="card-title sub">Gérer vos personnages</div>

              <div className="card-body">
                <p className="muted">
                  Vous pourrez modifier vos personnages : couleurs, coupe de
                  cheveux, caractéristiques…
                </p>
              </div>

              <div className="card-actions">
                <button type="button" className="btn-secondary">
                  Modifier mes personnages
                </button>
              </div>
            </section>
          </div>

          <section className="account-banner" aria-label="Parrainage">
            <h2>Parrainez vos amis</h2>
          </section>
        </section>
      )}
    </main>
  );
};

export default AccountPage;
