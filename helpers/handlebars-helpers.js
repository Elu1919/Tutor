const dayjs = require('dayjs')

module.exports = {
  currentYear: () => dayjs().year(),
  ifCond: function (a, b, options) {
    return a === b ? options.fn(this) : options.inverse(this)
  },
  ifWeekDay: function (a, b, options) {
    return a.includes(b) ? options.fn(this) : options.inverse(this)
  }
}