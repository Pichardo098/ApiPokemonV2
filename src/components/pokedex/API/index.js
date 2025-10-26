const API_URL = import.meta.env.VITE_API_BASE_URL;

export const getDetailPokemon = async (name) => {
    const response = await fetch(`${API_URL}pokemon/details/?query=${name}`, {
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

export const postAddFavorite = async (data) => {
    const response = await fetch(`${API_URL}favorites`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            pokemon: data.pokemon,
            userId: data.userId
        })
    });

    const responseData = await response.json();

    return {
        response: responseData,
        status: response.status
    };
};
