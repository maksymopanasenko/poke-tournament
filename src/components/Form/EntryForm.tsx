import { MouseEventHandler, useEffect, useState } from 'react';
import fetchData from '../../helpers/fetchData';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import CustomSelect from '../CustomSelect/CustomSelect';
import formValidationSchema from '../../validation/formValidationSchema';
import SpitesHolder from '../SpritesHolder/SpritesHolder';
import Button from '../Button/Button';

type Pokemon = Array<{
    id: number;
    name: string;
    sprites: string;
}>;

interface InitialValues {
    firstName: string;
    lastName: string;
    pokemons: Pokemon;
}

interface ModalProps {
    onClose: MouseEventHandler<HTMLButtonElement>;
    onGetData: (data: InitialValues) => void;
}

function EntryForm({ onClose, onGetData }: ModalProps) {
    const [data, setData] = useState<Pokemon | null>(null);

    const initialValues: InitialValues = {
        firstName: '',
        lastName: '',
        pokemons: []
    }
    useEffect(() => {
        const getPokemonData = async () => {
            try {
                const result = await fetchData('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
                const chunkSize = 50;
                const pokemons = [];

                for (let i = 0; i < result.results.length; i += chunkSize) {
                    const chunk = result.results.slice(i, i + chunkSize);

                    const chunkedPokemons = await Promise.all(
                        chunk.map(async ({ url }: { url: string }) => {
                            try {
                                return await fetchData(url);
                            } catch (error) {
                                console.error(`Failed to fetch Pokemon: ${url}`, error);
                                return null;
                            }
                        })
                    );

                    pokemons.push(...chunkedPokemons.filter(pokemon => pokemon !== null));
                }

                const pokemonsSets = pokemons.map(pokemon => {
                    return { name: pokemon.name, id: pokemon.id, sprites: pokemon?.sprites.front_default };
                });

                setData(pokemonsSets);
            } catch (error) {
                console.error('Failed to fetch Pokemon data:', error);
            }
        };

        getPokemonData();
    }, []);


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={formValidationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                onGetData(values)
                setSubmitting(false);
                resetForm();
            }}
        >
            {({ isSubmitting, values }) => (
                <Form className="flex flex-col gap-2 w-full" >
                    <div className="form-group flex flex-col">
                        <h5>Name:</h5>
                        <Field type="text" className="border-slate-400 border-solid border text-xl rounded-lg p-3 my-2 focus:outline-none focus:border-purple-500" name="firstName" placeholder="Your name" />
                        <ErrorMessage className='text-rose-500' name="firstName" component="div" />
                    </div>
                    <div className="form-group flex flex-col">
                        <h5>Lastname:</h5>
                        <Field type="text" className="border-slate-400 border-solid border text-xl rounded-lg p-3 my-2 focus:outline-none focus:border-purple-500" name="lastName" placeholder="Your lastname" />
                        <ErrorMessage className='text-rose-500' name="lastName" component="div" />
                    </div>
                    <div className="form-group flex flex-col">
                        <h5>Available pokemons:</h5>
                        <CustomSelect options={data} />
                        <ErrorMessage className='text-rose-500' name="pokemons" component="div" />
                    </div>

                    <div className='flex flex-wrap justify-center sm:justify-between gap-4 items-center'>
                        <div className='mb-2'>
                            <SpitesHolder choosedPokemons={values?.pokemons} />
                        </div>
                        <div className='flex justify-center gap-1'>
                            <Button text='Cancel' type="button" onClick={onClose} classes='text-xl px-2 py-0.5 rounded transition duration-300 ease-in-out border-2 border-transparent hover:border-purple-600  focus:outline-none focus:ring-2 focus:ring-purple-500' />
                            <Button text='Save' type="submit" isSubmitting={isSubmitting} classes='bg-purple-500 text-xl text-white px-4 py-0.5 rounded transition duration-300 ease-in-out hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500' />
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default EntryForm;
