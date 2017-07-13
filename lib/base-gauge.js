"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var CanvasGauges = require("canvas-gauges");
var BaseGauge = (function () {
    function BaseGauge(el, zone) {
        this.el = el;
        this.zone = zone;
    }
    BaseGauge.prototype.getOptions = function () {
        this.options = Object.assign(this.options || {}, {
            renderTo: this.canvas.nativeElement
        });
        for (var i = 0; i < this.el.nativeElement.attributes.length; i++) {
            this.options[this.el.nativeElement.attributes[i].name
                .split(/-/)
                .map(function (part, i) {
                return i > 0 ?
                    part.charAt(0).toUpperCase() + part.substr(1) :
                    part;
            })
                .join('')] = CanvasGauges.DomObserver.parse(this.el.nativeElement.attributes[i].value);
        }
        return this.options;
    };
    BaseGauge.prototype.ngAfterViewChecked = function () {
        var _this = this;
        var props = this.getOptions();
        if (typeof props.value !== 'undefined') {
            this.zone.runOutsideAngular(function () {
                _this.gauge.value = props.value;
            });
            delete props.value;
        }
        this.gauge.update(props);
    };
    return BaseGauge;
}());
__decorate([
    core_1.ViewChild('gauge'),
    __metadata("design:type", core_1.ElementRef)
], BaseGauge.prototype, "canvas", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], BaseGauge.prototype, "options", void 0);
exports.BaseGauge = BaseGauge;
//# sourceMappingURL=base-gauge.js.map