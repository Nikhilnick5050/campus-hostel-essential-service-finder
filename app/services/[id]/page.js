import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import { getServiceById } from "@/lib/db";
import { categoryIcon } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function ServiceDetails({ params }) {
  const service = await getServiceById(params.id);
  if (!service) notFound();

  const icon = categoryIcon(service.category);
  const facilities = Array.isArray(service.facilities) ? service.facilities : [];

  return (
    <section className="section">
      <div className="container">
        <Link href="/services" className="back-link">
          <Icon name="chevron-right" size={16} className="flip" /> Back to services
        </Link>

        <div className="detail-head card">
          <span className="icon-tile big">
            <Icon name={icon} size={34} />
          </span>
          <div>
            <div className="detail-badges">
              <span className="badge">{service.category}</span>
              <span className={`badge ${service.active !== false ? "badge-active" : "badge-inactive"}`}>
                {service.active !== false ? "Active" : "Inactive"}
              </span>
              <span className="badge">{service.area}</span>
            </div>
            <h1>{service.name}</h1>
            <p className="muted">{service.description}</p>
          </div>
        </div>

        <div className="grid grid-2 detail-grid">
          <div className="card detail-card">
            <h3>
              <Icon name="map-pin" size={20} /> Location
            </h3>
            <p>{service.location}</p>
            <h3>
              <Icon name="clock" size={20} /> Timings
            </h3>
            <p>{service.timings || "Not specified"}</p>
            <h3>
              <Icon name="phone" size={20} /> Contact
            </h3>
            <p>{service.contact || "Not available"}</p>
          </div>

          <div className="card detail-card">
            <h3>
              <Icon name="list" size={20} /> Available Facilities
            </h3>
            {facilities.length ? (
              <ul className="facility-list">
                {facilities.map((f) => (
                  <li key={f}>
                    <Icon name="check" size={18} /> {f}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="muted">No facilities listed.</p>
            )}
          </div>
        </div>

        <div className="detail-actions">
          {service.mapLink ? (
            <a
              href={service.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <Icon name="navigation" size={18} /> Get Directions
            </a>
          ) : null}
          <Link href="/map" className="btn btn-outline">
            <Icon name="compass" size={18} /> View Campus Map
          </Link>
        </div>

        <p className="muted demo-note">
          <Icon name="warning" size={16} /> Demonstration data — timings, locations and
          contact numbers are samples and can be updated by the administrator.
        </p>
      </div>
    </section>
  );
}