import { __rest } from "tslib";
import React from 'react';
import findLastIndex from 'lodash/findLastIndex';
import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/Wizard/wizard';
import { isWizardParentStep, isCustomWizardNav } from './types';
import { buildSteps, normalizeNavStep } from './utils';
import { useWizardContext, WizardContextProvider } from './WizardContext';
import { WizardToggle } from './WizardToggle';
import { WizardNavInternal } from './WizardNavInternal';
export const Wizard = (_a) => {
    var { children, footer, height, width, className, header, nav, startIndex = 1, isStepVisitRequired = false, onNavByIndex, onNext, onBack, onSave, onClose } = _a, wrapperProps = __rest(_a, ["children", "footer", "height", "width", "className", "header", "nav", "startIndex", "isStepVisitRequired", "onNavByIndex", "onNext", "onBack", "onSave", "onClose"]);
    const [activeStepIndex, setActiveStepIndex] = React.useState(startIndex);
    const initialSteps = buildSteps(children);
    const goToNextStep = (steps = initialSteps) => {
        var _a;
        const newStepIndex = (_a = steps.find(step => step.index > activeStepIndex && !step.isHidden && !isWizardParentStep(step))) === null || _a === void 0 ? void 0 : _a.index;
        if (activeStepIndex >= steps.length || !newStepIndex) {
            return onSave ? onSave() : onClose === null || onClose === void 0 ? void 0 : onClose();
        }
        const currStep = isWizardParentStep(steps[activeStepIndex]) ? steps[activeStepIndex + 1] : steps[activeStepIndex];
        const prevStep = steps[activeStepIndex - 1];
        setActiveStepIndex(newStepIndex);
        return onNext === null || onNext === void 0 ? void 0 : onNext(normalizeNavStep(currStep), normalizeNavStep(prevStep));
    };
    const goToPrevStep = (steps = initialSteps) => {
        const newStepIndex = findLastIndex(steps, (step) => step.index < activeStepIndex && !step.isHidden && !isWizardParentStep(step)) + 1;
        const currStep = isWizardParentStep(steps[activeStepIndex - 2])
            ? steps[activeStepIndex - 3]
            : steps[activeStepIndex - 2];
        const prevStep = steps[activeStepIndex - 1];
        setActiveStepIndex(newStepIndex);
        return onBack === null || onBack === void 0 ? void 0 : onBack(normalizeNavStep(currStep), normalizeNavStep(prevStep));
    };
    const goToStepByIndex = (steps = initialSteps, index) => {
        const lastStepIndex = steps.length + 1;
        // Handle index when out of bounds or hidden
        if (index < 1) {
            index = 1;
        }
        else if (index > lastStepIndex) {
            index = lastStepIndex;
        }
        const currStep = steps[index - 1];
        const prevStep = steps[activeStepIndex - 1];
        setActiveStepIndex(index);
        return onNavByIndex === null || onNavByIndex === void 0 ? void 0 : onNavByIndex(normalizeNavStep(currStep), normalizeNavStep(prevStep));
    };
    const goToStepById = (steps = initialSteps, id) => {
        const step = steps.find(step => step.id === id);
        const stepIndex = step === null || step === void 0 ? void 0 : step.index;
        const lastStepIndex = steps.length + 1;
        if (stepIndex > 0 && stepIndex < lastStepIndex && !step.isHidden) {
            setActiveStepIndex(stepIndex);
        }
    };
    const goToStepByName = (steps = initialSteps, name) => {
        const step = steps.find(step => step.name === name);
        const stepIndex = step === null || step === void 0 ? void 0 : step.index;
        const lastStepIndex = steps.length + 1;
        if (stepIndex > 0 && stepIndex < lastStepIndex && !step.isHidden) {
            setActiveStepIndex(stepIndex);
        }
    };
    return (React.createElement(WizardContextProvider, { steps: initialSteps, activeStepIndex: activeStepIndex, footer: footer, onNext: goToNextStep, onBack: goToPrevStep, onClose: onClose, goToStepById: goToStepById, goToStepByName: goToStepByName, goToStepByIndex: goToStepByIndex },
        React.createElement("div", Object.assign({ className: css(styles.wizard, className), style: Object.assign(Object.assign({}, (height ? { height } : {})), (width ? { width } : {})) }, wrapperProps),
            header,
            React.createElement(WizardInternal, { nav: nav, isStepVisitRequired: isStepVisitRequired }))));
};
const WizardInternal = ({ nav, isStepVisitRequired }) => {
    const { activeStep, steps, footer, goToStepByIndex } = useWizardContext();
    const [isNavExpanded, setIsNavExpanded] = React.useState(false);
    const wizardNav = React.useMemo(() => {
        if (isCustomWizardNav(nav)) {
            return typeof nav === 'function' ? nav(isNavExpanded, steps, activeStep, goToStepByIndex) : nav;
        }
        return React.createElement(WizardNavInternal, { nav: nav, isNavExpanded: isNavExpanded, isStepVisitRequired: isStepVisitRequired });
    }, [activeStep, isStepVisitRequired, goToStepByIndex, isNavExpanded, nav, steps]);
    return (React.createElement(WizardToggle, { nav: wizardNav, footer: footer, steps: steps, activeStep: activeStep, isNavExpanded: isNavExpanded, toggleNavExpanded: () => setIsNavExpanded(prevIsExpanded => !prevIsExpanded) }));
};
Wizard.displayName = 'Wizard';
//# sourceMappingURL=Wizard.js.map