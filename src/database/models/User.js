module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
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
        email: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        password: {
            type: dataTypes.STRING(70),
            allowNull: false,
        },
        image: {
            type: dataTypes.STRING(45),
        },
        number: {
            type: dataTypes.INTEGER(11),
        },
        dni: {
            type: dataTypes.INTEGER(11),
        },
        phone: {
            type: dataTypes.INTEGER(11),
        },
        postCode: {
            type: dataTypes.INTEGER(11),
        },
        province: {
            type: dataTypes.STRING(100),
        },
        district: {
            type: dataTypes.STRING(100),
        },
        direction: {
            type: dataTypes.STRING(100),
        },
        rolld: {
            type: dataTypes.INTEGER(10).UNSIGNED
        },
        
    };
    let config = {
        tableName: 'users',
        deletedAt: false,
        timestamp: true
    };

    const User = sequelize.define(alias, cols, config)

    User.associate=models=>{
        User.belongsTo(models.Rol,{
            as:"rol",
            foreignKey:"rolId"
        })
        User.belongsTo(models.Order,{
            as:"order",
            foreignKey:"userId"
        })
    }

    
    return User
 }