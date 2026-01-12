import Image from 'next/image';
import { useEffect, useState } from 'react';
import ClassStats from './ClassStats';
import DifficultyBadge from './DifficultyBadge';
import { ClassType } from '@/app/types/class';

type Props = {
  data: ClassType;
  onClose: () => void;
};

const ClassModal = ({ data, onClose }: Props) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // ✅ Fermer avec Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="class-overlay" onClick={onClose}>
      <div
        className="class-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`Détails de la classe ${data.name}`}
      >
        {/* ✅ Bouton fermer */}
        <button
          type="button"
          className="class-modal__close"
          onClick={onClose}
          aria-label="Fermer"
          title="Fermer"
        >
          ✕
        </button>

        <div className="class-modal__front">
          {/* IMAGE (toujours à gauche) */}
          <div className="class-modal__image">
            <Image
              src={data.image}
              alt={data.name}
              fill
              className="class-modal__img"
              sizes="(max-width: 900px) 100vw, 50vw"
              priority
            />
          </div>

          {/* CONTENU (à droite) */}
          <div className="class-modal__content">
            <h2>{data.name}</h2>
            <DifficultyBadge difficulty={data.difficulty} />

            {!isFlipped ? (
              <>
                <ClassStats stats={data.stats} />
                <button type="button" onClick={() => setIsFlipped(true)}>
                  Voir description
                </button>
              </>
            ) : (
              <>
                <div className="class-description">
                  <p>{data.description || 'Aucune description.'}</p>
                </div>

                <button type="button" onClick={() => setIsFlipped(false)}>
                  Retour aux stats
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassModal;
