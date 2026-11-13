# Kiểm chứng đợt cải thiện giao diện và luồng chơi

Ngày: 13/11/2026.

## Đã kiểm chứng

- npm test: 34 test qua trong 7 file. Bao gồm không lộ đáp án trước công bố ở cả 3 vòng; hết giờ vẫn ẩn đáp án ở vòng 1/2; tạm dừng/tiếp tục giữ thời gian; không thưởng mật mã hai lần; quiz chỉ cộng điểm lúc công bố.
- npm run build: thành công sau thay đổi cuối (TypeScript và Vite).
- git diff --check: không có lỗi whitespace; có cảnh báo chuyển LF/CRLF của Git trên Windows.
- Trình duyệt thật: MC → thiết lập 2 đội → vòng 1 chọn/đếm/khóa/công bố/chấm; vòng 2 chọn B/khóa chưa có lời giải và chưa có điểm, công bố mới hiện lời giải và +20; vòng 3 chọn/khóa chưa có đáp án, công bố mới có tham khảo và chấm điểm.
- Vòng 3 đã kiểm tra đổi nguồn ảnh từ Galilê AI sang tranh Giotto khi chuyển câu. Ảnh hiện trên mobile có naturalWidth >0.
- Viewport 1280×720, 1440×1000, 390×844 đã xem trong browser. Bản mobile không tràn ngang theo DOM; nút/văn bản xếp dọc.
- 22 file WebP tại thời điểm kiểm tra đều đọc/verify được. Logo giữ alpha; favicon PNG32/192 và Apple180 đúng kích thước.
- Ba cặp màu chính đã đo: chữ câu hỏi #254F7E trên #FBFDFF = 8.24:1; chữ #2E547E trên trắng = 7.82:1; chữ trắng trên nút #2E70B2 = 5.15:1. Chưa kiểm toán tương phản toàn bộ UI.

## Công cụ ảnh và nguồn

- Đã tạo và tích hợp minh họa Galilê, nến/sách/hoa huệ, logo Marian và nền Marian sáng bằng công cụ image generation trực tiếp.
- Đã tải tranh/ảnh có trang nguồn cụ thể và tối ưu WebP; manifest và asset-register ghi riêng nguồn/giấy phép. Không dùng thumbnail Pinterest thiếu quyền làm asset chính thức.
- Đã gọi agy CLI để nghiên cứu ảnh công khai, nhưng lệnh hết thời gian sau 120 giây và không trả kết quả dùng được; không coi là nghiên cứu thành công.
- Exa chạm giới hạn miễn phí ở một truy vấn; các nguồn bổ sung được tra qua công cụ web khác và đọc file page.

## Giới hạn kiểm chứng

- File E2E Playwright đã cập nhật theo luồng mới, nhưng chưa chạy lệnh Playwright full suite; các luồng nêu trên được thực hiện qua browser.
- Chưa chạy Lighthouse, đo độ mượt trên máy chiếu thật hoặc kiểm toán tất cả trạng thái/accessibility.
- Timer vẫn là state cục bộ của view: reload/đổi view trong lượt đang đếm chưa khôi phục chính xác thời gian còn lại. Điểm và tiến trình được lưu; tránh reload giữa lượt khi vận hành sự kiện cho đến khi có đợt hoàn thiện persistence timer.
- Nội dung giáo lý giữ nguyên dữ liệu có sẵn; trạng thái duyệt nội dung vẫn theo docs/content, không xem đợt thay UI là duyệt lại giáo lý.
- Chưa publish/deploy.

Ảnh kiểm tra lưu ở docs/design/screenshots: welcome-marian-light-final.jpg, quiz-marian-light.jpg, reflection-mobile-light.jpg, reflection-galilee-light.jpg. Hướng thiết kế hiện hành ở docs/design-guidelines.md.
