const sqlite3 = require('sqlite3').verbose();
const Database = sqlite3.Database
const fs = require('fs');

class DB extends Database {
    constructor(options) {
        super(options);
        this.models = {};
    }
    getOne(query) {
        return new Promise((resolve, reject) => {
            this.serialize(() => {

                this.get(query, (err, row) => {
                    if (row) {
                        resolve(row);
                    }else{
                        resolve(null)
                    }
                    if (err) {
                        reject(err);
                    }
                });
            });
        })
    }
    getAll(query) {
        return new Promise((resolve, reject) => {
            this.serialize(() => {

                this.all(query, (err, row) => {
                    if (row) {
                        resolve(row);
                    }else{
                        resolve([])
                    }
                    if (err) {
                        reject(err);
                    }
                });
            });
        })
    }
    create(options) {
        return new Promise((resolve, reject) => {

            var query = "INSERT INTO ";

            if(options.table){
                query += " " + options.table;
            }

            if (options.values) {

                query += ` (`;
                Object.keys(options.values).forEach((key, i) => {
                    query += key;
                    if (i < Object.keys(options.values).length - 1) {
                        query += ",";
                    }
                })
                query += `)`;

                query += ` VALUES `;

                query += `(`;
                Object.keys(options.values).forEach((key, i) => {
                    query += options.values[key];
                    if (i < Object.keys(options.values).length - 1) {
                        query += ",";
                    }
                })
                query += `)`;
            }

            console.log(query)

            this.serialize(() => {

                this.run(query, (err, row) => {
                    if (row) {
                        resolve(row);
                    }else{
                        resolve(null)
                    }
                    if (err) {
                        reject(err);
                    }
                });
            });
        });
    }
    update(options) {
        return new Promise((resolve, reject) => {

            var query = "UPDATE ";

            if(options.table){
                query += " " + options.table;
            }

            query += ' SET '

            if (options.values) {
                Object.keys(options.values).forEach((key, i) => {
                    query += `${key} = ${options.values[key]} `;
                    if (i < Object.keys(options.values).length - 1) {
                        query += ",";
                    }
                })
            }

            if (options.where) {
                query += " WHERE ";

                Object.keys(options.where).forEach((column, i) => {
                    query += `${column} = ${options.where[column]} `;
                    if (i < Object.keys(options.where).length - 1) {
                        query += "AND ";
                    }
                })
            }

            this.serialize(() => {

                this.run(query, (err, row) => {
                    if (row) {
                        resolve(row);
                    }else{
                        resolve(null)
                    }
                    if (err) {
                        reject(err);
                    }
                });
            });
        });
    }
    findOne(options) {
        return new Promise((resolve, reject) => {

            var query = "SELECT ";

            if (options.attributes) {
                query += options.attributes.join(', ');
            } else {
                query += "*";
            }

            query += " FROM";

            if(options.table){
                query += " " + options.table;
            }

            if (options.where) {
                query += " WHERE ";

                Object.keys(options.where).forEach((column, i) => {
                    query += `${column} = ${options.where[column]} `;
                    if (i < Object.keys(options.where).length - 1) {
                        query += "AND ";
                    }
                })
            }

            this.serialize(() => {

                this.get(query, (err, row) => {
                    if (row) {
                        resolve(row);
                    }else{
                        resolve(null)
                    }
                    if (err) {
                        reject(err);
                    }
                });
            });
        });
    }
}


module.exports = {
    Database: DB
};