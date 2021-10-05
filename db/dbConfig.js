require('dotenv').config();
const config = {
    user: 'dba_coursecafe',
    password: 'ATSPL@Aco007!',
    server: '103.48.51.194',
    database: 'DB_CourseCafe',
    requestTimeout: 300000,
    options: {
        trustedconnection: true,
        trustServerCertificate: true,
        enableArithAbort: true,
        instancename: 'SQLEXPRESS',
        encrypt: false
    },
    port: 1232
};

module.exports = config;