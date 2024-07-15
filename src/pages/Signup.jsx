import React, { useState} from 'react'
import { signup } from '../lib/pocketbase';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      window.alert('Invalid credentials');
      return;
    }
    await signup(username, password);
  }
  return (
    <div>
      <h2>Create a new account</h2>
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

//TODO: Add fields validation for username and password accoring to the pocketbase rules
//password: the length must be between 8 and 72; 
//username: the length must be between 3 and 150.

//Check for user already in use