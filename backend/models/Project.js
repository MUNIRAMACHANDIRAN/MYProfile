const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Project = sequelize.define('Project', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(200), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    githubLink: { type: DataTypes.STRING(500), allowNull: true },
    techStack: { type: DataTypes.STRING(500), allowNull: true },
    imageUrl: { type: DataTypes.STRING(500), allowNull: true },
    order: { type: DataTypes.INTEGER, defaultValue: 0 },
}, { tableName: 'projects', timestamps: true });

module.exports = Project;
