'use client';

import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/auth';
import { API_ORIGIN } from '@/services/apiOrigin';
import Link from 'next/link';
import './admin.scss';

type Status = { kind: 'idle' | 'error' | 'success'; message?: string };

const AdminPage = () => {
  const tokenFromStore = useSelector((s: RootState) => s.auth.token);
  const user = useSelector((s: RootState) => s.auth.user);
  const isConnected = useSelector((s: RootState) => s.auth.isConnected);

  const token =
    tokenFromStore ||
    (typeof window !== 'undefined' ? localStorage.getItem('token') : null);

  const isAdmin = user?.role === 'admin';

  const [itemForm, setItemForm] = useState({
    name: '',
    details: '',
    price: '',
    category: '',
    imageUrl: '',
  });
  const [classForm, setClassForm] = useState({
    name: '',
    slug: '',
    role: 'offense',
    image: '',
    difficulty: 'easy',
    description: '',
    order: '0',
    hp: '0',
    attack: '0',
    defense: '0',
    speed: '0',
    technique: '0',
    stamina: '0',
  });

  const [itemStatus, setItemStatus] = useState<Status>({ kind: 'idle' });
  const [classStatus, setClassStatus] = useState<Status>({ kind: 'idle' });

  const itemPayload = useMemo(() => {
    const categories = itemForm.category
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean);
    return {
      name: itemForm.name.trim(),
      details: itemForm.details.trim(),
      price: Number(itemForm.price),
      category: categories,
      imageUrl: itemForm.imageUrl.trim(),
    };
  }, [itemForm]);

  const classPayload = useMemo(() => {
    return {
      name: classForm.name.trim(),
      slug: classForm.slug.trim().toLowerCase(),
      role: classForm.role,
      image: classForm.image.trim(),
      difficulty: classForm.difficulty,
      description: classForm.description.trim(),
      order: Number(classForm.order),
      stats: {
        hp: Number(classForm.hp),
        attack: Number(classForm.attack),
        defense: Number(classForm.defense),
        speed: Number(classForm.speed),
        technique: Number(classForm.technique),
        stamina: Number(classForm.stamina),
      },
    };
  }, [classForm]);

  const handleCreateItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setItemStatus({ kind: 'idle' });

    if (!token) {
      setItemStatus({ kind: 'error', message: 'Token manquant.' });
      return;
    }

    if (!itemPayload.name || !itemPayload.details || !itemPayload.imageUrl) {
      setItemStatus({ kind: 'error', message: 'Champs requis manquants.' });
      return;
    }

    if (!Array.isArray(itemPayload.category) || itemPayload.category.length === 0) {
      setItemStatus({ kind: 'error', message: 'Ajoute au moins une catégorie.' });
      return;
    }

    if (!Number.isFinite(itemPayload.price) || itemPayload.price < 0) {
      setItemStatus({ kind: 'error', message: 'Prix invalide.' });
      return;
    }

    try {
      const res = await fetch(`${API_ORIGIN}/shop/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(itemPayload),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setItemStatus({
          kind: 'error',
          message: data?.message || 'Erreur lors de la création de l’item.',
        });
        return;
      }

      setItemStatus({ kind: 'success', message: 'Item créé.' });
      setItemForm({ name: '', details: '', price: '', category: '', imageUrl: '' });
    } catch (err) {
      setItemStatus({ kind: 'error', message: 'Erreur serveur.' });
    }
  };

  const handleCreateClass = async (e: React.FormEvent) => {
    e.preventDefault();
    setClassStatus({ kind: 'idle' });

    if (!token) {
      setClassStatus({ kind: 'error', message: 'Token manquant.' });
      return;
    }

    if (!classPayload.name || !classPayload.slug || !classPayload.image) {
      setClassStatus({ kind: 'error', message: 'Champs requis manquants.' });
      return;
    }

    try {
      const res = await fetch(`${API_ORIGIN}/api/classes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(classPayload),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setClassStatus({
          kind: 'error',
          message: data?.message || 'Erreur lors de la création de la classe.',
        });
        return;
      }

      setClassStatus({ kind: 'success', message: 'Classe créée.' });
      setClassForm({
        name: '',
        slug: '',
        role: 'offense',
        image: '',
        difficulty: 'easy',
        description: '',
        order: '0',
        hp: '0',
        attack: '0',
        defense: '0',
        speed: '0',
        technique: '0',
        stamina: '0',
      });
    } catch (err) {
      setClassStatus({ kind: 'error', message: 'Erreur serveur.' });
    }
  };

  if (!isConnected) {
    return (
      <main className="admin-page">
        <section className="admin-card">
          <h1>Administration</h1>
          <p>Connecte-toi avec un compte admin.</p>
          <Link href="/login" className="admin-link">
            Aller à la connexion
          </Link>
        </section>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="admin-page">
        <section className="admin-card">
          <h1>Accès refusé</h1>
          <p>Ce compte n’a pas les droits administrateur.</p>
          <Link href="/" className="admin-link">
            Retour à l’accueil
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <h1>Administration</h1>

      <section className="admin-grid">
        <form className="admin-card" onSubmit={handleCreateItem}>
          <h2>Créer un item</h2>

          <label>
            Nom
            <input
              value={itemForm.name}
              onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })}
            />
          </label>

          <label>
            Détails
            <textarea
              value={itemForm.details}
              onChange={(e) =>
                setItemForm({ ...itemForm, details: e.target.value })
              }
            />
          </label>

          <label>
            Prix
            <input
              type="number"
              min="0"
              value={itemForm.price}
              onChange={(e) => setItemForm({ ...itemForm, price: e.target.value })}
            />
          </label>

          <label>
            Catégories (séparées par des virgules)
            <input
              value={itemForm.category}
              onChange={(e) =>
                setItemForm({ ...itemForm, category: e.target.value })
              }
            />
          </label>

          <label>
            Image URL
            <input
              value={itemForm.imageUrl}
              onChange={(e) =>
                setItemForm({ ...itemForm, imageUrl: e.target.value })
              }
            />
          </label>

          {itemStatus.message && (
            <p className={`admin-status ${itemStatus.kind}`}>
              {itemStatus.message}
            </p>
          )}

          <button type="submit">Créer l’item</button>
        </form>

        <form className="admin-card" onSubmit={handleCreateClass}>
          <h2>Créer une classe</h2>

          <label>
            Nom
            <input
              value={classForm.name}
              onChange={(e) =>
                setClassForm({ ...classForm, name: e.target.value })
              }
            />
          </label>

          <label>
            Slug
            <input
              value={classForm.slug}
              onChange={(e) =>
                setClassForm({ ...classForm, slug: e.target.value })
              }
            />
          </label>

          <div className="admin-row">
            <label>
              Rôle
              <select
                value={classForm.role}
                onChange={(e) =>
                  setClassForm({ ...classForm, role: e.target.value })
                }
              >
                <option value="offense">offense</option>
                <option value="defense">defense</option>
                <option value="support">support</option>
                <option value="hybrid">hybrid</option>
              </select>
            </label>

            <label>
              Difficulté
              <select
                value={classForm.difficulty}
                onChange={(e) =>
                  setClassForm({ ...classForm, difficulty: e.target.value })
                }
              >
                <option value="easy">easy</option>
                <option value="medium">medium</option>
                <option value="hard">hard</option>
                <option value="expert">expert</option>
              </select>
            </label>
          </div>

          <label>
            Image
            <input
              value={classForm.image}
              onChange={(e) =>
                setClassForm({ ...classForm, image: e.target.value })
              }
            />
          </label>

          <label>
            Description
            <textarea
              value={classForm.description}
              onChange={(e) =>
                setClassForm({ ...classForm, description: e.target.value })
              }
            />
          </label>

          <label>
            Ordre d’affichage
            <input
              type="number"
              value={classForm.order}
              onChange={(e) =>
                setClassForm({ ...classForm, order: e.target.value })
              }
            />
          </label>

          <div className="admin-stats">
            <label>
              HP
              <input
                type="number"
                min="0"
                value={classForm.hp}
                onChange={(e) => setClassForm({ ...classForm, hp: e.target.value })}
              />
            </label>
            <label>
              Attack
              <input
                type="number"
                min="0"
                value={classForm.attack}
                onChange={(e) =>
                  setClassForm({ ...classForm, attack: e.target.value })
                }
              />
            </label>
            <label>
              Defense
              <input
                type="number"
                min="0"
                value={classForm.defense}
                onChange={(e) =>
                  setClassForm({ ...classForm, defense: e.target.value })
                }
              />
            </label>
            <label>
              Speed
              <input
                type="number"
                min="0"
                value={classForm.speed}
                onChange={(e) =>
                  setClassForm({ ...classForm, speed: e.target.value })
                }
              />
            </label>
            <label>
              Technique
              <input
                type="number"
                min="0"
                value={classForm.technique}
                onChange={(e) =>
                  setClassForm({ ...classForm, technique: e.target.value })
                }
              />
            </label>
            <label>
              Stamina
              <input
                type="number"
                min="0"
                value={classForm.stamina}
                onChange={(e) =>
                  setClassForm({ ...classForm, stamina: e.target.value })
                }
              />
            </label>
          </div>

          {classStatus.message && (
            <p className={`admin-status ${classStatus.kind}`}>
              {classStatus.message}
            </p>
          )}

          <button type="submit">Créer la classe</button>
        </form>
      </section>
    </main>
  );
};

export default AdminPage;
