'use client';

import Image from 'next/image';
import './team.scss';
import Link from 'next/link';

const Ladders = () => {
  return (
    <div>
      <section id="laddersGeneral">
        <article id="general">
          <div id="title">
            <h2>Ladder du Soccherium</h2>
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
                <th className="class">Côte</th>
                <th className="server">Serveur</th>
                <th className="lvl">Niveau</th>
                <th className="game">Victoires</th>
                <th className="serie">Série</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="rank">1</td>
                <td className="name">
                  <Image src="/mge.png" alt="Nagaa" width="50" height="50" />
                  &nbsp;MG|E
                </td>
                <td className="class">5460</td>
                <td className="server">Dragos</td>
                <td className="lvl">58</td>
                <td className="game">100 v</td>
                <td className="serie">16</td>
              </tr>
              <tr>
                <td className="rank">2</td>
                <td className="name">
                  <Image
                    src="/nankatsu.png"
                    alt="Poweur-Aizen"
                    width="50"
                    height="50"
                  />
                  &nbsp;NANKATSU
                </td>
                <td className="class">5200</td>
                <td className="server">Dragos</td>
                <td className="lvl">55</td>
                <td className="game">98 v</td>
                <td className="serie">12</td>
              </tr>
              <tr>
                <td className="rank">3</td>
                <td className="name">
                  <Image src="/magma.png" alt="Luigy" width="50" height="50" />
                  &nbsp;MAGMA
                </td>
                <td className="class">5060</td>
                <td className="server">Dragos</td>
                <td className="lvl">51</td>
                <td className="game">96 v</td>
                <td className="serie">11</td>
              </tr>
              <tr>
                <td className="rank">4</td>
                <td className="name">
                  <Image
                    src="/jinko.png"
                    alt="Fastlearner"
                    width="50"
                    height="50"
                  />
                  &nbsp;JINKO
                </td>
                <td className="class">4820</td>
                <td className="server">Dragos</td>
                <td className="lvl">49</td>
                <td className="game">92 v</td>
                <td className="serie">10</td>
              </tr>
              <tr>
                <td className="rank">5</td>
                <td className="name">
                  <Image
                    src="/golazo.png"
                    alt="Zeyrox"
                    width="50"
                    height="50"
                  />
                  &nbsp;GOLAZO
                </td>
                <td className="class">4560</td>
                <td className="server">Dragos</td>
                <td className="lvl">47</td>
                <td className="game">86 v</td>
                <td className="serie">11</td>
              </tr>
              <tr>
                <td className="rank">6</td>
                <td className="name">
                  <Image
                    src="/tensura1.png"
                    alt="Satsuki71"
                    width="50"
                    height="50"
                  />
                  &nbsp;TENSURA
                </td>
                <td className="class">4280</td>
                <td className="server">Dragos</td>
                <td className="lvl">45</td>
                <td className="game">82 v</td>
                <td className="serie">9</td>
              </tr>
              <tr>
                <td className="rank">7</td>
                <td className="name">
                  <Image
                    src="/neogooning.png"
                    alt="Hypernova-Gbx"
                    width="50"
                    height="50"
                  />
                  &nbsp;NEO GOONING
                </td>
                <td className="class">4090</td>
                <td className="server">Dragos</td>
                <td className="lvl">43</td>
                <td className="game">79 v</td>
                <td className="serie">8</td>
              </tr>
              <tr>
                <td className="rank">8</td>
                <td className="name">
                  <Image
                    src="/shinryuji.png"
                    alt="Le-H"
                    width="50"
                    height="50"
                  />
                  &nbsp;SHINRYUJI
                </td>
                <td className="class">3940</td>
                <td className="server">Dragos</td>
                <td className="lvl">42</td>
                <td className="game">76 v</td>
                <td className="serie">8</td>
              </tr>
              <tr>
                <td className="rank">9</td>
                <td className="name">
                  <Image src="/gooner.png" alt="Waiss" width="50" height="50" />
                  &nbsp;LE GOONER
                </td>
                <td className="class">3710</td>
                <td className="server">Dragos</td>
                <td className="lvl">40</td>
                <td className="game">73 v</td>
                <td className="serie">6</td>
              </tr>
              <tr>
                <td className="rank">10</td>
                <td className="name">
                  <Image
                    src="/pandora.png"
                    alt="Xefreh"
                    width="50"
                    height="50"
                  />
                  &nbsp;PANDORA
                </td>
                <td className="class">3620</td>
                <td className="server">Dragos</td>
                <td className="lvl">40</td>
                <td className="game">72 v</td>
                <td className="serie">4</td>
              </tr>
            </tbody>
          </table>
        </article>
        <div id="filtre">
          <h2>Filtrer la liste</h2>
          <div id="server">
            <p className="category">Server</p>
            <p>
              <small>Dragos</small>
            </p>
          </div>
          <div id="search">
            <p className="category">Recherche</p>
            <input type="text" placeholder="Rechercher" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Ladders;
