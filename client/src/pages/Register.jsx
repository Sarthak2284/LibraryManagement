import React from 'react'

const Register = () => {
  return (
    <div>
       <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4">Register</h2>
      <form className="space-y-4">
        <input type="text" placeholder="Name" className="w-full px-4 py-2 border rounded" />
        <input type="email" placeholder="Email" className="w-full px-4 py-2 border rounded" />
        <input type="password" placeholder="Password" className="w-full px-4 py-2 border rounded" />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Register</button>
      </form>
    </div>
    </div>
  )
}

export default Register
