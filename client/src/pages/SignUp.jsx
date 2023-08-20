import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function SignUp() {

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData, [e.target.id]: e.target.value
    });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      // console.log(data);
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      navigate('/sign-in');
    } catch (error) {
      // console.log(error);
      setLoading(false);
      setError(true);
    }
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-center text-3xl font-semibold my-7' >Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" name="username" id="username" className='bg-slate-100 p-3 rounded-lg' placeholder='Username' onChange={handleChange} />
        <input type="email" name="email" id="email" className='bg-slate-100 p-3 rounded-lg' placeholder='Email' onChange={handleChange} />
        <input type="password" name="password" id="password" className='bg-slate-100 p-3 rounded-lg' placeholder='Password' onChange={handleChange} />
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 ' >{loading ? 'Loading....' : 'Sign Up'}</button>
      </form>
      <div className='flex gap-2'>
        <p>Have an account?</p>
        <Link to='/sign-in' >
          <span className='text-blue-500'>Sign In</span>
        </Link>
      </div>
      <p className='text-red-700 mt-5' >{error && 'Something went wrong!!!'}</p>
    </div>
  )
}
