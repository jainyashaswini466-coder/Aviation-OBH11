import { useState } from 'react';
import { Link } from 'react-router-dom';
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  function handleSubmit(event) {
    event.preventDefault();
    // TODO: Connect this form to the login API during class.
    setMessage('This is a UI demo. Authentication will be implemented during class.');
  }
  // const signup = true

  return <section className="login-page panel">
    <span className="eyebrow">WELCOME ABOARD</span><h1>Login</h1><p>Your journey continues here.</p>
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email address</label><input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" autoComplete="email" required />
      <label htmlFor="password">Password</label><input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" autoComplete="current-password" required />
      <button className="button" type="submit">Login demo</button>
    </form>
    <p className="muted">UI only — no credentials are sent or stored.</p>
    {message && <p role="status">{message}</p>}

  {/* {signup ? <Link>Signup</Link> : <Link>Login</Link> } */}
    
  </section>;
}
