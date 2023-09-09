'use strict'

const { faker } = require('@faker-js/faker')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM Users;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    const lessons = await queryInterface.sequelize.query(
      'SELECT id FROM Lessons;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    // 學生 已完成 已評分 各2個 
    for (let i = 0; i < 50; i++) {
      const h = Math.floor(Math.random() * 4 + 18)
      const d = Math.floor(Math.random() * 7 + 16)
      const mon = Math.floor(Math.random() * 8)

      const lessonId = i < 25 ? lessons[i].id : lessons[i - 25].id
      const teacherId = i < 25 ? users[(i + 1) * 2 - 2].id : users[(i - 24) * 2 - 2].id
      const studentId = i < 25 ? users[i * 2 + 1].id : users[(i - 25) * 2 + 1].id
      const startTime = new Date(2023, mon, d, h)
      const endTime = new Date(2023, mon, d, h, 30)
      const score = Math.floor(Math.random() * 10 + 1)
      const comment = faker.person.jobTitle()

      await queryInterface.bulkInsert('ClassRecords', [
        {
          lesson_id: lessonId,
          teacher_id: teacherId,
          student_id: studentId,
          start_time: startTime,
          end_time: endTime,
          score: score,
          comment: comment,
          created_at: new Date(),
          updated_at: new Date()
        }
      ])
    }
    // 老師 已完成 已評分 各2個
    for (let n = 0; n < 2; n++) {
      for (let i = 0; i < 25; i++) {
        const h = Math.floor(Math.random() * 4 + 18)
        const d = Math.floor(Math.random() * 7 + 16)
        const mon = Math.floor(Math.random() * 8)

        const lessonId = i < 24 ? lessons[i + 1].id : lessons[0].id
        const teacherId = i < 24 ? users[(i + 2) * 2 - 2].id : users[0].id
        const studentId = users[(i + 1) * 2 - 2].id
        const startTime = new Date(2023, mon, d, h)
        const endTime = new Date(2023, mon, d, h, 30)
        const score = Math.floor(Math.random() * 10 + 1)
        const comment = faker.person.jobTitle()

        await queryInterface.bulkInsert('ClassRecords', [
          {
            lesson_id: lessonId,
            teacher_id: teacherId,
            student_id: studentId,
            start_time: startTime,
            end_time: endTime,
            score: score,
            comment: comment,
            created_at: new Date(),
            updated_at: new Date()
          }
        ])
      }
    }

    // 學生 已完成 未評分 各2個
    for (let i = 0; i < 50; i++) {
      const h = Math.floor(Math.random() * 4 + 18)
      const d = Math.floor(Math.random() * 7 + 16)
      const mon = Math.floor(Math.random() * 8)

      const lessonId = i < 25 ? lessons[i].id : lessons[i - 25].id
      const teacherId = i < 25 ? users[(i + 1) * 2 - 2].id : users[(i - 24) * 2 - 2].id
      const studentId = i < 25 ? users[i * 2 + 1].id : users[(i - 25) * 2 + 1].id
      const startTime = new Date(2023, mon, d, h)
      const endTime = new Date(2023, mon, d, h, 30)
      const score = 0
      const comment = ''

      await queryInterface.bulkInsert('ClassRecords', [
        {
          lesson_id: lessonId,
          teacher_id: teacherId,
          student_id: studentId,
          start_time: startTime,
          end_time: endTime,
          score: score,
          comment: comment,
          created_at: new Date(),
          updated_at: new Date()
        }
      ])
    }
    // 老師 已完成 未評分 各2個
    for (let n = 0; n < 2; n++) {
      for (let i = 0; i < 25; i++) {
        const h = Math.floor(Math.random() * 4 + 18)
        const d = Math.floor(Math.random() * 7 + 16)
        const mon = Math.floor(Math.random() * 8)

        const lessonId = i < 24 ? lessons[i + 1].id : lessons[0].id
        const teacherId = i < 24 ? users[(i + 2) * 2 - 2].id : users[0].id
        const studentId = users[(i + 1) * 2 - 2].id
        const startTime = new Date(2023, mon, d, h)
        const endTime = new Date(2023, mon, d, h, 30)
        const score = 0
        const comment = ''

        await queryInterface.bulkInsert('ClassRecords', [
          {
            lesson_id: lessonId,
            teacher_id: teacherId,
            student_id: studentId,
            start_time: startTime,
            end_time: endTime,
            score: score,
            comment: comment,
            created_at: new Date(),
            updated_at: new Date()
          }
        ])
      }
    }

    // 學生 預約 未上課 各2個
    for (let i = 0; i < 50; i++) {
      const h = Math.floor(Math.random() * 4 + 18)
      const d = Math.floor(Math.random() * 7 + 16)
      const mon = 8

      const lessonId = i < 25 ? lessons[i].id : lessons[i - 25].id
      const teacherId = i < 25 ? users[(i + 1) * 2 - 2].id : users[(i - 24) * 2 - 2].id
      const studentId = i < 25 ? users[i * 2 + 1].id : users[(i - 25) * 2 + 1].id
      const startTime = new Date(2023, mon, d, h)
      const endTime = new Date(2023, mon, d, h, 30)
      const score = 0
      const comment = ''

      await queryInterface.bulkInsert('ClassRecords', [
        {
          lesson_id: lessonId,
          teacher_id: teacherId,
          student_id: studentId,
          start_time: startTime,
          end_time: endTime,
          score: score,
          comment: comment,
          created_at: new Date(),
          updated_at: new Date()
        }
      ])
    }
    // 老師 預約 未上課 各2個
    for (let n = 0; n < 2; n++) {
      for (let i = 0; i < 25; i++) {
        const h = Math.floor(Math.random() * 4 + 18)
        const d = Math.floor(Math.random() * 7 + 16)
        const mon = 8

        const lessonId = i < 24 ? lessons[i + 1].id : lessons[0].id
        const teacherId = i < 24 ? users[(i + 2) * 2 - 2].id : users[0].id
        const studentId = users[(i + 1) * 2 - 2].id
        const startTime = new Date(2023, mon, d, h)
        const endTime = new Date(2023, mon, d, h, 30)
        const score = 0
        const comment = ''

        await queryInterface.bulkInsert('ClassRecords', [
          {
            lesson_id: lessonId,
            teacher_id: teacherId,
            student_id: studentId,
            start_time: startTime,
            end_time: endTime,
            score: score,
            comment: comment,
            created_at: new Date(),
            updated_at: new Date()
          }
        ])
      }
    }

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ClassRecords', {})
  }
}

