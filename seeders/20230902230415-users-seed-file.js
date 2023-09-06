'use strict'

const bcrypt = require('bcryptjs')
const { faker } = require('@faker-js/faker')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hash = await bcrypt.hash('12345678', 10)
    await queryInterface.bulkInsert('Users',
      Array.from({ length: 50 }, (
        user,
        id,
        weekTime = Math.floor(Math.random() * 10 + 1) * 0.5,
        totalTime = weekTime * Math.floor(Math.random() * 10 + 1),
        isTeacher = (id + 1) % 2 === 0 ? 0 : 1) => (
        {
          name: `user${id + 1}`,
          email: `user${id + 1}@example.com`,
          password: hash,
          is_teacher: isTeacher,
          avatar: 'https://illustcenter.com/wp-content/uploads/2022/09/sdesign_00165-508x381.png',
          info: faker.lorem.text(),
          total_lesson_time: totalTime,
          week_lesson_time: weekTime,
          created_at: new Date(),
          updated_at: new Date()
        }))
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', {})
  }
}
