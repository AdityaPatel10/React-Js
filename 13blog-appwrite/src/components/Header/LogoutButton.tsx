import { useDispatch } from "react-redux";
import { logout } from "../../features/authSlice";
import authService from "../../appwrite/auth";

function LogoutButton() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      authService.logout().then(() => {
        dispatch(logout());
      });
    }
  };

  return (
    <button
      className="inline-block px-6 py-3 md:py-4 hover:cursor-pointer hover:text-[19px] 
                 after:content-[''] after:block after:w-0 after:h-[2px] after:bg-gray-600 
                 after:transition-all after:duration-300 hover:after:w-full 
                 relative z-10 font-sans text-lg font-semibold tracking-wider 
                 text-black uppercase transition-all duration-200 
                 hover:bg-gray-200 rounded-md md:rounded-none"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutButton;
