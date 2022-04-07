const {getProducts} = require ('../../data');

module.exports = {
    index: (req, res) => {
        res.render('admin/adminIndex', {
            titulo: 'admin'
        })
    }
}