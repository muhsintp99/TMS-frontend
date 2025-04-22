import React from 'react'
// import Count from './component/count-redux-basic/view/index'
// import TaskList from './component/normal-fetch-axios/TaskList'
// import TaskIndex from './component/redux fetch/view/TaskIndex'
import Kanban from './component/redux fetch/view/Kanban'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <>
      {/* <Count/> */}
      {/* <TaskList/> */}
      {/* <TaskIndex /> */}
      <Kanban/>

      <ToastContainer />
    </>
  )
}

export default App