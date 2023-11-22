export default async function apiCaller({ url, method = 'get', headers, body }) {
    try {
        const response = await fetch(url, {
            method,
            headers: {
                'Authorization': process.env.REACT_APP_TOKEN,
                'Content-Type': 'application/json',
                ...headers,
            },
            body: JSON.stringify(body),
            follow: 'follow'
        });
        return await response.json();
    }
    catch (error) {
        console.error(error);
    }
}