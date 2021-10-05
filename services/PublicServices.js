const { poolPromise, sql } = require('../db/dbConnect');
const { toLowerKeys } = require('./utils/toLowerKeys');
module.exports = {
    topbarcourses: async (req, res) => {
        try {
            const pool = await poolPromise;
            const mycourses = await pool.request()
                .execute('bannerCoursesAPI');
            if (mycourses.recordsets[0].length > 0) {
                const data = [...toLowerKeys(Object
                    .values(mycourses.recordsets[0])
                    .map(({ SubjectID, Subject, Classes, Topics, Tags }) => {
                        const classes = [...Classes.split(',')].map(val => {
                            return { class: val };
                        });
                        const topics = [...Topics.split(',')].map(val => {
                            return { name: val };
                        });
                        const tags = [...Tags.split(',')].map(val => {
                            return { tag: val };
                        });
                        return { SubjectID, Subject, classes, topics, tags }
                    }))];
                res.status(200).send({
                    status: 'success', message: 'Data found', data: data
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
    },
    courseDetails: async (req, res) => {
        const { courseid, studentid } = req.query;
        try {
            const pool = await poolPromise;
            const mycourses = await pool.request()
                .input('courseid', sql.Int, courseid)
                .input('studentid', sql.Int, studentid)
                .execute('API_CourseDetails');
            if (mycourses.recordsets[0].length > 0) {
                const firstTable = [...toLowerKeys(mycourses.recordsets[0])];
                const secondTable = [...toLowerKeys(mycourses.recordsets[1])]
                res.status(200).send({
                    status: 'success', message: 'Data found',
                    ...firstTable[0],
                    availableBatches: secondTable
                })
            } else {
                res.status(400).send({ status: 'Fail', message: `Data not found` });
            }
        } catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    },
    courseList: async (req, res) => {
        const { studentid, subjectid, searchby, searchvalue } = req.body;
        try {
            const pool = await poolPromise;
            const mycourses = await pool.request()
                .input('studentid', sql.Int, studentid)
                .input('subjectid', sql.Int, subjectid)
                .input('searchby', sql.VarChar(50), searchby)
                .input('searchvalue', sql.VarChar(50), searchvalue)
                .execute('API_CoursesList');
            if (mycourses.recordsets[0].length > 0) {
                const firstTable = [...toLowerKeys(mycourses.recordsets[0])];
                const secondTable = [...toLowerKeys(mycourses.recordsets[1])]
                res.status(200).send({
                    status: 'success', message: 'Data found',
                    ...firstTable[0],
                    data: secondTable
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