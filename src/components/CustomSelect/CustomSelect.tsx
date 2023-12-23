import { useFormikContext } from "formik";
import { ChangeEvent, useEffect, useState } from "react";

type CustomSelectTypes = {
    options: Array<{
        id: number;
        name: string;
        sprites: string;
    }> | null;
}

interface FormValues {
    firstName: string;
    lastName: string;
    pokemons: [];
}

interface ValueTypes {
    id: number;
    name: string;
    sprites: string;
}

const CustomSelect = ({ options }: CustomSelectTypes) => {
    const [showOptions, setshowOptions] = useState(false);
    const [selectedValue, setSelectedValue] = useState<ValueTypes | null>(null);
    const { values, setFieldValue } = useFormikContext<FormValues>();
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState(options);

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value;
        setSearchTerm(term);
    };

    const clearTerm = () => {
        setSearchTerm("");
    };

    useEffect(() => {
        const filteredResults = options?.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        ) || null;

        setSearchResults(filteredResults);
    }, [searchTerm]);

    useEffect(() => {
        if (!selectedValue && values.pokemons.length >= 4) {
            setshowOptions(false);
            setSearchTerm("");
        }

        const handler = (e: MouseEvent) => {
            if (!(e.target as HTMLElement)?.closest('#delete') && !(e.target as HTMLElement)?.closest('#select') && !(e.target as HTMLElement)?.closest('#btn')) {
                setshowOptions(false);
                setSearchTerm("");
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

    const handleInputClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!options?.length) return;
        if ((event.target as HTMLElement)?.closest('#delete')) return;

        setTimeout(() => {
            setshowOptions(!showOptions);
        }, 0);
    }

    const onOptionClick = (currentOption: ValueTypes) => {
        setSelectedValue(currentOption);
    };

    const capitalizeName = (name: string) => {
        return name[0].toUpperCase() + name.slice(1);
    }

    const renderedOptions = searchResults ?? options;

    return (
        <div id="select" tabIndex={0} className="border-slate-400 focus:outline-none focus:border-purple-500 border-solid border-2 rounded relative">
            <div className="flex justify-between items-center p-3 cursor-pointer w-full h-full" onClick={handleInputClick}>
                {
                    options ?
                        (<>
                            <span className="text-xl text-slate-400 flex gap-1">
                                {
                                    values.pokemons.length ? (
                                        values.pokemons.map((item: ValueTypes) => {
                                            return <span key={item.id} className="border p-1 text-xs rounded-lg gap-1 flex justify-between items-center">
                                                {capitalizeName(item.name)}
                                                <span className='flex justify-end cursor-default bg-gray-200 rounded' onClick={() => setFieldValue('pokemons', values.pokemons.filter((val: { id: number }) => val.id !== item.id))}>
                                                    <svg id="delete" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-4 h-4">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                    </svg>
                                                </span>
                                            </span>
                                        })
                                    ) : "Select pokemons"

                                }
                            </span>
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
                    <div className="flex justify-between items-center bg-gray-600 w-full border border-solid border-purple-400">
                        <div className="p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#fff" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </div>

                        <div className="w-full relative">
                            <input className="text-xl w-full p-2 placeholder:text-slate-400" placeholder="Type to find" value={searchTerm} onChange={handleSearch} />
                            {searchTerm && (
                                <span className='flex justify-end cursor-default absolute right-2 top-3 bg-gray-200 rounded' onClick={clearTerm}>
                                    <svg id="btn" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="w-full max-h-52 overflow-auto">
                        {renderedOptions?.map((option) => (
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