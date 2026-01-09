'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { API_ORIGIN } from '@/services/apiOrigin';

export default function VerifyPage() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get('token');

  const [msg, setMsg] = useState('Vérification en cours…');

  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (!token) {
        if (!cancelled) setMsg('Token manquant.');
        return;
      }

      try {
        const res = await fetch(
          `${API_ORIGIN}/verify-email?token=${encodeURIComponent(token)}`,
          { cache: 'no-store' }
        );

        const data = await res.json().catch(() => null);

        if (!res.ok) {
          if (!cancelled) setMsg(data?.message ?? 'Lien invalide ou expiré.');
          return;
        }

        if (!cancelled) {
          setMsg('Email vérifié ✅ Redirection vers la connexion…');
          setTimeout(() => router.push('/login?verified=true'), 1200);
        }
      } catch {
        if (!cancelled) setMsg('Erreur réseau.');
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [token, router]);

  return (
    <div style={{ paddingTop: 120, paddingInline: 16, textAlign: 'center' }}>
      <h2>{msg}</h2>
    </div>
  );
}
