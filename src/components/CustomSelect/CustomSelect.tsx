import { useFormikContext } from "formik";
import { ChangeEvent, useEffect, useState } from "react";

type CustomSelectTypes = {
    options: Array<{
        id: number;
        name: string;
    }> | null;
}

interface FormValues {
    firstName: string;
    lastName: string;
    pokemons: [];
}

type ValueTypes = {
    id: number;
    name: string;
}

const CustomSelect = ({ options }: CustomSelectTypes) => {
    const [showOptions, setshowOptions] = useState(false);
    const [selectedValue, setSelectedValue] = useState<{
        id: number;
        name: string;
    } | null>(null);

    const { values, setFieldValue } = useFormikContext<FormValues>();

    useEffect(() => {
        if (!selectedValue && values.pokemons.length >= 4) {
            setshowOptions(false);
        }

        const handler = (e: MouseEvent) => {
            if (!(e.target as HTMLElement)?.closest('#select') && !(e.target as HTMLElement)?.closest('#btn')) {
                console.log(e.target);

                setshowOptions(false);
            }
        };
        window.addEventListener("click", handler);

        return () => {
            window.removeEventListener("click", handler)
        }
    }, [values, selectedValue]);

    useEffect(() => {
        if (selectedValue) {
            const exepted = values.pokemons;

            if (exepted.map((val: ValueTypes) => val.name).includes(selectedValue.name) && exepted.length <= 4) {
                const filtered = exepted.filter((val: ValueTypes) => val.id !== selectedValue.id);
                setFieldValue('pokemons', filtered);
                setSelectedValue(null);
                return;
            }

            if (exepted.length >= 4) {
                setSelectedValue(null);
                return;
            }

            const newValue = [...values['pokemons'], selectedValue];
            setFieldValue('pokemons', newValue);
            setSelectedValue(null);
        }
    }, [selectedValue])

    const handleInputClick = () => {
        if (!options?.length) return;

        setTimeout(() => {
            setshowOptions(!showOptions);
        }, 0);
    }

    const onOptionClick = (currentOption: {
        id: number;
        name: string;
    }) => {
        setSelectedValue(currentOption);
    };


    const capitalizeName = (name: string) => {
        return name[0].toUpperCase() + name.slice(1);
    }

    return (
        <div id="select" tabIndex={0} className="border-slate-400 focus:outline-none focus:border-purple-500 border-solid border-2 rounded relative">
            <div className="flex justify-between items-center p-3 cursor-pointer w-full h-full" onClick={handleInputClick}>
                {
                    options ?
                        (<>
                            <span className="text-xl text-slate-400">Select pokemons</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        </>) : (
                            <div className="flex justify-between w-full cursor-wait">
                                <span className="text-xl text-slate-400">Loading</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M12,23a9.63,9.63,0,0,1-8-9.5,9.51,9.51,0,0,1,6.79-9.1A1.66,1.66,0,0,0,12,2.81h0a1.67,1.67,0,0,0-1.94-1.64A11,11,0,0,0,12,23Z">
                                        <animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" />
                                    </path>
                                </svg>
                            </div>
                        )
                }
            </div>
            {showOptions && (
                <div className="absolute w-full z-50 left-0 top-full">
                    <div className="w-full max-h-52 overflow-auto">
                        {options?.map((option) => (
                            <div
                                key={option.id}
                                className={`text-center text-xl cursor-pointer px-6 py-4 bg-violet-100 border-b border-solid border-purple-400 hover:bg-violet-300 ${values.pokemons.map((val: ValueTypes) => val.name).includes(option.name) ? "text-orange-600 hover:text-orange-600" : " hover:text-white"}`}
                                onClick={() => onOptionClick(option)}
                            >
                                {capitalizeName(option.name)}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default CustomSelect;