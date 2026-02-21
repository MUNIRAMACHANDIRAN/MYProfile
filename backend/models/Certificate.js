const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Certificate = sequelize.define('Certificate', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    organization: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    issueDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    filePath: {
        type: DataTypes.STRING(500),
        allowNull: true,
    },
    fileType: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
}, {
    tableName: 'certificates',
    timestamps: true,
});

module.exports = Certificate;
