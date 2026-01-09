import { API_ORIGIN } from '@/services/apiOrigin';
import { setBalance } from '@/store/auth/authSlice';
import type { AppDispatch } from '@/store/auth';

export async function buyItem(
  itemId: string,
  token: string,
  dispatch: AppDispatch
) {
  const res = await fetch(`${API_ORIGIN}/shop/buy/${itemId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || 'Erreur lors de l’achat');
  }

  // C’EST ICI que tu mets le dispatch
  dispatch(setBalance(data.newBalance));

  return data;
}
