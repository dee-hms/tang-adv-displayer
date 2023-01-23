"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Td = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_styles_1 = require("@patternfly/react-styles");
const table_1 = tslib_1.__importDefault(require("@patternfly/react-styles/css/components/Table/table"));
const table_scrollable_1 = tslib_1.__importDefault(require("@patternfly/react-styles/css/components/Table/table-scrollable"));
const cellActions_1 = require("../Table/utils/decorators/cellActions");
const selectable_1 = require("../Table/utils/decorators/selectable");
const collapsible_1 = require("../Table/utils/decorators/collapsible");
const compoundExpand_1 = require("../Table/utils/decorators/compoundExpand");
const cellWidth_1 = require("../Table/utils/decorators/cellWidth");
const classNames_1 = require("./../Table/utils/decorators/classNames");
const favoritable_1 = require("../Table/utils/decorators/favoritable");
const draggable_1 = require("../Table/utils/decorators/draggable");
const treeRow_1 = require("../Table/utils/decorators/treeRow");
const merge_props_1 = require("../Table/base/merge-props");
const Tooltip_1 = require('@patternfly/react-core/dist/js/components/Tooltip/Tooltip');
const TdBase = (_a) => {
    var { children, className, isActionCell = false, component = 'td', dataLabel, textCenter = false, modifier, select = null, actions = null, expand = null, treeRow: treeRowProp = null, compoundExpand: compoundExpandProp = null, noPadding, width, visibility, innerRef, favorites = null, draggableRow: draggableRowProp = null, tooltip = '', onMouseEnter: onMouseEnterProp = () => { }, isStickyColumn = false, hasRightBorder = false, stickyMinWidth = '120px', stickyLeftOffset } = _a, props = tslib_1.__rest(_a, ["children", "className", "isActionCell", "component", "dataLabel", "textCenter", "modifier", "select", "actions", "expand", "treeRow", "compoundExpand", "noPadding", "width", "visibility", "innerRef", "favorites", "draggableRow", "tooltip", "onMouseEnter", "isStickyColumn", "hasRightBorder", "stickyMinWidth", "stickyLeftOffset"]);
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
        ? selectable_1.selectable(children, {
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
        ? favoritable_1.favoritable(null, {
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
        ? draggable_1.draggable(null, {
            rowData: {
                id: draggableRowProp.id
            }
        })
        : null;
    const actionParamsFunc = actions ? cellActions_1.cellActions(actions.items, null, null) : null;
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
        ? collapsible_1.collapsible(null, {
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
        ? compoundExpand_1.compoundExpand({
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
    const widthParams = width ? cellWidth_1.cellWidth(width)() : null;
    const visibilityParams = visibility
        ? classNames_1.classNames(...visibility.map((vis) => classNames_1.Visibility[vis]))()
        : null;
    const treeRowParams = treeRowProp !== null
        ? treeRow_1.treeRow(treeRowProp.onCollapse, treeRowProp.onCheckChange, treeRowProp.onToggleRowDetails)({
            title: children
        }, {
            rowIndex: treeRowProp.rowIndex,
            rowData: {
                props: treeRowProp.props
            }
        })
        : null;
    const merged = merge_props_1.mergeProps(selectParams, actionParams, expandableParams, compoundParams, widthParams, visibilityParams, favoriteParams, treeRowParams, draggableParams);
    const { 
    // selectable adds this but we don't want it
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isVisible = null, children: mergedChildren = null, className: mergedClassName = '', component: MergedComponent = component } = merged, mergedProps = tslib_1.__rest(merged, ["isVisible", "children", "className", "component"]);
    const treeTableTitleCell = (className && className.includes('pf-c-table__tree-view-title-cell')) ||
        (mergedClassName && mergedClassName.includes('pf-c-table__tree-view-title-cell'));
    const cell = (React.createElement(MergedComponent, Object.assign({}, (!treeTableTitleCell && { 'data-label': dataLabel }), { onMouseEnter: tooltip !== null ? onMouseEnter : onMouseEnterProp, className: react_styles_1.css(className, isActionCell && table_1.default.tableAction, textCenter && table_1.default.modifiers.center, noPadding && table_1.default.modifiers.noPadding, isStickyColumn && table_scrollable_1.default.tableStickyColumn, hasRightBorder && table_scrollable_1.default.modifiers.borderRight, table_1.default.modifiers[modifier], draggableParams && table_1.default.tableDraggable, mergedClassName), ref: innerRef }, mergedProps, props, (isStickyColumn && {
        style: Object.assign({ '--pf-c-table__sticky-column--MinWidth': stickyMinWidth ? stickyMinWidth : undefined, '--pf-c-table__sticky-column--Left': stickyLeftOffset ? stickyLeftOffset : undefined }, props.style)
    })), mergedChildren || children));
    const canMakeDefaultTooltip = tooltip === '' ? typeof children === 'string' : true;
    return tooltip !== null && canMakeDefaultTooltip && showTooltip ? (React.createElement(Tooltip_1.Tooltip, { content: tooltip || (tooltip === '' && children), isVisible: true }, cell)) : (cell);
};
exports.Td = React.forwardRef((props, ref) => (React.createElement(TdBase, Object.assign({}, props, { innerRef: ref }))));
exports.Td.displayName = 'Td';
//# sourceMappingURL=Td.js.map