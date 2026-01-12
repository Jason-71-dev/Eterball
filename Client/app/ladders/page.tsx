'use client';

import Image from 'next/image';
import './ladders.scss';
import Link from 'next/link';

const Ladders = () => {
  return (
    <div>
      <section id="ladders">
        <article className="general">
          <h2>Ladder général</h2>
          <Image
            id="ladder-general"
            src="/Miniature_Ladder_gen.png"
            alt="General ladder"
            width={450}
            height={300}
          />
          <div className="classement">
            <ol className="players">
              <li className="joueur1">
                <div className="info">
                  <span className="rank">1</span>&nbsp;
                  <Image
                    className="personnage"
                    src="/Miniature_Milieu.png"
                    alt="first-player"
                    width={50}
                    height={50}
                  />
                  &nbsp;Nagaa
                </div>
                <div>
                  <p className="statPlayer">100 GEN</p>
                </div>
              </li>

              <li className="joueur2">
                <div className="info">
                  <span className="rank">2</span>&nbsp;
                  <Image
                    className="personnage"
                    src="/Miniature_Ailier.png"
                    alt="first-player"
                    width={50}
                    height={50}
                  />
                  &nbsp;Poweur-Aizen
                </div>
                <div>
                  <p className="statPlayer">99 GEN</p>
                </div>
              </li>
              <li className="joueur3">
                <div className="info">
                  <span className="rank">3</span>&nbsp;
                  <Image
                    className="personnage"
                    src="/Miniature_AT.png"
                    alt="first-player"
                    width={50}
                    height={50}
                  />
                  &nbsp;Luigy
                </div>
                <div>
                  <p className="statPlayer">98 GEN</p>
                </div>
              </li>
            </ol>
          </div>
          <div className="buttonClassement">
            <Link href="/ladders/general">
              <button className="voir-classement">
                Voir le classement complet
              </button>
            </Link>
          </div>
        </article>

        <article className="general">
          <h2>Ladder team vs team</h2>
          <Image
            id="ladder-soccherium"
            src="/Soccherium.png"
            alt="Soccherium ladder"
            width={450}
            height={300}
          />
          <div className="classement">
            <ol className="players">
              <li className="joueur1">
                <div className="info">
                  <span className="rank">1</span>&nbsp;
                  <Image
                    className="personnage"
                    src="/Miniature_AT.png"
                    alt="first-player"
                    width={50}
                    height={50}
                  />
                  &nbsp;MG|E
                </div>
                <div>
                  <p className="statPlayer">50 v</p>
                </div>
              </li>

              <li className="joueur2">
                <div className="info">
                  <span className="rank">2</span>&nbsp;
                  <Image
                    className="personnage"
                    src="/Miniature_Milieu.png"
                    alt="first-player"
                    width={50}
                    height={50}
                  />
                  &nbsp;NANKATSU
                </div>
                <div>
                  <p className="statPlayer">49 v</p>
                </div>
              </li>
              <li className="joueur3">
                <div className="info">
                  <span className="rank">3</span>&nbsp;
                  <Image
                    className="personnage"
                    src="/Miniature_Ailier.png"
                    alt="first-player"
                    width={50}
                    height={50}
                  />
                  &nbsp;MAGMA
                </div>
                <div>
                  <p className="statPlayer">48 v</p>
                </div>
              </li>
            </ol>
          </div>
          <div className="buttonClassement">
            <Link href="/ladders/soccherium">
              <button className="voir-classement">
                Voir le classement complet
              </button>
            </Link>
          </div>
        </article>

        <article className="general">
          <h2>Ladder succès</h2>
          <Image
            id="ladder-succes"
            src="/Succes.png"
            alt="Succes ladder"
            width={450}
            height={300}
          />
          <div className="classement">
            <ol className="players">
              <li className="joueur1">
                <div className="info">
                  <span className="rank">1</span>&nbsp;
                  <Image
                    className="personnage"
                    src="/Miniature_Ailier.png"
                    alt="first-player"
                    width={50}
                    height={50}
                  />
                  &nbsp;Poweur-Aizen
                </div>
                <div>
                  <p className="statPlayer">9245</p>
                </div>
              </li>

              <li className="joueur2">
                <div className="info">
                  <span className="rank">2</span>&nbsp;
                  <Image
                    className="personnage"
                    src="/Miniature_AT.png"
                    alt="first-player"
                    width={50}
                    height={50}
                  />
                  &nbsp;Luigy
                </div>
                <div>
                  <p className="statPlayer">8875</p>
                </div>
              </li>
              <li className="joueur3">
                <div className="info">
                  <span className="rank">3</span>&nbsp;
                  <Image
                    className="personnage"
                    src="/Miniature_Milieu.png"
                    alt="first-player"
                    width={50}
                    height={50}
                  />
                  &nbsp;Nagaa
                </div>
                <div>
                  <p className="statPlayer">8600</p>
                </div>
              </li>
            </ol>
          </div>
          <div className="buttonClassement">
            <Link href="/ladders/succes">
              <button className="voir-classement">
                Voir le classement complet
              </button>
            </Link>
          </div>
        </article>
      </section>
    </div>
  );
};

export default Ladders;
