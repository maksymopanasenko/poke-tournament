type Pokemon = {
    id: number;
    name: string;
    sprites: string;
};

interface SpritesHolder {
    choosedPokemons: Pokemon[];
}

function SpitesHolder({ choosedPokemons }: SpritesHolder) {
    return (
        <div className='flex gap-2 w-full'>
            {
                choosedPokemons.map((item) => {                    
                    return (
                        <div key={item.id} className='border-2 p-1 text-center rounded w-13 h-13 sm:w-16 sm:h-16 relative' title={item.name}>
                            <img key={item?.id} src={item?.sprites} alt='pokemon' />
                        </div>
                    )
                })
            }
        </div>
    );
}

export default SpitesHolder;