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

    Order.associate = models => {
        Order.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'userId'
        })
        Order.belongsToMany(models.Product, {
            as: 'products',
            through: 'items_order',/* nombre de la tabla pv */
            foreignKey: 'orderId',
            otherKey: 'productId',
        })

    }
    return Order
}