'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import './login.scss';
import { login } from '../store/auth/authSlice';
import { RootState } from '../store/auth';
import { API_ORIGIN } from '@/services/apiOrigin';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();
  const dispatch = useDispatch();
  const isConnected = useSelector((store: RootState) => store.auth.isConnected);

  useEffect(() => {
    if (isConnected) router.replace('/');
  }, [isConnected, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!identifier || !password) {
      alert('Merci de remplir tous les champs!');
      return;
    }

    try {
      // nouvelle route

      const response = await fetch(`${API_ORIGIN}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: identifier.trim(),
          password,
        }),
      });

      const data: any = await response.json().catch(() => null);

      if (!response.ok) {
        alert(data?.message || 'Erreur lors de la connexion');
        return;
      }

      // stockage token + user
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // adapte au payload renvoyé par le backend
      // backend renvoie: user { id, identifier, pseudo, email, balance }
      dispatch(
        login({
          token: data.token,
          user: {
            id: data.user.id,
            name: data.user.pseudo || data.user.identifier, // affichage
            avatar: '/assets/Coupe_Casquette.png',
            balance: data.user.balance ?? 0,
            role: data.user.role || 'user',
          },
        })
      );

      router.push('/');
    } catch (err) {
      console.error(err);
      alert('Erreur serveur');
    }
  };

  return (
    <div id="loginPage">
      <form onSubmit={handleLogin}>
        <h2>Connexion</h2>

        <label>
          <div className="label-row">
            Identifiant <span className="star">*</span>
          </div>
          <input
            type="text"
            value={identifier}
            onChange={(e) =>
              setIdentifier(
                e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '')
              )
            }
            placeholder="ex: jason_71"
            autoComplete="username"
          />
        </label>

        <label>
          <div className="label-row">
            Mot de passe <span className="star">*</span>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </label>

        <button type="submit">Se connecter</button>

        <p>
          Pas encore de compte ? <Link href="/signup">S&apos;inscrire</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
