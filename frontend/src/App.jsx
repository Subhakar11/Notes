import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

export default function App(){
  const { user, logout } = useAuth();
  const nav = useNavigate();
  return (
    <div className="container">
      <header>
        <Link to="/" className="link"><strong>Notes</strong></Link>
        <div>
          {user ? (
            <>
              <span style={{marginRight:12}}>Hi, {user.name || user.email}</span>
              <button className="button" onClick={()=>{ logout(); nav('/'); }}>Logout</button>
            </>
          ) : null}
        </div>
      </header>
      <Outlet/>
    </div>
  );
}