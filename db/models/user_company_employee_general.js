const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class user_company_employee_general extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_company_employee_general.init({
    employee_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    onboarding_complete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    onboarding_page: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

  }, {
    sequelize,
    modelName: 'user_company_employee_general',
  });
  return user_company_employee_general;
};
