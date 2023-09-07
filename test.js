const moment = require('moment')
const bcrypt = require('bcryptjs')
const { faker } = require('@faker-js/faker')
const { Lesson } = require('./models')

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

const date = async () => {
  const data = await Lesson.findByPk(1, {
    raw: true
  })
  console.log(data.createdAt)
  console.log(new Date(data.createdAt))
  console.log(moment(new Date()).format('YYYY-MM-DD HH:mm:hh'))
}

const date02 = () => {
  for (let i = 0; i < 10; i++) {
    ConsoleRandomDate();
  }
  function ConsoleRandomDate() {
    const h = Math.floor(Math.random() * 4 + 18)
    const d = Math.floor(Math.random() * 14 + 15)
    const m = Math.floor(Math.random() * 3 + 9)
    const maxdaterandom = new Date().getTime();
    const mindaterandom = new Date(2023, m, d, h, 30).getTime();
    const randomdate = getRandom(mindaterandom, maxdaterandom);
    const datestr = moment(mindaterandom).format("YYYY-MM-DD HH:mm:hh");
    console.log(datestr);
  }
  function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

function RandomDate() {
  const h = Math.floor(Math.random() * 4 + 18)
  const d = Math.floor(Math.random() * 30 + 1)
  const m = Math.floor(Math.random() * 12 + 1)
  return new Date(2023, m, d, h)
}

// console.log(RandomDate())
date02()