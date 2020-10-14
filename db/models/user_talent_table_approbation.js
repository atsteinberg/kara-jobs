const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class user_talent_table_approbation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_talent_table_approbation.init({
    approbation_started: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    approbation_federal_state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    approbation_feedback: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    approbation_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'talent_table_approbation',
  });
  return user_talent_table_approbation;
};
