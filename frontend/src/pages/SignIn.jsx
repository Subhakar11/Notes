import { useEffect, useState } from 'react';
import Card from '../components/Card';
import TextField from '../components/TextField';
import Button from '../components/Button';
import { api } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(null);
  const [step, setStep] = useState('email'); 
  const [message, setMessage] = useState(null);
  const nav = useNavigate();
  const { login } = useAuth();

  async function sendOtp() {
    setError(null);
    setMessage(null);
    try {
      const res = await api('/auth/request-otp', { 
        method: 'POST', 
        body: JSON.stringify({ email }) 
      });
      setStep('otp');
      setMessage('OTP sent to your email.');
    } catch (e) {
      setError(e.message);
    }
  }

  async function verify() {
    setError(null);
    try {
      const res = await api('/auth/verify-otp', { 
        method: 'POST', 
        body: JSON.stringify({ email, otp }) 
      });
      login(res.user, res.token);
      nav('/dashboard');
    } catch (e) {
      setError(e.message);
    }
  }

  // Google Sign-in setup
  useEffect(() => {
    if (window.google?.accounts?.id) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: async (resp) => {
          const r = await fetch((import.meta.env.VITE_API_BASE ) + '/auth/google', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idToken: resp.credential })
          });
          const data = await r.json();
          if (!r.ok) alert(data.message || 'Google sign-in failed');
          else {
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('token', JSON.stringify(data.token));
            location.href = '/dashboard';
          }
        }
      });
      window.google.accounts.id.renderButton(
        document.getElementById('gbtn-si'),
        { theme: 'outline', size: 'large', width: 360 }
      );
    }
  }, []);

  return (
    <div className="grid">
      <Card>
        <h1 className="title">Sign in</h1>
        <p className="subtitle">Use OTP or Google to continue.</p>
        <div className="stack">
          <TextField 
            placeholder="Email" 
            type="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
          />

          {step === 'email' && (
            <Button onClick={sendOtp}>Send OTP</Button>
          )}

          {step === 'otp' && (
            <>
              <TextField 
                placeholder="Enter OTP" 
                value={otp} 
                onChange={e => setOtp(e.target.value)} 
              />
              <Button onClick={verify}>Verify OTP</Button>
            </>
          )}

          <div id="gbtn-si" />

          <p className="subtitle">
            New here? <Link to="/signup" className="link">Create an account</Link>
          </p>

          {message && <p className="subtitle" style={{ color: 'green' }}>{message}</p>}
          {error && <p className="subtitle" style={{ color: '#ff8b8b' }}>{error}</p>}
        </div>
      </Card>
      <Card>
        <img src="data:image/svg+xml;utf8,
<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'>
<rect width='100' height='100' fill='yellow'/>
<text x='10' y='55' font-size='20'>Note</text>
</svg>" alt="art" style={{ width: '100%', borderRadius: 12 }} />
      </Card>
    </div>
  );
}
