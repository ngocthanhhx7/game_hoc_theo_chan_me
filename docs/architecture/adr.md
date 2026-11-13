# ARCHITECTURE DECISION RECORDS (ADR)
## Dự án: Marian Light Journey — Hành Trình Ánh Sáng

### ADR-001: Kiến trúc Ứng dụng Web Tĩnh Hoàn Toàn (Pure Static Single Page Application)
- **Bối cảnh:** Sự kiện gặp mặt Gia đình Tận hiến tại Lương Sơn (25/11/2026) diễn ra tại hội trường giáo xứ/tu viện, nơi kết nối Internet có thể chập chờn hoặc không ổn định. Ràng buộc dự án: Không backend, không database server, không API key trả phí, lưu trữ và triển khai trên GitHub Pages.
- **Quyết định:** Sử dụng Vite + React 18/19 + TypeScript với chế độ strict mode. Tất cả tài nguyên (dữ liệu câu hỏi, âm thanh, hình ảnh SVG/WebP, font chữ) được đóng gói tĩnh hoàn toàn trong client bundle. Sau khi trình duyệt tải trang lần đầu, toàn bộ trò chơi có thể vận hành trơn tru ở chế độ ngoại tuyến (Offline-capable).
- **Hệ quả:**
  - Không có độ trễ mạng khi chuyển câu hỏi hoặc tính điểm.
  - An toàn tối đa, không phát sinh chi phí duy trì máy chủ.
  - Dữ liệu câu hỏi được bảo vệ chống XSS bằng việc kiểm soát nghiêm ngặt React JSX, không dùng `dangerouslySetInnerHTML`.

---

### ADR-002: Tách biệt Game Engine Domain khỏi React UI
- **Bối cảnh:** Nếu toàn bộ logic tính điểm, chuyển vòng, timer, quản lý lượt chơi bị nhét vào các React component lớn, code sẽ bị spaghetti, dễ xảy ra race conditions khi bấm nhanh (double click), timer drift, và khó viết unit test độc lập.
- **Quyết định:** Xây dựng Domain Layer thuần túy (`src/domain/`) bằng TypeScript không phụ thuộc vào React:
  - `domain/game`: State machine quản lý vòng chơi, câu hỏi, phiên bản schema.
  - `domain/scoring`: Quy tắc tính điểm, undo/redo, nhật ký sự kiện điểm số.
  - `domain/timers`: Quản lý thời gian dựa trên `performance.now()` hoặc timestamp thực tế thay vì dựa vào số lần setInterval bị delay.
  - `domain/teams`: Quản lý danh sách đội, màu sắc đại diện, thứ hạng.
  - `domain/session`: Quản lý lưu trữ localStorage với schema versioning và validate qua Zod.
- **Hệ quả:**
  - 100% logic trò chơi có thể kiểm thử bằng Vitest mà không cần render UI.
  - React UI chỉ là lớp hiển thị (Presentation Layer) tiêu thụ trạng thái và gửi hành động (Actions).

---

### ADR-003: Chiến lược Giải mã Ô chữ Vòng 1 — Cơ chế "11 Mật Mã Đức Tin"
- **Bối cảnh:** Tài liệu gốc có 5 từ khóa không chứa chữ cái giao nhau được gán (MAGNIFICAT không có Đ, TÔNG HIẾN không có Ứ, BIỂN không có C, CHÚA không có Ẹ, CẢNH THỊNH không có G). Nếu vẽ lưới ô chữ giao điểm giả sẽ làm mất uy tín và tính chân thực của giáo lý.
- **Quyết định:**
  - Thiết kế mặc định: **"11 Mật Mã Đức Tin" (Sacred Faith Cryptogram)**: 11 hàng câu hỏi hiển thị các từ khóa nguyên bản chính xác. Khi giải đúng một câu, chữ cái tương ứng trên Đài Thánh Vàng `[Đ - Ứ - C - M - Ẹ - L - A - V - A - N - G]` sáng lên với hiệu ứng kính màu Gothic lộng lẫy.
  - Hỗ trợ MC linh hoạt: Nút công bố toàn bộ mật mã khi có đội phán đoán chính xác từ khóa chính sớm; có nút Undo nếu MC thao tác nhầm.
- **Hệ quả:** Trung thực tuyệt đối với tiếng Việt và giáo lý, tạo trải nghiệm game thiêng liêng, hiện đại và kịch tính.

---

### ADR-004: Định hướng Thị giác "Sacred Cinematic / Gothic Stained Glass" và GSAP
- **Bối cảnh:** Trò chơi Công giáo cần sự trang nghiêm, thánh thiện, tránh phong cách SaaS vô hồn hoặc quiz thiếu nhi sặc sỡ.
- **Quyết định:**
  - Bảng màu: Midnight Navy `#08162F`, Cathedral Blue `#11284A`, Marian Blue `#315AA8`, Sacred Gold `#D6B36B`, Warm Ivory `#F7F0E2`, Muted Teal `#87B4B0`.
  - Họa tiết: Cung vòm Gothic nhọn, hoa huệ (Fleur-de-lis), cửa sổ hoa hồng kính màu (Rose window), hào quang ánh sáng thánh thiện.
  - Animation: GSAP 3 + `@gsap/react` với `useGSAP` hook, scope theo ref, cleanup sạch sẽ, tuân thủ `prefers-reduced-motion` và có tùy chọn tắt/giảm animation.
- **Hệ quả:** Mang lại trải nghiệm thị giác ấn tượng, trang trọng, nâng cao tâm tình học hỏi đạo đức của cộng đoàn.

---

### ADR-005: Chế độ Presentation Mode 16:9 và Điều khiển cho MC
- **Bối cảnh:** Ứng dụng phục vụ cả việc chiếu lên màn hình lớn/máy chiếu (1920×1080 / 1280×720) cho cả hội trường theo dõi, vừa phải có bảng điều khiển thuận tiện cho MC (bàn phím tắt, nút chấm điểm to rõ), vừa phải hiển thị tốt trên thiết bị di động (Solo Mode).
- **Quyết định:**
  - Tách hai chế độ trải nghiệm: **MC Mode** (Presentation/Host Mode) và **Solo Mode**.
  - Presentation Mode thiết kế tối ưu tỉ lệ 16:9, font chữ lớn, tương phản cao đạt chuẩn WCAG 2.2 AA để người ngồi hàng ghế cuối hội trường vẫn đọc rõ câu hỏi.
  - Tích hợp hệ thống phím tắt cho MC: Phím `Space` (bắt đầu/tạm dừng timer), Phím số `1`, `2`, `3` (chọn đội/chấm điểm nhanh), Phím `U` (Undo), Phím `F` (Toàn màn hình).
