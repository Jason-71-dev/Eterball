'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './signup.scss';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/auth';
import { API_ORIGIN } from '@/services/apiOrigin';
import Link from 'next/link';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [usersurname, setUsersurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  // ✅ NEW: UI messages + loading
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const isConnected = useSelector((s: RootState) => s.auth.isConnected);

  useEffect(() => {
    if (isConnected) router.replace('/');
  }, [isConnected, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ✅ reset messages
    setErrorMsg(null);
    setSuccessMsg(null);

    if (
      !username ||
      !usersurname ||
      !email ||
      !password ||
      !confirmPassword ||
      !day ||
      !month ||
      !year
    ) {
      const msg = 'Merci de remplir tous les champs !';
      setErrorMsg(msg);
      alert(msg);
      return;
    }

    if (password !== confirmPassword) {
      const msg = 'Les mots de passe ne correspondent pas !';
      setErrorMsg(msg);
      alert(msg);
      return;
    }

    const birthDate = `${year}-${month.padStart(2, '0')}-${day.padStart(
      2,
      '0'
    )}`;

    try {
      setIsSubmitting(true);

      const res = await fetch(`${API_ORIGIN}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          surname: usersurname,
          email,
          password,
          birthDate,
        }),
      });

      // ✅ robust json parsing
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        // ✅ explicit duplicate email handling (backend should return 409)
        if (res.status === 409) {
          const msg = data?.message || 'Un compte avec cet email existe déjà.';
          setErrorMsg(msg);
          alert(msg);
          return;
        }

        const msg =
          data?.error ||
          data?.message ||
          'Erreur lors de la création du compte';
        setErrorMsg(msg);
        alert(msg);
        return;
      }

      const msg = data?.message || 'Compte créé avec succès !';
      setSuccessMsg(msg);
      alert(msg);
      router.push('/login');
    } catch (err) {
      console.error(err);
      const msg = 'Erreur serveur';
      setErrorMsg(msg);
      alert(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="signUpPage">
      <form onSubmit={handleSubmit} id="formSignUp">
        <h2 id="account">Créer un compte</h2>

        {/* ✅ NEW: inline messages (optionnel, stylable via SCSS) */}
        {errorMsg && <p className="form-message error">{errorMsg}</p>}
        {successMsg && <p className="form-message success">{successMsg}</p>}

        <label>
          <div className="label-row">
            Pseudo <span className="star">*</span>
          </div>
          <input
            id="infosCompte"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ton pseudo"
            autoComplete="username"
          />
        </label>

        <label>
          <div className="label-row">
            Nom <span className="star">*</span>
          </div>
          <input
            id="infosCompte"
            value={usersurname}
            onChange={(e) => setUsersurname(e.target.value)}
            placeholder="Ton nom"
            autoComplete="family-name"
          />
        </label>

        <label>
          <div className="label-row">
            Email <span className="star">*</span>
          </div>
          <input
            id="infosCompte"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ex: jason@mail.com"
            autoComplete="email"
          />
        </label>

        <label>
          <div className="label-row">
            Mot de passe <span className="star">*</span>
          </div>
          <input
            id="infosCompte"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            autoComplete="new-password"
          />
        </label>

        <label>
          <div className="label-row">
            Confirmation <span className="star">*</span>
          </div>
          <input
            id="infosCompte"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="********"
            autoComplete="new-password"
          />
        </label>

        <label>
          <div className="label-row">
            Date de naissance <span className="star">*</span>
          </div>
          <div id="age">
            <input
              id="date"
              value={day}
              onChange={(e) =>
                setDay(e.target.value.replace(/\D/g, '').slice(0, 2))
              }
              placeholder="JJ"
              inputMode="numeric"
            />
            <input
              id="date"
              value={month}
              onChange={(e) =>
                setMonth(e.target.value.replace(/\D/g, '').slice(0, 2))
              }
              placeholder="MM"
              inputMode="numeric"
            />
            <input
              id="date"
              value={year}
              onChange={(e) =>
                setYear(e.target.value.replace(/\D/g, '').slice(0, 4))
              }
              placeholder="AAAA"
              inputMode="numeric"
            />
          </div>
        </label>

        {/* ✅ NEW: disable while submitting */}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Création...' : 'Créer mon compte'}
        </button>

        <p>
          Déjà un compte ? <Link href="/login">Se connecter</Link>
        </p>
      </form>
    </div>
  );
}
