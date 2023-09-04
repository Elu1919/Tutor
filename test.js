const bcrypt = require('bcryptjs')
const { faker } = require('@faker-js/faker')

const test = async () => {
  const hash = await bcrypt.hash('12345678', 10)
  const week = [1, 2, 3, 4, 5, 6, 7]
  console.log(
    await Array.from({ length: 30 }, (
      lesson,
      id,
      teacherId = id * 2 + 1,
      time = Math.floor(Math.random() * 2) !== 0 ? 30 : 60,
      date = Math.floor(Math.random() * 5),
      totalScore = (id + 1) % 2 === 0 ? 0 : 1,
      scoreCount = 0) => (
      {
        // teacher_id: teacherId,
        name: faker.person.jobTitle(),
        info: faker.lorem.text(),
        style: faker.lorem.text(),
        // link: 'https://meet.google.com/?sjid=663613846954092567-AP',
        // time: time,
        // date: `${week[date]}${week[date + 1]}${week[date + 2]}`,
        // img: 'https://upload.cc/i1/2023/08/27/bex9jv.png',
        // total_score: totalScore,
        // score_count: scoreCount,
        // created_at: new Date(),
        // updated_at: new Date()
      }))
  )
}

test()