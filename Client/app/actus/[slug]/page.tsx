import Image from 'next/image';
import { notFound } from 'next/navigation';
import './actus-detail.scss';
import Link from 'next/link';

type Actu = {
  title: string;
  image: string;
  content: string;
};

const RAW_ACTUS_DETAILS: Record<string, Actu> = {
  'les-dragons-debarquent': {
    title: 'Les Dragons Débarquent !',
    image: '/TeamDragons.png',
    content:
      'Une nouvelle équipe légendaire fait son apparition dans l’univers d’Eterball. Les Dragons, réputés pour leur vitesse fulgurante et leur stratégie impitoyable, sont prêts à défier tous les champions. Chaque match avec eux devient un spectacle intense où tactique et audace se mêlent, offrant aux spectateurs un spectacle inoubliable et aux joueurs une expérience de jeu palpitante.',
  },
  'creer-ton-equipe': {
    title: 'Créer ton équipe',
    image: '/Team_depart.png',
    content:
      'Deviens le maître de ton destin en construisant l’équipe parfaite ! Choisis soigneusement tes joueurs parmi une galerie de talents uniques, attribue-leur des rôles stratégiques et entraîne-les pour qu’ils atteignent leur plein potentiel. Chaque décision compte : la composition de ton équipe, les synergies entre les joueurs et les choix tactiques feront la différence entre la victoire éclatante et la défaite cuisante.',
  },
  'dragonflame-stadium': {
    title: 'Dragonflame Stadium',
    image: '/DragonFlame_Stadium.png',
    content:
      'Bienvenue au Dragonflame Stadium, le stade mythique où seuls les plus audacieux osent s’aventurer. Ses tribunes flamboyantes et son terrain légendaire ont vu naître les matchs les plus mémorables. Ici, chaque passe, chaque tir et chaque dribble devient un moment gravé dans l’histoire d’Eterball. Prépare-toi à vivre une atmosphère électrique, où la tension et l’adrénaline atteignent leur paroxysme.',
  },
  'capitale-eterball': {
    title: 'Capitale d’Eterball',
    image: '/image_fictif_jeu.png',
    content:
      'La Capitale d’Eterball est le cœur vibrant de ce monde fantastique, là où tout commence et où toutes les légendes prennent vie. Ses rues animées, ses arènes emblématiques et ses quartiers stratégiques offrent aux joueurs un terrain de jeu infini pour s’entraîner, recruter et défier les autres équipes. Chaque coin de la ville recèle des secrets et des opportunités pour ceux qui savent les saisir.',
  },
  'chaque-stade-est-unique': {
    title: 'Chaque stade est unique',
    image: '/Premier_Stade.png',
    content:
      'Dans Eterball, aucun terrain ne se ressemble. Chaque stade possède ses propres règles, son ambiance particulière et ses défis spécifiques. Qu’il s’agisse de surfaces glissantes, d’obstacles inattendus ou de conditions météorologiques extrêmes, chaque match demande de l’adaptation et de la stratégie. Maîtriser chaque stade est la clé pour devenir un joueur redoutable et laisser ton empreinte dans le championnat.',
  },
  'augmenter-son-agilite': {
    title: 'Augmente ton agilité',
    image: '/Entrainement_agilite1.png',
    content:
      "L'agilité est l’atout le plus précieux d’un joueur d’Eterball. Elle te permet de dribbler avec fluidité, d’éviter les adversaires et de réagir instantanément aux imprévus du terrain. Avec des entraînements spécifiques et des techniques avancées, tu peux repousser tes limites, améliorer tes réflexes et devenir un maître du jeu rapide et imprévisible. Dans chaque match, ton agilité sera ton arme secrète pour surprendre et dominer tes adversaires.",
  },
};

function normalizeSlug(input: string) {
  return decodeURIComponent(input)
    .trim()
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[\u2010\u2011\u2012\u2013\u2014\u2212]/g, '-');
}

const ACTUS_DETAILS: Record<string, Actu> = Object.fromEntries(
  Object.entries(RAW_ACTUS_DETAILS).map(([slug, value]) => [
    normalizeSlug(slug),
    value,
  ])
);

export default async function ActuDetailPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const slug = normalizeSlug(resolvedParams.slug);
  const actu = ACTUS_DETAILS[slug];

  if (!actu) notFound();

  return (
    <main className="actus-detail">
      <header className="hero">
        <Link href="/actus" className="hero-back">
          ← Retour aux actualités
        </Link>

        <Image src={actu.image} alt={actu.title} fill priority sizes="100vw" />

        <h1>{actu.title}</h1>
      </header>

      <section className="content">
        <p>{actu.content}</p>
      </section>
    </main>
  );
}
