import * as React from 'react';
export interface WizardNavItemProps {
    /** Can nest a WizardNav component for substeps */
    children?: React.ReactNode;
    /** The content to display in the navigation item */
    content?: React.ReactNode;
    /** Whether the navigation item is the currently active item */
    isCurrent?: boolean;
    /** Whether the navigation item is disabled */
    isDisabled?: boolean;
    /** Whether the navigation item has been visited */
    isVisited?: boolean;
    /** The step index passed into the onNavItemClick callback */
    stepIndex: number;
    /** Callback for when the navigation item is clicked */
    onNavItemClick?: (stepIndex: number) => any;
    /** Component used to render WizardNavItem */
    navItemComponent?: 'button' | 'a';
    /** An optional url to use for when using an anchor component */
    href?: string;
    /** Flag indicating that this NavItem has child steps and is expandable */
    isExpandable?: boolean;
    /** The id for the navigation item */
    id?: string | number;
    /** Used to determine the icon displayed next to content. Default has no icon. */
    status?: 'default' | 'error';
}
export declare const WizardNavItem: React.FunctionComponent<WizardNavItemProps>;
//# sourceMappingURL=WizardNavItem.d.ts.map