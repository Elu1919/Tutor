const moment = require('moment')
const bcrypt = require('bcryptjs')
const { faker } = require('@faker-js/faker')
const { Lesson } = require('./models')

const date = () => {
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

// for (let i = 0; i < 10; i++) {
//   const h = Math.floor(Math.random() * 4 + 18)
//   const d = Math.floor(Math.random() * 7 + 16)
//   const mon = Math.floor(Math.random() * 8)
//   const date = new Date(2023, mon, d, h)
//   console.log(mon, d, h)
//   console.log(date)
//   console.log(moment(date).format("YYYY-MM-DD HH:mm"))
// }

const str = 'Mom Get The Camera'
const result = str.split(' ')
console.log(result)