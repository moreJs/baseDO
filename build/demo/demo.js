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
const index_1 = require("../src/index");
class T1 {
    r1() { console.log("r1"); }
    e1() { console.log("e1"); }
}
__decorate([
    index_1.reducer("r1"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], T1.prototype, "r1", null);
__decorate([
    index_1.epic("e1"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], T1.prototype, "e1", null);
class T2 {
    r2() {
        console.log("r1");
    }
    e2() {
        console.log("e2");
    }
}
__decorate([
    index_1.reducer("r2"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], T2.prototype, "r2", null);
__decorate([
    index_1.epic("e2"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], T2.prototype, "e2", null);
const a = index_1.store();
//# sourceMappingURL=demo.js.map