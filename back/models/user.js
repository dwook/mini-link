"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Home }) {
      this.hasOne(Home);
    }
    toJSON() {
      return { ...this.get(), id: undefined, password: undefined };
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING(30),
        allowNull: false, // 필수
        unique: true, // 고유한 값
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      charset: "utf8",
      collate: "utf8_general_ci", // 한글 저장
    }
  );
  return User;
};
