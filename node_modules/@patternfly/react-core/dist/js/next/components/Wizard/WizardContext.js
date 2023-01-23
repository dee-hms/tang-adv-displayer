"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWizardContext = exports.WizardContextProvider = exports.WizardContext = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const types_1 = require("./types");
const utils_1 = require("./utils");
const WizardFooter_1 = require("./WizardFooter");
exports.WizardContext = react_1.default.createContext({});
const WizardContextProvider = ({ steps: initialSteps, footer: initialFooter, activeStepIndex, children, onNext, onBack, onClose, goToStepById, goToStepByName, goToStepByIndex }) => {
    const [currentSteps, setCurrentSteps] = react_1.default.useState(initialSteps);
    const [currentFooter, setCurrentFooter] = react_1.default.useState(typeof initialFooter !== 'function' ? initialFooter : undefined);
    // Combined initial and current state steps
    const steps = react_1.default.useMemo(() => currentSteps.map((currentStepProps, index) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _a = initialSteps[index], { isVisited } = _a, initialStepProps = tslib_1.__rest(_a, ["isVisited"]);
        return Object.assign(Object.assign({}, currentStepProps), initialStepProps);
    }), [initialSteps, currentSteps]);
    const activeStep = utils_1.getActiveStep(steps, activeStepIndex);
    const goToNextStep = react_1.default.useCallback(() => onNext(steps), [onNext, steps]);
    const goToPrevStep = react_1.default.useCallback(() => onBack(steps), [onBack, steps]);
    const footer = react_1.default.useMemo(() => {
        var _a;
        const wizardFooter = (activeStep === null || activeStep === void 0 ? void 0 : activeStep.footer) || currentFooter || initialFooter;
        if (types_1.isCustomWizardFooter(wizardFooter)) {
            const customFooter = wizardFooter;
            return typeof customFooter === 'function'
                ? customFooter(activeStep, goToNextStep, goToPrevStep, onClose)
                : customFooter;
        }
        return (react_1.default.createElement(WizardFooter_1.WizardFooter, Object.assign({ activeStep: activeStep, onNext: goToNextStep, onBack: goToPrevStep, onClose: onClose, isBackDisabled: (activeStep === null || activeStep === void 0 ? void 0 : activeStep.id) === ((_a = steps[0]) === null || _a === void 0 ? void 0 : _a.id) }, wizardFooter)));
    }, [currentFooter, initialFooter, activeStep, goToNextStep, goToPrevStep, onClose, steps]);
    const getStep = react_1.default.useCallback((stepId) => steps.find(step => step.id === stepId), [steps]);
    const setStep = react_1.default.useCallback((step) => setCurrentSteps(prevSteps => prevSteps.map(prevStep => {
        if (prevStep.id === step.id) {
            return Object.assign(Object.assign({}, prevStep), step);
        }
        return prevStep;
    })), []);
    return (react_1.default.createElement(exports.WizardContext.Provider, { value: {
            steps,
            activeStep,
            footer,
            onClose,
            getStep,
            setStep,
            setFooter: setCurrentFooter,
            onNext: goToNextStep,
            onBack: goToPrevStep,
            goToStepById: react_1.default.useCallback(id => goToStepById(steps, id), [goToStepById, steps]),
            goToStepByName: react_1.default.useCallback(name => goToStepByName(steps, name), [goToStepByName, steps]),
            goToStepByIndex: react_1.default.useCallback(index => goToStepByIndex(steps, index), [goToStepByIndex, steps])
        } }, children));
};
exports.WizardContextProvider = WizardContextProvider;
exports.WizardContextProvider.displayName = 'WizardContextProvider';
const useWizardContext = () => react_1.default.useContext(exports.WizardContext);
exports.useWizardContext = useWizardContext;
//# sourceMappingURL=WizardContext.js.map