let db = require('../../database/models');

module.exports = {
    addToCart: (req, res) => {
        let productId = req.params.product;
        let quantity = req.params.quantity;
        let userId = req.params.user;

        if (userId) {
            db.Order.findAll({
                where: {
                    userId: userId,
                },
                include: [
                    {
                        association: "items_order", include: [{association: "products"}]
                    },
                ],
            }).then((result) => {
                if (result.length > 0) {
                    let products = result[0].items_order || null;
                    let item = products?.find((item) => item.productId === +productId);
                    if (item) {
                        let newQuantity = +quantity + item.quantity;
                        db.Items_order.update(
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
                        res.json({
                            errors:error,
                        }));
                    } else {
                        db.Items_order.create({
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
                } else {
                    db.Order.create({
                        userId,
                        state: "PENDING",
                    }).then((order) => {
                        if (order) {
                            db.Order_items.create({
                                orderId: order.id,
                                productId: productID,
                                quantity: +quantity,
                            }).then((items_order) => {
                                res.json({
                                    meta: {
                                        status: 201,
                                    },
                                    data: items_order,
                                });
                            });
                        } 
                    }).catch((error) => 
                    res.json({
                        errors: error,
                    }));
                }
            })
        }
    },


}