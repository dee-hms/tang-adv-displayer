import { __rest } from "tslib";
import * as React from 'react';
import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/Wizard/wizard';
import AngleRightIcon from '@patternfly/react-icons/dist/esm/icons/angle-right-icon';
import ExclamationCircleIcon from '@patternfly/react-icons/dist/esm/icons/exclamation-circle-icon';
import { WizardNavItemStatus } from './types';
export const WizardNavItem = (_a) => {
    var { children = null, content = '', isCurrent = false, isDisabled = false, isVisited = false, stepIndex, onNavItemClick = () => undefined, navItemComponent = 'button', href = null, isExpandable = false, id, status = 'default' } = _a, rest = __rest(_a, ["children", "content", "isCurrent", "isDisabled", "isVisited", "stepIndex", "onNavItemClick", "navItemComponent", "href", "isExpandable", "id", "status"]);
    const NavItemComponent = navItemComponent;
    const [isExpanded, setIsExpanded] = React.useState(false);
    React.useEffect(() => {
        setIsExpanded(isCurrent);
    }, [isCurrent]);
    if (navItemComponent === 'a' && !href && process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.error('WizardNavItem: When using an anchor, please provide an href');
    }
    const ariaLabel = React.useMemo(() => {
        if (status === WizardNavItemStatus.Error || (isVisited && !isCurrent)) {
            let label = content.toString();
            if (status === WizardNavItemStatus.Error) {
                label += `, ${status}`;
            }
            // No need to signify step is visited if current
            if (isVisited && !isCurrent) {
                label += ', visited';
            }
            return label;
        }
    }, [content, isCurrent, isVisited, status]);
    return (React.createElement("li", { className: css(styles.wizardNavItem, isExpandable && styles.modifiers.expandable, isExpandable && isExpanded && styles.modifiers.expanded) },
        React.createElement(NavItemComponent, Object.assign({}, rest, (navItemComponent === 'a' ? { tabIndex: isDisabled ? -1 : undefined, href } : { disabled: isDisabled }), (id && { id: id.toString() }), { onClick: e => {
                e.preventDefault();
                isExpandable ? setIsExpanded(!isExpanded || isCurrent) : onNavItemClick(stepIndex);
            }, className: css(styles.wizardNavLink, isCurrent && styles.modifiers.current, isDisabled && styles.modifiers.disabled), "aria-disabled": isDisabled ? true : null, "aria-current": isCurrent && !children ? 'step' : false }, (isExpandable && { 'aria-expanded': isExpanded }), (ariaLabel && { 'aria-label': ariaLabel })), isExpandable ? (React.createElement(React.Fragment, null,
            React.createElement("span", { className: css(styles.wizardNavLinkText) }, content),
            React.createElement("span", { className: css(styles.wizardNavLinkToggle) },
                React.createElement("span", { className: css(styles.wizardNavLinkToggleIcon) },
                    React.createElement(AngleRightIcon, { "aria-label": `${isCurrent ? 'Collapse' : 'Expand'} step icon` }))))) : (React.createElement(React.Fragment, null,
            content,
            status === WizardNavItemStatus.Error && (React.createElement("span", { style: { marginLeft: 'var(--pf-global--spacer--sm)' } },
                React.createElement(ExclamationCircleIcon, { color: "var(--pf-global--danger-color--100)" })))))),
        children));
};
WizardNavItem.displayName = 'WizardNavItem';
//# sourceMappingURL=WizardNavItem.js.map