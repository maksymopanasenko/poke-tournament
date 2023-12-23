import { MouseEventHandler } from "react";
import EntryForm from "../Form/EntryForm";

interface ModalProps {
    onClose: MouseEventHandler<HTMLButtonElement>;
}

function Modal({ onClose }: ModalProps) {
    return (
        <div className="w-2/5 p-8 bg-white shadow-lg">
            <div className="flex justify-between align-center mb-4">
                <h2 className="text-2xl">Application form</h2>
                <button onClick={onClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <EntryForm onClose={onClose} />
        </div>
    );
}

export default Modal;