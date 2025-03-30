import {Routes , Route} from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login'
import Signup from './pages/Signup';
import TheaterSelection from './pages/TheaterSelection';
import Dashboard from './pages/Dashboard';
import MovieListing from './pages/MovieListing'
import ShowManagement from './pages/ShowManagement'
import RevenueCheck from './pages/RevenueCheck'
import BookingTracking from './pages/BookingTracking'
import CreateShow from './pages/CreateShow'

const App = () => {


  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/home' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path="/select-theater" element={<TheaterSelection />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/movies" element={<MovieListing />} />
        <Route path="/shows" element={<ShowManagement />} />
        <Route path="/revenue" element={<RevenueCheck />} />
        <Route path="/tracking" element={<BookingTracking />} />
        
        <Route path="/create-show" element={<CreateShow />} />
      </Routes>
    </div>
  )
}
export default App;