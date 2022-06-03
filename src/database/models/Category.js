module.exports = (sequelize, dataTypes) => {
    let alias = 'Category';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        
    };
    let config = {
        tableName: 'category',
        timestamps: false,
    }; 

    const Category = sequelize.define(alias, cols, config);
    Category.associate = models => {
        Category.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'categoryId'
        })
    }
    return Category

}



