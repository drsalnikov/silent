require('dotenv').config({ path: '.env' })

const dbUser = process.env.DBUSER;
const dbPassword = process.env.DBPASSWORD;
const dbServer = process.env.DBSERVER;
const dbName = process.env.DATABASE;
const dbInstance = process.env.DBINSTANCENAME;
const dbPort = parseInt(process.env.DBPORT);

const config = {
  user: dbUser,
  password: dbPassword,
  server: dbServer,
  database: dbName,
  options: {
    trustedconnection: true,
    enableArithAort: true,
    instancename: dbInstance,
    trustServerCertificate: true,
  },
  port: dbPort,
};

module.exports = config;