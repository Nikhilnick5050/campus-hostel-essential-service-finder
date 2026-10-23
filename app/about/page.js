import Icon from "@/components/Icon";

export default function AboutPage() {
  return (
    <section className="section">
      <div className="container narrow">
        <div className="section-head">
          <h1>About the Project</h1>
          <p>Why this website exists and what it aims to solve.</p>
        </div>

        <div className="card about-card">
          <p>
            The Campus & Hostel Essential Services Finder is a student-focused website
            designed to make campus life easier. It brings essential campus and hostel
            services into one place, allowing students to search for facilities, view
            important details, and find locations conveniently.
          </p>
          <p>
            The goal is to reduce confusion, save time, and help new students feel
            comfortable in their college environment.
          </p>
        </div>

        <div className="grid grid-3">
          <div className="card about-point">
            <span className="icon-tile">
              <Icon name="search" size={24} />
            </span>
            <h3>Easy Discovery</h3>
            <p className="muted">
              Search and filter services by name, category and location in seconds.
            </p>
          </div>
          <div className="card about-point">
            <span className="icon-tile">
              <Icon name="compass" size={24} />
            </span>
            <h3>Clear Locations</h3>
            <p className="muted">
              An illustrative campus map and directions help students find each service.
            </p>
          </div>
          <div className="card about-point">
            <span className="icon-tile">
              <Icon name="shield" size={24} />
            </span>
            <h3>Admin Managed</h3>
            <p className="muted">
              A protected dashboard lets the administrator keep details up to date.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}