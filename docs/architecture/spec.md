# PRODUCT SPECIFICATION & ACCEPTANCE CRITERIA
## Dự án: Marian Light Journey — Hành Trình Ánh Sáng

### 1. Mục tiêu Sản phẩm
Tạo ra một ứng dụng web trò chơi Công giáo 3 vòng hoàn chỉnh, đạt tiêu chuẩn thẩm mỹ cao cấp (Sacred Gothic Stained Glass), vận hành ổn định trên máy chiếu hội trường cũng như thiết bị di động cá nhân, triển khai trên GitHub Pages mà không phụ thuộc vào bất kỳ hạ tầng backend hay dịch vụ bên ngoài nào.

---

### 2. Tiêu chí Nghiệm thu Chức năng (Functional Acceptance Criteria - FAC)

#### FAC-1: Màn hình Mở đầu & Điều hướng
- [x] Giao diện đón tiếp trang trọng với hiệu ứng ánh sáng xuyên kính màu Gothic và tước hiệu Đức Mẹ.
- [x] Có nút bắt đầu, nút giới thiệu sự kiện Lương Sơn 2026, nút chuyển đổi chế độ âm thanh (Mute/Unmute), nút trợ năng giảm chuyển động (Reduced Motion), nút toàn màn hình (Fullscreen).
- [x] Lựa chọn 2 chế độ:
  - **MC Mode (Trình chiếu):** Cho phép nhập 2 đến 6 đội tham gia, chọn màu đại diện, chấm điểm và điều khiển bằng phím tắt hoặc giao diện trực quan.
  - **Solo Mode (Cá nhân):** Người chơi tự nhập câu trả lời Vòng 1, chọn trắc nghiệm Vòng 2, và tự đánh giá Vòng 3.

#### FAC-2: Vòng 1 — Giải mã Ô chữ Thánh
- [x] 11 câu hỏi tương ứng 11 gợi ý mở ra cụm từ khóa linh thánh `ĐỨC MẸ LA VANG`.
- [x] Áp dụng cơ chế **"11 Mật Mã Đức Tin"**: Mỗi hàng hiển thị từ khóa chính xác, khi giải đúng thì ký tự tương ứng trên đài vàng trung tâm sáng lên rực rỡ.
- [x] Hỗ trợ chuẩn hóa tiếng Việt: Tự động loại bỏ khoảng trắng thừa, không phân biệt hoa/thường, hỗ trợ cả Unicode dựng sẵn (NFC) và tổ hợp, hỗ trợ tùy chọn gõ không dấu nếu người chơi bật cấu hình.
- [x] MC có thể: Chỉ định đội trả lời, bấm Đúng (+10 điểm) / Sai (0 điểm), Undo thao tác chấm nhầm, hoặc Công bố Toàn bộ Từ Khóa (được cộng điểm thưởng 30 điểm cho đội đoán trúng).

#### FAC-3: Vòng 2 — Thử thách Đức Tin
- [x] 10 câu hỏi trắc nghiệm A/B/C/D về tín điều, Kinh Thánh, thần học, Fatima và lịch phụng vụ.
- [x] Vòng tròn hoặc thanh đếm ngược thời gian 20 giây sinh động.
- [x] Trạng thái câu hỏi rõ ràng: `SẴN SÀNG -> ĐANG ĐẾM GIỜ -> ĐÃ KHÓA ĐÁP ÁN -> CÔNG BỐ ĐÁP ÁN ĐÚNG & GIẢI THÍCH -> CÂU TIẾP THEO`.
- [x] Ngăn chặn click đúp, chặn thay đổi sau khi đã chốt đáp án.
- [x] Xử lý khi hết giờ (Timeout) tự động khóa câu trả lời và chuyển sang chế độ giải thích.
- [x] Cộng điểm chuẩn xác: Đúng +20 điểm, Sai 0 điểm.

#### FAC-4: Vòng 3 — Hành trình Xin Vâng
- [x] Ngân hàng 12 câu hỏi tự luận sâu sắc về cuộc đời Đức Mẹ, 4 đặc ân tín điều và giải đáp thắc mắc giáo lý.
- [x] MC có thể chọn số lượng câu thi đấu (mặc định 4 câu tiêu biểu hoặc tùy chọn từ 1 đến 12 câu).
- [x] Đồng hồ đếm ngược thời gian suy nghĩ (mặc định 60 giây).
- [x] Hiển thị thẻ câu hỏi uy nghiêm, kèm theo bản văn đáp án tham khảo trích từ Giáo lý Hội Thánh Công Giáo và Kinh Thánh.
- [x] MC có 3 mức chấm điểm: Đúng trọn vẹn (+20 điểm), Đúng một phần (+10 điểm), Chưa đạt (0 điểm).
- [x] Solo Mode: Người chơi đọc đáp án đối chiếu và tự ghi nhận mức độ hiểu biết của mình.

#### FAC-5: Bảng Xếp Hạng & Công bố Kết quả
- [x] Bảng tổng sắp điểm số của tất cả các đội sau mỗi vòng và ở vòng chung cuộc.
- [x] Sắp xếp tự động theo thứ hạng điểm cao nhất đến thấp nhất với animation mượt mà (GSAP flip/reorder).
- [x] Màn hình vinh danh đội chiến thắng với hiệu ứng ánh sáng thánh thiên và lời nhắn nhủ linh đạo ý nghĩa của ngày gặp mặt Gia đình Tận hiến.

#### FAC-6: Lưu trữ & Khôi phục Phiên chơi (Persistence & Recovery)
- [x] Toàn bộ trạng thái trận đấu (điểm số, các câu đã mở, lịch sử chấm) được tự động lưu vào `localStorage`.
- [x] Nếu vô tình bấm F5 hoặc reload trang, ứng dụng phát hiện phiên đang chơi dở và hiển thị thông báo khôi phục (Resume Session) hoặc Bắt đầu phiên mới.
- [x] Cung cấp tính năng Xuất dữ liệu phiên chơi ra file JSON và Nhập lại JSON để ban tổ chức lưu trữ hồ sơ hoặc chuyển máy điều khiển.

---

### 3. Tiêu chí Kỹ thuật & Phi chức năng (Non-Functional Criteria)
- [x] **Accessibility:** Đạt chuẩn WCAG 2.2 AA (độ tương phản màu chữ vàng/trắng trên nền xanh thẫm tối thiểu 4.5:1, hỗ trợ phím Tab, nhãn ARIA).
- [x] **Responsive & Presentation:** Hoạt động tối ưu trên tỉ lệ 16:9 (1920×1080, 1280×720) cho máy chiếu, đồng thời co giãn thích ứng tuyệt hảo trên laptop và điện thoại di động (390×844).
- [x] **Performance:** Tải nhanh, không giật lag animation, bundle kích thước tinh gọn nhờ CSS Modules và SVG tối ưu.
- [x] **Testing:** Đầy đủ Unit tests, Integration tests (Vitest) và E2E tests (Playwright).
