import React from "react";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Calendar,
  Briefcase,
  Activity,
  User,
} from "lucide-react";

interface MenuItem {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

interface MenuSection {
  title?: string;
  items: MenuItem[];
}

const Sidebar: React.FC = () => {
  const handleMenuClick = (label: string) => {
    console.log(`Clicked on ${label}`);
    // Add navigation logic here
  };

  const menuSections: MenuSection[] = [
    {
      items: [
        {
          icon: LayoutDashboard,
          label: "Dashboard",
          onClick: () => handleMenuClick("Dashboard"),
        },
        {
          icon: Users,
          label: "Accounts",
          onClick: () => handleMenuClick("Accounts"),
        },
      ],
    },
    {
      title: "Leads",
      items: [
        {
          icon: UserCheck,
          label: "Contacts",
          onClick: () => handleMenuClick("Contacts"),
        },
        {
          icon: Users,
          label: "Leads",
          onClick: () => handleMenuClick("Leads"),
        },
        {
          icon: Calendar,
          label: "Calendar",
          active: true,
          onClick: () => handleMenuClick("Calendar"),
        },
      ],
    },
    {
      title: "Cases",
      items: [
        {
          icon: Briefcase,
          label: "Cases",
          onClick: () => handleMenuClick("Cases"),
        },
        {
          icon: Activity,
          label: "Activities",
          onClick: () => handleMenuClick("Activities"),
        },
        {
          icon: User,
          label: "Users",
          onClick: () => handleMenuClick("Users"),
        },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-white h-full border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <div className="flex items-center space-x-3 cursor-pointer">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
          <span className="text-xl font-bold text-gray-900">CRMHUB</span>
        </div>
      </div>

      <nav className="flex-1 px-4 pb-4">
        {menuSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-8">
            {section.title && (
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
                {section.title}
              </h3>
            )}
            <ul className="space-y-1">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <button
                    onClick={item.onClick}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 text-left ${
                      item.active
                        ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <item.icon
                      size={18}
                      className={`mr-3 ${
                        item.active ? "text-blue-700" : "text-gray-500"
                      }`}
                    />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
