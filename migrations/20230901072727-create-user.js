'use strict'

const { DATE } = require('sequelize')

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      is_teacher: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      avatar: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'https://upload.cc/i1/2023/08/27/bex9jv.png'
      },
      info: {
        type: Sequelize.TEXT
      },
      total_lesson_time: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      week_lesson_time: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
}