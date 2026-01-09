'use client';

import Link from 'next/link';
import './inventory.scss';

const InventoryPage = () => {
  const inventory: any[] = []; // plus tard: data API

  return (
    <main id="inventoryPage">
      <header className="inventory-header">
        <div className="header-left">
          <h1>Inventaire</h1>
          <p>Retrouve ici les objets que tu as achetés.</p>
        </div>

        <div className="header-right">
          <Link className="btn-ghost" href="/account">
            Retour compte
          </Link>
          <Link className="btn-gold" href="/shop">
            Aller à la boutique
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
            {inventory.length === 0 ? (
              <div className="inventory-empty">
                Aucun objet pour le moment. Achète des items dans la boutique.
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
