/* eslint-env jest */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import  App from '../src/App';
import { useTypeRushStore } from '../src/util/store';
import React from 'react';


//Create a mock store
const createMockStore = () => ({
    points: 0, 
    earnedPoints: 0,
    setPoints: vi.fn(),
    setEarnedPoints: vi.fn(),
});

//Mock the entire store module
vi.mock('./util/store', () => ({
    useTypeRushStore: vi.fn(),
}));

//Mock the texts 
vi.mock('./util/texts', () => ({
    texts: ['test text']
}));

describe('App', ()=> {
    beforeEach(() => {
        //Reset all mocks before each test
        vi.clearAllMocks();
        // Set up the mock implementation for the store
        vi.mocked(useTypeRushStore).mockImplementation(() => createMockStore());
    });

    it('renders without crashing', () => {
        render(<App />);
        expect(screen.getByText(/Timer/i)).toBeInTheDocument();
    });

    it('shows initial game state', () => {
        render(<App />);
        expect(screen.getByPlaceholderText('Start typing...')).toBeInTheDocument();
    });
});


