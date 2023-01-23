import { __rest } from "tslib";
import React from 'react';
import { css } from '@patternfly/react-styles';
import { MenuList } from '../../../components/Menu';
export const SelectList = (_a) => {
    var { children, className } = _a, props = __rest(_a, ["children", "className"]);
    return (React.createElement(MenuList, Object.assign({ className: css(className) }, props), children));
};
SelectList.displayName = 'SelectList';
//# sourceMappingURL=SelectList.js.map