var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./util/database/database.db');

exports.addBatch = (...args) => {
    console.log(args)
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO BATCHES VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)',
            args, function (err) {
                if (err) {
                    reject(err);
                }
                resolve(this.lastID);
            }
        )
    })
}