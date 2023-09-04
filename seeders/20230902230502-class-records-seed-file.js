'use strict'

const { faker } = require('@faker-js/faker')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const week = [1, 2, 3, 4, 5, 6, 7]
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM Users;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    await queryInterface.bulkInsert('ClassRecords',
      Array.from({ length: 50 }, (
        record,
        id,
        teacherId = id < 25 ? users[id * 2 + 1].id : users[id * 2 + 1].id,
        studentId = users[id],
        startTime = Math.floor(Math.random() * 2) !== 0 ? 30 : 60,
        endTime = Math.floor(Math.random() * 5),
        isCommented = Math.floor(Math.random() * 2)) => (
        {
          teacher_id: teacherId,
          student_id: studentId,
          start_time: startTime,
          end_time: endTime,
          score: isCommented !== 0 ? '' : Math.floor(Math.random() * 11),
          comment: isCommented !== 0 ? '' : faker.person.jobDescriptor(),
          created_at: new Date(),
          updated_at: new Date()
        }))
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ClassRecords', {})
  }
}