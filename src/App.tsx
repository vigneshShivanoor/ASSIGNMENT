import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Calendar from './components/Calendar';
import AddEventModal from './components/AddEventModal';

function App() {
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);

  const handleAddEventClick = () => {
    setIsAddEventModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Header onAddEventClick={handleAddEventClick} />
        
        <main className="flex-1 p-6">
          <Calendar />
        </main>
      </div>

      <AddEventModal
        isOpen={isAddEventModalOpen}
        onClose={() => setIsAddEventModalOpen(false)}
        onAddEvent={() => {}} // This will be handled by the Calendar component
        selectedDate=""
      />
    </div>
  );
}

export default App;