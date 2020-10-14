const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class user_company_talent_search_preferences extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_company_talent_search_preferences.init({
    search_doctor: DataTypes.BOOLEAN,
    search_nurse: DataTypes.BOOLEAN,
    search_other: DataTypes.BOOLEAN,
    search_talent_study_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    search_talent_approb_status: DataTypes.BOOLEAN,
    search_status_min_german: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'user_company_talent_search_preferences',
  });
  return user_company_talent_search_preferences;
};
