const rp = require('request-promise');

async function test () {
    try {
        const options = {
            uri: `http://192.168.232.66:9005/ping`,
            method: 'GET',
            resolveWithFullResponse: true,
            json: true
        };
        const response = await rp(options);
        console.log(typeof response.statusCode);
    } catch (error) {
        return error.stack;
    }
}

test().then(error => console.log(error));
