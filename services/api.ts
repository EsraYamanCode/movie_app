export const TMDB_CONFIG = {
    BASE_URL: "https://api.themoviedb.org/3",
    API_KEY: process.env.EXPO_PUBLIC_API_KEY,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_KEY}`,
    }
}

export const fetchMovies = async ({query}: {query: string}) => {
   // console.log("API KEY OKUNUYOR MU:", process.env.EXPO_PUBLIC_API_KEY);
    const endpoint = query
        ?`${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        :`${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;
    //console.log("ENDPOINT:", endpoint);
    //console.log("HEADERS:", TMDB_CONFIG.headers);

    const response = await fetch(endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.headers,
    });

    if(!response.ok) {
        //@ts-ignore
        throw new Error('Failed to fetch movies', response.statusText);
    }

    const data = await response.json();
    return data.results;
}

export const fetchMovieDetails = async (movieId: string): Promise<MovieDetails> => {
    try {
        const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`, {
            method: 'GET',
            headers: TMDB_CONFIG.headers,
        });

        if(!response.ok) throw new Error('Failed to fetch movie details');

        const data = await response.json();
        return data;

    } catch (error) {
        console.log(error);
        throw error;
    }
}









/* /discover/movie */
/* api okuma erişim jetonu;
eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzQ1MDgzYWZkMjZjNzRiMjU3MGI5ZmI3ODY2NzZlNyIsIm5iZiI6MTc2MzY0MDEwNS4yNjQsInN1YiI6IjY5MWYwMzI5NWNiZWM1YmNjMmMyY2U5NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LkPeFdK1HO3PiR26sbusahVfF5sf-k2kyzYJwMaz5GU */
/* api anahtarı;
c345083afd26c74b2570b9fb786676e7 */