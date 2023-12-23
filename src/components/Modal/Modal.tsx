import { MouseEventHandler, useState } from "react";
import EntryForm from "../Form/EntryForm";
import Results from "../Results/Results";

interface ModalProps {
    onClose: MouseEventHandler<HTMLButtonElement>;
}

type Pokemon = Array<{
    id: number;
    name: string;
    sprites: string;
}>;

interface DataTypes {
    firstName: string;
    lastName: string;
    pokemons: Pokemon;
}

function Modal({ onClose }: ModalProps) {
    const [data, setData] = useState<DataTypes | null>(null);

    const getParticipantData = (data: DataTypes): void => {
        setData(data);
    }    

    return (
        <div className="w-2/5 p-8 bg-white shadow-lg">
            <div className="flex justify-between align-center mb-4">
                <h2 className="text-2xl">{data?.firstName ? `Congratulations ${data.firstName}!`: "Application form"}</h2>
                <button onClick={onClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            {
                data?.firstName ? (
                    <Results result={data.pokemons} />
                ) : (
                    <EntryForm onClose={onClose} onGetData={getParticipantData} />
                )
            }

        </div>
    );
}

export default Modal;