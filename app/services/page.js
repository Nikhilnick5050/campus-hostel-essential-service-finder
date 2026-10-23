"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ServiceCard from "@/components/ServiceCard";
import Icon from "@/components/Icon";
import { CATEGORIES, LOCATIONS } from "@/lib/constants";

function ServicesExplorer() {
  const searchParams = useSearchParams();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [area, setArea] = useState(searchParams.get("area") || "");

  useEffect(() => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (category) params.set("category", category);
    if (area) params.set("area", area);

    setLoading(true);
    fetch(`/api/services?${params.toString()}`)
      .then((r) => r.json())
      .then((data) => setServices(data.services || []))
      .finally(() => setLoading(false));
  }, [q, category, area]);

  function clearFilters() {
    setQ("");
    setCategory("");
    setArea("");
  }

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <h1>Explore Services</h1>
          <p>Search and filter every essential campus and hostel service.</p>
        </div>

        <div className="filter-bar card">
          <div className="filter-search">
            <Icon name="search" size={20} className="filter-search-icon" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by service name or keyword…"
              aria-label="Search services"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Filter by category"
          >
            <option value="">All categories</option>
            {CATEGORIES.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
          <select
            value={area}
            onChange={(e) => setArea(e.target.value)}
            aria-label="Filter by location"
          >
            <option value="">All locations</option>
            {LOCATIONS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
          <button className="btn btn-ghost" onClick={clearFilters}>
            Clear filters
          </button>
        </div>

        {loading ? (
          <p className="muted center">Loading services…</p>
        ) : services.length === 0 ? (
          <div className="empty card">
            <Icon name="search" size={40} />
            <h3>No services found</h3>
            <p className="muted">
              We couldn&apos;t find any services matching your search. Try a different
              keyword or clear the filters.
            </p>
            <button className="btn btn-primary" onClick={clearFilters}>
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <p className="muted result-count">
              Showing {services.length} service{services.length === 1 ? "" : "s"}
            </p>
            <div className="grid grid-3">
              {services.map((s) => (
                <ServiceCard key={s.id} service={s} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <Suspense
      fallback={
        <p className="muted center" style={{ padding: 40 }}>
          Loading…
        </p>
      }
    >
      <ServicesExplorer />
    </Suspense>
  );
}
