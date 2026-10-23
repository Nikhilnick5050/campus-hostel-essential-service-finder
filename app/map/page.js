"use client";

import { useEffect, useState } from "react";
import Icon from "@/components/Icon";
import { categoryIcon } from "@/lib/constants";

// Illustrative demo layout: each service is placed at a rough (x, y) position.
const POSITIONS = {
  "svc-library": { x: 22, y: 30 },
  "svc-reading-room": { x: 30, y: 26 },
  "svc-mess": { x: 72, y: 30 },
  "svc-canteen": { x: 62, y: 22 },
  "svc-medical": { x: 20, y: 62 },
  "svc-pharmacy": { x: 28, y: 66 },
  "svc-transport": { x: 50, y: 88 },
  "svc-wifi": { x: 70, y: 60 },
  "svc-admin": { x: 44, y: 48 },
  "svc-laundry": { x: 78, y: 78 },
  "svc-stationery": { x: 12, y: 84 },
  "svc-print-shop": { x: 16, y: 76 },
  "svc-sports": { x: 58, y: 70 },
  "svc-gym": { x: 84, y: 70 },
  "svc-hostel-office": { x: 80, y: 44 },
};

export default function MapPage() {
  const [services, setServices] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then((data) => setServices(data.services || []));
  }, []);

  const active = services.filter((s) => s.active !== false);

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <h1>Campus Map</h1>
          <p>
            An illustrative campus layout showing where services are located. Select a
            service to see its position.
          </p>
        </div>

        <div className="map-layout">
          <div className="map-canvas card">
            <div className="map-zone zone-academic">Academic Block</div>
            <div className="map-zone zone-hostel">Hostel Area</div>
            <div className="map-zone zone-sports">Sports Ground</div>
            <div className="map-zone zone-gate">Main Gate</div>

            {active.map((s) => {
              const pos = POSITIONS[s.id] || { x: 50, y: 50 };
              const icon = categoryIcon(s.category);
              const isSel = selected?.id === s.id;
              return (
                <button
                  key={s.id}
                  className={`map-pin ${isSel ? "selected" : ""}`}
                  style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                  onClick={() => setSelected(s)}
                  aria-label={s.name}
                  title={s.name}
                >
                  <Icon name={icon} size={18} />
                </button>
              );
            })}
          </div>

          <div className="map-sidebar card">
            <h3>Select a service</h3>
            {selected ? (
              <div className="map-selected">
                <span className="icon-tile">
                  <Icon name={categoryIcon(selected.category)} size={22} />
                </span>
                <h4>{selected.name}</h4>
                <p className="muted">{selected.location}</p>
                <p className="muted">
                  <Icon name="clock" size={15} /> {selected.timings}
                </p>
                {selected.mapLink ? (
                  <a
                    href={selected.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    <Icon name="navigation" size={18} /> Get Directions
                  </a>
                ) : null}
              </div>
            ) : (
              <p className="muted">Tap a marker on the map to see details.</p>
            )}

            <div className="map-list">
              {active.map((s) => (
                <button
                  key={s.id}
                  className={`map-list-item ${selected?.id === s.id ? "selected" : ""}`}
                  onClick={() => setSelected(s)}
                >
                  <Icon name={categoryIcon(s.category)} size={18} />
                  <span>{s.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="muted demo-note">
          <Icon name="warning" size={16} /> This is a clearly labelled demo map. Actual
          campus coordinates are not configured, so no real locations are claimed.
        </p>
      </div>
    </section>
  );
}