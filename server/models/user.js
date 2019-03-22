var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        len: [1, 50]
      }
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          len: [1, 50]
        }
      },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING(50),
      allowNull: true,
      validate: {
        len: [0, 150]
      }
    },
    lastname: {
      type: DataTypes.STRING(50),
      allowNull: true,
      validate: {
        len: [0, 150]
      }
    },
    subtitle: {
      type: DataTypes.STRING(50),
      allowNull: true,
      validate: {
        len: [0, 150]
      }
    },  
    description: {
      type: DataTypes.STRING(50),
      allowNull: true,
      validate: {
        len: [0, 200]
      }
    },
    languages: {
      type: DataTypes.STRING(50),
      allowNull: true,
      validate: {
        len: [0, 200]
      }
    },
    bookmarks: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    inactive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  return User;
}
