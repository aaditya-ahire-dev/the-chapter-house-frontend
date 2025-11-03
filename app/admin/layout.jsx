import AdminNavbar from "@/app/components/AdminNavbar";
import "../globals.css";
import AdminLayoutWrapper from "./AdminLayoutWrapper";

export default function AdminLayout({ children }) {
  return (
    <AdminLayoutWrapper>
      <AdminNavbar />
      <main>{children}</main>
    </AdminLayoutWrapper>
  );
}