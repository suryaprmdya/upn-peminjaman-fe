import {NavLink} from "react-router-dom";
import {
  BoxIcon,
  BuildingIcon,
  CalendarIcon,
  HistoryIcon,
  HomeIcon,
} from "lucide-react";
import LayoutHeader from "../LayoutHeader";
import ApplicationLogo from "../ApplicationLogo";

const Sidebar = ({isOpen, role}) => {
  const menuItems = [
    // ===== MENU ADMIN =====
    {
      role: "admin",
      items: [
        {name: "Dashboard", link: "/admin/dashboard", icon: HomeIcon},
        {name: "Fasilitas", link: "/admin/facilities", icon: BuildingIcon},
        {name: "Peminjaman", link: "/admin/peminjaman", icon: BoxIcon},
        {name: "Riwayat", link: "/admin/riwayat", icon: HistoryIcon},
        {name: "Jadwal", link: "/admin/jadwal", icon: CalendarIcon},
      ],
    },

    // ===== MENU USER =====
    {
      role: "user",
      items: [
        {name: "Dashboard", link: "/user/dashboard", icon: HomeIcon},
        {name: "Riwayat", link: "/user/riwayat", icon: HistoryIcon},
      ],
    },
  ];

  // FILTER MENU BERDASARKAN ROLE
  const menus = menuItems.find((m) => m.role === role)?.items || [];

  return (
    <aside
      className={`bg-white fixed top-0 md:top-20 left-0 z-20 w-64 h-screen transition-transform 
      -translate-x-full lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      aria-label="Sidebar">
      <LayoutHeader className="p-2 md:hidden">
        <ApplicationLogo />
      </LayoutHeader>

      <div className="h-full px-3 py-4 overflow-y-auto">
        <ul className="space-y-2 font-medium">
          {menus.map((item) => (
            <li key={item.name} className="px-6">
              <NavLink
                to={item.link}
                className={({isActive}) =>
                  `flex items-center space-x-3 py-3 px-4 my-1 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-orange-500 text-white shadow-md"
                      : "text-gray-500 hover:bg-orange-50 hover:text-orange-600"
                  }`
                }>
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
