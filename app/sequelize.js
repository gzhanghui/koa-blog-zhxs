const chalk = require("chalk");
const { Sequelize } = require("sequelize");
const { database } = require("../config");

const { dbName, host, port, user, password } = database;
const sequelize = new Sequelize(dbName, user, password, {
  dialect: "mysql",
  host,
  port,
  logging: true,
  timezone: "+08:00",
  define: {
    timestamps: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    scopes: {
      bh: {
        attributes: {
          exclude: ["updated_at", "deleted_at", "created_at"],
        },
      },
    },
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log(chalk.green("数据库连接成功"));
  })
  .catch((err) => {
    console.log(chalk.red("数据库连接失败"), err);
  });

module.exports = sequelize;
