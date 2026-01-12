'use client';

import Image from 'next/image';
import './shop.scss';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store/auth';
import { setBalance } from '../store/auth/authSlice';

type Item = {
  _id: string;
  name: string;
  price: number;
  imageURL: string;
  imageUrl?: string;
  // Optionnel si ton API renvoie une catégorie / tag / type
  category?: string[] | string;
  type?: string;
  tag?: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';

type SortKey = 'reco' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';
type CategoryId =
  | 'all'
  | 'booster'
  | 'featured'
  | 'eter'
  | 'services'
  | 'packs'
  | 'items'
  | 'promos';

const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: 'all', label: 'Tous' },
  { id: 'booster', label: 'Booster' },
  { id: 'featured', label: 'Article du moment' },
  { id: 'eter', label: 'Eter' },
  { id: 'services', label: 'Services' },
  { id: 'packs', label: 'Packs' },
  { id: 'items', label: 'Objets' },
  { id: 'promos', label: 'Promotions' },
];

const ShopPage = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [buyingId, setBuyingId] = useState<string | null>(null);

  // Drawer mobile
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Filtres
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [sortKey, setSortKey] = useState<SortKey>('reco');

  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((s: RootState) => s.auth.token);
  const isConnected = useSelector((s: RootState) => s.auth.isConnected);
  const balance = useSelector((s: RootState) => s.auth.user?.balance);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_URL}/shop/items`, { cache: 'no-store' });

        if (!res.ok) {
          const text = await res.text().catch(() => '');
          console.error('Shop API error:', res.status, text);
          setItems([]);
          return;
        }

        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);

        if (!Array.isArray(data)) {
          console.warn('Shop API did not return an array:', data);
        }
      } catch (error) {
        console.error('Error fetching items:', error);
        setItems([]);
      }
    })();
  }, []);

  // Bloque le scroll quand le drawer est ouvert
  useEffect(() => {
    document.body.style.overflow = filtersOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [filtersOpen]);

  const filteredItems = useMemo(() => {
    let result = [...items];

    // Filtre catégorie (si ton API renvoie category/type/tag)
    if (selectedCategory !== 'all') {
      result = result.filter((item) => {
        const value = item.category ?? item.type ?? item.tag ?? '';

        // category peut être: string | string[] | {name:string} | ...
        if (Array.isArray(value)) {
          return value
            .map((v) => String(v).toLowerCase().trim())
            .includes(selectedCategory);
        }

        const raw =
          typeof value === 'string'
            ? value.toLowerCase().trim()
            : typeof value === 'object' &&
              value !== null &&
              'name' in value &&
              typeof (value as Record<string, unknown>).name === 'string'
            ? (value as Record<'name', string>).name.toLowerCase().trim()
            : '';

        return raw === selectedCategory;
      });
    }

    // Tri
    switch (sortKey) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break; // reco = ordre API
    }

    return result;
  }, [items, selectedCategory, sortKey]);

  const handleBuy = async (itemId: string) => {
    if (!isConnected || !token) {
      alert('Connecte-toi pour acheter.');
      return;
    }

    try {
      setBuyingId(itemId);

      const res = await fetch(`${API_URL}/shop/buy/${itemId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        alert(data?.message || "Erreur lors de l'achat");
        return;
      }

      if (typeof data?.newBalance === 'number') {
        dispatch(setBalance(data.newBalance));
      }

      alert(data?.message || 'Achat réussi');
    } catch (err) {
      console.error(err);
      alert('Erreur serveur');
    } finally {
      setBuyingId(null);
    }
  };

  const onSelectCategory = (id: CategoryId) => {
    setSelectedCategory(id);
    // UX mobile: ferme le drawer après sélection
    setFiltersOpen(false);
  };

  const FiltersContent = () => (
    <>
      <div className="filter-block">
        <h3>Catégories</h3>
        <ul className="filters-list">
          {CATEGORIES.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => onSelectCategory(c.id)}
                aria-pressed={selectedCategory === c.id}
              >
                {c.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );

  return (
    <div>
      <main id="shop">
        <h1 id="title-shop">Boutique d&apos;Eterball</h1>

        <div style={{ padding: '0 12px', marginBottom: 10 }}>
          {isConnected ? (
            <p style={{ margin: 0 }}>
              Solde : {typeof balance === 'number' ? balance : 0} Eter
            </p>
          ) : (
            <p style={{ margin: 0, opacity: 0.8 }}>
              Connecte-toi pour acheter.
            </p>
          )}
        </div>

        <section id="shop-section" className="shop-layout">
          {/* Desktop: colonne gauche */}
          <aside className="shop-filters" aria-label="Filtres boutique">
            <FiltersContent />
          </aside>

          {/* Colonne droite */}
          <div className="shop-results">
            <div className="results-bar">
              <button
                type="button"
                className="filters-toggle"
                onClick={() => setFiltersOpen(true)}
              >
                Filtres
              </button>

              <div className="sort">
                <label htmlFor="sort">Trier par</label>
                <select
                  id="sort"
                  value={sortKey}
                  onChange={(e) => setSortKey(e.target.value as SortKey)}
                >
                  <option value="reco">Pertinence</option>
                  <option value="price-asc">Prix croissant</option>
                  <option value="price-desc">Prix décroissant</option>
                  <option value="name-asc">A → Z</option>
                  <option value="name-desc">Z → A</option>
                </select>
              </div>
            </div>

            <ul className="item-list">
              {filteredItems.length === 0 ? (
                <p style={{ padding: 12 }}>Aucun article pour le moment.</p>
              ) : (
                filteredItems.map((it) => {
                  const isBuying = buyingId === it._id;
                  const canBuy =
                    typeof balance === 'number' ? balance >= it.price : true;
                  const imgSrc = it.imageUrl || it.imageURL;
                  return (
                    <li key={it._id} className="item">
                      <div className="card-container">
                        <div className="img-wrap">
                          <Image
                            src={imgSrc}
                            alt={it.name}
                            fill
                            style={{ objectFit: 'cover' }}
                          />
                        </div>

                        <p className="item-name" title={it.name}>
                          {it.name}
                        </p>
                        <p className="item-price">{it.price} Eter</p>

                        <button
                          type="button"
                          onClick={() => handleBuy(it._id)}
                          disabled={!isConnected || isBuying || !canBuy}
                          className={`button-shop ${!canBuy ? 'disabled' : ''}`}
                        >
                          {isBuying
                            ? 'Achat...'
                            : !canBuy
                            ? 'Fonds insuffisants'
                            : 'Acheter'}
                        </button>
                      </div>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        </section>

        {/* Drawer mobile */}
        <div
          className={`filters-overlay ${filtersOpen ? 'open' : ''}`}
          onClick={() => setFiltersOpen(false)}
        />

        <aside
          className={`filters-drawer ${filtersOpen ? 'open' : ''}`}
          aria-label="Filtres boutique"
          aria-hidden={!filtersOpen}
        >
          <div className="drawer-header">
            <h2>Filtres</h2>
            <button type="button" onClick={() => setFiltersOpen(false)}>
              ✕
            </button>
          </div>

          <div className="drawer-content">
            <FiltersContent />
          </div>
        </aside>
      </main>
    </div>
  );
};

export default ShopPage;
