module.exports = (sequelize, dataTypes) => {
    let alias = 'Order';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            autoIncrement: true,
            allowNull: false, /* permite nulos? */
            primaryKey: true,
        },
        state: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
        },
        createdAt: {
            type: dataTypes.TIMESTAMP
        },
        updatedAt: {
            type: dataTypes.TIMESTAMP
        },
        userId: {
            type: dataTypes.INTEGER(10).UNSIGNED,
        }
    };
    let config = {
        tableName: 'orders',
        deletedAt: false,
        timestamp: true
    };

    const Order = sequelize.define(alias, cols, config)

    return Order
}