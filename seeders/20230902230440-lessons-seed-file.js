'use strict'

const { faker } = require('@faker-js/faker')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const week = [1, 2, 3, 4, 5, 6, 7]
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM Users;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    await queryInterface.bulkInsert('Lessons',
      Array.from({ length: 25 }, (
        lesson,
        id,
        teacherId = users[(id + 1) * 2 - 2].id,
        time = Math.floor(Math.random() * 2) !== 0 ? 30 : 60,
        date = Math.floor(Math.random() * 5),
        totalScore = Math.floor(Math.random() * 500 + 1),
        scoreCount = Math.floor(Math.random() * 50 + 1)) => (
        {
          teacher_id: teacherId,
          name: faker.person.jobTitle(),
          info: faker.lorem.text(),
          style: faker.lorem.text(),
          link: 'https://meet.google.com/?sjid=663613846954092567-AP',
          time: time,
          date: `${week[date]}${week[date + 1]}${week[date + 2]}`,
          img: 'https://illustcenter.com/wp-content/uploads/2022/09/sdesign_00165-508x381.png',
          total_score: totalScore,
          score_count: scoreCount,
          created_at: new Date(),
          updated_at: new Date()
        }))
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Lessons', {})
  }
}