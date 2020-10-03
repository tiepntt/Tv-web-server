# WebServer TVHSV

Steps to run this project:

1. Run `npm i` command
2. create database mysql with name `tv_db`
3. create and setup connect string in `.env` file
4. Run `npm start` command
   Migration :
5. Config at `ormConfig.json`
6. Run : `npm run migration`

Update Migration :

1. Remove and reCreatere db with name `tv_db`
2. Run `npm start` command
3. Run : `npm run migration`
