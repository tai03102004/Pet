const SettingGeneral = require("../../models/setting-general.model");
module.exports.general = async(req,res) => {
    const settingGeneral = await SettingGeneral.findOne({}) // Lấy ra bản ghi đầu tiên
    res.render("admin/pages/setting/general.pug",{
        pageTitle : "Trang cài đặt chung",
        settingGeneral : settingGeneral,
    })
}

module.exports.generalPatch = async(req,res) => {
    const settingGeneral = await SettingGeneral.findOne({});
    if (settingGeneral) {
        await SettingGeneral.updateOne({
            _id : settingGeneral.id,
        }, req.body);
    } else {
        const record = new SettingGeneral(req.body);
        await record.save();
    }
    req.flash("success","Cập nhập thành công! ");
    res.redirect("back");
}