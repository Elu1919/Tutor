const dayjs = require('dayjs')

module.exports = {
  currentYear: () => dayjs().year(),
  ifCond: function (a, b, options) {
    return a === b ? options.fn(this) : options.inverse(this)
  },
  ifWeekDay: function (a, b, options) {
    return a.includes(b) ? options.fn(this) : options.inverse(this)
  },
  ifFinish: function (a, b, options) {
    return a >= b ? options.fn(this) : options.inverse(this)
  },
  eachDesc: function (a, options) {
    let data = ""
    for (let i = a.length, j = 0; i > j; i--) {
      data = data + options.fn(a[i - 1])
    }
    return data
  }
}