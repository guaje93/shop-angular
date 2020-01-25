"use strict";
exports.__esModule = true;
var a;
var b;
var c;
var d;
var e;
var f = [1, true, 'a', false];
var ColorRed = 0;
var drawPoint = function (point) {
};
var Point2 = /** @class */ (function () {
    function Point2() {
        var _this = this;
        this.draw = function () {
            console.log(_this.x + _this.y);
        };
    }
    return Point2;
}());
var point = new Point2();
point.x = 1;
point.y = 2;
point.draw();
