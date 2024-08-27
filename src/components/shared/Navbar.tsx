import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  BanknotesIcon,
  Cog6ToothIcon,
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
  return (
    <nav className=" w-screen fixed md:relative bottom-0 border-t py-4 md:w-60 md:min-h-dvh md:border-t-0 md:border-r border-[#87888c] md:py-4 md:px-8">
      <h1 className="font-bold pl-4 text-custom-white text-xl hidden md:block">
        FinCompass
      </h1>
      <ul className="flex justify-around text-[#87888c] md:flex-col md:gap-4 md:mt-8">
        {NAV_ITEMS.map((item, index) => {
          const Icon = item.icon;
          return (
            <NavLink
              to={item.path}
              key={index}
              className={({ isActive }) =>
                `px-4 py-2 flex flex-col md:flex-row items-center md:gap-2 hover:bg-[#87888c] hover:text-[#1f1f1f] rounded-full md:rounded-sm ${
                  isActive
                    ? "bg-custom-white text-[#1f1f1f] hover:!bg-custom-white"
                    : ""
                }`
              }
            >
              <Icon className="size-6" />
              <span className="hidden md:block">{item.label}</span>
            </NavLink>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
