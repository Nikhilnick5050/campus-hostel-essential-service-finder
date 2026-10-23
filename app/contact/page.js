"use client";

import { useState } from "react";
import Icon from "@/components/Icon";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function submit(e) {
    e.preventDefault();
    setStatus(null);
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus({ type: "error", text: data.error || "Something went wrong." });
      } else {
        setStatus({
          type: "success",
          text: "Thank you! Your message was received (demonstration mode — no email was actually sent).",
        });
        setForm({ name: "", email: "", subject: "", message: "" });
      }
    } catch {
      setStatus({ type: "error", text: "Network error. Please try again." });
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="section">
      <div className="container narrow">
        <div className="section-head">
          <h1>Contact / Help</h1>
          <p>Have a question or a suggestion? Send us a message.</p>
        </div>

        <div className="card contact-form-card">
          {status && (
            <div className={`alert alert-${status.type}`} role="alert">
              {status.text}
            </div>
          )}
          <form onSubmit={submit} noValidate>
            <div className="grid grid-2">
              <div className="field">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  required
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Your name"
                />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="subject">Subject</label>
              <input
                id="subject"
                required
                value={form.subject}
                onChange={(e) => update("subject", e.target.value)}
                placeholder="How can we help?"
              />
            </div>
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                placeholder="Write your message…"
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={sending}>
              {sending ? "Sending…" : "Send Message"}
            </button>
          </form>
          <p className="muted demo-note">
            <Icon name="warning" size={16} /> Demonstration mode: this form does not send
            a real email.
          </p>
        </div>
      </div>
    </section>
  );
}