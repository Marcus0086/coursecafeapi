const { poolPromise, sql } = require('../db/dbConnect');
const utils = require('../db/utils');
const { toLowerKeys } = require('./utils/toLowerKeys');

module.exports = {
    webLogin: async (req, res) => {
        const { username, password } = req.body;
        try {
            if (username !== undefined && password !== undefined) {
                const pool = await poolPromise;
                const userLogin = await pool.request()
                    .input('Username', sql.NVarChar(50), username)
                    .input('Password', sql.NVarChar(50), password)
                    .execute('dba_coursecafe.SPWeb_Login');
                if (userLogin.recordsets[0].length > 0) {
                    res.status(200).send({ ...toLowerKeys(userLogin.recordsets[0][0]) })
                } else {
                    res.status(400).send({ status: 'Fail', message: `Data not found` });
                }
            } else {
                res.status(400).send({ message: 'Username and password is required' });
            }
        } catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    },
    webSignup: async (req, res) => {
        const { name,email,password } = req.body;
        try {
            if (name !== undefined && email != undefined && password !== undefined) {
                const pool = await poolPromise;
                const userSignUp = await pool.request()
                    .input('UserType',sql.VarChar(50), 'Student')
                    .input('Name', sql.VarChar(50), name)
                    .input('Email', sql.VarChar(50), email)
                    .input('Password', sql.VarChar(50), password)
                    .execute('dba_coursecafe.SP_WebSignup');
                if (userSignUp.recordsets[0].length > 0) {
                    res.status(200).send({ ...toLowerKeys(userSignUp.recordsets[0][0]) })
                } else {
                    res.status(400).send({ status: 'Fail', message: `Data not found` });
                }
            } else {
                res.status(400).send({ message: 'Username and password is required' });
            }
        } catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    },
    myCourses: async (req, res) => {
        const { studentid } = req.query;
        try {
            if (studentid !== undefined) {
                const pool = await poolPromise;
                const mycourses = await pool.request()
                    .input('StudentID', sql.NVarChar(50), studentid)
                    .execute('dbo.SP_MyCourses');
                if (mycourses.recordsets[0].length > 0) {
                    res.status(200).send({
                        status: 'success', message: 'Data found', data: [
                            ...toLowerKeys(mycourses.recordsets)
                        ]
                    })
                } else {
                    res.status(400).send({ status: 'Fail', message: `Data not found` });
                }
            } else {
                res.status(400).send({ message: 'Student id is required' });
            }
        } catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    },
    mycoursesInside: async (req, res) => {
        const { batchcode } = req.query;
        try {
            if (batchcode !== undefined) {
                const pool = await poolPromise;
                const mycourses = await pool.request()
                    .input('Flag', sql.NVarChar(50), 'LoadCourse')
                    .input('Batchcode', sql.NVarChar(50), batchcode)
                    .execute('dbo.SP_mycourses_inside');
                if (mycourses.recordsets[0].length > 0) {
                    res.status(200).send({
                        status: 'success', message: 'Data found', data: [
                            ...toLowerKeys(mycourses.recordsets[0])
                        ]
                    })
                } else {
                    res.status(400).send({ status: 'Fail', message: `Data not found` });
                }
            } else {
                res.status(400).send({ message: 'Batch code is required' });
            }
        } catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    },
    dashBoard: async (req, res) => {
        const { studentid } = req.body;
        console.log(studentid)
        try {
            if (studentid !== undefined) {
                const pool = await poolPromise;
                const mycourses = await pool.request()
                    .input('StudentID', sql.Int, studentid)
                    .execute('dba_coursecafe.SP_StudentMyCourses');
                if (mycourses.recordsets[0].length > 0) {
                    res.status(200).send({
                        status: 'success', message: 'Data loaded Successfully', data: [
                            ...toLowerKeys(mycourses.recordsets)
                        ]
                    })
                } else {
                    res.status(400).send({ status: 'Fail', message: `Data not found` });
                }
            } else {
                res.status(400).send({ message: 'Student id is required' });
            }
        } catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    },
}
