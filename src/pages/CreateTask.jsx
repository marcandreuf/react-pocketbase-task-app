import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createTask } from '../lib/pocketbase';

export default function CreateTask() {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(title, description);
    if (!title) {
      window.alert('Please enter a title, it is required');
      return;
    }
    await createTask(title, description);
    navigate("..");
    setTitle('');
    setDescription('');
  }
  return (
    <div>
      <h2>Create Task</h2>
      <div className='grid text-base grid-cols-1 gap-2 mt-4'>
        <input className='text-input' type="text" placeholder='Title'
          onChange={e => setTitle(e.target.value)}
        />
        <input className='text-input' type="text" placeholder='Description'
          onChange={e => setDescription(e.target.value)}
        />
      </div>
      <button className='bg-green-500 text-white py-2 px-4 rounded-md text-base mt-4'
        onClick={handleSubmit}>
        <div className='flex my-auto'>
          <span className="material-symbols-outlined mt-0.5 -ml-2">save</span>
          <p className='ml-1'>Save</p>
        </div>
      </button>
    </div>
  )
}
