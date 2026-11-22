import { useEffect, useState } from 'react';
import FlightCard from '../components/FlightCard';
import { API_URL } from '../api';

export default function Flights() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    async function loadFlights() {
      try {
        const response = await fetch(`${API_URL}/flights`, { signal: controller.signal });
        if (!response.ok) throw new Error('Could not load flights. Please try again.');
        const data = await response.json();
        setFlights(data);
      } catch (error) {
        if (error.name !== 'AbortError') setError('Unable to load flights. Check that the server is running and refresh the page.');
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    loadFlights();
    // Cancel a pending request when this page unmounts.
    return () => controller.abort();
  }, []);

  return <section>
    <div className="page-heading"><span className="eyebrow">FIND YOUR NEXT DESTINATION</span><h1>Explore flights</h1><p>Simple routes. New possibilities. All times are local to each airport.</p></div>
    {loading && <p className="panel" role="status">Loading flights…</p>}
    {error && <p className="panel error" role="alert">{error}</p>}
    {!loading && !error && flights.length === 0 && <p className="panel">No flights available right now.</p>}
    {!loading && !error && <div className="flight-grid">{flights.map((flight) => <FlightCard key={flight.id} flight={flight} />)}</div>}
  </section>;
}
