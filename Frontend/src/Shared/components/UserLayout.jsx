import Navbar from "./Navbar";
import Footer from "./Footer";
import useScrollToTop from "../hooks/useScrollToTop";

const UserLayout = ({ children }) => {
  useScrollToTop();

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default UserLayout;