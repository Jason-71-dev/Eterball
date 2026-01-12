'use client';

import Image from 'next/image';
import './general.scss';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

type LadderGeneralRow = {
  rank: number;
  pseudo: string;
  class: string;
  server: string;
  level: number;
  matches: number;
  avatarURL?: string; // si tu le rajoutes dans populate plus tard
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';

const Ladders = () => {
  const [server, setServer] = useState('Dragos');
  const [query, setQuery] = useState('');

  const [rows, setRows] = useState<LadderGeneralRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchLadder = async () => {
      try {
        setLoading(true);
        setError(null);

        const url = `${API_URL}/api/ladders/general?server=${encodeURIComponent(
          server
        )}&season=1&page=1&limit=100`;

        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const json = await res.json();
        const data: LadderGeneralRow[] = Array.isArray(json?.data)
          ? json.data
          : [];

        if (!cancelled) setRows(data);
      } catch (e) {
        if (!cancelled) {
          setError(
            e instanceof Error ? e.message : 'Impossible de charger le ladder.'
          );
          setRows([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchLadder();
    return () => {
      cancelled = true;
    };
  }, [server]);

  const filteredRows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;

    return rows.filter((r) => {
      const pseudo = (r.pseudo ?? '').toLowerCase();
      const cls = (r.class ?? '').toLowerCase();
      return pseudo.includes(q) || cls.includes(q);
    });
  }, [rows, query]);

  return (
    <div>
      <section id="laddersGeneral">
        <article id="general">
          <div id="title">
            <h2>Ladder général</h2>
            <ul className="ladderNavigation">
              <Link href="/ladders/general">
                <li>GÉNÉRAL</li>
              </Link>
              <Link href="/ladders/soccherium">
                <li>SOCCHERIUM</li>
              </Link>
              <Link href="/ladders/succes">
                <li>SUCCÈS</li>
              </Link>
            </ul>
          </div>

          <div className="ladder-image">
            <Image
              src="/Ladder_Gen.png"
              alt="General ladder"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 850px"
              style={{ objectFit: 'cover' }}
            />
          </div>

          <table id="classement">
            <thead>
              <tr>
                <th className="ranking">#</th>
                <th>Nom</th>
                <th className="class">Classe</th>
                <th className="server">Serveur</th>
                <th className="lvl">Niveau</th>
                <th className="game">Matchs</th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td className="rank">-</td>
                  <td>Chargement…</td>
                  <td className="class">-</td>
                  <td className="server">{server}</td>
                  <td className="lvl">-</td>
                  <td className="game">-</td>
                </tr>
              )}

              {!loading && error && (
                <tr>
                  <td className="rank">-</td>
                  <td>Erreur: {error}</td>
                  <td className="class">-</td>
                  <td className="server">{server}</td>
                  <td className="lvl">-</td>
                  <td className="game">-</td>
                </tr>
              )}

              {!loading && !error && filteredRows.length === 0 && (
                <tr>
                  <td className="rank">-</td>
                  <td>Aucun résultat</td>
                  <td className="class">-</td>
                  <td className="server">{server}</td>
                  <td className="lvl">-</td>
                  <td className="game">-</td>
                </tr>
              )}

              {!loading &&
                !error &&
                filteredRows.map((row) => (
                  <tr key={`${row.rank}-${row.pseudo}`}>
                    <td className="rank">{row.rank}</td>
                    <td>
                      {/* Avatar : pour l’instant fallback sur une image fixe.
                          Dès que tu stockes avatarURL côté User + populate, remplace src ici */}
                      <Image
                        src={row.avatarURL || '/Miniature_Milieu.png'}
                        alt={row.pseudo}
                        width={50}
                        height={50}
                      />
                      &nbsp;{row.pseudo}
                    </td>
                    <td className="class">{row.class}</td>
                    <td className="server">{row.server}</td>
                    <td className="lvl">{row.level} GEN</td>
                    <td className="game">
                      {row.matches.toLocaleString('fr-FR')}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </article>

        <div id="filtre">
          <h2>Filtrer la liste</h2>

          <div id="server">
            <p className="category">Server</p>
            <p>
              {/* Je garde ta structure (p/small) mais je rends ça interactif */}
              <small>{server}</small>
            </p>

            {/* si tu as déjà du CSS qui n’aime pas les <select>, tu peux le laisser,
                sinon tu peux styliser ce select plus tard */}
            <select value={server} onChange={(e) => setServer(e.target.value)}>
              <option value="Dragos">Dragos</option>
              {/* Ajoute tes serveurs ici */}
              {/* <option value="Astra">Astra</option> */}
            </select>
          </div>

          <div id="search">
            <p className="category">Recherche</p>
            <input
              type="text"
              placeholder="Rechercher"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Ladders;
