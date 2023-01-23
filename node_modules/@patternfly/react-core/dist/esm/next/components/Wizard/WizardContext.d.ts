import React from 'react';
import { WizardControlStep, WizardFooterType } from './types';
import { WizardFooterProps } from './WizardFooter';
export interface WizardContextProps {
    /** List of steps */
    steps: WizardControlStep[];
    /** Current step */
    activeStep: WizardControlStep;
    /** Footer element */
    footer: React.ReactElement;
    /** Navigate to the next step */
    onNext: () => void | Promise<void>;
    /** Navigate to the previous step */
    onBack: () => void | Promise<void>;
    /** Close the wizard */
    onClose: () => void;
    /** Navigate to step by ID */
    goToStepById: (id: number | string) => void;
    /** Navigate to step by name */
    goToStepByName: (name: string) => void;
    /** Navigate to step by index */
    goToStepByIndex: (index: number) => void;
    /** Update the footer with any react element */
    setFooter: (footer: React.ReactElement | Partial<WizardFooterProps>) => void;
    /** Get step by ID */
    getStep: (stepId: number | string) => WizardControlStep;
    /** Set step by ID */
    setStep: (step: Pick<WizardControlStep, 'id'> & Partial<WizardControlStep>) => void;
}
export declare const WizardContext: React.Context<WizardContextProps>;
export interface WizardContextProviderProps {
    steps: WizardControlStep[];
    activeStepIndex: number;
    footer: WizardFooterType;
    children: React.ReactElement;
    onNext(steps: WizardControlStep[]): void;
    onBack(steps: WizardControlStep[]): void;
    onClose(): void;
    goToStepById(steps: WizardControlStep[], id: number | string): void;
    goToStepByName(steps: WizardControlStep[], name: string): void;
    goToStepByIndex(steps: WizardControlStep[], index: number): void;
}
export declare const WizardContextProvider: React.FunctionComponent<WizardContextProviderProps>;
export declare const useWizardContext: () => WizardContextProps;
//# sourceMappingURL=WizardContext.d.ts.map