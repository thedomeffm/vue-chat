import db from '../index';

export default {
    save(user) {
        db.users.insert(user, (err) => {
            if (err) {
                console.error(err);
            }
        });
    },
    get(id) {
        return new Promise((resolve, reject) => {
            db.users.findOne({ id }, (err, doc) => {
                if (err) reject(err);
                resolve(doc);
            });
        });
    },
    update(user) { // todo
        db.users.update({ id: user.id }, user, {}, (err) => {
            if (err) {
                console.error(err);
            }
        });
    },
    getAll() {
        return new Promise((resolve, reject) => {
            db.users.find({}).exec((err, doc) => {
                if (err) reject(err);
                resolve(doc);
            });
        });
    },
    remove(id) {
        db.users.remove({ id }, { multi: false }, (err) => {
            if (err) {
                console.error(err);
            }
        });
    },
    purge() {
        db.users.remove({}, { multi: true }, (err, numRemoved) => {
            if (err) {
                console.error('ERROR WHILE PURGE:', err);
            } else {
                console.log('Purge on start:', numRemoved);
            }
        });
    },
};
