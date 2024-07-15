import React, {useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getTaskById, updateTask } from '../lib/pocketbase';

export default function EditTask() {
  const { id } = useParams();
  //const [title, setTitle] = React.useState('');
  //const [description, setDescription] = React.useState('');
  const [task, setTask] = React.useState({title: '', description: ''});
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();    
    if (!task.title) {
      window.alert('Please enter a title, it is required');
      return;
    }
    await updateTask(task.id, task.title, task.description);
    navigate("..");
  }  

  useEffect(() => {
    getTaskById(id).then(taskData => setTask(taskData));
  }, [id]);

  return (
    <div>
      <h2>Edit Task</h2>
      <div className='grid text-base grid-cols-1 gap-2 mt-4'>
        <input className='text-input' type="text" placeholder='Title'
          value={task.title}
          onChange={e => setTask({...task, title: e.target.value})}
        />
        <input className='text-input' type="text" placeholder='Description'
          value={task.description}
          onChange={e => setTask({...task, description: e.target.value})}
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
