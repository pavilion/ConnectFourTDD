/**
 * @format
 */
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-native/extend-expect';
import {render, fireEvent, cleanup} from '@testing-library/react-native';
import {App} from 'components/src/App';
import Board from 'components/src/Board';
import * as React from 'react';

afterEach(cleanup);

//App
test('Renders the shared app', async () => {
  render(<App />);
});

//Board
describe('User clicks the first column', () => {
  it('should appear an `X` in the bottom of that column', async () => {
    const {getAllByTestId} = render(<Board nRows={4} nColumns={4} />);
    const cellNode = getAllByTestId('cellContainer')[0];
    const cellText = getAllByTestId('cellText')[12];
    fireEvent.press(cellNode);
    expect(cellText.props.children).toBe('X');
  });
});
