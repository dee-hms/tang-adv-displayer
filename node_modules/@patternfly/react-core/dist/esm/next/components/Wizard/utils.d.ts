import React from 'react';
import { WizardControlStep, WizardNavStepData } from './types';
import { WizardStepProps } from './WizardStep';
/**
 * Accumulate list of step & sub-step props pulled from child components
 * @param children
 * @returns WizardControlStep[]
 */
export declare const buildSteps: (children: React.ReactElement<WizardStepProps> | React.ReactElement<WizardStepProps>[]) => WizardControlStep[];
export declare function isWizardStep(child: any | React.ReactElement<WizardStepProps>): child is React.ReactElement<WizardStepProps>;
export declare const normalizeStep: ({ children, steps, ...controlStep }: WizardStepProps) => Omit<WizardControlStep, 'index'>;
export declare const normalizeNavStep: (navStep: WizardControlStep) => WizardNavStepData;
export declare const getActiveStep: (steps: WizardControlStep[], activeStepIndex: number) => WizardControlStep;
//# sourceMappingURL=utils.d.ts.map