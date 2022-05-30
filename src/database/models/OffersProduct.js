module.exports = (sequelize, dataTypes) => {
    let alias = 'Offers_product';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            autoIncrement: true,
            allowNull: false, /* permite nulos? */
            primaryKey: true,
        },
        offersId: {
            type: dataTypes.INTEGER(10).UNSIGNED,
        },
        productsId: {
            type: dataTypes.INTEGER(10).UNSIGNED,
        }
    };
    let config = {
        tableName: 'offers_products',
        deletedAt: false,
        timestamp: false
    };

    const Offers_product = sequelize.define(alias, cols, config)

    return Offers_product
}