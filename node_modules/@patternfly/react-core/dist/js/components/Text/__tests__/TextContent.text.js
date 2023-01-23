"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_1 = require("@testing-library/react");
const TextContent_1 = require("../TextContent");
test('Renders without children', () => {
    react_1.render(React.createElement("div", { "data-testid": "test-content" },
        React.createElement(TextContent_1.TextContent, null)));
    expect(react_1.screen.getByTestId('test-content').firstChild).toBeVisible();
});
test('Renders children', () => {
    react_1.render(React.createElement(TextContent_1.TextContent, null, "Test"));
    expect(react_1.screen.getByText('Test')).toBeVisible();
});
test('Renders with class name pf-c-content', () => {
    react_1.render(React.createElement(TextContent_1.TextContent, null, "Test"));
    expect(react_1.screen.getByText('Test')).toHaveClass('pf-c-content', { exact: true });
});
test('Renders with custom class name when className prop is provided', () => {
    react_1.render(React.createElement(TextContent_1.TextContent, { className: "custom-class" }, "Test"));
    expect(react_1.screen.getByText('Test')).toHaveClass('custom-class');
});
test('Renders without class name pf-m-visited by default', () => {
    react_1.render(React.createElement(TextContent_1.TextContent, null, "Test"));
    expect(react_1.screen.getByText('Test')).not.toHaveClass('pf-m-visited');
});
test('Renders with class name pf-m-visited when isVisited=true', () => {
    react_1.render(React.createElement(TextContent_1.TextContent, { isVisited: true }, "Test"));
    expect(react_1.screen.getByText('Test')).toHaveClass('pf-m-visited');
});
test('Renders with inherited element props spread to the component', () => {
    react_1.render(React.createElement(TextContent_1.TextContent, { "aria-label": "Test label" }, "Test"));
    expect(react_1.screen.getByText('Test')).toHaveAccessibleName('Test label');
});
test('Matches the snapshot', () => {
    const { asFragment } = react_1.render(React.createElement(TextContent_1.TextContent, null, "Test"));
    expect(asFragment()).toMatchSnapshot();
});
//# sourceMappingURL=TextContent.text.js.map