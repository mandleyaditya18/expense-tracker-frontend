import { NavLink, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  BanknotesIcon,
  Cog6ToothIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";

const NAV_ITEMS = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: HomeIcon,
  },
  { label: "Expenses", path: "/expenses", icon: BanknotesIcon },
  { label: "Settings", path: "/settings", icon: Cog6ToothIcon },
];

const Navbar = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="w-screen fixed md:relative bottom-0 border-t py-4 bg-white z-10 md:z-0 md:w-60 md:min-h-dvh md:border-t-0 md:border-r border-[#87888c] md:py-4 md:px-8 md:flex md:flex-col">
      <h1 className="font-bold pl-4 text-xl hidden md:block">FinCompass</h1>
      <ul className="flex justify-around text-[#87888c] md:flex-col md:gap-4 md:pt-8 md:h-full">
        {NAV_ITEMS.map((item, index) => {
          const Icon = item.icon;
          return (
            <NavLink
              to={item.path}
              key={index}
              className={({ isActive }) =>
                `px-4 py-2 flex flex-col md:flex-row items-center md:gap-2 hover:bg-[#87888c] hover:text-white rounded-full md:rounded-sm ${
                  isActive ? "bg-primary text-white hover:!bg-primary" : ""
                }`
              }
            >
              <Icon className="size-6" />
              <span className="hidden md:block">{item.label}</span>
            </NavLink>
          );
        })}
        <li
          className="px-4 py-2 flex flex-col md:flex-row items-center md:gap-2 md:mt-auto hover:bg-[#87888c] hover:text-white rounded-full md:rounded-sm cursor-pointer"
          onClick={logoutHandler}
        >
          <ArrowRightStartOnRectangleIcon className="size-6" />
          <span className="hidden md:block">Logout</span>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
