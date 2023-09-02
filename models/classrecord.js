'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClassRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ClassRecord.belongsTo(models.User, { foreignKey: 'teacherId' })
      ClassRecord.belongsTo(models.User, { foreignKey: 'studentId' })
    }
  }
  ClassRecord.init({
    teacher_id: DataTypes.INTEGER,
    student_id: DataTypes.INTEGER,
    start_time: DataTypes.DATE,
    end_time: DataTypes.DATE,
    score: DataTypes.INTEGER,
    comment: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'ClassRecord',
    tableName: 'ClassRecords',
    underscored: true,
  });
  return ClassRecord;
};