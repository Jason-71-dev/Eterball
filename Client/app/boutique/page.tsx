// app/boutique/page.tsx
import { Suspense } from 'react';
import BoutiqueClient from './BoutiqueClient';

const Page = () => {
  return (
    <Suspense fallback={<div style={{ padding: 16 }}>Chargement...</div>}>
      <BoutiqueClient />
    </Suspense>
  );
};

export default Page;
