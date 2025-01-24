// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './styleslogin.css'
// import hospitalLogo from 'C:/Users/HP/Downloads/TripleM-main-20240227T115539Z-001/TripleM-main/client/src/assets/signify_health.jpg';

// const LoginForm = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState();
//   const navigate = useNavigate();

//   const handleLogin = (event) => {
//     event.preventDefault();

//     // Hardcoded credentials for simplicity (replace with actual authentication logic)
//     if (username === 'admin' && password === 'password') {
//       alert('Login successful! Redirecting to dashboard...');
//       // Redirect to the dashboard page
//       navigate('/dashboard');
//     } else {
//       alert('Invalid credentials. Please try again.');
//     }
//   };

//   return (
//     <div className="login-container bg-white p-8 rounded shadow-md flex flex-col items-center">
//       {/* Center the logo at the top */}
//       <img src={hospitalLogo} className="logo mb-6" alt="Hospital Logo" />

//       <form onSubmit={handleLogin} className="w-full">
//         <div className="mb-4">
//           <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Username:</label>
//           <input
//             type="text"
//             id="username"
//             name="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             placeholder="Enter your username"
//             className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password:</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Enter your password"
//             className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             required
//           />
//         </div>
//         <div className="mb-6">
//           <button
//             type="submit"
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           >
//             Login
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default LoginForm;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import hospitalLogo from '../assets/Hospital_name.jpg';
import backgroundImg from '../assets/background.jpg'; 
// Adjust the path accordingly

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    // Hardcoded credentials for simplicity (replace with actual authentication logic)
    if (username === 'admin' && password === 'password') {
      alert('Login successful! Redirecting to admin page...');
      // Redirect to the dashboard page
      navigate('/admin');
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="bg-cover bg-center flex items-center justify-center h-screen" style={{ backgroundImage: `url(${backgroundImg})` }}>
      <div className="login-container bg-white p-6 rounded shadow-md flex flex-col items-center">
        {/* Center the logo at the top */}
        <img src={hospitalLogo} className="logo mb-4" alt="Hospital Logo" />

        <form onSubmit={handleLogin} className="w-full">
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
