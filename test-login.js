const http = require('http');

const registerData = JSON.stringify({
    name: "Test User",
    email: "test@test.com",
    password: "test123"
});

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/users/register',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': registerData.length
    }
};

const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        console.log('Register:', data);
        
        // Test login immediately after
        const loginData = JSON.stringify({
            email: "test@test.com",
            password: "test123"
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
                console.log('Login:', loginResponse);
            });
        });
        
        loginReq.write(loginData);
        loginReq.end();
    });
});

req.write(registerData);
req.end();
