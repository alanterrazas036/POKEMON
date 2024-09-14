const axios = require('axios');

const BASE_URL = 'https://pokeapi.co/api/v2';

async function getPokemonsByType(type) {
    try {
        const response = await axios.get(`${BASE_URL}/type/${type}`);
        return response.data.pokemon.map(p => p.pokemon.name);
    } catch (error) {
        console.error(`Error fetching Pokémon by type: ${error.message}`);
    }
}

async function getPokemonByName(name) {
    try {
        const response = await axios.get(`${BASE_URL}/pokemon/${name}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching Pokémon by name: ${error.message}`);
    }
}

async function displayPokemonInfo(name) {
    try {
        const pokemon = await getPokemonByName(name);
        if (pokemon) {
            console.log(`Nombre: ${pokemon.name}`);
            console.log(`Altura: ${pokemon.height}`);
            console.log(`Peso: ${pokemon.weight}`);
            console.log(`Habilidades: ${pokemon.abilities.map(a => a.ability.name).join(', ')}`);
            console.log(`Tipo(s): ${pokemon.types.map(t => t.type.name).join(', ')}`);
        }
    } catch (error) {
        console.error(`Error displaying Pokémon info: ${error.message}`);
    }
}


(async () => {
    const type = 'fire'; 
    const name = 'charizard'; 

    console.log('Filtrar Pokémon por tipo (fire):');
    const firePokemons = await getPokemonsByType(type);
    console.log(firePokemons);

    console.log('\nFiltrar Pokémon por nombre (charizard):');
    const charizard = await getPokemonByName(name);
    console.log(charizard);

    console.log('\nMostrar información completa de un Pokémon (pikachu):');
    await displayPokemonInfo('pikachu');
})();
