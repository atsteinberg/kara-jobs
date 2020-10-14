import React from 'react';
import {render, screen } from '@testing-library/react';

import Footer from './Footer';
describe('Footer', () => {
  it('renders Footer', () => {
    render(<Footer />);
    expect(screen.getByText('Footer works!')).not.toBe(null);
  })
})