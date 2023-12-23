const fetchData = async (url: string) => {
    try {
        const response = await fetch(url);

        return await response.json();
    } catch(err) {
        console.log(err);
    }
}

export default fetchData;