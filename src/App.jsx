import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InventoryPage from './inventory/InventoryPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<InventoryPage to='/inventory' />} />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
