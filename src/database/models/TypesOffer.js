module.exports = (sequelize, dataTypes) => {
    let alias = 'TypesOffer';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: dataTypes.STRING(45),
            allowNull: false,
        }
    };
    let config = {
        tableName: 'types_offers',
        timestamp: false,
    };

    const TypesOffer = sequelize.define(alias, cols, config)
    return TypesOffer;
}