import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { App } from '@/app/App';
import { AppProviders } from '@/app/AppProviders';

describe('End-to-End React Integration Flow', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders welcome screen and navigates to team setup in MC mode', () => {
    render(
      <AppProviders>
        <App />
      </AppProviders>
    );

    expect(screen.getByText(/^MARIAN LIGHT JOURNEY$/i)).toBeInTheDocument();
    expect(screen.getByText(/Bắt Đầu Trình Chiếu/i)).toBeInTheDocument();

    // Click "Bắt Đầu Trình Chiếu"
    const startBtn = screen.getByText(/Bắt Đầu Trình Chiếu/i);
    fireEvent.click(startBtn);

    // Should now be on Team Setup screen
    expect(screen.getByText(/Đoàn con quy tụ/i)).toBeInTheDocument();
  });

  it('navigates to Round 1 and displays the 11 Clues Grid', () => {
    render(
      <AppProviders>
        <App />
      </AppProviders>
    );

    // Direct nav via Header "Vòng 1: Ô Chữ"
    const v1Nav = screen.getByText(/Vòng 1: Mật mã/i);
    fireEvent.click(v1Nav);

    expect(screen.getByText(/11 mật mã đức tin/i)).toBeInTheDocument();
    expect(screen.getByText(/Tên bài ca ngợi khen nổi tiếng của Đức Mẹ/i)).toBeInTheDocument();
  });

  it('navigates to Round 2 and shows the first quiz question', () => {
    render(
      <AppProviders>
        <App />
      </AppProviders>
    );

    const v2Nav = screen.getByText(/Vòng 2: Trắc Nghiệm/i);
    fireEvent.click(v2Nav);

    expect(screen.getByRole('heading', {name:/Thử thách đức tin/i, level:1})).toBeInTheDocument();
    expect(screen.getByText(/Tín điều Đức Mẹ Vô Nhiễm Nguyên Tội/i)).toBeInTheDocument();
  });

  it('navigates to Round 3 and displays the reflection question bank', () => {
    render(
      <AppProviders>
        <App />
      </AppProviders>
    );

    const v3Nav = screen.getByText(/Vòng 3: Xin Vâng/i);
    fireEvent.click(v3Nav);

    expect(screen.getByRole('heading', {name:/Hành trình Xin Vâng/i, level:1})).toBeInTheDocument();
    expect(screen.getByText(/Ai là cha mẹ của Đức Maria/i)).toBeInTheDocument();
  });

  it('navigates to scoreboard and displays rankings', () => {
    render(
      <AppProviders>
        <App />
      </AppProviders>
    );

    const scoreNav = screen.getByText(/Bảng Điểm/i);
    fireEvent.click(scoreNav);

    expect(screen.getByText(/BẢNG XẾP HẠNG THÁNH/i)).toBeInTheDocument();
  });
});
