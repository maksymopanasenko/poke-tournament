import { useEffect, useState } from 'react';
import fetchData from '../../helpers/fetchData';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import CustomSelect from '../CustomSelect/CustomSelect';
import formValidationSchema from '../../validation/formValidationSchema';


type CustomSelectTypes = Array<{
    id: number;
    name: string;
    sprites: string[];
}>;

function EntryForm() {
    const [data, setData] = useState<CustomSelectTypes | null>(null);

    useEffect(() => {
        const getPokemonData = async () => {
            const result = await fetchData('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
            const chunkSize = 50;
            const pokemons = [];

            for (let i = 0; i < result.results.length; i += chunkSize) {
                const chunk = result.results.slice(i, i + chunkSize);

                const chunkedPokemons = await Promise.all(
                    chunk.map(async ({ url }: { url: string }) => {
                        return await fetchData(url);
                    })
                );

                pokemons.push(...chunkedPokemons);
            }

            const pokemonsSets = pokemons.map(pokemon => {
                const spriteUrls = Object.entries(pokemon?.sprites);
                const validSprites: string[] = spriteUrls.filter(([key, value]) => value && typeof value === 'string' && !value.includes('female') && !value.includes('shiny')).map(([key, value]) => value as string).reverse();

                return { name: pokemon.name, id: pokemon.id, sprites: validSprites };
            });

            setData(pokemonsSets);
        };

        getPokemonData();
    }, []);

    return (
        <Formik
            initialValues={{ firstName: '', lastName: '', pokemons: [] }}
            validationSchema={formValidationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                    resetForm();
                }, 400);
            }}
        >
            {({ isSubmitting }) => (
                <Form className="flex flex-col gap-2 w-full" >
                    <div className="form-group flex flex-col">
                        <Field type="text" className="border-slate-400 border-solid border-2 text-xl rounded p-3 focus:outline-none focus:border-purple-500" name="firstName" placeholder="Your name" />
                        <ErrorMessage className='text-center text-rose-500' name="firstName" component="div" />
                    </div>
                    <div className="form-group flex flex-col">
                        <Field type="text" className="border-slate-400 border-solid border-2 text-xl rounded p-3 focus:outline-none focus:border-purple-500" name="lastName" placeholder="Your lastname" />
                        <ErrorMessage className='text-center text-rose-500' name="lastName" component="div" />
                    </div>
                    <div className="form-group flex flex-col">
                        <CustomSelect options={data}/>
                        <ErrorMessage className='text-center text-rose-500' name="pokemons" component="div" />
                    </div>
                    <div className='flex gap-1'>
                        <button type="button" className="text-xl px-2 py-0.5 rounded transition duration-300 ease-in-out border-2 border-transparent hover:border-purple-600  focus:outline-none focus:ring-2 focus:ring-purple-500">
                            Cancel
                        </button>
                        <button type="submit" disabled={isSubmitting} className="bg-purple-500 text-xl text-white px-4 py-0.5 rounded transition duration-300 ease-in-out hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500">
                            Save
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default EntryForm;
