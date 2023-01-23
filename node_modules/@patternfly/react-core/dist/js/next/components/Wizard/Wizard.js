"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wizard = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const findLastIndex_1 = tslib_1.__importDefault(require("lodash/findLastIndex"));
const react_styles_1 = require("@patternfly/react-styles");
const wizard_1 = tslib_1.__importDefault(require("@patternfly/react-styles/css/components/Wizard/wizard"));
const types_1 = require("./types");
const utils_1 = require("./utils");
const WizardContext_1 = require("./WizardContext");
const WizardToggle_1 = require("./WizardToggle");
const WizardNavInternal_1 = require("./WizardNavInternal");
const Wizard = (_a) => {
    var { children, footer, height, width, className, header, nav, startIndex = 1, isStepVisitRequired = false, onNavByIndex, onNext, onBack, onSave, onClose } = _a, wrapperProps = tslib_1.__rest(_a, ["children", "footer", "height", "width", "className", "header", "nav", "startIndex", "isStepVisitRequired", "onNavByIndex", "onNext", "onBack", "onSave", "onClose"]);
    const [activeStepIndex, setActiveStepIndex] = react_1.default.useState(startIndex);
    const initialSteps = utils_1.buildSteps(children);
    const goToNextStep = (steps = initialSteps) => {
        var _a;
        const newStepIndex = (_a = steps.find(step => step.index > activeStepIndex && !step.isHidden && !types_1.isWizardParentStep(step))) === null || _a === void 0 ? void 0 : _a.index;
        if (activeStepIndex >= steps.length || !newStepIndex) {
            return onSave ? onSave() : onClose === null || onClose === void 0 ? void 0 : onClose();
        }
        const currStep = types_1.isWizardParentStep(steps[activeStepIndex]) ? steps[activeStepIndex + 1] : steps[activeStepIndex];
        const prevStep = steps[activeStepIndex - 1];
        setActiveStepIndex(newStepIndex);
        return onNext === null || onNext === void 0 ? void 0 : onNext(utils_1.normalizeNavStep(currStep), utils_1.normalizeNavStep(prevStep));
    };
    const goToPrevStep = (steps = initialSteps) => {
        const newStepIndex = findLastIndex_1.default(steps, (step) => step.index < activeStepIndex && !step.isHidden && !types_1.isWizardParentStep(step)) + 1;
        const currStep = types_1.isWizardParentStep(steps[activeStepIndex - 2])
            ? steps[activeStepIndex - 3]
            : steps[activeStepIndex - 2];
        const prevStep = steps[activeStepIndex - 1];
        setActiveStepIndex(newStepIndex);
        return onBack === null || onBack === void 0 ? void 0 : onBack(utils_1.normalizeNavStep(currStep), utils_1.normalizeNavStep(prevStep));
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
        return onNavByIndex === null || onNavByIndex === void 0 ? void 0 : onNavByIndex(utils_1.normalizeNavStep(currStep), utils_1.normalizeNavStep(prevStep));
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
    return (react_1.default.createElement(WizardContext_1.WizardContextProvider, { steps: initialSteps, activeStepIndex: activeStepIndex, footer: footer, onNext: goToNextStep, onBack: goToPrevStep, onClose: onClose, goToStepById: goToStepById, goToStepByName: goToStepByName, goToStepByIndex: goToStepByIndex },
        react_1.default.createElement("div", Object.assign({ className: react_styles_1.css(wizard_1.default.wizard, className), style: Object.assign(Object.assign({}, (height ? { height } : {})), (width ? { width } : {})) }, wrapperProps),
            header,
            react_1.default.createElement(WizardInternal, { nav: nav, isStepVisitRequired: isStepVisitRequired }))));
};
exports.Wizard = Wizard;
const WizardInternal = ({ nav, isStepVisitRequired }) => {
    const { activeStep, steps, footer, goToStepByIndex } = WizardContext_1.useWizardContext();
    const [isNavExpanded, setIsNavExpanded] = react_1.default.useState(false);
    const wizardNav = react_1.default.useMemo(() => {
        if (types_1.isCustomWizardNav(nav)) {
            return typeof nav === 'function' ? nav(isNavExpanded, steps, activeStep, goToStepByIndex) : nav;
        }
        return react_1.default.createElement(WizardNavInternal_1.WizardNavInternal, { nav: nav, isNavExpanded: isNavExpanded, isStepVisitRequired: isStepVisitRequired });
    }, [activeStep, isStepVisitRequired, goToStepByIndex, isNavExpanded, nav, steps]);
    return (react_1.default.createElement(WizardToggle_1.WizardToggle, { nav: wizardNav, footer: footer, steps: steps, activeStep: activeStep, isNavExpanded: isNavExpanded, toggleNavExpanded: () => setIsNavExpanded(prevIsExpanded => !prevIsExpanded) }));
};
exports.Wizard.displayName = 'Wizard';
//# sourceMappingURL=Wizard.js.map