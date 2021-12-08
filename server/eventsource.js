const http = require('http');
const faker = require('faker')

http.createServer((request, response) => {
    response.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Connection': 'keep-alive',
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
    });
    setInterval(() => {
        response.write(
            `data: ${JSON.stringify({
                avatar: `https://source.unsplash.com/random/200x200?sig=${Math.random()}`,
                name: `${faker.name.firstName()} ${faker.name.lastName()}`,
                score: Math.round(Math.random() * 1000),
                bio: faker.lorem.sentences(),
            })}`
        );
        response.write('\n\n');
    }, 5000);
}).listen(5000);
