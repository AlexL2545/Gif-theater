exports.handler = async function (event) {
    const search = event.queryStringParameters?.q;

    if (!search || search.trim() === "") {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Missing search query" }),
        };
    }

    const apiKey = process.env.GIPHY_API_KEY;
    const encodedSearch = encodeURIComponent(search);
    const giphyURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodedSearch}`;

    const response = await fetch(giphyURL);
    const data = await response.json();

    return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };
};
