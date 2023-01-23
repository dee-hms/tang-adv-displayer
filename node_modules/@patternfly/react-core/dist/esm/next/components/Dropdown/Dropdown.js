import { __rest } from "tslib";
import React from 'react';
import { css } from '@patternfly/react-styles';
import { Menu, MenuContent } from '../../../components/Menu';
import { Popper } from '../../../helpers/Popper/Popper';
import { useOUIAProps } from '../../../helpers';
const DropdownBase = (_a) => {
    var { children, className, onSelect, isOpen, toggle, onOpenChange, isPlain, isScrollable, minWidth, innerRef, ouiaId, ouiaSafe = true, zIndex = 9999 } = _a, props = __rest(_a, ["children", "className", "onSelect", "isOpen", "toggle", "onOpenChange", "isPlain", "isScrollable", "minWidth", "innerRef", "ouiaId", "ouiaSafe", "zIndex"]);
    const localMenuRef = React.useRef();
    const toggleRef = React.useRef();
    const containerRef = React.useRef();
    const ouiaProps = useOUIAProps(Dropdown.displayName, ouiaId, ouiaSafe);
    const menuRef = innerRef || localMenuRef;
    React.useEffect(() => {
        const handleMenuKeys = (event) => {
            var _a, _b, _c, _d;
            if (!isOpen && ((_a = toggleRef.current) === null || _a === void 0 ? void 0 : _a.contains(event.target))) {
                // toggle was clicked open, focus on first menu item
                if (event.key === 'Enter') {
                    setTimeout(() => {
                        const firstElement = menuRef.current.querySelector('li > button:not(:disabled)');
                        firstElement && firstElement.focus();
                    }, 0);
                }
            }
            // Close the menu on tab or escape if onOpenChange is provided
            if ((isOpen && onOpenChange && ((_b = menuRef.current) === null || _b === void 0 ? void 0 : _b.contains(event.target))) ||
                ((_c = toggleRef.current) === null || _c === void 0 ? void 0 : _c.contains(event.target))) {
                if (event.key === 'Escape' || event.key === 'Tab') {
                    onOpenChange(!isOpen);
                    (_d = toggleRef.current) === null || _d === void 0 ? void 0 : _d.focus();
                }
            }
        };
        const handleClickOutside = (event) => {
            var _a, _b;
            // If the event is not on the toggle and onOpenChange callback is provided, close the menu
            if (isOpen && onOpenChange && !((_a = toggleRef === null || toggleRef === void 0 ? void 0 : toggleRef.current) === null || _a === void 0 ? void 0 : _a.contains(event.target))) {
                if (isOpen && !((_b = menuRef.current) === null || _b === void 0 ? void 0 : _b.contains(event.target))) {
                    onOpenChange(false);
                }
            }
        };
        window.addEventListener('keydown', handleMenuKeys);
        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('keydown', handleMenuKeys);
            window.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen, menuRef, onOpenChange]);
    const menu = (React.createElement(Menu, Object.assign({ className: css(className), ref: menuRef, onSelect: (event, itemId) => onSelect(event, itemId), isPlain: isPlain, isScrollable: isScrollable }, (minWidth && {
        style: {
            '--pf-c-menu--MinWidth': minWidth
        }
    }), props),
        React.createElement(MenuContent, null, children)));
    return (React.createElement("div", Object.assign({ ref: containerRef }, ouiaProps),
        React.createElement(Popper, { trigger: toggle(toggleRef), removeFindDomNode: true, popper: menu, appendTo: containerRef.current || undefined, isVisible: isOpen, zIndex: zIndex })));
};
export const Dropdown = React.forwardRef((props, ref) => (React.createElement(DropdownBase, Object.assign({ innerRef: ref }, props))));
Dropdown.displayName = 'Dropdown';
//# sourceMappingURL=Dropdown.js.map