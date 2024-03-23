"use strict";

// [GET] / about
module.exports.index = function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          res.render('client/pages/about/index.pug', {
            pageTitle: "About"
          });

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};