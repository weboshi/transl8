
module.exports = function(sequelize, DataTypes) {
    var Job = sequelize.define("Jobs", {
        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
            len: [1, 500]
            }
        },
            username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
            len: [1, 50]
            }
        },
        category: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
            len: [1, 150]
            }
        },
        languageTo: {
            type: DataTypes.STRING(150),
            allowNull: false,
            validate: {
            len: [0, 150]
            }
        },
        languageFrom: {
            type: DataTypes.STRING(150),
            allowNull: false,
            validate: {
            len: [0, 150]
            }
        }, 
        description: {
            type: DataTypes.STRING(500),
            allowNull: false,
            validate: {
            len: [0, 500]
            }
        },
        price: {
            type: DataTypes.INTEGER(50),
            allowNull: false,
            validate: {
            len: [0, 150]
            }
        },
        score: {
            type: DataTypes.INTEGER(50),
            allowNull: true,
            validate: {
            len: [0, 150]
            }
        },
        upvoters: {
            type: DataTypes.STRING(500),
            allowNull: true,
            len: [0, 150]
        },
        downvoters: {
            type: DataTypes.STRING(500),
            allowNull: true,
            len: [0, 150]
        },

        inactive: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });
    return Job;
  }
  