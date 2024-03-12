const i18n = require("i18n");
module.exports.index = async(req,res) => {
    const newLanguage = req.query.lang;
    i18n.setLocale(req, newLanguage);
    res.redirect('/admin/dashboard'); 
}