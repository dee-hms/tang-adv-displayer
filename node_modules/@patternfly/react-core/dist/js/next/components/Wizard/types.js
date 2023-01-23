"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWizardParentStep = exports.isWizardSubStep = exports.isWizardBasicStep = exports.isCustomWizardFooter = exports.isCustomWizardNavItem = exports.isCustomWizardNav = exports.WizardNavItemStatus = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
var WizardNavItemStatus;
(function (WizardNavItemStatus) {
    WizardNavItemStatus["Default"] = "default";
    WizardNavItemStatus["Error"] = "error";
})(WizardNavItemStatus = exports.WizardNavItemStatus || (exports.WizardNavItemStatus = {}));
function isCustomWizardNav(nav) {
    return typeof nav === 'function' || react_1.default.isValidElement(nav);
}
exports.isCustomWizardNav = isCustomWizardNav;
function isCustomWizardNavItem(navItem) {
    return typeof navItem === 'function' || react_1.default.isValidElement(navItem);
}
exports.isCustomWizardNavItem = isCustomWizardNavItem;
function isCustomWizardFooter(footer) {
    return typeof footer === 'function' || react_1.default.isValidElement(footer);
}
exports.isCustomWizardFooter = isCustomWizardFooter;
function isWizardBasicStep(step) {
    var _a;
    return ((_a = step) === null || _a === void 0 ? void 0 : _a.subStepIds) === undefined && !isWizardSubStep(step);
}
exports.isWizardBasicStep = isWizardBasicStep;
function isWizardSubStep(step) {
    var _a;
    return ((_a = step) === null || _a === void 0 ? void 0 : _a.parentId) !== undefined;
}
exports.isWizardSubStep = isWizardSubStep;
function isWizardParentStep(step) {
    var _a;
    return ((_a = step) === null || _a === void 0 ? void 0 : _a.subStepIds) !== undefined;
}
exports.isWizardParentStep = isWizardParentStep;
//# sourceMappingURL=types.js.map