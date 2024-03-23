// [GET] / about

module.exports.index = async (req,res) => {
    res.render('client/pages/contact/index.pug',{
        pageTitle: "Contact",
    })
}