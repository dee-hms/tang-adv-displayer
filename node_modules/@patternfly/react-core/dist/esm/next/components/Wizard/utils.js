import { __rest } from "tslib";
import React from 'react';
import { WizardStep } from './WizardStep';
/**
 * Accumulate list of step & sub-step props pulled from child components
 * @param children
 * @returns WizardControlStep[]
 */
export const buildSteps = (children) => React.Children.toArray(children).reduce((acc, child) => {
    if (isWizardStep(child)) {
        const { steps: subSteps, id, isHidden, isDisabled } = child.props;
        const subControlledSteps = [];
        const stepIndex = acc.length + 1;
        acc.push(Object.assign(Object.assign(Object.assign({ index: stepIndex, component: child }, (stepIndex === 1 && { isVisited: true })), (subSteps && {
            subStepIds: subSteps === null || subSteps === void 0 ? void 0 : subSteps.map((subStep, subStepIndex) => {
                subControlledSteps.push(Object.assign({ isHidden,
                    isDisabled, component: subStep, parentId: id, index: stepIndex + subStepIndex + 1 }, normalizeStep(subStep.props)));
                return subStep.props.id;
            })
        })), normalizeStep(child.props)), ...subControlledSteps);
    }
    else {
        throw new Error('Wizard only accepts children with required WizardStepProps.');
    }
    return acc;
}, []);
export function isWizardStep(child) {
    var _a, _b;
    return ((React.isValidElement(child) && child.type === WizardStep) ||
        (((_a = child.props) === null || _a === void 0 ? void 0 : _a.name) !== undefined && ((_b = child.props) === null || _b === void 0 ? void 0 : _b.id) !== undefined));
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const normalizeStep = (_a) => {
    var { children, steps } = _a, controlStep = __rest(_a, ["children", "steps"]);
    return controlStep;
};
export const normalizeNavStep = (navStep) => ({
    id: navStep.id,
    index: navStep.index,
    name: navStep.name.toString()
});
export const getActiveStep = (steps, activeStepIndex) => steps.find(step => step.index === activeStepIndex);
//# sourceMappingURL=utils.js.map