import { useEffect, useState } from 'react';
import fetchData from '../../helpers/fetchData';


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

    return <div>Form</div>
}

export default EntryForm;
