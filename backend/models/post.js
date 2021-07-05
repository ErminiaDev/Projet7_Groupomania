'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }){
      this.belongsTo( User, { foreignKey : 'userId'} )
    };

    static associate({ Comment }){
      this.hasMany( Comment, { foreignKey : 'postId'} )
    };

    toJSON() {
      return { ...this.get(), id: undefined, userId: undefined }
    }

  };
  Post.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    title: {
      type:DataTypes.STRING,
      allowNull:false 
    },
    category: {
      type: DataTypes.STRING,
      allowNull:false
    },
    text: {
      type:DataTypes.TEXT,
      allowNull:false 
    },
    userId: {
       type: DataTypes.INTEGER,
       references: {
          model: 'Users', // 'users' refers to table name
          key: 'id', // 'id' refers to column name in users table
       },
       allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};