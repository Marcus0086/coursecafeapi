require('dotenv').config();
const config = {
    user: 'usr',
    password: 'raghavgu',
    server: '127.0.0.1',
    database: 'DB_CourseCafe',
    options: {
        trustedconnection: true,
        trustServerCertificate: true,
        enableArithAbort: true,
        instancename: 'SQLEXPRESS'
    },
    port: 51586
};

module.exports = config;