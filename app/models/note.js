const data = require("@/data.json");
const sortBy = require("lodash");
const source = sortBy(data, "createTime");
const { Model, DataTypes } = require("sequelize");
const sequelize = require("@/app/sequelize");

class Note extends Model {}

Note.init(
  {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      comment: "笔记主键ID",
    },
    recordId: {
      type: DataTypes.STRING,
    },
    groupGuid: {
      type: DataTypes.STRING,
    },
    rawTitle: {
      type: DataTypes.STRING,
    },
    rawText: {
      type: DataTypes.TEXT,
    },
    createTime: {
      type: DataTypes.DATE,
    },
    updateTime: {
      type: DataTypes.DATE,
    },
    topTime: {
      type: DataTypes.DATE,
    },
    recycleTime: {
      type: DataTypes.DATE,
    },
    alarmTime: {
      type: DataTypes.DATE,
    },
    deleteTime: {
      type: DataTypes.DATE,
    },
    skinId: {
      type: DataTypes.STRING,
    },
    version: {
      type: DataTypes.BIGINT,
    },
    status: {
      type: DataTypes.TINYINT,
    },
    attachments: {
      type: DataTypes.JSON,
    },
  },
  { sequelize, tableName: "note", initialAutoIncrement: 1000 }
);

module.exports = { Note };

// (async () => {
//   await sequelize.sync({ force: true, alter: true });
//   await Note.bulkCreate(source, {});
// })();
