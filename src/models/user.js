'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    user_type: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    otp: DataTypes.STRING,
    otp_retry: DataTypes.INTEGER,
    expiry_time: DataTypes.DATE,
    company_name: DataTypes.STRING,
    address: DataTypes.STRING,
    country: DataTypes.STRING,
    city: DataTypes.STRING,
    postal_code: DataTypes.INTEGER,
    created_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER,
    deleted_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};