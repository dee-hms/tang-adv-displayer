import { __rest } from "tslib";
import React from 'react';
import { isCustomWizardFooter } from './types';
import { getActiveStep } from './utils';
import { WizardFooter } from './WizardFooter';
export const WizardContext = React.createContext({});
export const WizardContextProvider = ({ steps: initialSteps, footer: initialFooter, activeStepIndex, children, onNext, onBack, onClose, goToStepById, goToStepByName, goToStepByIndex }) => {
    const [currentSteps, setCurrentSteps] = React.useState(initialSteps);
    const [currentFooter, setCurrentFooter] = React.useState(typeof initialFooter !== 'function' ? initialFooter : undefined);
    // Combined initial and current state steps
    const steps = React.useMemo(() => currentSteps.map((currentStepProps, index) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _a = initialSteps[index], { isVisited } = _a, initialStepProps = __rest(_a, ["isVisited"]);
        return Object.assign(Object.assign({}, currentStepProps), initialStepProps);
    }), [initialSteps, currentSteps]);
    const activeStep = getActiveStep(steps, activeStepIndex);
    const goToNextStep = React.useCallback(() => onNext(steps), [onNext, steps]);
    const goToPrevStep = React.useCallback(() => onBack(steps), [onBack, steps]);
    const footer = React.useMemo(() => {
        var _a;
        const wizardFooter = (activeStep === null || activeStep === void 0 ? void 0 : activeStep.footer) || currentFooter || initialFooter;
        if (isCustomWizardFooter(wizardFooter)) {
            const customFooter = wizardFooter;
            return typeof customFooter === 'function'
                ? customFooter(activeStep, goToNextStep, goToPrevStep, onClose)
                : customFooter;
        }
        return (React.createElement(WizardFooter, Object.assign({ activeStep: activeStep, onNext: goToNextStep, onBack: goToPrevStep, onClose: onClose, isBackDisabled: (activeStep === null || activeStep === void 0 ? void 0 : activeStep.id) === ((_a = steps[0]) === null || _a === void 0 ? void 0 : _a.id) }, wizardFooter)));
    }, [currentFooter, initialFooter, activeStep, goToNextStep, goToPrevStep, onClose, steps]);
    const getStep = React.useCallback((stepId) => steps.find(step => step.id === stepId), [steps]);
    const setStep = React.useCallback((step) => setCurrentSteps(prevSteps => prevSteps.map(prevStep => {
        if (prevStep.id === step.id) {
            return Object.assign(Object.assign({}, prevStep), step);
        }
        return prevStep;
    })), []);
    return (React.createElement(WizardContext.Provider, { value: {
            steps,
            activeStep,
            footer,
            onClose,
            getStep,
            setStep,
            setFooter: setCurrentFooter,
            onNext: goToNextStep,
            onBack: goToPrevStep,
            goToStepById: React.useCallback(id => goToStepById(steps, id), [goToStepById, steps]),
            goToStepByName: React.useCallback(name => goToStepByName(steps, name), [goToStepByName, steps]),
            goToStepByIndex: React.useCallback(index => goToStepByIndex(steps, index), [goToStepByIndex, steps])
        } }, children));
};
WizardContextProvider.displayName = 'WizardContextProvider';
export const useWizardContext = () => React.useContext(WizardContext);
//# sourceMappingURL=WizardContext.js.map