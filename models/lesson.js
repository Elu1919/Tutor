'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lesson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Lesson.belongsTo(models.User, { foreignKey: 'teacher_id' })
    }
  }
  Lesson.init({
    teacher_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    info: DataTypes.TEXT,
    style: DataTypes.TEXT,
    link: DataTypes.STRING,
    time: DataTypes.INTEGER,
    date: DataTypes.STRING,
    img: DataTypes.STRING,
    total_score: DataTypes.INTEGER,
    score_count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Lesson',
    tableName: 'Lessons',
    underscored: true,
  });
  return Lesson;
};