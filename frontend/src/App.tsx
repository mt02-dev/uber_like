import React from 'react'
import './App.css'
import { 
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams
} from 'react-router-dom'
import Restaurants from './containers/Restaurants' 
import Orders from './containers/Orders' 
import Foods from './containers/Foods' 
import axios from 'axios'
import { restaurantsIndex } from './urls'

function App() {
  // axios.get(restaurantsIndex).then((res) => console.log(res.data));
  return (
    <BrowserRouter>

      <Link to='/restaurants'>Restaurant List</Link>
      <Link to='/orders'>Order List</Link>

      <Routes>
        <Route path='/restaurants' element={<Restaurants />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/restaurants/:restaurantsId/foods' element={<Foods />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
