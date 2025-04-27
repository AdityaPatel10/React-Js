import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Container, Logo, LogoutButton } from "../index";
import { NavItem, RootState } from "../../types/authStatusType";
import { Menu, X } from "lucide-react"; // Icons for menu toggle

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu
  const authStatus = useSelector((state: RootState) => state.auth.status);
  const navigate = useNavigate();

  const navItems: NavItem[] = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <header className="py-3 shadow-md bg-[#F9F6EE] sticky top-0 left-0 z-50 w-full">
      <Container>
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="mr-4">
            <Logo width="70px" />
          </Link>

          {/* Desktop Menu (Hidden on Mobile) */}
          <ul className="hidden md:flex gap-4">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="px-6 py-4 hover:cursor-pointer hover:text-[19px] after:content-[''] after:block after:w-0 after:h-[2px] after:bg-gray-600 after:transition-all after:duration-300 hover:after:w-full relative z-10 font-sans text-lg font-semibold tracking-wider text-black uppercase"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutButton />
              </li>
            )}
          </ul>

          {/* Mobile Menu Toggle Button */}
          <button
            className="md:hidden p-2 z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 right-0 h-full w-2/3 bg-[#F9F6EE] shadow-md transform ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out z-50 p-6`}
        >
          <button
            className="absolute top-4 right-4"
            onClick={() => setIsMenuOpen(false)}
          >
            <X size={28} />
          </button>

          <ul className="flex flex-col mt-12 gap-6 text-lg font-semibold text-black">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => {
                      navigate(item.slug);
                      setIsMenuOpen(false); // Close menu on navigation
                    }}
                    className="block w-full text-left py-2 hover:text-gray-700"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutButton />
              </li>
            )}
          </ul>
        </div>
      </Container>
    </header>
  );
}

export default Header;
