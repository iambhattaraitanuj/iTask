import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-24">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full text-center">
        <h1 className="text-4xl font-bold text-violet-700 mb-4">Welcome to iTask Manager</h1>
        <p className="text-gray-700 mb-8">Manage your tasks efficiently and effectively.</p>
        <div className="flex justify-center space-x-4 mb-8">
          <Link to="/itask" className="bg-violet-700 text-white px-4 py-2 rounded-md hover:bg-violet-600 transition-all">View Tasks</Link>
          <Link to="/about" className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-all">Learn More</Link>
        </div>
         </div>
    </div>
  );
}

export default Home;