'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Habit extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Habit.init({
        description: {
            type: DataTypes.STRING,

        },
        frequency: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: '1'
        }
    }, {
        sequelize,
        modelName: 'Habit',
    });
    return Habit;
};