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
        timestamps: true
    };

    const Order = sequelize.define(alias, cols, config)

    Order.associate = models => {
        Order.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'userId'
        })
        Order.hasMany(models.ItemsOrder, {
            as: "order_items",
            foreignKey: "orderId"
        })

    }
    return Order
}