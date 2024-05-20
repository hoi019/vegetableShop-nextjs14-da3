const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/db')
const CategoryModel = require('./category.model')
const ManufactureModel = require('./manufacture.model')

const ProductModel = sequelize.define('products', {
   id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
   name: { type: DataTypes.STRING, allowNull: false },
   image: { type: DataTypes.STRING, allowNull: false },
   quantity: { type: DataTypes.INTEGER, allowNull: false },
   price: { type: DataTypes.INTEGER, allowNull: false },
   category_id: { type: DataTypes.INTEGER, allowNull: false },
   manufacture_id: { type: DataTypes.INTEGER, allowNull: false },
})

ProductModel.belongsTo(CategoryModel, { foreignKey: 'category_id' })
ProductModel.belongsTo(ManufactureModel, { foreignKey: 'manufacture_id' })

module.exports = ProductModel