'use client';

import Link from 'next/link';
import { useSelector } from 'react-redux';
import './account.scss';
import { RootState } from '../store/auth';

const AccountPage = () => {
  const isConnected = useSelector((s: RootState) => s.auth.isConnected);
  const user = useSelector((s: RootState) => s.auth.user);

  const email = (() => {
    try {
      const raw =
        typeof window !== 'undefined' ? localStorage.getItem('user') : null;
      const parsed = raw ? JSON.parse(raw) : null;
      return parsed?.email ?? '—';
    } catch {
      return '—';
    }
  })();

  if (!isConnected) {
    return (
      <main id="accountPage">
        <section className="account-hero">
          <div className="hero-inner">
            <h1>Salut Eterballier, ici tu peux gérer ton compte</h1>
            <p>
              Connecte-toi pour accéder à tes informations et à ton inventaire.
            </p>
            <Link className="btn-primary" href="/login">
              Se connecter
            </Link>
          </div>
        </section>
      </main>
    );
  }

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

      <section className="account-content">
        <div className="account-grid">
          <article className="card">
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

            <footer className="card-footer">
              <button type="button" className="btn-secondary">
                Modifier les informations
              </button>
            </footer>
          </article>

          <article className="card">
            <div className="card-body">
              <p className="muted">
                Temps restant du booster
                <br />1 an, 1 mois et 3 heures
              </p>
            </div>

            <footer className="card-footer">
              <button type="button" className="btn-secondary">
                Augmenter la durée
              </button>
            </footer>

            <div className="card-divider" />

            <div className="card-body">
              <p className="muted">
                Consulter l&apos;historique de vos achats.
                <br />
                En cas de transaction non effectuée, contactez le support.
              </p>
            </div>

            <footer className="card-footer">
              <button type="button" className="btn-secondary">
                Voir l&apos;historique
              </button>
            </footer>
          </article>

          <article className="card">
            <div className="card-body">
              <p className="muted">
                Vous pouvez modifier votre mot de passe à tout moment.
                <br />
                Conseil : utilisez un mot de passe unique et robuste.
              </p>
            </div>

            <footer className="card-footer">
              <button type="button" className="btn-secondary">
                Modifier mon mot de passe
              </button>
            </footer>

            <div className="card-divider" />

            <header className="card-title sub">Inventaire</header>

            <div className="card-body">
              <p className="muted">
                Consulte les objets achetés dans la boutique et tes récompenses.
              </p>
            </div>

            <footer className="card-footer">
              <Link className="btn-secondary link-btn" href="/inventaire">
                Voir mon inventaire
              </Link>
            </footer>

            <div className="card-divider" />

            <header className="card-title sub">Gérer vos personnages</header>

            <div className="card-body">
              <p className="muted">
                Vous pourrez modifier vos personnages : couleurs, coupe de
                cheveux, caractéristiques…
              </p>
            </div>

            <footer className="card-footer">
              <button type="button" className="btn-secondary">
                Modifier mes personnages
              </button>
            </footer>
          </article>
        </div>

        <section className="account-banner">
          <h2>Parrainez vos amis</h2>
        </section>
      </section>
    </main>
  );
};

export default AccountPage;
