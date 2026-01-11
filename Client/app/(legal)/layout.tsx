import type { ReactNode } from 'react';
import './legal.scss';

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <main className="legal">
      <div className="legal__container">{children}</div>
    </main>
  );
}
