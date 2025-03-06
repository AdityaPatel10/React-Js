import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {Container, Logo, LogoutButton} from "../index";
import { NavItem, RootState } from "../../types/authStatusType";

function Header() {
  const authStatus = useSelector((state : RootState) => state.auth.status);
  const navigate = useNavigate();
  const navItems : NavItem[] = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];
  return (
    <header className="py-3 shadow-md bg-[#F9F6EE] sticky top-0 left-0">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <ul className="flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-block px-6 py-4 hover:bg-blue-100 rounded-full relative z-10 font-sans text-lg font-semibold tracking-wider text-black uppercase transition-all duration-300"
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
        </nav>
      </Container>
    </header>
  );
}

export default Header;
