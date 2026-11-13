import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { App } from '@/app/App';
import { AppProviders } from '@/app/AppProviders';
function openRound(name:RegExp) { render(<AppProviders><App/></AppProviders>);fireEvent.click(screen.getByRole('button',{name})); }
describe('Game-show answer disclosure',()=>{
 beforeEach(()=>{localStorage.clear();});
 afterEach(()=>{vi.useRealTimers();});
 it('R1 hides the answer until the host starts, locks and explicitly reveals',()=>{
  openRound(/Vòng 1: Mật mã/i);
  expect(screen.queryByText('MAGNIFICAT')).not.toBeInTheDocument();
  expect(screen.queryByRole('button',{name:/Chính xác/i})).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button',{name:/Bắt đầu · 30 giây/i}));
  expect(screen.queryByText('MAGNIFICAT')).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button',{name:/Khóa lượt trả lời/i}));
  expect(screen.queryByText('MAGNIFICAT')).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button',{name:/Công bố đáp án/i}));
  expect(screen.getByText('MAGNIFICAT')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button',{name:/Chính xác/i}));
  fireEvent.click(screen.getByRole('button',{name:/Gợi ý tiếp theo/i}));
  expect(screen.queryByText('MAGNIFICAT')).not.toBeInTheDocument();
  expect(screen.getByRole('button',{name:/Bắt đầu · 30 giây/i})).toBeInTheDocument();
 });
 it('R1 expiry locks the turn without revealing the answer',()=>{
  vi.useFakeTimers();openRound(/Vòng 1: Mật mã/i);
  fireEvent.click(screen.getByRole('button',{name:/Bắt đầu · 30 giây/i}));
  act(()=>vi.advanceTimersByTime(30000));
  expect(screen.queryByText('MAGNIFICAT')).not.toBeInTheDocument();
  expect(screen.getByRole('button',{name:/Công bố đáp án/i})).toBeInTheDocument();
 });
 it('R2 locks a selection without showing the correct answer or awarding points',()=>{
  openRound(/Vòng 2: Trắc nghiệm/i);
  fireEvent.click(screen.getByRole('button',{name:/Bắt đầu đếm giờ/i}));
  fireEvent.click(screen.getByRole('button',{name:/Năm 1854; khẳng định ngay từ giây phút đầu tiên/i}));
  fireEvent.click(screen.getByRole('button',{name:/Khóa đáp án B/i}));
  expect(screen.queryByRole('heading',{name:/Đáp án B/i})).not.toBeInTheDocument();
  expect(JSON.parse(localStorage.getItem('marian_light_journey_session_v1')!).teams[0].score).toBe(0);
  fireEvent.click(screen.getByRole('button',{name:/Công bố đáp án/i}));
  expect(screen.getByRole('heading',{name:/Đáp án B/i})).toBeInTheDocument();
  expect(JSON.parse(localStorage.getItem('marian_light_journey_session_v1')!).teams[0].score).toBe(20);
 });
 it('R3 keeps reference answers hidden until the host closes the turn and reveals',()=>{
  openRound(/Vòng 3: Xin Vâng/i);
  fireEvent.click(screen.getByRole('button',{name:/Ai là cha mẹ của Đức Maria/i}));
  expect(screen.queryByText(/Thánh Gio-akim \(Joachim\)/i)).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button',{name:/Bắt đầu · 60 giây/i}));
  fireEvent.click(screen.getByRole('button',{name:/Khóa lượt trả lời/i}));
  expect(screen.queryByText(/Thánh Gio-akim \(Joachim\)/i)).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button',{name:/Công bố đáp án tham khảo/i}));
  expect(screen.getByText(/Thánh Gio-akim \(Joachim\)/i)).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button',{name:/Đúng trọn vẹn/i}));
  expect(screen.queryByRole('button',{name:/Đúng trọn vẹn/i})).not.toBeInTheDocument();
 });
 it('R1 pauses the countdown and resumes from the remaining time',()=>{
  vi.useFakeTimers();openRound(/Vòng 1: Mật mã/i);
  fireEvent.click(screen.getByRole('button',{name:/Bắt đầu · 30 giây/i}));
  act(()=>vi.advanceTimersByTime(1000));
  expect(screen.getByLabelText('Còn 29 giây')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button',{name:'Tạm dừng'}));
  act(()=>vi.advanceTimersByTime(10000));
  expect(screen.getByLabelText('Còn 29 giây')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button',{name:'Tiếp tục'}));
  act(()=>vi.advanceTimersByTime(2000));
  expect(screen.getByLabelText('Còn 27 giây')).toBeInTheDocument();
  expect(screen.queryByText('MAGNIFICAT')).not.toBeInTheDocument();
 });
 it('R2 expiry still requires explicit publication of the solution',()=>{
  vi.useFakeTimers();openRound(/Vòng 2: Trắc nghiệm/i);
  fireEvent.click(screen.getByRole('button',{name:/Bắt đầu đếm giờ/i}));
  act(()=>vi.advanceTimersByTime(20000));
  expect(screen.getByRole('button',{name:'Công bố đáp án'})).toBeInTheDocument();
  expect(screen.queryByRole('heading',{name:'Đáp án B'})).not.toBeInTheDocument();
  expect(JSON.parse(localStorage.getItem('marian_light_journey_session_v1')!).teams[0].score).toBe(0);
 });

});
