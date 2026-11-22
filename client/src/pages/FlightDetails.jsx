import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { API_URL } from '../api';

export default function FlightDetails() {
  const { id } = useParams();
  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError('');
    setFlight(null);
    async function loadFlight() {
      try {
        const response = await fetch(`${API_URL}/flights/${id}`, { signal: controller.signal });
        if (response.status === 404) throw new Error('Flight not found. Choose another flight.');
        if (!response.ok) throw new Error('Could not load this flight. Please try again.');
        setFlight(await response.json());
      } catch (error) {
        if (error.name !== 'AbortError') setError(error.message || 'Unable to load flight.');
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    loadFlight();
    return () => controller.abort();
  }, [id]);

  return <section className="details-page">
    <Link className="back-link" to="/flights">← All flights</Link>
    {loading && <p className="panel" role="status">Loading flight details…</p>}
    {error && <p className="panel error" role="alert">{error}</p>}
    {!loading && !error && !flight && <p className="panel">No flight details available.</p>}
    {!loading && !error && flight && <article className="panel details">
      <span className="badge">Non-stop · {flight.flightNumber}</span>
      <h1>{flight.origin} → {flight.destination}</h1><p>{flight.airline} · {flight.route}</p>
      <div className="detail-times"><div><small>Departure</small><strong>{flight.departure}</strong><span>{flight.origin}</span></div><span>{flight.duration}</span><div><small>Arrival</small><strong>{flight.arrival}</strong><span>{flight.destination}</span></div></div>
      <dl><div><dt>Aircraft</dt><dd>{flight.aircraft}</dd></div><div><dt>Baggage allowance</dt><dd>{flight.baggage}</dd></div><div><dt>Sample one-way fare</dt><dd>₹{flight.price.toLocaleString('en-IN')}</dd></div></dl>
      <p className="muted">Fictional flight data for practice. Booking will be added in a future class.</p>
    </article>}
  </section>;
}
