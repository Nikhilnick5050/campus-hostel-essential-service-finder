import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Campus & Hostel Essential Services Finder",
  description:
    "Find every essential service on your campus — mess, library, medical, transport, Wi-Fi and more. Find. Access. Feel at Home.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}