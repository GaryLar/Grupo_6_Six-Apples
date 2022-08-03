module.exports=(sequelize,dataTypes)=>{
    let alias = "ItemsOrder";
    let cols = {
        id:{
            type:dataTypes.INTEGER(10).UNSIGNED,
            autoIncrement:true,
            allowNull:false ,
            primaryKey:true
        },
        quantity:{
            type:dataTypes.INTEGER(10).UNSIGNED,
            allowNull:false
        },
        orderId:{
            type:dataTypes.INTEGER(10).UNSIGNED,
        },
        productId:{
            type:dataTypes.INTEGER(10).UNSIGNED,
        }
    }
    let config = {
        tableName:'items_order',
        deletedAt: false,
        timestamps: true
    };
    const ItemsOrder =sequelize.define(alias,cols,config)

    ItemsOrder.associate = models => {
        ItemsOrder.belongsTo(models.Order, {
            as:"order",
            foreignKey: "orderId"
        })
        ItemsOrder.belongsTo(models.Product, {
            as:"products",
            foreignKey: "productId"
        })
    }

    return ItemsOrder
}