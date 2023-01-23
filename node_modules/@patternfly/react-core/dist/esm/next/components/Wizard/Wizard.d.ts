import React from 'react';
import { WizardNavStepFunction, WizardFooterType, WizardNavType } from './types';
import { WizardStepProps } from './WizardStep';
/**
 * Wrapper for all steps and hosts state, including navigation helpers, within context.
 * The WizardContext provided by default gives any child of wizard access to those resources.
 */
export interface WizardProps extends React.HTMLProps<HTMLDivElement> {
    /** Step components */
    children: React.ReactElement<WizardStepProps> | React.ReactElement<WizardStepProps>[];
    /** Wizard header */
    header?: React.ReactNode;
    /** Wizard footer */
    footer?: WizardFooterType;
    /** Wizard navigation */
    nav?: WizardNavType;
    /** The initial index the wizard is to start on (1 or higher). Defaults to 1. */
    startIndex?: number;
    /** Additional classes spread to the wizard */
    className?: string;
    /** Custom width of the wizard */
    width?: number | string;
    /** Custom height of the wizard */
    height?: number | string;
    /** Disables navigation items that haven't been visited. Defaults to false */
    isStepVisitRequired?: boolean;
    /** Callback function when a step in the navigation is clicked */
    onNavByIndex?: WizardNavStepFunction;
    /** Callback function after next button is clicked */
    onNext?: WizardNavStepFunction;
    /** Callback function after back button is clicked */
    onBack?: WizardNavStepFunction;
    /** Callback function to save at the end of the wizard, if not specified uses onClose */
    onSave?: () => void | Promise<void>;
    /** Callback function to close the wizard */
    onClose?: () => void;
}
export declare const Wizard: {
    ({ children, footer, height, width, className, header, nav, startIndex, isStepVisitRequired, onNavByIndex, onNext, onBack, onSave, onClose, ...wrapperProps }: WizardProps): JSX.Element;
    displayName: string;
};
//# sourceMappingURL=Wizard.d.ts.map