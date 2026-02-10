import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Signup() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth`, { action:'signup', email, password });
    if(res.data.id) router.push('/dashboard');
    else alert(res.data.error);
  }

  return (
    <div>
      <h1>Sign Up - Cryptovite</h1>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
}
