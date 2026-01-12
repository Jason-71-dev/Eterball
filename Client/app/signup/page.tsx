'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './signup.scss';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/auth';
import { API_ORIGIN } from '@/services/apiOrigin';
import Link from 'next/link';

const IDENTIFIER_REGEX = /^[a-z0-9_]{3,30}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

function validateIdentifier(identifier: string): string | null {
  if (!IDENTIFIER_REGEX.test(identifier)) {
    return "L'identifiant doit contenir 3 à 30 caractères, uniquement des lettres minuscules, chiffres ou _.";
  }
  return null;
}

function validatePassword(password: string): string | null {
  if (!PASSWORD_REGEX.test(password)) {
    return 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre.';
  }
  return null;
}

const SignUp = () => {
  const [identifier, setIdentifier] = useState('');
  const [firstName, setFirstName] = useState('');

  const [lastName, setLastName] = useState('');
  const [pseudo, setPseudo] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

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
    setErrorMsg(null);
    setSuccessMsg(null);

    const cleanIdentifier = identifier.trim().toLowerCase();
    const cleanFirstName = firstName.trim();
    const cleanLastName = lastName.trim();
    const cleanPseudo = pseudo.trim();
    const cleanEmail = email.trim().toLowerCase();

    // champs requis
    if (
      !cleanIdentifier ||
      !cleanFirstName ||
      !cleanLastName ||
      !cleanPseudo ||
      !cleanEmail ||
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

    // identifiant (format)
    const identifierError = validateIdentifier(cleanIdentifier);
    if (identifierError) {
      setErrorMsg(identifierError);
      alert(identifierError);
      return;
    }

    // mot de passe (sécurité)
    const passwordError = validatePassword(password);
    if (passwordError) {
      setErrorMsg(passwordError);
      alert(passwordError);
      return;
    }

    // confirmation
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

      const res = await fetch(`${API_ORIGIN}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: cleanIdentifier,
          firstName: cleanFirstName,
          lastName: cleanLastName,
          pseudo: cleanPseudo,
          email: cleanEmail,
          password,
          birthDate,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        const msg =
          data?.message ||
          data?.error ||
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

        {errorMsg && <p className="form-message error">{errorMsg}</p>}
        {successMsg && <p className="form-message success">{successMsg}</p>}

        {/* Identifiant (login) */}
        <label>
          <div className="label-row">
            Identifiant <span className="star">*</span>
          </div>
          <input
            className="infosCompte"
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

        {/* Prénom */}
        <label>
          <div className="label-row">
            Prénom <span className="star">*</span>
          </div>
          <input
            className="infosCompte"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Ton prénom"
            autoComplete="given-name"
          />
        </label>

        {/* Nom */}
        <label>
          <div className="label-row">
            Nom <span className="star">*</span>
          </div>
          <input
            className="infosCompte"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Ton nom"
            autoComplete="family-name"
          />
        </label>

        {/* Pseudo */}
        <label>
          <div className="label-row">
            Pseudo <span className="star">*</span>
          </div>
          <input
            className="infosCompte"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            placeholder="Ton pseudo"
            autoComplete="nickname"
          />
        </label>

        {/* Email */}
        <label>
          <div className="label-row">
            Email <span className="star">*</span>
          </div>
          <input
            className="infosCompte"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ex: jason@mail.com"
            autoComplete="email"
          />
        </label>

        {/* MDP */}
        <label>
          <div className="label-row">
            Mot de passe <span className="star">*</span>
          </div>
          <input
            className="infosCompte"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            autoComplete="new-password"
          />
          <p style={{ fontSize: '0.8rem', opacity: 0.75, margin: 0 }}>
            8 caractères min, 1 majuscule, 1 minuscule, 1 chiffre
          </p>
        </label>

        {/* Confirm */}
        <label>
          <div className="label-row">
            Confirmation <span className="star">*</span>
          </div>
          <input
            className="infosCompte"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="********"
            autoComplete="new-password"
          />
        </label>

        {/* Birthdate */}
        <label>
          <div className="label-row">
            Date de naissance <span className="star">*</span>
          </div>
          <div id="age">
            <input
              className="date"
              value={day}
              onChange={(e) =>
                setDay(e.target.value.replace(/\D/g, '').slice(0, 2))
              }
              placeholder="JJ"
              inputMode="numeric"
            />
            <input
              className="date"
              value={month}
              onChange={(e) =>
                setMonth(e.target.value.replace(/\D/g, '').slice(0, 2))
              }
              placeholder="MM"
              inputMode="numeric"
            />
            <input
              className="date"
              value={year}
              onChange={(e) =>
                setYear(e.target.value.replace(/\D/g, '').slice(0, 4))
              }
              placeholder="AAAA"
              inputMode="numeric"
            />
          </div>
        </label>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Création...' : 'Créer mon compte'}
        </button>

        <p>
          Déjà un compte ? <Link href="/login">Se connecter</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
