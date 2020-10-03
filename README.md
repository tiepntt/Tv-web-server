# WebServer TVHSV

Steps to run this project:

1. Run `npm i` command
2. create database mysql with name `tv_db`
3. create and setup connect string in `.env` file
4. Run `npm start` command
   Migration :
5. create and config `ormconfig.json` with under form
6. Run : `npm run migration`

Update Migration :

1. Remove and reCreatere db with name `tv_db`
2. Run `npm start` command
3. Run : `npm run migration`

Form Config `ormconfig.json` and `.env`

```
    {
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "pass",
    "database": "tv_db",
    "synchronize": true,
    "logging": false,
    "autoMigrationsRun": true,
    "entities": ["src/entity/**/*.ts"],
    "migrations": ["src/migration/**/*.ts"],
    "subscribers": ["src/subscriber/**/*.ts"],
    "migrationsRun": true,
    "charset": "utf8mb4_unicode_ci",

        "cli": {
            "entitiesDir": "src/entity",
            "migrationsDir": "src/migration",
            "subscribersDir": "src/subscriber"
        }
    }
```
