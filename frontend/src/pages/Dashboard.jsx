import { useEffect, useState } from 'react';
import Card from '../components/Card';
import TextField from '../components/TextField';
import Button from '../components/Button';
import { api } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Dashboard(){
  const { token, user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const nav = useNavigate();

  useEffect(()=>{ if(!token){ nav('/'); return; } fetchNotes(); }, [token]);

  async function fetchNotes(){ setNotes(await api('/notes', {}, token)); }
  async function add(){ await api('/notes', { method:'POST', body: JSON.stringify({ title, body }) }, token); setTitle(''); setBody(''); fetchNotes(); }
  async function del(id){ await api(`/notes/${id}`, { method:'DELETE' }, token); fetchNotes(); }

  return (
    <div className="grid">
      <Card>
        <h1 className="title">Welcome, {user?.name || user?.email}</h1>
        <p className="subtitle">Create and manage your notes.</p>
        <div className="stack">
          <TextField placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
          <TextField placeholder="Body (optional)" value={body} onChange={e=>setBody(e.target.value)} />
          <Button onClick={add}>Create note</Button>
        </div>
      </Card>
      <Card>
        <h2 className="title">Your notes</h2>
        <div className="stack">
          {notes.map(n=> (
            <div key={n._id} className="note row" style={{justifyContent:'space-between'}}>
              <div>
                <strong>{n.title}</strong>
                {n.body && <div className="subtitle">{n.body}</div>}
              </div>
              <button className="button" onClick={()=>del(n._id)} style={{width:120}}>Delete</button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}