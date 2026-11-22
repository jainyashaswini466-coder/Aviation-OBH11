import { Link } from 'react-router-dom';
export default function Home() {
  return <section className="hero">
    <div><span className="eyebrow">A LITTLE CURIOSITY. A NEW DESTINATION.</span>
      <h1>Your next journey<br /><span>starts here.</span></h1>
      <p>Discover routes, explore flight details, and find a little inspiration for your next adventure.</p>
      <Link className="button" to="/flights">Explore flights ↗</Link>
      <p className="muted">8 sample routes · Non-stop journeys · Endless possibilities</p>
    </div>
    <div className="journey-art" aria-hidden="true"><span className="art-label">LET YOUR IDEAS TAKE FLIGHT</span><div className="plane">✈</div><div className="art-route">DEL <span>· · · · ·</span> BOM</div><span>Explore something new.</span></div>
  </section>;
}
