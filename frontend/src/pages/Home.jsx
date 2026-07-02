import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';

const collections = [
  {
    title: 'Calming Blends',
    description: 'Soothing botanical formulas for a restful evening routine.',
    accent: 'lavender',
  },
  {
    title: 'Rest Rituals',
    description: 'Curated rituals and gentle tools to prepare for sleep.',
    accent: 'moon',
  },
  {
    title: 'Morning Recovery',
    description: 'Support for waking up refreshed after a deep night of rest.',
    accent: 'sun',
  },
  {
    title: 'Dream Support',
    description: 'Light botanical support designed for calmer nights.',
    accent: 'stars',
  },
];

const bestSellers = [
  {
    name: 'Deep Sleep Blend',
    price: '$29.99',
    description: 'Lavender, chamomile, and magnesium for a soothing rest.',
    tag: 'Best seller',
  },
  {
    name: 'Night Calm Tonic',
    price: '$24.50',
    description: 'Herbal support that helps calm racing thoughts before bed.',
    tag: 'New',
  },
  {
    name: 'Dream Pause Mist',
    price: '$18.00',
    description: 'A light mist to freshen your bedroom and encourage calm.',
    tag: 'Popular',
  },
  {
    name: 'Sleep Support Tea',
    price: '$22.75',
    description: 'Warm, comforting tea with chamomile and valerian root.',
    tag: 'Favorite',
  },
];

function Home() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Hero />

        <section className="section collections" id="collections">
          <div className="section-header">
            <p className="section-tag">Explore collections</p>
            <h2>Designed for every bedtime ritual.</h2>
          </div>

          <div className="grid collection-grid">
            {collections.map((collection) => (
              <article className={`collection-card ${collection.accent}`} key={collection.title}>
                <span>{collection.title}</span>
                <p>{collection.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section benefits" id="benefits">
          <div className="section-header">
            <p className="section-tag">Why Sleepvia</p>
            <h2>Everything you need for healthier sleep.</h2>
          </div>

          <div className="grid feature-grid">
            <article className="feature-card">
              <strong>Science-backed ingredients</strong>
              <p>Carefully chosen botanicals combined for calm, balance, and better rest.</p>
            </article>
            <article className="feature-card">
              <strong>Clean and modern</strong>
              <p>No harsh compounds, no morning fog—just gentle support for your evening.</p>
            </article>
            <article className="feature-card">
              <strong>Trusted experience</strong>
              <p>Designed with comfort and quality in mind to enhance your nightly routine.</p>
            </article>
          </div>
        </section>

        <section className="section best-sellers" id="best-sellers">
          <div className="section-header">
            <p className="section-tag">Shop our best sellers</p>
            <h2>Products customers love.</h2>
          </div>

          <div className="grid product-grid">
            {bestSellers.map((product) => (
              <ProductCard key={product.name} {...product} />
            ))}
          </div>
        </section>

        <section className="section promise" id="promise">
          <div className="promise-card">
            <div className="promise-copy">
              <p className="section-tag">Our promise</p>
              <h2>Restful nights with mindful, modern care.</h2>
              <p>
                Sleepvia blends premium botanical ingredients, clean formulas, and a calm-first
                experience so you can feel supported from evening through morning.
              </p>
              <ul>
                <li>Plant-based and gently relaxing</li>
                <li>Simple, premium ingredients</li>
                <li>Clean formula with no artificial colors</li>
              </ul>
            </div>

            <div className="promise-highlights">
              <div className="highlight-pill">Calm packaging</div>
              <div className="highlight-pill">Fast delivery</div>
              <div className="highlight-pill">Satisfaction focus</div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
