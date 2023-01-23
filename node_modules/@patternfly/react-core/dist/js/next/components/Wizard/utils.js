"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActiveStep = exports.normalizeNavStep = exports.normalizeStep = exports.isWizardStep = exports.buildSteps = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const WizardStep_1 = require("./WizardStep");
/**
 * Accumulate list of step & sub-step props pulled from child components
 * @param children
 * @returns WizardControlStep[]
 */
const buildSteps = (children) => react_1.default.Children.toArray(children).reduce((acc, child) => {
    if (isWizardStep(child)) {
        const { steps: subSteps, id, isHidden, isDisabled } = child.props;
        const subControlledSteps = [];
        const stepIndex = acc.length + 1;
        acc.push(Object.assign(Object.assign(Object.assign({ index: stepIndex, component: child }, (stepIndex === 1 && { isVisited: true })), (subSteps && {
            subStepIds: subSteps === null || subSteps === void 0 ? void 0 : subSteps.map((subStep, subStepIndex) => {
                subControlledSteps.push(Object.assign({ isHidden,
                    isDisabled, component: subStep, parentId: id, index: stepIndex + subStepIndex + 1 }, exports.normalizeStep(subStep.props)));
                return subStep.props.id;
            })
        })), exports.normalizeStep(child.props)), ...subControlledSteps);
    }
    else {
        throw new Error('Wizard only accepts children with required WizardStepProps.');
    }
    return acc;
}, []);
exports.buildSteps = buildSteps;
function isWizardStep(child) {
    var _a, _b;
    return ((react_1.default.isValidElement(child) && child.type === WizardStep_1.WizardStep) ||
        (((_a = child.props) === null || _a === void 0 ? void 0 : _a.name) !== undefined && ((_b = child.props) === null || _b === void 0 ? void 0 : _b.id) !== undefined));
}
exports.isWizardStep = isWizardStep;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const normalizeStep = (_a) => {
    var { children, steps } = _a, controlStep = tslib_1.__rest(_a, ["children", "steps"]);
    return controlStep;
};
exports.normalizeStep = normalizeStep;
const normalizeNavStep = (navStep) => ({
    id: navStep.id,
    index: navStep.index,
    name: navStep.name.toString()
});
exports.normalizeNavStep = normalizeNavStep;
const getActiveStep = (steps, activeStepIndex) => steps.find(step => step.index === activeStepIndex);
exports.getActiveStep = getActiveStep;
//# sourceMappingURL=utils.js.map