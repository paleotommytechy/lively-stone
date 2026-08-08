import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Avatar, AvatarFallback, AvatarImage, getInitials } from '../components/ui/Avatar';

describe('Avatar & Default Fallback Handling', () => {
  describe('getInitials helper', () => {
    it('extracts two-letter initials from standard two-word names', () => {
      expect(getInitials('Ifeoluwa Olusegun')).toBe('IO');
      expect(getInitials('Praise Wilson')).toBe('PW');
      expect(getInitials('David Omoyajowo')).toBe('DO');
    });

    it('removes ministerial / ceremonial titles gracefully', () => {
      expect(getInitials('Saint Abraham Babatunde')).toBe('AB');
      expect(getInitials('Pastor John Doe')).toBe('JD');
      expect(getInitials('Minister Grace Smith')).toBe('GS');
    });

    it('extracts initials from single names', () => {
      expect(getInitials('David')).toBe('DA');
      expect(getInitials('Disciple')).toBe('DI');
    });

    it('extracts initials from emails when email is passed as name', () => {
      expect(getInitials('ifeoluwa.olusegun@livelystones.org')).toBe('IO');
      expect(getInitials('david@livelystones.org')).toBe('DA');
    });

    it('handles null, undefined, empty, and whitespace strings without throwing', () => {
      expect(getInitials(null)).toBe('');
      expect(getInitials(undefined)).toBe('');
      expect(getInitials('')).toBe('');
      expect(getInitials('   ')).toBe('');
    });
  });

  describe('Avatar Component Fallbacks', () => {
    it('renders initials fallback when src is null, undefined, or empty', () => {
      const { container } = render(<Avatar src={null} name="Ifeoluwa Olusegun" />);
      expect(screen.getByText('IO')).toBeInTheDocument();
      expect(container.querySelector('img')).toBeNull();
    });

    it('renders initials fallback when src is whitespace or string "null"', () => {
      const { container: c1 } = render(<Avatar src="   " name="Praise Wilson" />);
      expect(screen.getByText('PW')).toBeInTheDocument();
      expect(c1.querySelector('img')).toBeNull();

      const { container: c2 } = render(<Avatar src="null" name="David Omoyajowo" />);
      expect(screen.getByText('DO')).toBeInTheDocument();
      expect(c2.querySelector('img')).toBeNull();
    });

    it('renders neutral placeholder icon when neither valid src nor name is available', () => {
      const { container } = render(<Avatar src={null} name="" />);
      // Should not render an img tag
      expect(container.querySelector('img')).toBeNull();
      // Should render SVG icon fallback
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('switches to fallback when image load encounters an onError event (e.g. 404 or broken URL)', () => {
      const { container } = render(<Avatar src="https://example.com/broken-nonexistent-avatar.png" name="David Omoyajowo" />);
      
      const img = container.querySelector('img');
      expect(img).not.toBeNull();

      // Trigger broken image load
      fireEvent.error(img!);

      // Broken img should no longer be rendered, initials fallback displayed
      expect(container.querySelector('img')).toBeNull();
      expect(screen.getByText('DO')).toBeInTheDocument();
    });

    it('supports compound AvatarImage and AvatarFallback usage', () => {
      render(
        <Avatar name="Praise Wilson">
          <AvatarImage src="" />
          <AvatarFallback />
        </Avatar>
      );
      expect(screen.getByText('PW')).toBeInTheDocument();
    });

    it('applies custom size and status indicator badge without error', () => {
      const { container } = render(
        <Avatar 
          src={null} 
          name="Ifeoluwa Olusegun" 
          size="lg" 
          status="online" 
          className="ring-2 ring-gold-400"
        />
      );
      expect(screen.getByText('IO')).toBeInTheDocument();
      expect(container.querySelector('.w-12')).toBeInTheDocument();
      expect(container.querySelector('.bg-emerald-400')).toBeInTheDocument();
    });
  });
});
