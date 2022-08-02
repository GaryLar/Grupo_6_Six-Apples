module.exports = (sequelize,dataTypes) => {
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
        categoryId: {
            type: dataTypes.INTEGER(10).UNSIGNED
        }

    };
    let config = {
        tableName: 'products',
        deletedAt: false,
        timestamps: true
    };

    const Product = sequelize.define(alias, cols, config)

    Product.associate = models => {
        Product.belongsTo(models.Category,{
            as:"category",
            foreignKey:"categoryId"
        })
        Product.belongsToMany(models.Offer,{
            as:"offers",
            through:'offers_products',/* nombre de la tabla pv */
            foreignKey: 'productsId',
            otherKey: 'offersId',
        })
        Product.hasMany(models.ItemsOrder, {
            as: "order_items",
            foreignKey: "productId"
        })
    }
    return Product
}