const checkResponse = response => {
    if (response.status === 404) {
        throw new Error('Not Found');
    }
    if (!response.headers.get('content-type').includes('application/json')) {
        return response.text();
    }
    return response.json();
};

export default checkResponse;