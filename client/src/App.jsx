import { Link, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Flights from './pages/Flights';
import FlightDetails from './pages/FlightDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';

export default function App() {
  return <>
    <Navbar />
    <main className="container">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/flights/:id" element={<FlightDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element = {<Signup/>} />
        <Route path="/profile" element = {<Profile/>} />

        <Route path="*" element={<section className="panel"><h1>Page not found</h1><Link to="/">Return home</Link></section>} />
      </Routes>
    </main>
    <footer className="container">Aviation Starter · Fictional flights. Built for learning.</footer>
  </>;
}
