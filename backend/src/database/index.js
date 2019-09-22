import Datastore from 'nedb';

const db = {};

db.users = new Datastore({
    autoload: true,
    timestampData: false,
    filename: __dirname + '/users.db',
    // filename: path.join('/contacts.db'),
});

db.rooms = new Datastore({
    autoload: true,
    timestampData: false,
    filename: __dirname + '/rooms.db',
    // filename: path.join('/rooms.db'),
});

export default db;
