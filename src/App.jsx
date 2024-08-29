import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PossessionTable from './Components/Table'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AddPossession from './Components/AddingPossession'
import UpdatePossession from './Components/UpdatePossession'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path='/possession' element={<PossessionTable />} />
        <Route path='/possessions' element= {<AddPossession />} />
        <Route path='/update' element={<UpdatePossession />} />;
      </Routes>
    </Router>
  )
}

export default App
