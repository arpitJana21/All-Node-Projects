const fs = require('fs');

const validator = function (req, res, next) {
    const {ID, Name, Rating, Description, Genre, Cast} = req.body;
    if (ID && Name && Rating && Description && Genre && Cast) {
        if (validID(ID)) {
            fs.appendFileSync('./res.txt', 'ID is a number\n');
        } else {
            fs.appendFileSync(
                './res.txt',
                'bad request.some data is incorrect.\n'
            );
            return res
                .status(400)
                .end('bad request.some data is incorrect.\n');
        }

        if (validName(Name)) {
            fs.appendFileSync('./res.txt', 'Name is a string\n');
        } else {
            fs.appendFileSync(
                './res.txt',
                'bad request.some data is incorrect.\n'
            );
            return res.status(400).send('bad request.some data is incorrect.');
        }

        if (validDes(Description)) {
            fs.appendFileSync('./res.txt', 'Description is a string\n');
        } else {
            fs.appendFileSync(
                './res.txt',
                'bad request.some data is incorrect.\n'
            );
            return res.status(400).send('bad request.some data is incorrect.');
        }

        if (validRating(Rating)) {
            fs.appendFileSync('./res.txt', 'Rating is a number\n');
        } else {
            fs.appendFileSync(
                './res.txt',
                'bad request.some data is incorrect.\n'
            );
            return res.status(400).send('bad request.some data is incorrect.');
        }

        if (validGenre(Genre)) {
            fs.appendFileSync('./res.txt', 'Genre is a string\n');
        } else {
            fs.appendFileSync(
                './res.txt',
                'bad request.some data is incorrect.\n'
            );
            return res.status(400).send('bad request.some data is incorrect.');
        }

        if (validCase(Cast)) {
            fs.appendFileSync('./res.txt', 'Cast is a array of string\n');
        } else {
            fs.appendFileSync(
                './res.txt',
                'bad request.some data is incorrect.\n'
            );
            return res.status(400).send('bad request.some data is incorrect.');
        }
        next();
    } else {
        return res.status(400).send('invalid request body.');
    }
}

function validID(id) {
    return Number.isInteger(id);
}

function validName(name) {
    if (typeof name !== 'string') return false;
    for (const char of name) {
        if (!isNaN(char)) return false;
    }
    return true;
}

function validRating(rating) {
    return typeof rating === 'number';
}

function validDes(des) {
    return typeof des === 'string';
}

function validGenre(gen) {
    return typeof gen === 'string';
}

function validCase(arr) {
    if (!Array.isArray(arr)) return false;
    for (const str of arr) {
        if (typeof str !== 'string') return false;
    }
    return true;
}

module.exports = validator