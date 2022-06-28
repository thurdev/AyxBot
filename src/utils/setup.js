const sqlite3 = require('sqlite3').verbose();
const Database = sqlite3.Database;
const db = new Database('db.sqlite');

db.run(`
    CREATE TABLE IF NOT EXISTS"users" (
        "id" INTEGER PRIMARY KEY,
        "discordId" integer(18),
        "credits" float
    );
`);

db.run(`
    CREATE TABLE IF NOT EXISTS "codes" (
        "id" INTEGER PRIMARY KEY,
        "hash" string(20),
        "credits" float
    );
`)

db.run(`
    CREATE TABLE IF NOT EXISTS "actions" (
        "id" INTEGER PRIMARY KEY,
        "label" string(220)
    );
`)

db.run(`
    CREATE TABLE IF NOT EXISTS "users_logs" (
        "id" INTEGER PRIMARY KEY,
        "id_user" integer(11),
        "id_action" integer(11),
        "raw" string(220),
        "timestamp" integer(32),
        FOREIGN KEY(id_user) REFERENCES users(id)
        FOREIGN KEY(id_action) REFERENCES actions(id)
    );
`)

console.log('Database created!');