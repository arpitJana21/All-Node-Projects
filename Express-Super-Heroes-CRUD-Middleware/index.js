//  do not forgot to export server
const fs = require('fs');
const express = require('express');
const {addID} = require('./middlewares/addID.middleware');
const {logger} = require('./middlewares/logger.middleware');
const {auth} = require('./middlewares/auth.middleware');

const app = express();

// Middle-wares
app.use(express.json());
app.use(logger);

app.route('/heroes').get(getHeroes);
app.route('/add/hero').post(addID, addHero);
app.route('/update/villain/:hero_id').patch(auth, updataVill);
app.route('/delete/hero/:hero_id').delete(auth, delHero);

// Functions
function getHeroes(req, res) {
    try {
        const data = JSON.parse(fs.readFileSync('./db.json', 'utf-8'));
        return res.send(data.heroes);
    } catch (err) {
        res.status(400).send(err);
    }
}

function addHero(req, res) {
    try {
        const data = JSON.parse(fs.readFileSync('./db.json', 'utf-8'));
        data.heroes.push(req.body);
        fs.writeFileSync('./db.json', JSON.stringify(data));
        res.send(data.heroes);
    } catch {
        res.status(400).send(error);
    }
}

function updataVill(req, res) {
    try {
        const id = req.params.hero_id * 1;
        const data = JSON.parse(fs.readFileSync('./db.json', 'utf-8'));
        let flag = false;
        let hero;

        for (let i = 0; i < data.heroes.length; i++) {
            if (data.heroes[i].id === id) {
                data.heroes[i].villains.push(req.body);
                flag = true;
                hero = data.heroes[i];
                break;
            }
        }

        if (!flag) {
            res.status(400).send({message: 'Hero not found'});
        } else {
            fs.writeFileSync('./db.json', JSON.stringify(data));
            res.send(hero);
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

function delHero(req, res){
    try{
        const id = req.params.hero_id * 1;
        const data = JSON.parse(fs.readFileSync('./db.json', 'utf-8'));
        let index = null;
    
        for(let i = 0; i<data.heroes.length; i++){
            if(data.heroes[i].id === id){
                index = i;
                break;
            }
        }
    
        if(index === null){
            res.status(400).send({message: 'Hero not found'});
        }else{
            data.heroes.splice(index, 1);
            fs.writeFileSync('./db.json', JSON.stringify(data));
            res.send(data.heroes);
        }
    }catch(err){
        res.send(err);
    }
    
}

app.listen(5000);

module.exports = app;
