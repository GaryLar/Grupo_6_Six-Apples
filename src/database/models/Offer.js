module.exports = (sequelize, dataTypes) => {
    let alias = 'Offer';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            autoIncrement: true,
            allowNull: false, /* permite nulos? */
            primaryKey: true,
        },
        typesOffersId: {
            type: dataTypes.INTEGER(10).UNSIGNED,
        },
        categoryName: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        description: {
            type: dataTypes.STRING(100),
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
        }
    };
    let config = {
        tableName: 'offers',
        deletedAt: false,
        timestamp: true
    };

    const Offer = sequelize.define(alias, cols, config)

    Offer.associate = models => {
        Offer.belongsTo(models.TypesOffer, {
            as: 'typeOffer',
            foreignKey: 'typesOffersId'
        })
        Offer.belongsToMany(models.Product, {
            as: 'products',
            through: 'offers_products', /* nombre de la tabla pv */
            foreignKey: 'offersId',
            otherKey: 'productsId',
        })
    }

    return Offer
}