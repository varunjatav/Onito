// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Personal from './components/Personal.tsx'
import Address from './components/Address.tsx'
import  Table  from './components/Table.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [ {
      path:"/",
      element: <Personal/>
    }
  ,{
    path:"/stepTwo",
    element: <Address/>
  },{
    path:"/dataTable",
    element: <Table/>
  }
]
  }
])
ReactDOM.createRoot(document.getElementById('root')!).render(

    <RouterProvider router={router}/>
  
)
