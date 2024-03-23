// [GET] / about

module.exports.index = async (req,res) => {
    res.render('client/pages/about/index.pug',{
        pageTitle: "About",
    })
}