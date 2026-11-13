# TEST EXECUTION REPORT — BÁO CÁO KIỂM THỬ CHẤT LƯỢNG
## Dự án: Marian Light Journey — Hành Trình Ánh Sáng

### 1. Tổng quan kết quả kiểm thử Vitest
- **Tổng số test suite:** 6 file
- **Tổng số bài test đã chạy:** 26 tests
- **Passed:** 26 (100%)
- **Failed:** 0
- **Thời gian thực thi:** 4.52s

---

### 2. Chi tiết các Test Suite

#### 1. `tests/unit/normalize.test.ts` (6 tests - Passed)
- Kiểm tra chuẩn hóa khoảng trắng thừa và chữ in hoa.
- Xử lý ký tự đặc biệt tiếng Việt `Đ` và `đ` (loại bỏ dấu thành `D`).
- Đối chiếu câu trả lời có dấu chính xác với danh sách aliases được duyệt.
- Hỗ trợ đối chiếu không dấu linh hoạt (Magnificat, Tong Hien, Sao Bien...).
- Từ chối chính xác các câu trả lời sai lệch giáo lý.
- Tách từ thành các ô chữ cái trực quan (Tile Characters).

#### 2. `tests/unit/question-bank.test.ts` (5 tests - Passed)
- Kiểm tra toàn bộ 11 câu gợi ý ô chữ qua Zod Schema.
- Xác thực 11 chữ cái mật mã ghép thành chuỗi chính xác: `ĐỨCMẸLAVANG`.
- Kiểm tra toàn bộ 10 câu trắc nghiệm qua Zod Schema: Đúng 4 phương án A/B/C/D, 1 đáp án chuẩn duy nhất.
- Kiểm tra toàn bộ 12 câu tự luận qua Zod Schema: Rubric điểm chuẩn (20/10/0).
- Đảm bảo tính độc nhất (unique) của tất cả ID câu hỏi trong toàn bộ ngân hàng câu hỏi.

#### 3. `tests/unit/scoring.test.ts` (4 tests - Passed)
- Kiểm tra tính toán cộng điểm theo từng đội và từng vòng chơi.
- Kiểm tra tổng điểm lũy tiến qua 3 vòng.
- Kiểm tra thuật toán sắp xếp thứ hạng (bảo đảm thứ hạng đúng theo điểm số và tiêu chí phụ khi hòa điểm).
- Kiểm tra cấu trúc bản ghi ScoreEvent truy vết điểm số.

#### 4. `tests/unit/game-engine.test.ts` (3 tests - Passed)
- Ngăn chặn cộng điểm 2 lần khi click đúp vào câu hỏi đã giải.
- Kiểm tra khóa đáp án trắc nghiệm Vòng 2 và trạng thái đếm giờ.
- Kiểm tra cơ chế **Undo**: Khôi phục chính xác trạng thái điểm số và câu hỏi trước đó.

#### 5. `tests/unit/session.test.ts` (3 tests - Passed)
- Kiểm tra lưu và khôi phục trạng thái trận đấu vào `localStorage`.
- Kiểm tra xuất và nhập file cấu trúc JSON an toàn.
- Kiểm tra phát hiện và từ chối các file JSON bị sai lệch cấu trúc schema.

#### 6. `tests/integration/gameplay-flow.test.tsx` (5 tests - Passed)
- Kiểm tra luồng màn hình mở đầu (Welcome) sang thiết lập đội (Team Setup) trong MC Mode.
- Kiểm tra nạp và hiển thị bảng 11 câu hỏi Vòng 1.
- Kiểm tra nạp và hiển thị câu hỏi trắc nghiệm Vòng 2.
- Kiểm tra nạp và chọn câu hỏi tự luận Vòng 3.
- Kiểm tra bảng tổng kết điểm số sau các vòng thi.
