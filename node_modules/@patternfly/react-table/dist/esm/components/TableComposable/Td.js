import { __rest } from "tslib";
import * as React from 'react';
import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/Table/table';
import scrollStyles from '@patternfly/react-styles/css/components/Table/table-scrollable';
import { cellActions } from '../Table/utils/decorators/cellActions';
import { selectable } from '../Table/utils/decorators/selectable';
import { collapsible } from '../Table/utils/decorators/collapsible';
import { compoundExpand } from '../Table/utils/decorators/compoundExpand';
import { cellWidth } from '../Table/utils/decorators/cellWidth';
import { Visibility, classNames } from './../Table/utils/decorators/classNames';
import { favoritable } from '../Table/utils/decorators/favoritable';
import { draggable } from '../Table/utils/decorators/draggable';
import { treeRow } from '../Table/utils/decorators/treeRow';
import { mergeProps } from '../Table/base/merge-props';
import { Tooltip } from '@patternfly/react-core/dist/esm/components/Tooltip/Tooltip';
const TdBase = (_a) => {
    var { children, className, isActionCell = false, component = 'td', dataLabel, textCenter = false, modifier, select = null, actions = null, expand = null, treeRow: treeRowProp = null, compoundExpand: compoundExpandProp = null, noPadding, width, visibility, innerRef, favorites = null, draggableRow: draggableRowProp = null, tooltip = '', onMouseEnter: onMouseEnterProp = () => { }, isStickyColumn = false, hasRightBorder = false, stickyMinWidth = '120px', stickyLeftOffset } = _a, props = __rest(_a, ["children", "className", "isActionCell", "component", "dataLabel", "textCenter", "modifier", "select", "actions", "expand", "treeRow", "compoundExpand", "noPadding", "width", "visibility", "innerRef", "favorites", "draggableRow", "tooltip", "onMouseEnter", "isStickyColumn", "hasRightBorder", "stickyMinWidth", "stickyLeftOffset"]);
    const [showTooltip, setShowTooltip] = React.useState(false);
    const onMouseEnter = (event) => {
        if (event.target.offsetWidth < event.target.scrollWidth) {
            !showTooltip && setShowTooltip(true);
        }
        else {
            showTooltip && setShowTooltip(false);
        }
        onMouseEnterProp(event);
    };
    const selectParams = select
        ? selectable(children, {
            rowIndex: select.rowIndex,
            rowData: {
                selected: select.isSelected,
                disableSelection: select === null || select === void 0 ? void 0 : select.disable,
                props: select === null || select === void 0 ? void 0 : select.props
            },
            column: {
                extraParams: {
                    onSelect: select === null || select === void 0 ? void 0 : select.onSelect,
                    selectVariant: select.variant || 'checkbox'
                }
            }
        })
        : null;
    const favoriteParams = favorites
        ? favoritable(null, {
            rowIndex: favorites === null || favorites === void 0 ? void 0 : favorites.rowIndex,
            rowData: {
                favorited: favorites.isFavorited,
                favoritesProps: favorites === null || favorites === void 0 ? void 0 : favorites.props
            },
            column: {
                extraParams: {
                    onFavorite: favorites === null || favorites === void 0 ? void 0 : favorites.onFavorite
                }
            }
        })
        : null;
    const draggableParams = draggableRowProp !== null
        ? draggable(null, {
            rowData: {
                id: draggableRowProp.id
            }
        })
        : null;
    const actionParamsFunc = actions ? cellActions(actions.items, null, null) : null;
    const actionParams = actionParamsFunc
        ? actionParamsFunc(null, {
            rowIndex: actions === null || actions === void 0 ? void 0 : actions.rowIndex,
            rowData: {
                disableActions: actions === null || actions === void 0 ? void 0 : actions.disable
            },
            column: {
                extraParams: {
                    dropdownPosition: actions === null || actions === void 0 ? void 0 : actions.dropdownPosition,
                    dropdownDirection: actions === null || actions === void 0 ? void 0 : actions.dropdownDirection,
                    actionsToggle: actions === null || actions === void 0 ? void 0 : actions.actionsToggle
                }
            }
        })
        : null;
    const expandableParams = expand !== null
        ? collapsible(null, {
            rowIndex: expand.rowIndex,
            columnIndex: expand === null || expand === void 0 ? void 0 : expand.columnIndex,
            rowData: {
                isOpen: expand.isExpanded
            },
            column: {
                extraParams: {
                    onCollapse: expand === null || expand === void 0 ? void 0 : expand.onToggle,
                    expandId: expand === null || expand === void 0 ? void 0 : expand.expandId
                }
            }
        })
        : null;
    const compoundParams = compoundExpandProp !== null
        ? compoundExpand({
            title: children,
            props: {
                isOpen: compoundExpandProp.isExpanded
            }
        }, {
            rowIndex: compoundExpandProp === null || compoundExpandProp === void 0 ? void 0 : compoundExpandProp.rowIndex,
            columnIndex: compoundExpandProp === null || compoundExpandProp === void 0 ? void 0 : compoundExpandProp.columnIndex,
            column: {
                extraParams: {
                    onExpand: compoundExpandProp === null || compoundExpandProp === void 0 ? void 0 : compoundExpandProp.onToggle,
                    expandId: compoundExpandProp === null || compoundExpandProp === void 0 ? void 0 : compoundExpandProp.expandId
                }
            }
        })
        : null;
    const widthParams = width ? cellWidth(width)() : null;
    const visibilityParams = visibility
        ? classNames(...visibility.map((vis) => Visibility[vis]))()
        : null;
    const treeRowParams = treeRowProp !== null
        ? treeRow(treeRowProp.onCollapse, treeRowProp.onCheckChange, treeRowProp.onToggleRowDetails)({
            title: children
        }, {
            rowIndex: treeRowProp.rowIndex,
            rowData: {
                props: treeRowProp.props
            }
        })
        : null;
    const merged = mergeProps(selectParams, actionParams, expandableParams, compoundParams, widthParams, visibilityParams, favoriteParams, treeRowParams, draggableParams);
    const { 
    // selectable adds this but we don't want it
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isVisible = null, children: mergedChildren = null, className: mergedClassName = '', component: MergedComponent = component } = merged, mergedProps = __rest(merged, ["isVisible", "children", "className", "component"]);
    const treeTableTitleCell = (className && className.includes('pf-c-table__tree-view-title-cell')) ||
        (mergedClassName && mergedClassName.includes('pf-c-table__tree-view-title-cell'));
    const cell = (React.createElement(MergedComponent, Object.assign({}, (!treeTableTitleCell && { 'data-label': dataLabel }), { onMouseEnter: tooltip !== null ? onMouseEnter : onMouseEnterProp, className: css(className, isActionCell && styles.tableAction, textCenter && styles.modifiers.center, noPadding && styles.modifiers.noPadding, isStickyColumn && scrollStyles.tableStickyColumn, hasRightBorder && scrollStyles.modifiers.borderRight, styles.modifiers[modifier], draggableParams && styles.tableDraggable, mergedClassName), ref: innerRef }, mergedProps, props, (isStickyColumn && {
        style: Object.assign({ '--pf-c-table__sticky-column--MinWidth': stickyMinWidth ? stickyMinWidth : undefined, '--pf-c-table__sticky-column--Left': stickyLeftOffset ? stickyLeftOffset : undefined }, props.style)
    })), mergedChildren || children));
    const canMakeDefaultTooltip = tooltip === '' ? typeof children === 'string' : true;
    return tooltip !== null && canMakeDefaultTooltip && showTooltip ? (React.createElement(Tooltip, { content: tooltip || (tooltip === '' && children), isVisible: true }, cell)) : (cell);
};
export const Td = React.forwardRef((props, ref) => (React.createElement(TdBase, Object.assign({}, props, { innerRef: ref }))));
Td.displayName = 'Td';
//# sourceMappingURL=Td.js.map