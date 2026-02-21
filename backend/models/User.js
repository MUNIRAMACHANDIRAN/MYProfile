const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    mobile: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    profileImage: {
        type: DataTypes.STRING(500),
        allowNull: true,
    },
    role: {
        type: DataTypes.STRING(10),
        defaultValue: 'user',
        validate: { isIn: [['admin', 'user']] },
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    isEmailVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    isMobileVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    emailOtp: {
        type: DataTypes.STRING(10),
        allowNull: true,
    },
    mobileOtp: {
        type: DataTypes.STRING(10),
        allowNull: true,
    },
    otpExpiry: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    tableName: 'users',
    timestamps: true,
});

module.exports = User;
