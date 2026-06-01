import "dotenv/config";

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

function searchMovies({ title, year, type, page = 1 }) {
    const url = buildUrl({ s: title, y: year, type: type, page: page });
    return url;
}
function getMovieUrlById(id) {
    const url = buildUrl({ i: id });
    return url;
}

export { searchMovies, getMovieUrlById };
