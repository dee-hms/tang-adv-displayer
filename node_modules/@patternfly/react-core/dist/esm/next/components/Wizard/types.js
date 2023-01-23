import React from 'react';
export var WizardNavItemStatus;
(function (WizardNavItemStatus) {
    WizardNavItemStatus["Default"] = "default";
    WizardNavItemStatus["Error"] = "error";
})(WizardNavItemStatus || (WizardNavItemStatus = {}));
export function isCustomWizardNav(nav) {
    return typeof nav === 'function' || React.isValidElement(nav);
}
export function isCustomWizardNavItem(navItem) {
    return typeof navItem === 'function' || React.isValidElement(navItem);
}
export function isCustomWizardFooter(footer) {
    return typeof footer === 'function' || React.isValidElement(footer);
}
export function isWizardBasicStep(step) {
    var _a;
    return ((_a = step) === null || _a === void 0 ? void 0 : _a.subStepIds) === undefined && !isWizardSubStep(step);
}
export function isWizardSubStep(step) {
    var _a;
    return ((_a = step) === null || _a === void 0 ? void 0 : _a.parentId) !== undefined;
}
export function isWizardParentStep(step) {
    var _a;
    return ((_a = step) === null || _a === void 0 ? void 0 : _a.subStepIds) !== undefined;
}
//# sourceMappingURL=types.js.map