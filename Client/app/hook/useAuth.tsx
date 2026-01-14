'use client';
import { useEffect } from 'react';
import { login, logout } from '../store/auth/authSlice'; // ← AJOUTER logout
import { useDispatch } from 'react-redux';

const useAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');

    // ← AJOUTER CETTE VÉRIFICATION
    // Si pas de token OU pas d'utilisateur, on s'assure d'être déconnecté
    if (!token || !userString) {
      dispatch(logout());
      return;
    }

    if (token && userString) {
      try {
        // Parser le JSON stocké dans localStorage
        const user = JSON.parse(userString);

        dispatch(
          login({
            token: token,
            user: {
              id: user.id,
              name: user.pseudo || user.identifier || user.username,
              avatar: user.avatar || '/assets/Coupe_Casquette.png',
              balance: user.balance ?? 0,
              role: user.role || 'user',
            },
          })
        );
      } catch (error) {
        console.error('Erreur lors du parsing des données utilisateur:', error);
        // En cas d'erreur, nettoyer le localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch(logout()); // ← AJOUTER CETTE LIGNE
      }
    }
  }, [dispatch]);
};

export default useAuth;
