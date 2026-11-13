# Hướng dẫn giao diện hiện hành — 13/11/2026

Tài liệu này thay thế hướng nền xanh đen trong kế hoạch ban đầu. Người dùng đã chọn nền mới màu sáng và yêu cầu màu nền website cũng đồng bộ, không chỉ đổi ảnh.

## Nhận diện

- Chủ đạo: xanh Marian, trắng ngà, vàng nhẹ. Nền trang #F2F8FF; nội dung trắng; chữ câu hỏi #254F7E; nút chính #2E70B2. Nền minh họa xanh/trắng là ảnh AI đã được người dùng chọn.
- Logo riêng: chữ M kết hợp nét khăn choàng và hoa huệ; header dùng WebP có alpha. Favicon PNG 32/192, ICO và Apple touch icon cùng dấu hiệu.
- Lora cho tiêu đề trang; Nunito cho câu hỏi, đáp án, nút và tên đội; Patrick Hand chỉ dùng lời gợi mở ngắn. Toàn bộ WOFF2 Vietnamese/Latin và OFL lưu cục bộ.
- Họa tiết dành cho bố cục và nghệ thuật; icon chỉ phục vụ thao tác hoặc trạng thái. Bộ chọn câu chỉ dùng số; mật mã chưa mở dùng ?, đã giải dùng dấu kiểm. Không gắn Sparkles lặp lên mọi ô.

## Hình ảnh

- Danh mục và ánh xạ theo ID câu hỏi: src/content/artworks.ts.
- Vòng 2: ảnh nằm một bên khung câu hỏi, chuyển nhẹ sang vùng chữ. Mỗi câu có lựa chọn theo chủ đề. Không hiển thị tên tranh có thể gợi đáp án trước lúc công bố.
- Vòng 3: tranh thay theo câu/nhóm chủ đề: Cổng Vàng, Galilê, Truyền Tin, Thăm Viếng, Đức Mẹ với Hài Nhi, Vô Nhiễm, Hồn Xác Lên Trời, Thập Giá, nến và lời nguyện. Không ép 12 câu dùng một tranh.
- Tranh cổ/ảnh thật giữ nguồn và giấy phép riêng. Ảnh AI ghi đúng “Minh họa AI”, không gọi là tranh cổ hay tư liệu lịch sử.
- WebP cho ảnh web; biến thể nhỏ cho minh họa AI; PNG/ICO cho favicon. Không hotlink ảnh ngoài khi chơi.

## Luồng game show

1. Chọn câu, chỉ hiện câu hỏi và đồng hồ sẵn sàng.
2. Bắt đầu đếm giờ. Có tạm dừng/tiếp tục.
3. Khóa lượt hoặc hết giờ. Hết giờ không tự công bố lời giải.
4. MC công bố đáp án.
5. Chấm điểm hoặc chuyển câu theo loại vòng.

Vòng 1: 30 giây, đúng +10, mật mã sớm +30. Vòng 2: 20 giây, chọn A/B/C/D rồi khóa; chỉ công bố mới làm hiện đúng/sai và cộng +20. Vòng 3: 60 giây, khóa lượt rồi mở đáp án tham khảo, chấm 20/10/0. Điểm tự luận Solo là tự đánh giá. Đã chấm không được cộng lại; Undo có sẵn.

Cùng một màn chiếu nghĩa là MC và khán giả đều thấy nội dung được mở; không dùng nhãn sai “chỉ MC thấy”. Website tĩnh không giữ đáp án bí mật với người kiểm tra source.

## Motion và âm thanh

- Mở trang: lời chào và hiện nội dung; vào vòng: chuyển cảnh ngắn, tên vòng, lời chúc, có bỏ qua.
- Đúng: thông báo ngắn và tiếng chuông; hết giờ/sai: hiệu ứng âm ngắn; hoàn thành: thông báo chúc mừng và confetti có giới hạn.
- Tôn trọng giảm chuyển động; mute điều khiển master gain. Không có nhạc nền tự phát hoặc giọng đọc được tuyên bố giả.

## Responsive

- Desktop: ảnh và câu hỏi cùng sân khấu; vùng điều khiển cuối có nhãn rõ. F bật toàn màn hình và ẩn header/footer để dành chỗ cho nội dung.
- Mobile: nội dung xếp dọc, tranh giữ chủ thể, A–D một cột, menu vòng vẫn truy cập được. Cho phép cuộn dọc, tránh tràn ngang.
- Nguồn ảnh và giấy phép có ở footer và dưới tranh; không để khối nguồn dài chen vào sân khấu chính.
