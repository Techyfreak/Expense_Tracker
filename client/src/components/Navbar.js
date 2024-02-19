import React, {useState} from "react";
import Switcher from "../Switcher";
import chart from "../Assets/chart.gif"


export default function Navbar({ fixed }) {
  
  const [navbarOpen, setNavbarOpen] = useState(false);
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-sky-500 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a
              className="text-2xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
              href="/main"
            >
              Expense Tracker
            </a>
            <button
              className=" cursor-pointer text-2xl  h-10 my-1.5 border-solid rounded-full lg:hidden outline-none focus:outline-none bg-black"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              ⚙️
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <a
                  className="px-2 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href=""
                >
                  <i className="text-lg leading-lg text-white opacity-75"></i><span className="ml-2"><Switcher/></span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="/analysis"
                >
                  <img className="text-lg leading-lg text-white opacity-100 rounded-lg" src={chart} alt="chart" type="button"/>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-1 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="/"
                >
                  <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={()=>localStorage.removeItem('appUser')}>
                     <svg aria-hidden="true" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                     <span class="sr-only">Icon description</span>
                 </button>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}