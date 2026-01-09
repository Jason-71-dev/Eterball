'use client';

import Image from 'next/image';
import './shop.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store/auth';
import { setBalance } from '../store/auth/authSlice';

type Item = {
  _id: string;
  name: string;
  price: number;
  imageURL: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';

const ShopPage = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [buyingId, setBuyingId] = useState<string | null>(null);

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

      const data: any = await res.json().catch(() => null);

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

  return (
    <div>
      <main>
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

        <section id="shop-section">
          <div>
            <ul className="cat">
              <li>Tous</li>
              <li>Booster</li>
              <li>Article du moment</li>
              <li>Eter</li>
              <li>Services</li>
              <li>Packs</li>
              <li>Objets</li>
              <li>Promotions</li>
            </ul>

            <ul className="item-list">
              {items.length === 0 ? (
                <p style={{ padding: 12 }}>Aucun article pour le moment.</p>
              ) : (
                items.map((it) => {
                  const isBuying = buyingId === it._id;
                  const canBuy =
                    typeof balance === 'number' ? balance >= it.price : true;

                  return (
                    <li key={it._id} className="item">
                      <div className="card-container">
                        <Image
                          src={it.imageURL}
                          alt={it.name}
                          width={250}
                          height={250}
                        />
                        <p>{it.name}</p>
                        <p>{it.price} Eter</p>

                        <button
                          type="button"
                          onClick={() => handleBuy(it._id)}
                          disabled={!isConnected || isBuying || !canBuy}
                          style={{ marginTop: 10, width: '100%' }}
                        >
                          {isBuying ? 'Achat...' : 'Acheter'}
                        </button>

                        {isConnected &&
                          typeof balance === 'number' &&
                          !canBuy && (
                            <p style={{ marginTop: 8, opacity: 0.85 }}>
                              Fonds insuffisants
                            </p>
                          )}
                      </div>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ShopPage;
