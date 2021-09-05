const { poolPromise, sql } = require('../db/dbConnect');
const utils = require('../db/utils');
const { toLowerKeys } = require('./utils/toLowerKeys');
module.exports = {
    topbarcourses: async (req, res) => {
        try {
            const pool = await poolPromise;
            const mycourses = await pool.request()
                .execute('bannerCoursesAPI');
            if (mycourses.recordsets[0].length > 0) {
                res.status(200).send({
                    status: 'success', message: 'Data found', data: [
                        ...toLowerKeys(mycourses.recordsets[0])
                    ]
                })
            } else {
                res.status(400).send({ status: 'Fail', message: `Data not found` });
            }
        } catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    },
    carouselCourses: async (req, res) => {
        const { flag } = req.query;
        try {
            const pool = await poolPromise;
            const mycourses = await pool.request()
                .input('flag', sql.NVarChar(50), flag)
                .execute('carouselCoursesAPI');
            if (mycourses.recordsets[0].length > 0) {
                res.status(200).send({
                    status: 'success', message: 'Data found', data: [
                        ...toLowerKeys(mycourses.recordsets[0])
                    ]
                })
            } else {
                res.status(400).send({ status: 'Fail', message: `Data not found` });
            }
        } catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    }
}