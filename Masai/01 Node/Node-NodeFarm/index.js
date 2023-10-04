// Core Module
const http = require('http');
const path = require('path');
const url = require('url');
const fs = require('fs');

// Local Module
const replaceTemplate = require('./modules/replaceTemplate');

// 3rd Party Module
const slugify = require('slugify');

// Read File :
const tempOverviewHtml = fs.readFileSync(
    `${__dirname}/templates/template-overview.html`,
    'utf-8'
);
const tempCardHtml = fs.readFileSync(
    `${__dirname}/templates/template-card.html`,
    'utf-8'
);
const tempProductHtml = fs.readFileSync(
    `${__dirname}/templates/template-product.html`,
    'utf-8'
);
const productArr = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
);

// Server :
let server = http.createServer((req, res) => {
    const {query, pathname} = url.parse(req.url, true);

    // Overview Page
    if (pathname === '/overview' || pathname === '/') {
        res.writeHead(200, {'content-type': 'text/html'});
        const cardsList = productArr
            .map((product) => replaceTemplate(tempCardHtml, product))
            .join('');
        const overviewHtml = tempOverviewHtml.replace(
            /{~cards_list}/g,
            cardsList
        );
        res.end(overviewHtml);
    }

    // API Page
    else if (pathname === '/api') {
        res.writeHead(200, {'Content-type': 'application/json'});
        res.end(productArr);
    }

    // Product Page
    else if (pathname === '/product') {
        res.writeHead(200, {'content-type': 'text/html'});
        const productHtml = replaceTemplate(
            tempProductHtml,
            productArr[query.id]
        );
        res.end(productHtml);
    }

    // Not Found
    else {
        res.writeHead(404, {'content-type': 'text/html'});
        res.end('<h1>Page Not Found</h1>');
    }
});

server.listen(4500, () => {
    console.log('Listening to request on port 8000');
});
