"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import { CATEGORIES, LOCATIONS } from "@/lib/constants";

const emptyForm = {
  name: "",
  category: CATEGORIES[0].name,
  description: "",
  location: "",
  area: "Campus",
  timings: "",
  contact: "",
  facilities: "",
  mapLink: "",
  active: true,
  popular: false,
};

export default function Dashboard() {
  const router = useRouter();
  const [services, setServices] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null = add mode, object = edit mode
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    const [sRes, stRes] = await Promise.all([
      fetch("/api/services"),
      fetch("/api/stats"),
    ]);
    const sData = await sRes.json();
    const stData = await stRes.json();
    setServices(sData.services || []);
    setStats(stData.stats || null);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function startAdd() {
    setEditing(null);
    setForm(emptyForm);
    setMessage(null);
  }

  function startEdit(s) {
    setEditing(s);
    setForm({
      name: s.name,
      category: s.category,
      description: s.description || "",
      location: s.location || "",
      area: s.area || "Campus",
      timings: s.timings || "",
      contact: s.contact || "",
      facilities: Array.isArray(s.facilities) ? s.facilities.join(", ") : "",
      mapLink: s.mapLink || "",
      active: s.active !== false,
      popular: Boolean(s.popular),
    });
    setMessage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function save(e) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    const payload = {
      ...form,
      facilities: form.facilities
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean),
    };
    try {
      const url = editing ? `/api/services/${editing.id}` : "/api/services";
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage({ type: "error", text: data.error || "Save failed." });
      } else {
        setMessage({
          type: "success",
          text: editing ? "Service updated." : "Service added.",
        });
        setEditing(null);
        setForm(emptyForm);
        await load();
      }
    } catch {
      setMessage({ type: "error", text: "Network error." });
    } finally {
      setSaving(false);
    }
  }

  async function remove(s) {
    if (!confirm(`Delete "${s.name}"? This cannot be undone.`)) return;
    const res = await fetch(`/api/services/${s.id}`, { method: "DELETE" });
    if (res.ok) {
      setMessage({ type: "success", text: "Service deleted." });
      await load();
    } else {
      setMessage({ type: "error", text: "Delete failed." });
    }
  }

  async function toggleActive(s) {
    const res = await fetch(`/api/services/${s.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: s.active === false }),
    });
    if (res.ok) await load();
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin");
    router.refresh();
  }

  return (
    <section className="section">
      <div className="container">
        <div className="dash-head">
          <div>
            <h1>Admin Dashboard</h1>
            <p className="muted">Manage campus and hostel services.</p>
          </div>
          <button className="btn btn-outline" onClick={logout}>
            <Icon name="logout" size={18} /> Logout
          </button>
        </div>

        {stats && (
          <div className="grid grid-4 stats-row">
            <div className="card stat">
              <h3>{stats.total}</h3>
              <span className="muted">Total services</span>
            </div>
            <div className="card stat">
              <h3>{stats.categories}</h3>
              <span className="muted">Categories</span>
            </div>
            <div className="card stat">
              <h3>{stats.active}</h3>
              <span className="muted">Active</span>
            </div>
            <div className="card stat">
              <h3>{stats.total - stats.active}</h3>
              <span className="muted">Inactive</span>
            </div>
          </div>
        )}

        {message && (
          <div className={`alert alert-${message.type}`} role="alert">
            {message.text}
          </div>
        )}

        <div className="grid grid-2 dash-grid">
          {/* Form */}
          <div className="card dash-form">
            <h2>{editing ? "Edit Service" : "Add New Service"}</h2>
            <form onSubmit={save} noValidate>
              <div className="field">
                <label>Service name</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                />
              </div>
              <div className="grid grid-2">
                <div className="field">
                  <label>Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => update("category", e.target.value)}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label>Location area</label>
                  <select
                    value={form.area}
                    onChange={(e) => update("area", e.target.value)}
                  >
                    {LOCATIONS.map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="field">
                <label>Description</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                />
              </div>
              <div className="field">
                <label>Building / location</label>
                <input
                  value={form.location}
                  onChange={(e) => update("location", e.target.value)}
                />
              </div>
              <div className="grid grid-2">
                <div className="field">
                  <label>Timings</label>
                  <input
                    value={form.timings}
                    onChange={(e) => update("timings", e.target.value)}
                    placeholder="8:00 AM – 8:00 PM"
                  />
                </div>
                <div className="field">
                  <label>Contact</label>
                  <input
                    value={form.contact}
                    onChange={(e) => update("contact", e.target.value)}
                    placeholder="+91 …"
                  />
                </div>
              </div>
              <div className="field">
                <label>Facilities (comma separated)</label>
                <input
                  value={form.facilities}
                  onChange={(e) => update("facilities", e.target.value)}
                  placeholder="Reading hall, Wi-Fi, Study tables"
                />
              </div>
              <div className="field">
                <label>Map link (optional)</label>
                <input
                  value={form.mapLink}
                  onChange={(e) => update("mapLink", e.target.value)}
                  placeholder="https://www.openstreetmap.org/search?query=…"
                />
              </div>
              <div className="field check-row">
                <label className="check-label">
                  <input
                    type="checkbox"
                    checked={form.active}
                    onChange={(e) => update("active", e.target.checked)}
                  />{" "}
                  Active
                </label>
                <label className="check-label">
                  <input
                    type="checkbox"
                    checked={form.popular}
                    onChange={(e) => update("popular", e.target.checked)}
                  />{" "}
                  Popular
                </label>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? "Saving…" : editing ? "Update Service" : "Add Service"}
                </button>
                {editing && (
                  <button type="button" className="btn btn-ghost" onClick={startAdd}>
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* List */}
          <div className="card dash-list">
            <h2>All Services</h2>
            {loading ? (
              <p className="muted">Loading…</p>
            ) : (
              <div className="dash-items">
                {services.map((s) => (
                  <div key={s.id} className="dash-item">
                    <div className="dash-item-info">
                      <strong>{s.name}</strong>
                      <span className="muted">
                        {s.category} · {s.area}
                      </span>
                    </div>
                    <div className="dash-item-actions">
                      <button
                        className="icon-btn"
                        onClick={() => toggleActive(s)}
                        title={s.active === false ? "Activate" : "Deactivate"}
                      >
                        <Icon name={s.active === false ? "warning" : "check"} size={18} />
                      </button>
                      <button
                        className="icon-btn"
                        onClick={() => startEdit(s)}
                        title="Edit"
                      >
                        <Icon name="edit" size={18} />
                      </button>
                      <button
                        className="icon-btn danger"
                        onClick={() => remove(s)}
                        title="Delete"
                      >
                        <Icon name="trash" size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}