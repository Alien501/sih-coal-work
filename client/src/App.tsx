import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login/Login'
import { Toaster } from './components/ui/sonner'
import Home from './pages/Home/Home'
import ManageWorker from './pages/ManageWorkers/ManageWorker'
import AssignWorks from './pages/AssignWorks/AssignWorks'

function App() {
  const routes = createBrowserRouter([
    {
      path: '/login',
      index: true,
      element: <Login />
    },
    {
      path: '/home',
      element: <Home />
    },
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/manage-worker',
      element: <ManageWorker />
    },
    {
      path: '/assign-works',
      element: <AssignWorks />
    }
  ])

  return (
    <>
      <div className='min-h-screen w-full'>
        <RouterProvider router={routes} />
        <Toaster />
      </div>
    </>
  )
}

export default App
