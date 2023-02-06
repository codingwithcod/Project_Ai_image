import React from 'react';
import {BrowserRouter, Route , Routes, Link} from 'react-router-dom';
import {Home, CreatePost} from './pages';
import {logo} from './assets'

const App = () => {
  return (
    <BrowserRouter>
      <header className='w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4] '>
      <Link className='flex  gap-2 justify-center items-center ' to='/' >
      <img src={logo} alt="logo" className='w-8 object-contain' />
      <span className='font-extrabold text-3xl mt-[3px] text-gray-500'>image</span> 
      </Link>

      <Link to='/create-post' className='font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md'>
        Create
      </Link>

      </header>

      <main className='sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-72px)]'>
        <Routes>
          <Route  path='/' element={<Home/>}/>
          <Route  path='/create-post' element={<CreatePost/>}/>
        </Routes>

      </main>

    </BrowserRouter>
  )
}

export default App