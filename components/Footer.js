import Link from "next/link";
import Icon from "@/components/Icon";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="brand brand-footer">
            <span className="brand-mark">
              <Icon name="compass" size={20} />
            </span>
            <span className="brand-text">
              Campus<span>Finder</span>
            </span>
          </div>
          <p className="muted">
            Find. Access. Feel at Home. Your campus and hostel guide — all in one place.
          </p>
        </div>

        <div>
          <h4>Quick Links</h4>
          <Link href="/services">Explore Services</Link>
          <Link href="/map">Campus Map</Link>
          <Link href="/about">About Project</Link>
          <Link href="/contact">Contact / Help</Link>
        </div>

        <div>
          <h4>Categories</h4>
          <Link href="/services?category=Mess%20%26%20Food">Mess & Food</Link>
          <Link href="/services?category=Library">Library</Link>
          <Link href="/services?category=Medical%20Support">Medical Support</Link>
          <Link href="/services?category=Transport">Transport</Link>
        </div>

        <div>
          <h4>Contact</h4>
          <p className="muted">
            <Icon name="mail" size={16} /> help@campusfinder.demo
          </p>
          <p className="muted">
            <Icon name="phone" size={16} /> +91 90000 00000 (demo)
          </p>
          <p className="muted">
            <Icon name="map-pin" size={16} /> College Campus (demo)
          </p>
        </div>
      </div>
      <div className="container footer-bottom muted">
        © {new Date().getFullYear()} Campus & Hostel Essential Services Finder — college project demo.
      </div>
    </footer>
  );
}