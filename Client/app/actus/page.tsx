import Image from 'next/image';
import Link from 'next/link';
import './actus.scss';

type ActuCard = {
  slug: string;
  title: string;
  tag: string;
  image: string;
  featured?: boolean;
};

const ACTUS: ActuCard[] = [
  {
    slug: 'les-dragons-debarquent',
    title: 'Les Dragons Débarquent !',
    tag: 'ÉQUIPE',
    image: '/TeamDragons.png',
    featured: true,
  },
  {
    slug: 'creer-ton-equipe',
    title: 'Créer ton équipe',
    tag: 'TEAM',
    image: '/Team_depart.png',
  },
  {
    slug: 'dragonflame-stadium',
    title: 'Dragonflame Stadium',
    tag: 'STADE',
    image: '/DragonFlame_Stadium.png',
  },
  {
    slug: 'capitale-eterball',
    title: 'Capitale d’Eterball',
    tag: 'MONDE',
    image: '/image_fictif_jeu.png',
  },
  {
    slug: 'chaque-stade-est-unique',
    title: 'Chaque stade est unique',
    tag: 'TERRAIN',
    image: '/Premier_Stade.png',
  },
  {
    slug: 'augmenter-son-agilite',
    title: 'Augmente ton agilité',
    tag: 'ENTRAÎNEMENT',
    image: '/Entrainement_agilite1.png',
  },
];

const featured = ACTUS.find((a) => a.featured);
const others = ACTUS.filter((a) => !a.featured);

export default function ActusPage() {
  const side = others[0]; // peut être undefined si ACTUS ne contient que le featured

  return (
    <main className="actus-page">
      <h1 className="actus-title">Actualités</h1>

      {featured && (
        <section className="actus-layout">
          <Link
            href={`/actus/${featured.slug}`}
            className="actus-card actus-card--featured"
          >
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 70vw"
            />
            <div className="actus-overlay">
              <span className="actus-tag">{featured.tag}</span>
              <h2>{featured.title}</h2>
            </div>
          </Link>

          {side && (
            <Link
              href={`/actus/${side.slug}`}
              className="actus-card actus-card--side"
            >
              <Image
                src={side.image}
                alt={side.title}
                fill
                sizes="(max-width: 768px) 100vw, 30vw"
              />
              <div className="actus-overlay">
                <span className="actus-tag">{side.tag}</span>
                <h3>{side.title}</h3>
              </div>
            </Link>
          )}
        </section>
      )}

      <section className="actus-grid">
        {others.slice(1).map((actu) => (
          <Link
            key={actu.slug}
            href={`/actus/${actu.slug}`}
            className="actus-card"
          >
            <Image
              src={actu.image}
              alt={actu.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="actus-overlay">
              <span className="actus-tag">{actu.tag}</span>
              <h3>{actu.title}</h3>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
