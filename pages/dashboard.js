import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [user,setUser] = useState({id:1,balance:0,investment:0});
  const [amount,setAmount] = useState('');

  useEffect(()=>{
    // Load demo user (first user)
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth`, { action:'login', email:'demo@cryptovite.com', password:'demo123' })
      .then(res=>setUser(res.data))
      .catch(()=>{});
  },[]);

  const handleAction = async (action)=>{
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/${action}`, { userId: user.id, amount: parseFloat(amount) });
    if(res.data.error) alert(res.data.error);
    else setUser(res.data);
  }

  return (
    <div>
      <h1>Cryptovite Dashboard</h1>
      <p>Balance: ${user.balance}</p>
      <p>Investment: ${user.investment}</p>
      <input placeholder="Amount" value={amount} onChange={e=>setAmount(e.target.value)} />
      <button onClick={()=>handleAction('deposit')}>Deposit</button>
      <button onClick={()=>handleAction('withdraw')}>Withdraw</button>
      <button onClick={()=>handleAction('invest')}>Invest</button>
    </div>
  );
}



