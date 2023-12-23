import { useState } from 'react';
import Modal from './components/Modal/Modal';
import Button from './components/Button/Button';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(io => !io);
  }

  return (
    <main className="h-screen overflow-auto py-4 w-screen flex justify-center items-center bg-gradient-to-r from-purple-200 via-sky-200 to-green-200">
      {
        isOpen ? (
          <Modal onClose={handleOpenModal} />
        ) : (
          <div className='text-center w-1/2 bg-violet-300 p-4 rounded-md shadow-lg'>
            <h2 className='text-xl mb-4 font-bold w-3/4 mx-auto'>
              🔥🚀 Attention Trainers: Unleash Your Inner Fire at the "Pokémon Showdown Showdown!" 🚀🔥
            </h2>
            <p className='mb-2'>
              Get ready to feel the heat as we gear up for the most intense Pokémon Tournament of the century! The battleground awaits, and we're calling on all trainers to step up, show off your skills, and dominate in the ultimate "Pokémon Showdown Showdown"!
            </p>
            <p>
              🔊 The call to action is clear: JOIN NOW or forever watch from the sidelines! Gather your Pokémon dream team, ignite your passion, and prepare for a clash that will be talked about for ages!
            </p>
            <Button text='Join!' type='button' onClick={handleOpenModal} classes='bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-4' />
          </div>
        )
      }
    </main>
  )
}

export default App;
