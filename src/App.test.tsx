import { render, screen } from '@testing-library/react';
import { describe, test } from 'vitest';
import App from './App';

describe('App', () => {
	test('renders App component', () => {
		render(<App />);

		screen.debug();
	});
});
