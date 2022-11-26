
import { RouterProvider } from 'react-router-dom'
import { router } from './Routes/Routes/Routes'
import toast, { Toaster } from 'react-hot-toast';

function App() {


  return (
    <>
      <RouterProvider router={router} ></RouterProvider>
      <Toaster
        toastOptions={{
          className: 'flex shadow shadow-purple-400 gap-6 rounded-lg overflow-hidden max-w-3xl dark:bg-gray-700 dark:text-white divide-gray-700 text-xl',
          duration: 5000,
          position: 'bottom-left',


        }}
      />
    </>
  )
}

export default App
