import { Suspense } from 'react';
import VerifyClient from './VerifyClient';

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div style={{ paddingTop: 120, textAlign: 'center' }}>
          <h2>Vérification en cours…</h2>
        </div>
      }
    >
      <VerifyClient />
    </Suspense>
  );
}
