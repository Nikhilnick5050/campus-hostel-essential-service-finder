import Link from "next/link";
import Icon from "@/components/Icon";
import { categoryIcon } from "@/lib/constants";

export default function ServiceCard({ service }) {
  const icon = categoryIcon(service.category);
  return (
    <Link href={`/services/${service.id}`} className="service-card card">
      <div className="service-card-top">
        <span className="icon-tile">
          <Icon name={icon} size={24} />
        </span>
        <span className={`badge ${service.active !== false ? "badge-active" : "badge-inactive"}`}>
          {service.active !== false ? "Active" : "Inactive"}
        </span>
      </div>
      <h3>{service.name}</h3>
      <p className="muted clamp">{service.description}</p>
      <div className="service-meta">
        <span>
          <Icon name="map-pin" size={15} /> {service.location}
        </span>
        <span>
          <Icon name="clock" size={15} /> {service.timings}
        </span>
      </div>
      <span className="card-link">
        View details <Icon name="chevron-right" size={16} />
      </span>
    </Link>
  );
}