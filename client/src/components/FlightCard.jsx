import { Link } from 'react-router-dom';
export default function FlightCard({ flight }) {
  return <article className="flight-card">
    <div className="card-top"><span className="badge">Non-stop</span><span>{flight.flightNumber}</span></div>
    <h2>{flight.origin} <span className="arrow">→</span> {flight.destination}</h2>
    <p>{flight.airline} · {flight.duration}</p>
    <div className="times"><strong>{flight.departure}</strong><span>→</span><strong>{flight.arrival}</strong></div>
    <div className="card-bottom"><div><small>One-way from</small><strong>₹{flight.price.toLocaleString('en-IN')}</strong></div><Link className="button secondary" to={`/flights/${flight.id}`}>View details</Link></div>
  </article>;
}
