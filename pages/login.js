import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth`,
        {
          action: 'login',
          email,
          password,
        }
      );

      if (res.data.id) {
        // Save user info in localStorage (basic session)
        localStorage.setItem('cryptoviteUser', JSON.stringify(res.data));
        router.push('/dashboard'); // Redirect to dashboard
      } else {
        alert(res.data.error || 'Login failed');
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
      <h1>Login - Cryptovite</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '15px' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '20px' }}
      />
      <button
        onClick={handleLogin}
        style={{ padding: '10px 20px', cursor: 'pointer', fontSize: '16px' }}
      >
        Login
      </button>
    </div>
  );
}