import { useState } from 'react';
import { Link } from 'react-router-dom';
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');
    try {
      await handleLogin();
    } catch {
      setMessage('Unable to reach the server. Please try again.');
    }
  }
  // const signup = true
  async function handleLogin(){
    const response = await fetch('http://localhost:5000/login',{
      method : "POST",
      headers : {
        'Content-type':'application/json'
      },
      body: JSON.stringify({email, password})
    })

    const apiresponse = await response.json()

    console.log(apiresponse)
    
    setMessage(apiresponse.message || "Unable to log in.")

  }
  return <section className="login-page panel">
    <span className="eyebrow">WELCOME ABOARD</span><h1>Login</h1><p>Your journey continues here.</p>
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email address</label><input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" autoComplete="email" required />
      <label htmlFor="password">Password</label><input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" autoComplete="current-password" required />
      <button className="button" type="submit">Login</button>
    </form>
    <p className="muted">Don’t have an account? <Link to="/signup">Sign up</Link></p>
    {message && <p role="status">{message}</p>}


    
  </section>;
}

