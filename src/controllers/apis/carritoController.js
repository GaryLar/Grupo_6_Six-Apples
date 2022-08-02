let db = require('../../database/models');

module.exports = {
    addToCart: (req, res) => {
        let productId = req.params.product;
        let quantity = req.params.quantity;
        let userId = req.params.user;

        if (userId) {
            db.Order.findAll({ /* consulto si hay orden creada para el usuario */
                where: {
                    userId: userId,
                },
                include: [
                    {
                        association: "order_items", include: [{association: "products"}]
                    },
                ],
            }).then((result) => {
                if (result.length > 0) { /* su existe la orden, la actualizo */
                    let products = result[0].products || null;
                    let item = products?.find((item) => item.productId === +productId);
                    if (item) {
                        let newQuantity = +quantity + item.quantity;
                        db.ItemsOrder.update(
                            {
                                productId: productId,
                                quantity: newQuantity,
                            },
                            {
                                where: {
                                    id: item.id,
                                },
                            }
                        ).then((result) => {
                            res.json({
                                status: 200,
                                msg: "Producto actualizado",
                            });
                        }).catch((error) =>
                        res.json({error, catch: "1a"}));
                    } else { 
                        db.ItemsOrder.create({ /* si el item no esta en la orden, la agrego */
                            productId: productId,
                            orderId: result[0].id,
                            quantity: +quantity,
                        }).then((createdProduct) => {
                            res.status(201).json({
                                status: 201,
                                data: createdProduct,
                            });
                        }).catch((error) =>
                        res.json({
                            errors: error,
                        }));
                    }
                } else { /* si no existe la orden, la creo */
                    db.Order.create({
                        userId,
                        state: "PENDING",
                    }).then((order) => {
                        if (order) { /* si se creo, creo el registo en la tabla */
                            db.ItemsOrder.create({
                                orderId: order.id,
                                productId: productId,
                                quantity: +quantity,
                            }).then((ItemsOrder) => {
                                res.json({
                                    meta: {
                                        status: 201,
                                    },
                                    data: ItemsOrder,
                                });
                            });
                        } 
                    }).catch((error) => 
                    res.json({error, catch: "Orden creada"}));
                }
            })
            .catch(error => res.json({error, catch: 1}))
        }
    },


}