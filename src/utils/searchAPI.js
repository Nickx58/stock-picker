const searchAPI = async (query) => {
    const url = new URL("https://www.alphavantage.co/query");

    const params = {
        function: "SYMBOL_SEARCH",
        keywords: query,
        apikey: 'MXUDY6RMB1GD5GKY',
    };

    url.search = new URLSearchParams(params).toString();

    try {
        const response = await fetch(url.toString(), {
            method: "GET",
        });

        if (response.status !== 200) {
            throw new Error(`Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Error: ${error.message}`);
    }
};

export default searchAPI;
