import React, { useState} from 'react'
import { login } from '../lib/pocketbase';
import { useNavigate } from'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();    
    if (!username || !password) {
      window.alert('Invalid credentials');
      return;
    }
    await login(username, password);
    navigate('/');
  }
  return (
    <div>
      <h2>Login as existing user</h2>
      <div className='grid text-base grid-cols-1 gap-2 mt-4'>
        <input className='text-input' type="text" placeholder='Username'
          onChange={e => setUsername(e.target.value)}
        />
        <input className='text-input' type="password" placeholder='Password'
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <button className='bg-green-500 text-white py-2 px-4 rounded-md text-base mt-4'
        onClick={handleSubmit}>
        <div className='flex my-auto'>
          <span className="material-symbols-outlined mt-0.5 -ml-2">login</span>
          <p className='ml-1'>Continue</p>
        </div>
      </button>
    </div>
  )
}
