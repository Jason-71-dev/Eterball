'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import './login.scss';
import { login } from '../store/auth/authSlice';
import { RootState } from '../store/auth';
import { API_ORIGIN } from '@/services/apiOrigin';

type LoginError = {
  error?: string;
  code?: string;
};

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [blockedMsg, setBlockedMsg] = useState<string | null>(null);
  const [blockedCode, setBlockedCode] = useState<string | null>(null);

  // resend UI
  const [resendEmail, setResendEmail] = useState('');
  const [resendMsg, setResendMsg] = useState<string | null>(null);
  const [resending, setResending] = useState(false);

  const router = useRouter();
  const params = useSearchParams();
  const dispatch = useDispatch();
  const isConnected = useSelector((store: RootState) => store.auth.isConnected);

  const verified = useMemo(() => params.get('verified') === 'true', [params]);

  useEffect(() => {
    if (isConnected) router.replace('/');
  }, [isConnected, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setBlockedMsg(null);
    setBlockedCode(null);
    setResendMsg(null);

    if (!username || !password) {
      alert('Merci de remplir tous les champs!');
      return;
    }

    try {
      const response = await fetch(`${API_ORIGIN}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password }),
      });

      const data: any = await response.json().catch(() => null);

      if (!response.ok) {
        const errMsg =
          (data as LoginError)?.error || 'Erreur lors de la connexion';
        const errCode = (data as LoginError)?.code || null;

        // Affichage du bloc resend uniquement si EMAIL_NOT_VERIFIED
        if (response.status === 403 && errCode === 'EMAIL_NOT_VERIFIED') {
          setBlockedMsg(errMsg);
          setBlockedCode(errCode);
          return;
        }

        alert(errMsg);
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      dispatch(
        login({
          token: data.token,
          user: {
            id: data.user.id,
            name: data.user.username,
            avatar: '/assets/Coupe_Casquette.png',
            eter: data.user.eter ?? 0,
          },
        })
      );

      router.push('/');
    } catch (err) {
      console.error(err);
      alert('Erreur serveur');
    }
  };

  const handleResend = async () => {
    setResendMsg(null);

    const email = resendEmail.trim().toLowerCase();
    if (!email) {
      setResendMsg("Entre l'email utilisé à l'inscription.");
      return;
    }

    try {
      setResending(true);

      const res = await fetch(`${API_ORIGIN}/resend-verification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data: any = await res.json().catch(() => null);

      if (!res.ok) {
        setResendMsg(data?.error || 'Impossible de renvoyer le mail.');
        return;
      }

      setResendMsg(data?.message || 'Email renvoyé ✅');
    } catch (e) {
      setResendMsg('Erreur réseau.');
    } finally {
      setResending(false);
    }
  };

  return (
    <div id="loginPage">
      <form onSubmit={handleLogin}>
        <h2>Connexion</h2>

        {verified && (
          <p style={{ margin: 0, opacity: 0.95 }}>
            Email vérifié, tu peux te connecter.
          </p>
        )}

        <label>
          <div className="label-row">
            Nom d&apos;utilisateur <span className="star">*</span>
          </div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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

        {blockedMsg && blockedCode === 'EMAIL_NOT_VERIFIED' && (
          <div style={{ width: 300, marginTop: 10 }}>
            <p style={{ margin: 0 }}>{blockedMsg}</p>

            <div style={{ marginTop: 10 }}>
              <input
                type="email"
                placeholder="Ton email d'inscription"
                value={resendEmail}
                onChange={(e) => setResendEmail(e.target.value)}
                style={{
                  width: '100%',
                  borderRadius: 12,
                  height: 36,
                  paddingInline: 10,
                }}
              />
              <button
                type="button"
                onClick={handleResend}
                disabled={resending}
                style={{ width: '100%', marginTop: 10 }}
              >
                {resending ? 'Envoi…' : 'Renvoyer le mail de confirmation'}
              </button>

              {resendMsg && <p style={{ marginTop: 8 }}>{resendMsg}</p>}
            </div>
          </div>
        )}

        <p>
          Pas encore de compte ? <Link href="/signup">S&apos;inscrire</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
