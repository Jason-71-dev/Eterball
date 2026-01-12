import type { ReactNode } from 'react';
import './legal.scss';

const LegalLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="legal">
      <div className="legal__container">{children}</div>
    </main>
  );
};

export default LegalLayout;
