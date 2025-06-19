import React from "react";
import { Plus, ChevronDown } from "lucide-react";

interface HeaderProps {
  onAddEventClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddEventClick }) => {
  const handleViewChange = (view: string) => {
    console.log(`Switched to ${view} view`);
    // Add view switching logic here
  };

  const handleUserMenuClick = () => {
    console.log("User menu clicked");
    // Add user menu logic here
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleViewChange("Weekly")}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
            >
              Weekly
            </button>
            <button
              onClick={() => handleViewChange("Monthly")}
              className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md font-medium"
            >
              Monthly
            </button>
            <button
              onClick={() => handleViewChange("Timeline")}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
            >
              Timeline
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={onAddEventClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            <Plus size={16} />
            <span className="font-medium">Add Event</span>
          </button>

          <div
            onClick={handleUserMenuClick}
            className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors"
          >
            {/* <img 
              src="https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop"
              alt="User avatar"
              className="w-8 h-8 rounded-full object-cover"
            /> */}
            <span className="text-sm font-medium text-gray-700">vignesh</span>
            <ChevronDown size={16} className="text-gray-500" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
