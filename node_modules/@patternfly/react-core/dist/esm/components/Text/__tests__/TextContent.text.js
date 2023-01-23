import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { TextContent } from '../TextContent';
test('Renders without children', () => {
    render(React.createElement("div", { "data-testid": "test-content" },
        React.createElement(TextContent, null)));
    expect(screen.getByTestId('test-content').firstChild).toBeVisible();
});
test('Renders children', () => {
    render(React.createElement(TextContent, null, "Test"));
    expect(screen.getByText('Test')).toBeVisible();
});
test('Renders with class name pf-c-content', () => {
    render(React.createElement(TextContent, null, "Test"));
    expect(screen.getByText('Test')).toHaveClass('pf-c-content', { exact: true });
});
test('Renders with custom class name when className prop is provided', () => {
    render(React.createElement(TextContent, { className: "custom-class" }, "Test"));
    expect(screen.getByText('Test')).toHaveClass('custom-class');
});
test('Renders without class name pf-m-visited by default', () => {
    render(React.createElement(TextContent, null, "Test"));
    expect(screen.getByText('Test')).not.toHaveClass('pf-m-visited');
});
test('Renders with class name pf-m-visited when isVisited=true', () => {
    render(React.createElement(TextContent, { isVisited: true }, "Test"));
    expect(screen.getByText('Test')).toHaveClass('pf-m-visited');
});
test('Renders with inherited element props spread to the component', () => {
    render(React.createElement(TextContent, { "aria-label": "Test label" }, "Test"));
    expect(screen.getByText('Test')).toHaveAccessibleName('Test label');
});
test('Matches the snapshot', () => {
    const { asFragment } = render(React.createElement(TextContent, null, "Test"));
    expect(asFragment()).toMatchSnapshot();
});
//# sourceMappingURL=TextContent.text.js.map