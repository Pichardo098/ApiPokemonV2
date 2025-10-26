const API_URL = import.meta.env.VITE_API_BASE_URL;

export const login = async (username, password) => {
    const response = await fetch(`${API_URL}auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    });

    const responseData = await response.json();

    return {
        response: responseData,
        status: response.status
    };
};

export const register = async (username, password) => {
    const response = await fetch(`${API_URL}auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    });

    const responseData = await response.json();

    return {
        response: responseData,
        status: response.status
    };
};

export const getCatalogTypes = async () => {
    const response = await fetch(`${API_URL}pokemon/catalog/types`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const responseData = await response.json();

    return {
        response: responseData,
        status: response.status
    };
};

export const getPokemons = async () => {
    const response = await fetch(`${API_URL}pokemon/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const responseData = await response.json();

    return {
        response: responseData,
        status: response.status
    };
};

export const getPokemonsByType = async (type) => {
    const response = await fetch(`${API_URL}pokemon/type/${type}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const responseData = await response.json();

    return {
        response: responseData,
        status: response.status
    };
};

export const getPokemonSpecies = async (name) => {
    const response = await fetch(`${API_URL}pokemon/specie/${name}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const responseData = await response.json();

    return {
        response: responseData,
        status: response.status
    };
};

export const getPokemonEvolution = async (id) => {
    const response = await fetch(`${API_URL}pokemon/chain/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const responseData = await response.json();

    return {
        response: responseData,
        status: response.status
    };
};

export const getFavoritesPokemons = async (userId) => {
    const response = await fetch(`${API_URL}favorites/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const responseData = await response.json();

    return {
        response: responseData,
        status: response.status
    };
};
