
import './App.css';
import { Toaster } from 'react-hot-toast';
import LoginPage from './pages/LoginPage';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Main from './pages/Main';
import Analysis from './pages/Analysis';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
    <div class="">
      <div className="mx-auto w-[100vw] min-w-fit  bg-white min-h-[100vh] dark:bg-black text-center drop-shadow-lg text-gray-800">
      <Navbar/>
      <div>
      <Toaster
            toastOptions={{
              success: {
                theme: {
                  primary: '#4aed88',
                        },
                  },
            }}
       ></Toaster>
      </div>
      <div className='h-full mt-8'>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/main" element={<Main/>}/>
            <Route path="/analysis" element={<Analysis/>}/>
        </Routes>
      </BrowserRouter>
      </div>
    </div>
    </div>
  </>
    
  );
}

export default App;
