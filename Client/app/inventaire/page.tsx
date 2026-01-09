'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import './inventory.scss';
import { API_ORIGIN } from '@/services/apiOrigin';
import { RootState } from '../store/auth';

const InventoryPage = () => {
  const tokenFromStore = useSelector((s: RootState) => s.auth.token);
  const [inventory, setInventory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token =
      tokenFromStore ||
      (typeof window !== 'undefined' ? localStorage.getItem('token') : null);

    if (!token) {
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();

    const loadInventory = async () => {
      try {
        const response = await fetch(`${API_ORIGIN}/account/inventory`, {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        });

        const data: any = await response.json().catch(() => null);

        if (!response.ok) {
          setError(data?.message || 'Erreur lors du chargement.');
          setInventory([]);
          return;
        }

        setInventory(Array.isArray(data?.inventory) ? data.inventory : []);
      } catch (err: any) {
        if (err?.name === 'AbortError') return;
        setError('Erreur serveur.');
      } finally {
        setIsLoading(false);
      }
    };

    loadInventory();

    return () => controller.abort();
  }, [tokenFromStore]);

  return (
    <main id="inventoryPage">
      <header className="inventory-header">
        <div className="header-left">
          <h1>Inventaire</h1>
          <p>Retrouve ici les objets que tu as achetÃ©s.</p>
        </div>

        <div className="header-right">
          <Link className="btn-ghost" href="/account">
            Retour compte
          </Link>
          <Link className="btn-gold" href="/shop">
            Aller Ã  la boutique
          </Link>
        </div>
      </header>

      <section className="inventory-container">
        <div className="inventory-card">
          <div className="inventory-toolbar">
            <div className="toolbar-left">
              <div className="pill">
                <span className="dot" />
                {inventory.length} objet(s)
              </div>
            </div>

            <div className="search">
              <input placeholder="Rechercher un objet..." />
            </div>
          </div>
          <div className="inventory-content">
            {isLoading ? (
              <div className="inventory-empty">
                Chargement de l&apos;inventaire...
              </div>
            ) : error ? (
              <div className="inventory-empty">{error}</div>
            ) : inventory.length === 0 ? (
              <div className="inventory-empty">
                Aucun objet pour le moment. Achete des items dans la boutique.
              </div>
            ) : (
              <ul className="inventory-grid">
                {inventory.map((it) => (
                  <li key={it._id} className="item-card">
                    <div className="item-img">{/* image ici */}</div>
                    <div className="item-body">
                      <p className="item-name">{it.name}</p>
                      <p className="item-meta">{it.price} Eter</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default InventoryPage;
