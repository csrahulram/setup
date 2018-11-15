mkdir mongo_data
start cmd.exe /k "mongod --dbpath ./mongo_data"
start cmd.exe /k "nodemon app.js"
start cmd.exe /k "ng serve -o --proxy-config proxy.config.json"