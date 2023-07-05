const Emiter = require('events');

const myEmmiter = new Emiter();

myEmmiter.on('event_name', function(data){
    console.log(data);
})

myEmmiter.emit('event_name', {
    name: 'Arpit'
})

class Auth extends Emiter{
    register(username){
        this.emit('registered', username)
    }
}

const auth = new Auth();

auth.on('register', function(data){
    console.log(data);
})

auth.register('Arpit Jana');