import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useState } from 'react'
import AddWorkflow from './AddWorkFlow'
import AddTask from './AddTask'

function Home() {
    const WorkFlows = useSelector(state => state.WorkFlow)
    const Tasks = useSelector(state => state.Tasks)

  return (
    <>
        <main className='max-w-4xl p-6 mx-auto space-y-6'>
            <AddWorkflow/>
            <AddTask/>
        </main>
    </>
  )
}

export default Home