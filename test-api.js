const http = require('http');

const postData = JSON.stringify({
    name: "John Doe",
    email: "john@example.com",
    password: "password123"
});

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/users/register',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData.length
    }
};

const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        console.log('Register Response:', data);
        
        // Now test login
        const loginData = JSON.stringify({
            email: "john@example.com",
            password: "password123"
        });
        
        const loginOptions = {
            hostname: 'localhost',
            port: 5000,
            path: '/api/users/login',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': loginData.length
            }
        };
        
        const loginReq = http.request(loginOptions, (loginRes) => {
            let loginResponse = '';
            loginRes.on('data', (chunk) => { loginResponse += chunk; });
            loginRes.on('end', () => {
                console.log('Login Response:', loginResponse);
            });
        });
        
        loginReq.write(loginData);
        loginReq.end();
    });
});

req.write(postData);
req.end();
