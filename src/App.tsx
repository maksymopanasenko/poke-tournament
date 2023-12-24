import { useState } from 'react';
import Modal from './components/Modal/Modal';
import Intro from './components/Intro/Intro';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(io => !io);
  }

  return (
    <main className="min-h-screen overflow-auto p-4 w-screen flex justify-center items-center bg-gradient-to-r from-purple-200 via-sky-200 to-green-200">
      {
        isOpen ? (
          <Modal onClose={handleOpenModal} />
        ) : (
          <Intro onOpen={handleOpenModal}/>
        )
      }
    </main>
  )
}

export default App;
