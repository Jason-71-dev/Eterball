'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
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
      <div className="inventory-header">
        <div className="header-left">
          <h1>Inventaire</h1>
          <p>Retrouve ici les objets que tu as achetes.</p>
        </div>

        <div className="header-right">
          <Link className="btn-ghost" href="/compte">
            Retour compte
          </Link>
          <Link className="btn-gold" href="/boutique">
            Aller a la boutique
          </Link>
        </div>
      </div>

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
                {inventory.map((it) => {
                  const imageSrc = it.imageUrl ?? it.imageURL;

                  return (
                    <li key={it._id} className="item-card">
                      <div className="item-img">
                        {imageSrc ? (
                          <Image
                            src={imageSrc}
                            alt={it.name || 'Item'}
                            fill
                            sizes="(max-width: 440px) 100vw, (max-width: 760px) 50vw, (max-width: 1020px) 33vw, 25vw"
                            className="item-img__image"
                          />
                        ) : (
                          <span>Aucune image</span>
                        )}
                      </div>
                      <div className="item-body">
                        <p className="item-name">{it.name}</p>
                        <p className="item-meta">{it.price} Eter</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default InventoryPage;
