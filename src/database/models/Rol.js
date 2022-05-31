module.exports = (sequelize, dataTypes) => {
    let alias = 'Rol';
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
        tableName: 'rol',
        timestamp: false,
    };

    const Rol = sequelize.define(alias, cols, config);

    Rol.associate= models =>{
        Rol.hasMany(models.User,{
            as:"users", /* ROL TIENE MUCHOS USUARIOS (LO QUE DICE EL AS)*/
            foreignKey:"rolId"
        })
    }
    return Rol             
}