import { useState } from 'react';
import { storage } from '../lib/storage';

export function useAuth(){
  const [user, setUser] = useState(() => storage.get('user'));
  const [token, setToken] = useState(() => storage.get('token'));

  function login(u, t){ setUser(u); setToken(t); storage.set('user', u); storage.set('token', t); }
  function logout(){ setUser(null); setToken(null); storage.remove('user'); storage.remove('token'); }

  return { user, token, login, logout };
}