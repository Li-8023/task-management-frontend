import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import TaskList from '../TaskList/TaskList'

function Home() {
  return (
    <div className="lg:flex px-5 lg:px-16 pt-[2.9vh]">
      <div className="hidden lg:block w-[25vw] relative mr-2">
        <Sidebar />
      </div>
      <div className="right-side-part w-full flex justify-center mb-10 ml-10">
        <TaskList />
      </div>
    </div>
  );
}

export default Home