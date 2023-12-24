import { MouseEventHandler } from "react";
import Button from "../Button/Button";

interface ModalProps {
    onOpen: MouseEventHandler<HTMLButtonElement>;
}

function Intro({ onOpen }: ModalProps) {
    return (
        <div className='w-full sm:w-1/2 2xl:w-1/4 text-center bg-violet-300 p-4 rounded-md shadow-lg'>
            <h2 className='text-md md:text-xl mb-4 font-bold w-3/4 mx-auto'>
                🔥🚀 Attention Trainers: Unleash Your Inner Fire at the "Pokémon Showdown Showdown!" 🚀🔥
            </h2>
            <p className='text-sm md:text-base mb-2'>
                Get ready to feel the heat as we gear up for the most intense Pokémon Tournament of the century! The battleground awaits, and we're calling on all trainers to step up, show off your skills, and dominate in the ultimate "Pokémon Showdown Showdown"!
            </p>
            <p className='text-sm md:text-base'>
                🔊 The call to action is clear: JOIN NOW or forever watch from the sidelines! Gather your Pokémon dream team, ignite your passion, and prepare for a clash that will be talked about for ages!
            </p>
            <Button text='Join!' type='button' onClick={onOpen} classes='bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-4' />
        </div>
    );
}

export default Intro;