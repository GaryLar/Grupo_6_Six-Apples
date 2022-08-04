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
    removeOneFromCart: (req, res) => {
        let itemId = req.params.item;
        let user = req.params.user;

        db.Order.findOne({
            where: {
                userId: user,
            },
            include: [
                {
                    association: "order_items",
                    include: [
                        {
                            association: "products"
                        },
                    ],
                },
            ],
        }).then((order) => {
            let itemToRemove = order.order_items.find(
                (item) => item.productId === +itemId
            );
            if(itemToRemove !== undefined){
                db.ItemsOrder.findByPk(itemToRemove.id)
                .then((item) => {
                    let newQuantity = +item.quantity -1;
                    if(item.quantity > 1){
                        db.ItemsOrder.update({
                            orderId: item.orderId,
                            productId: item.productId,
                            quantity: newQuantity,
                        },
                        {
                            where: {
                                id: item.id,
                            },
                        }).then((result) => {
                            if(result) {
                                res.json({
                                    status:200,
                                    msg: "item cantidad updated",
                                })
                            }
                        })
                    } else {
                        db.ItemsOrder.destroy({
                            where: {
                                id: item.id,
                            },
                        }).then((result) =>
                        res.status(200).json({
                            status: 200,
                            msg: "item removed absolutamente",
                        }))
                    }
                })
                .catch((error) => 
                res.json({
                    error: error,
                }))
            }
        })
    },
    removeAllFromCart: (req, res) => {
        let itemId = +req.params.item; /* productId desde ItemsOrder */
        let user = req.params.user;

        db.Order.findOne({
            where: {
                userId: user,
            },
            include: [
                {
                    association: "order_items",
                    include: [
                        {
                            association: "products",
                        },
                    ],
                },
            ],
        }).then((order) => {
            let itemToRemove = order.order_items.find(
                (item) => item.productId === +itemId
            )
            if(itemToRemove !== undefined) {
                db.ItemsOrder.destroy({
                    where: {
                        id: itemToRemove.id,
                    },
                })
                .then((result) => 
                res.json({
                    status: 200,
                    msg: 'item removido'
                }))
                .catch((error) => 
                res.json({
                    errors: error
                }))
            }
        })
    },
    clearCart: (req, res) => {
        let user = req.params.user;
        db.Order.findOne({
            where: {
                userId: user,
            },
            include: [
                {
                    association: "order_items",
                    include: [
                        {
                            association: "products",
                        }
                    ]
                }
            ]
        }).then((order) => {
            db.ItemsOrder.destroy({
                where: {
                    orderId: order.id,
                },
            })
            .then((result) => {
                db.Order.destroy({
                    where: {
                        id: order.id,
                    }
                }).then((finalResult) => {
                    res.json({
                        status: 200,
                        msg: "orden eliminada",
                    });
                });
            })
            .catch((error) => 
            res.json({
                errors: error,
            }))
        })
    },
    productsInCart: (req, res) => {
        let user = req.params.user
        db.Order.findOne({
            where: {
                userId: user,
            },
            include: [
                {
                    association: "order_items",
                    include: [
                        {
                            association: "products",
                        }
                    ]
                }
            ]
        }).then((order) => {
            if(order){
                res.json({
                    data: order,
                });
            }else{
                res.json({
                    status: 404,
                    msg: "no hay orden creada"
                })
            }
        }).catch(error => console.log(error))
    },

}