import { capitalizeName } from "../../helpers/capitalize";

interface Pokemon {
    id: number;
    name: string;
    sprites: string;
}

interface ResultsProps {
    result: Pokemon[];
}

function Results({ result }: ResultsProps) {
    return (
        <div>
            <p>You've assembled a powerhouse team of Pokémon!<br/> Get ready to unleash their strengths and dominate the upcoming tournament. May your strategies be sharp, and may victory be yours! Good luck, Trainer!</p>
            <h4 className="text-center text-2xl font-medium text-purple-500 my-4">Your Team</h4>

            <ul className="flex justify-between">
                {result.map(pokemon => {
                    return (
                        <li key={pokemon.id} className="text-center bg-gray-800 text-white p-2 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center justify-center w-28">
                            <img
                                src={pokemon.sprites}
                                alt={pokemon.name}
                                className="w-16 h-16 object-cover mb-2 rounded-full"
                            />
                            <span className="block text-xs font-semibold">{capitalizeName(pokemon.name)}</span>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default Results;