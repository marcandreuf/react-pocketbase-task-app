import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { deleteTask, getTasks, toggleTask } from '../lib/pocketbase';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    console.log('Home page loaded');
    getTasks().then(async (res) => {
      console.log(`res: ${res}`);
      if(res){
        console.log(`res.length: ${res.length}`);
      }else{
        console.log('No tasks found');
      } 
      setTasks(res);
      await sleep(1000);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
      setLoading(false);
    });
  }, [])

  return (
    <div>
      {loading ?
      <h1 className='text-3xl mb-2'>Loading...</h1>:
      tasks.length === 0? 
      <h1 className='text-3xl mb-2'>No tasks found</h1>:
      tasks.map(task => (
        <div className='text-3xl' key={task.id}>
          <div className='flex flex-row'>
            <input id={'task_' + task.id}
              className='h-6 w-6 my-auto'
              type="checkbox"
              defaultChecked={task.completed}
              onChange={()=>{
                setCompleted(!completed);
                toggleTask(task.id); }} />
            <h4 className='text-2xl ml-4 '>{task.title}</h4>
            <div className='ml-auto'>
              <Link to={`edit/${task.id}`}>
                <button className='ml-4 bg-gray-500 text-white px-2 py-1 pt-2 rounded-md text-base hover:bg-gray-600'>
                  <span className="material-symbols-outlined">edit</span>
                </button>
              </Link>
              <button className='ml-4 bg-red-500 text-white px-2 py-1 pt-2 rounded-md text-base hover:bg-red-600'
                onClick={()=>{deleteTask(task.id)}} >
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          </div>
          <p className='text-xl text-gray-400 ml-10' >{task.description}</p>
          <hr className='border boorder-gray-400 my-4' />
        </div>
      ))}
      <Link to="create">
        <button className='bg-green-500 text-white py-2 px-4 rounded-md text-base'>
          <div className='flex my-auto'>
            <span className="material-symbols-outlined mt-0.5 -ml-2">add</span>
            <p className='ml-1'>New task</p>
          </div>
        </button>
      </Link>
    </div>
  )
}

