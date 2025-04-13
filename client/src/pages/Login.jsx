import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentForm, setCurrentForm] = useState('User'); // "Admin" or "User"
  const [formType, setFormType] = useState('Login'); // "Login" or "Sign Up"
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check if you're trying to log in as a User when Admin is selected, or vice versa
      if (currentForm === 'Admin') {
        if (formType === 'Login') {
          // Admin Login
          const res = await axios.post('/api/auth/login', {
            email: formData.email,
            password: formData.password,
          });

          toast.success(res.data.message);
          localStorage.setItem('adminToken', res.data.token);
        }
      } else if (currentForm === 'User') {
        if (formType === 'Sign Up') {
          // User Sign Up (Admin adding a user)
          const res = await axios.post('/api/admin/add', formData, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
            },
          });
          toast.success(res.data.message);
        } else if (formType === 'Login') {
          // User Login (if backend is implemented for user login)
          const res = await axios.post('/api/auth/login', {
            email: formData.email,
            password: formData.password,
          });

          toast.success(res.data.message);
          localStorage.setItem('userToken', res.data.token);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className='flex flex-col items-center mt-20 px-4'>
      <div className='flex gap-4 mb-4'>
        <button
          className={`px-4 py-2 border ${currentForm === 'User' ? 'bg-black text-white' : ''}`}
          onClick={() => setCurrentForm('User')}
        >
          User
        </button>
        <button
          className={`px-4 py-2 border ${currentForm === 'Admin' ? 'bg-black text-white' : ''}`}
          onClick={() => setCurrentForm('Admin')}
        >
          Admin
        </button>
      </div>

      <form onSubmit={handleSubmit} className='w-full sm:max-w-md flex flex-col gap-4 border p-6 shadow'>
        <h2 className='text-xl font-semibold text-center'>
          {currentForm} {formType}
        </h2>

        {formType === 'Sign Up' && currentForm === 'User' && (
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="border px-3 py-2"
            required
          />
        )}

        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="border px-3 py-2"
          required
        />

        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="border px-3 py-2"
          required
        />

        {currentForm === 'User' && (
          <p
            className="text-sm cursor-pointer text-blue-600 underline"
            onClick={() => setFormType(formType === 'Login' ? 'Sign Up' : 'Login')}
          >
            {formType === 'Login' ? 'Create Account' : 'Login Instead'}
          </p>
        )}

        <button type="submit" className="bg-black text-white px-4 py-2 mt-2">
          {formType}
        </button>
      </form>
    </div>
  );
};

export default Login;