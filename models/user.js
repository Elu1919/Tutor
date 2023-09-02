'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      User.hasOne(models.Lesson, { foreignKey: 'teacher_id' })

      User.belongsToMany(User, {
        through: models.ClassRecord,
        foreignKey: 'teacher_id',
        as: 'class_students'
      })

      User.belongsToMany(User, {
        through: models.ClassRecord,
        foreignKey: 'student_id',
        as: 'class_teachers'
      })
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    is_teacher: DataTypes.BOOLEAN,
    avatar: DataTypes.STRING,
    info: DataTypes.TEXT,
    total_lesson_time: DataTypes.INTEGER,
    week_lesson_time: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    underscored: true,
  });
  return User;
};