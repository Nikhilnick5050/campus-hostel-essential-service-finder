import Link from "next/link";
import Icon from "@/components/Icon";
import ServiceCard from "@/components/ServiceCard";
import { CATEGORIES } from "@/lib/constants";
import { getServices } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function Home() {
  const services = await getServices();
  const popular = services.filter((s) => s.popular && s.active !== false).slice(0, 6);
  const contacts = services.filter((s) => s.contact).slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="hero-pill">
              <Icon name="sparkles" size={16} /> Find. Access. Feel at Home.
            </span>
            <h1>Find Every Essential Service on Your Campus</h1>
            <p className="hero-sub">
              Your campus and hostel guide — all in one place. Search for the mess,
              library, medical room, transport and more without asking around.
            </p>
            <form action="/services" className="hero-search">
              <Icon name="search" size={20} className="hero-search-icon" />
              <input
                name="q"
                type="search"
                placeholder="Search for library, mess, medical room…"
                aria-label="Search services"
              />
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </form>
            <div className="hero-actions">
              <Link href="/services" className="btn btn-primary">
                Explore Services <Icon name="arrow-right" size={18} />
              </Link>
              <Link href="/map" className="btn btn-outline">
                View Campus Map
              </Link>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="hero-art-card">
              <Icon name="compass" size={64} />
              <span>Campus Guide</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Quick Service Categories</h2>
            <p>Browse the essential services available on campus and in the hostel.</p>
          </div>
          <div className="grid grid-4">
            {CATEGORIES.map((c) => (
              <Link
                key={c.name}
                href={`/services?category=${encodeURIComponent(c.name)}`}
                className="category-card card"
              >
                <span className="icon-tile">
                  <Icon name={c.icon} size={24} />
                </span>
                <h3>{c.name}</h3>
                <p className="muted">{c.description}</p>
                <span className="card-link">
                  View Services <Icon name="chevron-right" size={16} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular services */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <h2>Popular Services</h2>
            <p>Most-used facilities, highlighted for quick access.</p>
          </div>
          <div className="grid grid-3">
            {popular.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        </div>
      </section>

      {/* Important contacts */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Important Campus Contacts</h2>
            <p>Key numbers to keep handy (demo data).</p>
          </div>
          <div className="grid grid-4">
            {contacts.map((s) => (
              <div key={s.id} className="card contact-card">
                <span className="icon-tile">
                  <Icon name="phone" size={22} />
                </span>
                <h3>{s.name}</h3>
                <p className="muted">{s.contact}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <h2>How It Works</h2>
            <p>Find any service in three simple steps.</p>
          </div>
          <div className="grid grid-3 steps">
            <div className="step card">
              <span className="step-num">1</span>
              <Icon name="search" size={28} />
              <h3>Search</h3>
              <p className="muted">Type a service name or keyword to find what you need.</p>
            </div>
            <div className="step card">
              <span className="step-num">2</span>
              <Icon name="info" size={28} />
              <h3>View Details</h3>
              <p className="muted">Check timings, location, contact and facilities.</p>
            </div>
            <div className="step card">
              <span className="step-num">3</span>
              <Icon name="navigation" size={28} />
              <h3>Find Location</h3>
              <p className="muted">Open the campus map or get directions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="section">
        <div className="container about-split">
          <div>
            <h2>About the Project</h2>
            <p>
              The Campus & Hostel Essential Services Finder is a student-focused website
              designed to make campus life easier. It brings essential campus and hostel
              services into one place, allowing students to search for facilities, view
              important details, and find locations conveniently.
            </p>
            <p className="muted">
              The goal is to reduce confusion, save time, and help new students feel
              comfortable in their college environment.
            </p>
            <Link href="/about" className="btn btn-primary">
              Learn more <Icon name="arrow-right" size={18} />
            </Link>
          </div>
          <div className="about-stats">
            <div className="card stat">
              <h3>{services.length}</h3>
              <span className="muted">Services listed</span>
            </div>
            <div className="card stat">
              <h3>{CATEGORIES.length}</h3>
              <span className="muted">Categories</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}