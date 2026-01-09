'use client';

import Image from 'next/image';
import './accueil.scss';
import { useState } from 'react';
import Link from 'next/link';
const Acceuil = () => {
  const classesData = [
    {
      id: 'milieu',
      name: 'Milieu de terrain',
      image: '/Milieu.png',
      description:
        'Le milieu de terrain est le cœur du jeu, véritable lien entre la défense et l’attaque. Polyvalent et stratège, il dicte le rythme du match.',
    },
    {
      id: 'attaquant',
      name: 'Attaquant',
      image: '/Ailier_caroussel.png',
      description:
        'L’attaquant est le finisseur. Rapide, précis et audacieux, il peut changer le cours de ton match en transformant la moindre occasion en but.',
    },
    {
      id: 'defenseur',
      name: 'Défenseur',
      image: '/Defenseur_caroussel.png',
      description:
        'Pilier de l’équipe, le défenseur protège son camp, anticipe les attaques adverses et relance proprement. Il peut sauver la mise à tout moment.',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const currentClass = classesData[currentIndex];

  const nextClass = () => {
    setCurrentIndex((prev) => (prev === classesData.length - 1 ? 0 : prev + 1));
  };

  const prevClass = () => {
    setCurrentIndex((prev) => (prev === 0 ? classesData.length - 1 : prev - 1));
  };

  return (
    <div>
      <section id="intro">
        <div id="description">
          <h1>Fais vibrer le terrain dans Eterball</h1>
          <p id="catchphrase">
            Plonge dans un MMORPG unique ou stratégie et esprit d&apos;équipe
            règnent. Affronte des équipes redoutables dans des stades épiques et
            mène ta team vers la gloire. Sauras-tu prouver ta valeur sur le
            terrain ?
          </p>
        </div>
        <div>
          <Link href="/download">
            <button id="download">Télécharger</button>
          </Link>
        </div>
      </section>

      <section id="actus-news">
        <div id="actus">
          <div id="img-actus">
            <h2>Actus et Nouveautés</h2>
            <div id="img-actus-container">
              <Image
                id="img-dragons"
                src="/TeamDragons.png"
                alt="Team Dragons"
                width={250}
                height={180}
              />
              <Image
                id="img-dragonStadium"
                src="/DragonFlame_Stadium.png"
                alt="Team Dragons"
                width={250}
                height={180}
              />
              <Image
                id="img-teamDepart"
                src="/Team_depart.png"
                alt="Team Dragons"
                width={250}
                height={180}
              />
              <Image
                id="img-trainAgility"
                src="/Entrainement_agilite1.png"
                alt="Team Dragons"
                width={250}
                height={180}
              />
            </div>
          </div>
          <div id="events">
            <div id="titre-event">
              <h2>Event Important</h2>
              <Image
                id="img-event"
                src="/logo-event.png"
                alt="Event DragonFlame"
                width={400}
                height={330}
              />
              <button id="event-btn">Affrontez-les !</button>
            </div>
          </div>
        </div>
      </section>

      <section id="img-presentation">
        <div id="img-jeu">
          <Image
            id="img-dragons"
            src="/ville_principale_secteur_marchand.png"
            alt="Team Dragons"
            width={400}
            height={250}
          />
          <Image
            id="img-dragonStadium"
            src="/personnalisation_joueur.png"
            alt="Team Dragons"
            width={400}
            height={250}
          />
          <Image
            id="img-teamDepart"
            src="/Entrainement_agilite1.png"
            alt="Entrainement Agilité"
            width={400}
            height={250}
          />
        </div>
      </section>

      <section id="previsualisation-personnages">
        <div id="background"></div>

        <div id="classes">
          {/* IMAGE */}
          <div id="personnages">
            <button className="arrow left" onClick={prevClass}>
              ‹
            </button>

            <Image
              id="personnage"
              src={currentClass.image}
              alt={currentClass.name}
              width={220}
              height={320}
              priority
            />

            <button className="arrow right" onClick={nextClass}>
              ›
            </button>
          </div>

          {/* TEXTE */}
          <div id="intro-personnages">
            <h2>{currentClass.name}</h2>

            <p id="description">{currentClass.description}</p>

            <button id="pageJoueurs">Voir toutes les classes</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Acceuil;
