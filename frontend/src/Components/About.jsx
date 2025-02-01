import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-24">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full text-center">
        <h1 className="text-4xl font-bold text-violet-700 mb-4">About iTask Manager</h1>
        <p className="text-gray-700 mb-8">
          iTask Manager is a powerful tool designed to help you manage your tasks efficiently and effectively. 
          Our goal is to provide a simple yet robust platform for organizing your daily activities, setting priorities, 
          and tracking your progress.
        </p>
        <p className="text-gray-700 mb-8">
          With iTask Manager, you can easily create, edit, and delete your tasks 
          to keep everything organized. Our user-friendly interface ensures that you can focus on what matters most - 
          getting things done.
        </p>
          </div>
    </div>
  );
}

export default About;
