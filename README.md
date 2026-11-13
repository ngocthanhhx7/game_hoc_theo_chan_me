# Hành Trình Ánh Sáng — Marian Light Journey

Trò chơi học hỏi về Đức Maria, gồm 3 vòng, hỗ trợ MC trình chiếu và tự học cá nhân.

- Repository: [game_hoc_theo_chan_me](https://github.com/ngocthanhhx7/game_hoc_theo_chan_me)
- Website GitHub Pages: [Mở trò chơi](https://ngocthanhhx7.github.io/game_hoc_theo_chan_me/)
- [Hướng dẫn bật Pages và cập nhật website](docs/deployment/github-pages.md)
- [Nguồn ảnh và giấy phép](docs/assets/asset-register.md)
- [Giới hạn và kiểm chứng](docs/design/redesign-validation.md)

Mỗi lần push nhánh main, GitHub Actions chạy kiểm thử, build và triển khai website. Không cần API key để chơi.

---

# MARIAN LIGHT JOURNEY — HÀNH TRÌNH ÁNH SÁNG
> **Website Game Công Giáo 3 Vòng phục vụ Sự Kiện & Hội Đồng Học Hỏi Giáo Lý**  
> *Sự kiện tham chiếu: Gặp mặt Gia đình Tận hiến — Giáo xứ Lương Sơn, ngày 25/11/2026.*

---

## I. TỔNG QUAN DỰ ÁN

**Marian Light Journey (Hành Trình Ánh Sáng)** là ứng dụng web trò chơi Công giáo được thiết kế theo kiến trúc production-grade, mang phong cách mỹ thuật **Marian Blue & Ivory** (xanh áo Đức Mẹ, trắng ngà, tranh linh thánh và họa tiết kính màu).

Ứng dụng phục vụ trực tiếp cho các buổi gặp mặt hội đoàn, ngày hội học hỏi giáo lý, các thánh lễ hội ngộ hoặc các buổi sinh hoạt giới trẻ, với khả năng:
- **Trình chiếu máy chiếu (Presentation / MC Mode):** Tối ưu tỉ lệ 16:9, font chữ rõ ràng nhìn từ cự ly xa, bảng điều khiển và phím tắt thông minh cho MC.
- **Tự học hỏi cá nhân (Solo Mode):** Từng tín hữu có thể tự kiểm tra kiến thức, tự giải mã và suy niệm.
- **Hoạt động hoàn toàn tĩnh (100% Static & Offline-capable):** Không cần server backend, không database, không API key tính phí, triển khai miễn phí trên GitHub Pages và không phụ thuộc mạng lúc sự kiện đang diễn ra.

---

## II. THIẾT KẾ BA VÒNG THI ĐẤU

### Vòng 1: GIẢI MÃ Ô CHỮ THÁNH (11 Mật Mã Đức Tin)
- **Từ khóa linh thánh cuối cùng:** `ĐỨC MẸ LA VANG` (11 ký tự).
- **Cơ chế Mật Mã Đức Tin chân thực:** Nhằm bảo đảm tính trung thực tuyệt đối của tiếng Việt và thần học Công giáo (khắc phục các lỗi trong bản thảo sơ khởi khi gán ghép chữ cái giả vào các từ như *Magnificat*, *Tông Hiến*, *Cảnh Thịnh*), trò chơi vận hành theo cơ chế **11 Mật Mã Đức Tin**.
- Mỗi câu hỏi tương ứng với một hàng từ khóa chính xác. Khi giải đúng, chữ cái tương ứng trên **Đài Mật Mã Thánh** sẽ bừng sáng với hiệu ứng kính màu và chuông thánh đường.
- MC có nút hỗ trợ **Đoán Sớm Từ Khóa (+30 điểm)** cho đội có suy đoán xuất sắc.

### Vòng 2: THỬ THÁCH ĐỨC TIN (10 Câu Trắc Nghiệm Thần Học)
- 10 câu hỏi bao quát 4 Tín điều Thánh Mẫu học (*Mẹ Thiên Chúa, Trọn Đời Đồng Trinh, Vô Nhiễm Nguyên Tội, Hồn Xác Lên Trời*), Kinh Thánh (Khải Huyền 12, Tin Mừng Luca, Ga 19), Sứ điệp Fatima và Năm Phụng Vụ.
- Đồng hồ đếm ngược SVG 20 giây mỗi câu với cảnh báo gấp rút ở 5 giây cuối.
- Điểm số: Đúng +20 điểm, Sai 0 điểm.

### Vòng 3: HÀNH TRÌNH XIN VÂNG (Tự Luận & Chia Sẻ Giáo Lý)
- Ngân hàng 12 câu hỏi tự luận chia thành 3 chủ đề:
  1. *Cuộc Đời & Gia Thế* (5 câu)
  2. *Các Đặc Ân & Tín Điều* (4 câu)
  3. *Giải Đáp Thắc Mắc Giáo Lý* (3 câu: Người Công giáo có thờ Đức Mẹ không? Tại sao cầu nguyện với Mẹ? Ơn cứu độ dự phòng).
- MC có thể kích hoạt đếm ngược 60 giây suy nghĩ thảo luận.
- Màn hình mở ra bản văn đáp án tham khảo dạng cổ thư, kèm theo các tiêu chí ý chính và rubric chấm điểm minh bạch:
  - Đúng trọn vẹn: +20 điểm.
  - Đúng một phần: +10 điểm.
  - Chưa đạt: 0 điểm.

---

## III. CÔNG NGHỆ & ĐẶC TẢ KỸ THUẬT

- **Frontend Core:** React 19 + TypeScript (Strict Mode).
- **Build Tool:** Vite 6 (Hỗ trợ cấu hình base path `./` cho GitHub Pages).
- **Animation Engine:** GSAP 3 + `@gsap/react` (`useGSAP` hook, scoped animation, full cleanup).
- **Styling:** CSS Modules + CSS Custom Properties Design Tokens (Zero runtime CSS-in-JS overhead).
- **Audio:** Web Audio API Sound Synthesizer (Tổng hợp âm thanh chuông nhà thờ và còi trò chơi thuần túy, không vi phạm bản quyền MP3 bên ngoài).
- **Data Validation:** Zod Runtime Schema Validation cho Question Bank và Session import.
- **Testing:** Vitest + React Testing Library (34 bài test unit & integration) + Playwright (E2E Test).

---

## IV. HƯỚNG DẪN CÀI ĐẶT & VẬN HÀNH

### 1. Yêu cầu hệ thống
- Node.js version 18 trở lên (khuyên dùng Node 20 hoặc 22).
- Trình duyệt hiện đại (Chrome, Edge, Firefox, Safari).

### 2. Chạy trên máy nội bộ (Local Development)
```bash
# Cài đặt dependencies
npm install

# Khởi chạy dev server
npm run dev
```
Truy cập: `http://localhost:5173`

### 3. Chạy kiểm thử (Testing)
```bash
# Chạy Unit & Integration tests
npm test

# Chạy E2E tests
npm run test:e2e
```

### 4. Đóng gói cho Production
```bash
npm run build
```
Toàn bộ mã nguồn tĩnh tối ưu sẽ nằm trong thư mục `dist/`.

---

## V. HỆ THỐNG PHÍM TẮT DÀNH CHO MC (TRÌNH CHIẾU)

| Phím tắt | Chức năng |
|---|---|
| **Phím Space** | Bắt đầu hoặc Tạm dừng đồng hồ đếm ngược (Vòng 2 & 3) |
| **Phím số 1 đến 6** | Chọn nhanh Đội đang trả lời câu hỏi |
| **Phím U** hoặc **Ctrl+Z** | Hoàn tác (Undo) thao tác vừa thực hiện (chấm nhầm, mở nhầm) |
| **Phím F** | Bật / Tắt chế độ Toàn Màn Hình trình chiếu (Fullscreen) |
| **Phím M** | Bật / Tắt âm thanh hiệu ứng (Mute / Unmute) |
| **Phím Escape** | Đóng cửa sổ modal chi tiết câu hỏi |

---

## VI. HƯỚNG DẪN BẢO TRÌ & MỞ RỘNG

### 1. Thêm hoặc sửa câu hỏi
- Vòng 1 (Ô chữ): Chỉnh sửa `src/content/questions/crossword.data.ts`.
- Vòng 2 (Trắc nghiệm): Chỉnh sửa `src/content/questions/quiz.data.ts`.
- Vòng 3 (Tự luận): Chỉnh sửa `src/content/questions/reflection.data.ts`.
*Lưu ý: Mọi câu hỏi mới đều tự động được kiểm tra tính hợp lệ bằng Zod Schema khi chạy `npm test`.*

### 2. Quản lý phiên chơi & Sao lưu
Tại mục **Cài đặt (Settings)** trên thanh công cụ:
- Có nút **Tải xuống File JSON** để lưu lại toàn bộ lịch sử điểm và câu hỏi của buổi thi.
- Có nút **Khôi phục Từ File JSON** để nạp lại phiên thi trên máy tính khác.
