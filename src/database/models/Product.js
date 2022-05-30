module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            autoIncrement: true,
            allowNull: false, /* permite nulos? */
            primaryKey: true,
        },
        name: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        type: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        origin: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        price: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
        view: {
            type: dataTypes.BOOLEAN,
        },
        image: {
            type: dataTypes.STRING(45),
        },
        createdAt: {
            type: dataTypes.TIMESTAMP
        },
        updatedAt: {
            type: dataTypes.TIMESTAMP
        },
        categoryId: {
            type: dataTypes.INTEGER(10).UNSIGNED
        }

    };
    let config = {
        tableName: 'products',
        deletedAt: false,
        timestamp: true
    };

    const Product = sequelize.define(alias, cols, config)

    return Product
}