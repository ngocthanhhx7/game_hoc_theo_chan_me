# BUNDLE ANALYSIS & PERFORMANCE REPORT
## Dự án: Marian Light Journey — Hành Trình Ánh Sáng

### 1. Phân tích Kích thước Bundle (Build Output Metrics)

| Tệp tài nguyên | Kích thước thô (Raw) | Kích thước nén (Gzip) | Tỷ lệ trong ngân sách |
|---|---|---|---|
| `dist/index.html` | 1.25 kB | 0.69 kB | Tối ưu |
| `dist/assets/index.css` | 50.15 kB | 9.74 kB | < 10 kB (Xuất sắc) |
| `dist/assets/vendor.js` (React, React-DOM) | 4.21 kB | 1.58 kB | Tối ưu |
| `dist/assets/animation.js` (GSAP, @gsap/react) | 80.39 kB | 31.54 kB | Tối ưu |
| `dist/assets/index.js` (App code, icons, schemas) | 394.23 kB | 120.31 kB | Tối ưu |
| **TỔNG JAVASCRIPT GZIP** | **478.83 kB** | **153.43 kB** | **Đạt ngân sách (< 200 kB)** |

---

### 2. Các giải pháp tối ưu hóa hiệu năng đã áp dụng
1. **Chia tách Chunks (Manual Chunking):** Tách `vendor` (React) và `animation` (GSAP) thành các file riêng biệt để tận dụng tối đa HTTP caching.
2. **CSS Modules & Zero CSS-in-JS:** Tránh runtime style injection của styled-components/emotion, giảm tải hoàn toàn CPU trong các vòng chơi có timer nhanh.
3. **SVG & Web Audio Thuần Túy:** Không tải hình ảnh raster độ phân giải cao hoặc file âm thanh MP3 nặng hàng chục MB; toàn bộ âm thanh chuông và còi được tạo bằng Web Audio API với 0 bytes tải thêm qua mạng.
4. **Drift-free Timer:** Timer tính toán dựa trên chênh lệch `Date.now()` thực tế thay vì đếm số lần `setInterval`, tự động điều chỉnh chính xác khi người dùng chuyển tab trình duyệt.
