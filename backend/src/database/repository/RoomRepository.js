import db from '../index';

export default {
    save(room) {
        db.rooms.insert(room, (err) => {
            if (err) {
                console.error(err);
            }
        });
    },
    get(id) {
        return new Promise((resolve, reject) => {
            db.rooms.findOne({ id }, (err, doc) => {
                if (err) reject(err);
                resolve(doc);
            });
        });
    },
    update(room) { // todo
        db.rooms.update({ id: room.id }, room, {}, (err) => {
            if (err) {
                console.error(err);
            }
        });
    },
    getAll() {
        return new Promise((resolve, reject) => {
            db.rooms.find({}).exec((err, doc) => {
                if (err) reject(err);
                resolve(doc);
            });
        });
    },
    purge() {
        db.rooms.remove({}, { multi: true }, (err, numRemoved) => {
            if (err) {
                console.error('ERROR WHILE PURGE:', err);
            } else {
                console.log('Purge on start:', numRemoved);
            }
        });
    },
};
