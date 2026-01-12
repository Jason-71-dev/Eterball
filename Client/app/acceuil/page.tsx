'use client';

import Image from 'next/image';
import './accueil.scss';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const actusData = [
  {
    href: '/actus/les-dragons-debarquent',
    src: '/TeamDragons.png',
    alt: 'Team Dragons',
    id: 'img-dragons',
  },
  {
    href: '/actus/dragonflame-stadium',
    src: '/DragonFlame_Stadium.png',
    alt: 'DragonFlame Stadium',
    id: 'img-dragonStadium',
  },
  {
    href: '/actus/creer-ton-equipe',
    src: '/Team_depart.png',
    alt: 'Créer ton équipe',
    id: 'img-teamDepart',
  },
  {
    href: '/actus/augmenter-son-agilite',
    src: '/Entrainement_agilite1.png',
    alt: 'Entraînement Agilité',
    id: 'img-trainAgility',
  },
];

type GameClass = {
  _id?: string;
  name: string;
  slug: string;
  image: string;
  description?: string;
  order?: number;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';

const CLASSES_ENDPOINT = '/api/classes/carousel';

const Acceuil = () => {
  const [classesData, setClassesData] = useState<GameClass[]>([]);
  const [loadingClasses, setLoadingClasses] = useState(true);
  const [classesError, setClassesError] = useState<string | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const loadClasses = async () => {
      try {
        setLoadingClasses(true);
        setClassesError(null);

        const res = await fetch(`${API_URL}${CLASSES_ENDPOINT}`, {
          cache: 'no-store',
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data: GameClass[] = await res.json();

        if (!cancelled) {
          setClassesData(Array.isArray(data) ? data : []);
          setCurrentIndex(0);
        }
      } catch (err) {
        if (!cancelled) {
          setClassesError('Impossible de charger les classes.');
          setClassesData([]);
        }
      } finally {
        if (!cancelled) setLoadingClasses(false);
      }
    };

    loadClasses();

    return () => {
      cancelled = true;
    };
  }, []);

  const currentClass = useMemo(
    () => classesData[currentIndex],
    [classesData, currentIndex]
  );

  const canNavigate = !loadingClasses && classesData.length > 1;

  const nextClass = () => {
    if (classesData.length === 0) return;
    setCurrentIndex((prev) => (prev === classesData.length - 1 ? 0 : prev + 1));
  };

  const prevClass = () => {
    if (classesData.length === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? classesData.length - 1 : prev - 1));
  };

  return (
    <div>
      <section id="intro">
        <div className="description">
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

            <div className="img-actus-container">
              {actusData.map((actus) => (
                <Link key={actus.href} href={actus.href}>
                  <Image
                    id={actus.id}
                    src={actus.src}
                    alt={actus.alt}
                    width={250}
                    height={180}
                  />
                </Link>
              ))}
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
              <Link href="/actus/dragonflame-stadium">
                <button id="event-btn">Affrontez-les !</button>
              </Link>
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
            <button
              className="arrow arrow-left"
              onClick={prevClass}
              aria-label="Précédent"
              disabled={!canNavigate}
            >
              <ChevronLeft size={24} />
            </button>

            {loadingClasses ? (
              // placeholder simple (évite un crash pendant le chargement)
              <div
                id="personnage"
                style={{ width: 220, height: 320, display: 'block' }}
                aria-label="Chargement..."
              />
            ) : classesError ? (
              <div
                style={{
                  width: 220,
                  height: 320,
                  display: 'grid',
                  placeItems: 'center',
                  textAlign: 'center',
                  padding: 12,
                }}
              >
                <p>{classesError}</p>
              </div>
            ) : currentClass ? (
              <Image
                id="personnage"
                src={currentClass.image}
                alt={currentClass.name}
                width={220}
                height={320}
                priority
              />
            ) : (
              <div
                style={{
                  width: 220,
                  height: 320,
                  display: 'grid',
                  placeItems: 'center',
                  textAlign: 'center',
                  padding: 12,
                }}
              >
                <p>Aucune classe disponible.</p>
              </div>
            )}

            <button
              className="arrow arrow-right"
              onClick={nextClass}
              aria-label="Suivant"
              disabled={!canNavigate}
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* TEXTE */}
          <div id="intro-personnages">
            <h2>
              {loadingClasses
                ? 'Chargement...'
                : currentClass?.name ?? 'Classe'}
            </h2>

            <p className="description">
              {loadingClasses
                ? ''
                : currentClass?.description?.trim()
                ? currentClass.description
                : 'Description à venir...'}
            </p>

            <Link href="/classes">
              <button id="pageJoueurs">Voir toutes les classes</button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Acceuil;
