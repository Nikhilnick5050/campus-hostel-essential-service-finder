import Link from "next/link";
import Icon from "@/components/Icon";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container narrow center">
        <div className="empty card">
          <Icon name="search" size={48} />
          <h1>Page not found</h1>
          <p className="muted">
            The page or service you are looking for does not exist.
          </p>
          <Link href="/" className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}