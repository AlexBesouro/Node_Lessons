import "dotenv/config";

const popularKeywords = [
    "space",
    "world",
    "star",
    "man",
    "love",
    "dark",
    "king",
    "dead",
    "night",
    "last",
    "black",
    "war",
    "time",
    "agent",
];
const randomKeyword = popularKeywords[Math.floor(Math.random() * popularKeywords.length)];

function buildUrl(params = {}) {
    const url = new URL(`${process.env.BASE_URL}`);
    url.searchParams.append("apikey", `${process.env.API_KEY}`); // searchParams - this is a built-in method to handle query parameters in URLs

    Object.keys(params).forEach((key) => {
        if (params[key] !== undefined && params[key] !== null) {
            url.searchParams.append(key, params[key]);
        }
    });

    return url.toString();
}

function searchMovies({ title = randomKeyword, year, type, page = 1 }) {
    const url = buildUrl({ s: title, y: year, type: type, page: page });
    return url;
}
// console.log(searchMovies());

// async function getMovieDetails(id) {
//     const url = buildOmdbUrl({ i: id });
//     const response = await fetch(url);
//     return response.json();
// }

export { searchMovies };
