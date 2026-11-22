import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return <header className="navbar">
    <nav className="container nav-content" aria-label="Main navigation">
      <Link className="brand" to="/">✈ Aviation<span>Starter</span></Link>
      <div className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/flights">Flights</NavLink>
        <NavLink to="/login">Login</NavLink>
        <button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} aria-pressed={theme === 'dark'}>{theme === 'light' ? '☾ Dark' : '☀ Light'}</button>
      </div>
    </nav>
  </header>;
}
