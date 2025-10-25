import Navbar from "@/app/components/Navbar";
import "../globals.css";

function UsersLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}

export default UsersLayout;