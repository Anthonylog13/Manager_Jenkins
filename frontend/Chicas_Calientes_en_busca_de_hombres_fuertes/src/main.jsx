import React from 'react'
import ReactDOM from 'react-dom/client'


import './index.css'
import { ProductHuntApp } from './ProductHuntApp'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <ProductHuntApp/>
    </BrowserRouter>
  </React.StrictMode>,
)
