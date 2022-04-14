const {getProducts} = require ('../../data');

module.exports = {
    index: (req, res) => {
        res.render('admin/adminIndex', {
            title: 'admin'
        })
    }
}