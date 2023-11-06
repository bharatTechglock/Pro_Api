'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // Set the email as unique
      },      
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      user_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 2,
        comment: 'Type of 1 => admin, 2=> contractor, 3=>subContractor', // Add a comment to user_type
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '0=>not verified, 1=>active, 2=>blocked by admin, 3=>complete your profile, 4=>document under review, 5=> document rejected, 6=>subscription,7=>inactive', // Add a comment to status code
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      otp: {
        type: DataTypes.STRING,
        allowNull: true
      },
      otp_retry: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      expiry_time: {
        type: DataTypes.DATE,
        allowNull: true
      },
      company_name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true
      },
      postal_code: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true
        // type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};