> Cập nhật: hướng thiết kế và trạng thái hiện hành nằm ở [design-guidelines.md](../design-guidelines.md) và [redesign-validation.md](redesign-validation.md). Bản dưới giữ lại khảo sát/kế hoạch ban đầu; bảng màu xanh đen và các trạng thái “chưa triển khai” đã được thay đổi trong đợt tiếp theo theo góp ý người dùng.

# Kế hoạch cải thiện toàn bộ giao diện — Marian Light Journey

Ngày khảo sát: 13/11/2026. Phạm vi: yêu cầu gốc đã đọc; source React/CSS và tài nguyên đã kiểm kê; đã mở trình duyệt xem Welcome, Solo vòng 1 và thiết lập MC. Các nhận xét về Quiz, Reflection, Scoreboard, Settings dựa trên source, chưa phải kiểm thử trực quan toàn bộ trạng thái.

## 1. Kết luận thiết kế

Chọn hướng **Nhà nguyện ánh sáng — sách thánh và nghệ thuật Đức Maria**. Giữ xanh đêm, xanh áo Đức Mẹ, vàng đồng và giấy ngà. Bổ sung tranh thật có nguồn, kiến trúc vòm và hoa văn theo vị trí. Mỗi màn có một trọng tâm: tranh ở Welcome, bảng mật mã ở vòng 1, câu hỏi ở vòng 2, tranh và bản văn ở vòng 3.

Không giải quyết bằng cách phủ thêm nhiều icon lên nền hiện tại. Cần đồng thời thay phân cấp chữ, mật độ điều khiển và cấu trúc bố cục. Trang khai mạc có thể giàu hình ảnh; màn chơi cần yên tĩnh và rõ ở khoảng cách xa.

## 2. Bằng chứng và vấn đề hiện tại

| Phát hiện | Bằng chứng cụ thể | Hệ quả | Hướng sửa |
|---|---|---|---|
| Thiếu hình ảnh nhân vật trung tâm | Welcome cũ chỉ có rose-window SVG hình quạt, không có tranh Đức Mẹ | Khó nhận diện chủ đề Marian ngoài chữ | Tranh lớn, credit, một khung vòm |
| Hai mode được nhấn gần như nhau | Hai modeCard có nền, icon tròn, mô tả dài và nút lớn | Mất trọng tâm MC vốn được ưu tiên | MC là nút vàng chính; Solo nhẹ hơn; rút mô tả |
| Gothic chủ yếu là tên gọi | radius-gothic hiện là 24px 24px 6px 6px | Hình khối vẫn giống card dashboard | Vòm theo silhouette, đường viền đôi; giới hạn dùng ở ảnh và màn chuyển vòng |
| Vòng 1 dài và lộ nhiều chữ nhỏ | boardGrid là danh sách 11 row; clueText nowrap/ellipsis | Cuộn nhiều, khó đọc trọn câu ở hội trường | Bảng 11 số + một câu đang mở, vùng mật mã cố định |
| Ô mật mã có thể xuống hàng | cipherLetters flex-wrap, ô 44px và khoảng trống | Không giữ được một cụm thị giác trên mobile | Chia theo từ, scale có giới hạn; giữ thứ tự đọc |
| Vòng 2 dùng chữ serif cho câu hỏi | promptText 1.55rem, bóng chữ; nhiều viền sáng | Câu hỏi dài khó đọc khi chiếu | Sans 32–40px ở 1080p; nền phẳng, A–D rõ |
| Vòng 3 giống danh sách quản lý | sidebar 360px, danh sách câu cắt ellipsis; không có img trong view | Thiếu chiều sâu hình ảnh và suy niệm | Thư viện chủ đề trước; sân khấu câu hỏi và tranh khi đang chơi |
| Font phụ thuộc mạng | typography.css dùng Google Fonts @import | Chưa đáp ứng offline sau tải tài nguyên cục bộ | Self-host font có Vietnamese subset và giấy phép |
| Bảng tài nguyên mô tả quá mức thực tế | Bảng cũ liệt kê các file SVG không có trong repo | Dễ tưởng đã có tranh và giấy phép | Kiểm kê thực tế; đã sửa asset-register |
| Bảng điểm dùng “Bảng xếp hạng thánh” | ScoreboardView.tsx | Tên gọi chưa tự nhiên, dễ hiểu sai ý nghĩa thi đua | Đổi thành “Thành quả hành trình” / “Bảng điểm các đội” trong đợt triển khai tiếp |

Không dùng kết quả tìm kiếm Pinterest để xác minh giáo lý. Không tự ý thay nội dung question bank trong đợt thiết kế.

## 3. Nguồn tham khảo và cách chuyển thành thiết kế

### R1 — Kính màu Công giáo trên Pinterest
https://www.pinterest.com/stainedglassinc/catholic-church-stained-glass/

Exa đã tìm và đọc được phần công khai; browser đã mở bảng, có lớp đăng nhập che phần xem chi tiết. Có thể thấy một số thumbnail phía sau, chưa xem toàn bộ 39 pin ở độ phân giải lớn.

Áp dụng: khung viền lặp đối xứng, mảng xanh áo và vàng ấm, ánh sáng theo ô kính, một chủ thể giữa vòm. Không sao chép tác phẩm hoặc bố cục nguyên bản. Không tải các pin thương mại vào ứng dụng khi chưa có quyền.

### R2 — Đức Maria và Hài Nhi, kính màu
https://es.pinterest.com/pin/149955862563658428/

Đã đọc mô tả công khai qua Exa. Đây là tham khảo chủ đề và bố cục, chưa xác minh quyền ảnh hoặc trực tiếp xem đầy đủ pin. Không lấy mô tả pin làm nguồn xác minh ngày lễ hay hiện vật bảo tàng.

### R3 — Ví dụ ảnh Pinterest dẫn về Alamy
https://jp.pinterest.com/pin/527484175119880303/

Kết quả Exa ghi rõ stock photo Alamy. Phân loại: tham khảo, không dùng làm ảnh miễn phí.

### R4 — Tranh được chọn và tải cục bộ
https://commons.wikimedia.org/wiki/File:Antonello_da_Messina_-_Virgin_Annunciate_-_Galleria_Regionale_della_Sicilia,_Palermo.jpg

Trang file ghi tác giả Antonello da Messina, reproduction The Yorck Project và Public Domain. Màu khăn xanh, nền tối, sách đang mở phù hợp hướng thiết kế. Đã tải ảnh gốc 290.209 byte và đưa vào Welcome. Ghi credit trên giao diện. Không gắn nhãn tranh là Đức Mẹ La Vang.

### R5 — Nơi tìm ảnh La Vang cho đợt tiếp
https://commons.wikimedia.org/wiki/Category:Statues_of_Our_Lady_of_La_Vang_in_Vietnam

Đã tìm được category qua Exa; chưa chọn file và chưa kiểm tra giấy phép từng ảnh. Chỉ là danh sách ứng viên. Điều kiện trước sử dụng: ảnh đúng chủ thể, file page có tác giả/giấy phép, ghi attribution tương ứng, ghi nhận phần crop hoặc chỉnh sửa. Nếu không có ảnh phù hợp, dùng vùng hoa văn và tiêu đề La Vang, không gán tranh khác là La Vang.

## 4. Hệ thống hình ảnh và họa tiết

Ba lớp có vai trò riêng:
1. **Tranh/ảnh thật:** chủ thể chính ở Welcome và vòng 3, một ảnh mỗi vùng nội dung. Không phủ chữ lên khuôn mặt, không dùng chân dung làm nút chấm đúng/sai.
2. **Kiến trúc:** vòm cửa, đường viền đôi, tracery và hoa thị ở tiêu đề vòng, viền sân khấu. Không gắn vòm vào mọi button, input và card.
3. **Biểu tượng nhỏ:** hoa huệ cách điệu, ngôi sao dẫn đường, sách mở, monogram M được duyệt hình thức. Dùng 1–2 loại mỗi màn, cùng nét vẽ; không ghép dày biểu tượng khác truyền thống chỉ vì đẹp.

Tạo bộ họa tiết nguyên bản trong bước triển khai tiếp: arch-frame, lily-divider, star-medallion, rose-window, manuscript-corner. Đây là trang trí SVG riêng, không phải ảnh AI và không thay thế tranh được yêu cầu. Dùng aria-hidden cho trang trí, alt mô tả cho tranh. Không tự suy diễn ý nghĩa giáo lý của họa tiết hoặc trích lời kinh chưa kiểm tra.

Tỷ lệ dự kiến: Welcome ảnh 35–42%; màn chuyển vòng 30%; vòng 1 và 2 trang trí không quá 10–15% diện tích; vòng 3 ảnh 25–30%; kết quả ảnh/hoa văn 15–20%. Đây là định hướng bố cục cần thử, không phải chỉ số đã đo.

## 5. Design tokens và khả năng đọc

| Vai trò | Đề xuất |
|---|---|
| Canvas | #08162F |
| Panel yên tĩnh | #11213B |
| Marian blue | #315AA8 |
| Vàng nhấn | #D6B36B |
| Giấy ngà | #F7F0E2 |
| Chữ phụ trên nền tối | #C9C9CC |
| Thành công | Xanh lá + icon check + nhãn “Đúng” |
| Sai | Đỏ ấm + icon X + nhãn “Chưa đúng” |
| Font heading | Playfair Display có bộ ký tự tiếng Việt; serif chủ yếu ở tên màn |
| Font UI và câu hỏi | Be Vietnam Pro; sans cho chữ dài |
| Radius | 8–12px cho điều khiển; khung ảnh theo vòm riêng |
| Grid | 12 cột desktop, lề 48–64px; mobile lề 20px |

Kiểm tra thực tế tương phản AA cho từng cặp màu, không tuyên bố cả palette đạt AA. 1080p: câu hỏi 32–40px, đáp án 26–30px, tên đội/điểm 22–28px. 720p: câu hỏi 28–32px, đáp án tối thiểu 22px nếu vừa nội dung. Đo với câu dài nhất; nếu không vừa, giảm vùng trang trí và khoảng trống trước khi giảm chữ. Nút chạm tối thiểu 44px; focus viền rõ; không truyền trạng thái bằng màu đơn thuần.

## 6. Thiết kế từng màn

| Màn | Bố cục và ảnh/họa tiết | Tương tác / trạng thái phải có |
|---|---|---|
| Welcome | Tranh trái trong vòm; tên Việt và lời mời bên phải; MC chính, Solo phụ; dải 3 vòng | Ảnh lỗi vẫn giữ title và nút; mobile xếp dọc |
| Giới thiệu sự kiện/chủ đề | Trang giấy ngà trên nền đêm, tranh nhỏ ở lề; lịch và địa điểm rõ | Nguồn xem mở rộng; quay lại và bắt đầu |
| Chọn chế độ | Tích hợp ở Welcome, không thêm bước trùng | Giải thích MC một thiết bị và Solo tự học |
| Thiết lập đội | Các hàng tên, màu và huy hiệu; preview tổng đội | 1–6 đội, tên dài, focus, thêm/xóa, số đội hiện rõ |
| Luật chơi | 3 chương đánh số, minh họa gọn, điểm và thời gian trong bảng | Cho đọc lại; không thêm state rườm rà nếu view hiện tại đủ dùng |
| Chọn/giới thiệu vòng | Ba tấm chương sách với hoa văn khác nhau | Hiện trạng thái vòng; chỉ thêm route/state khi đã kiểm tra engine |
| Vòng 1 | Mật mã phía trên, 11 huy hiệu số bên trái, một câu lớn bên phải; viền kính màu nhẹ | Chưa mở/đang mở/đã giải, đội hiện tại, mở đáp án, đúng/sai, Undo; giải thích cơ chế mật mã |
| Vòng 2 | Sân khấu phẳng, câu hỏi lớn, A–D 2×2, đồng hồ trên góc, dải điểm dưới | Ready/active/locked/revealed/next; pause, hết giờ; icon và nhãn đáp án |
| Vòng 3 | Tranh theo chủ đề ở một bên, câu hỏi trên giấy ngà hoặc panel tối yên; rubric mở như trang sách | Đóng/mở đáp án, chấm đủ/một phần/chưa đạt; Solo ghi rõ tự đánh giá |
| Bảng điểm | Điểm số lớn; thứ hạng và bảng chi tiết rõ; hoa văn chỉ ở đầu | Đồng điểm không bị mô tả thành thắng tuyệt đối; chưa có điểm |
| Kết quả | Khung trang trọng với vòng lá/hoa huệ nguyên bản, tên đội và lời cảm ơn | Xem chi tiết, xuất phiên, chơi lại có xác nhận khi cần |
| Kết thúc | Tranh hoặc hoa văn tĩnh, lời chúc ngắn, tên sự kiện | Về đầu; không auto reset dữ liệu |
| Cài đặt | Trang tiện ích đơn giản; nhóm âm thanh, cỡ chữ, phiên chơi | Import lỗi, export thành công, reset xác nhận |
| Nguồn và giấy phép | Danh mục tranh có thumbnail, tác giả, link file page, giấy phép | Có thể dùng panel trong intro để giảm số route; nguồn không bị giấu |
| Lỗi/khôi phục | Biểu tượng sách nhỏ, lỗi dễ hiểu và nút tiếp tục | Không có phiên, JSON hỏng, ảnh lỗi, localStorage lỗi |

MC và khán giả cùng dùng một thiết bị theo yêu cầu gốc: chỉ đề xuất dải điều khiển có thể thu gọn trên cùng màn. Không hứa giao diện điều khiển riêng ở máy khác hoặc che đáp án khỏi khán giả khi cùng một màn chiếu.

## 7. Trình chiếu, mobile và motion

- Desktop 16:9: nội dung thi phải nằm trong sân khấu khả dụng sau header/footer; không chỉ đặt aspect-ratio rồi gây cuộn. Kiểm tra 1280×720 và 1920×1080.
- Welcome được cuộn trên điện thoại. Vòng 1 mobile chọn số trước, mở một câu; vòng 2 A–D một cột; vòng 3 danh sách câu thành drawer có nhãn rõ.
- Dải điểm cố định vị trí trong khi chơi; phần điều khiển không che đáp án. Header mobile cần thu gọn tên phụ và chuyển công cụ ít dùng vào menu.
- Hình ảnh chỉ mờ dần 250–450ms; không quay tranh hay biểu tượng Đức Mẹ. Mở chữ kính màu 200–350ms; chuyển vòng 400–600ms, có bỏ qua. Không trì hoãn nút chỉ để chờ animation.
- Tôn trọng cả prefers-reduced-motion và cài đặt ứng dụng. Cleanup GSAP khi đổi màn; trạng thái game không phụ thuộc callback animation.

## 8. Kế hoạch triển khai có đầu ra và nghiệm thu

| Bước | Đầu ra | Tiêu chí xong | Trạng thái |
|---|---|---|---|
| 0. Kiểm kê | Audit hiện tại, link tham khảo, kiểm tra asset | Phân biệt ảnh thật và file chưa tồn tại | Đã làm trong lượt này |
| 1. Thử hướng ở Welcome | Tranh local, khung vòm, bố cục ảnh/chữ, CTA ngắn | Có credit; ảnh không hotlink; build và kiểm tra browser | Đã triển khai bước đầu; xem báo cáo kiểm tra |
| 2. Chốt thiết kế bằng Stitch | Welcome + Quiz trước, sau đó vòng 1 và 3 | Cùng tokens, đủ nội dung tiếng Việt, có bản 720p và mobile | Chưa chạy; prompt ở stitch-prompts.md |
| 3. Bộ asset và typography | Ảnh La Vang phù hợp, tranh vòng 3, bộ họa tiết, WOFF2 | Mỗi ảnh có giấy phép cụ thể; font offline; không ảnh placeholder | Chưa hoàn tất |
| 4. Thành phần chung | SacredArtwork, Ornament, RoundStage, ScoreStrip, MCActionBar | Responsive, semantic, focus; tái sử dụng khi có nhu cầu thật | Chưa triển khai |
| 5. Màn chơi | Thiết kế lại 3 vòng, từng vòng một | Các state vẫn đúng; không sửa scoring/đáp án vì thiết kế | Chưa triển khai |
| 6. Màn phụ | Intro, đội, luật, bảng điểm, kết quả, settings, nguồn, recovery | Không đứt luồng MC/Solo, chữ dài và 6 đội không tràn | Chưa triển khai |
| 7. QA và bàn giao | Ảnh trước/sau, test flow, đo hiệu năng | Đạt checklist dưới và ghi rõ mục còn thiếu | Chỉ kiểm tra phạm vi lượt này |

Thứ tự này giúp tránh làm đẹp Welcome trong khi sân khấu quiz vẫn không đọc được. Hai màn cần xem mẫu đầu tiên là Welcome và Quiz: một màn quyết định bản sắc, một màn quyết định khả năng sử dụng thực tế.

### Checklist nghiệm thu toàn bộ đợt redesign

- 390×844, 768×1024, 1280×720, 1366×768, 1920×1080, 1920×1200: không tràn ngang; câu hỏi không cắt chữ; ảnh không che control.
- Nội dung câu hỏi dài nhất và 6 đội tên dài vẫn hoạt động. Vòng 1 không đưa 11 câu dài lên cùng sân khấu trình chiếu.
- Bàn phím, focus, dialog, reduced motion; đo contrast thực tế; disabled/selected/correct/wrong nhìn phân biệt.
- Ảnh lỗi có fallback; tắt mạng không gây mất font/ảnh khi tài nguyên đã được ứng dụng tải. Không tuyên bố offline reload lần đầu khi chưa có cache/service worker phù hợp.
- Ảnh local, dùng BASE_URL; hero dự kiến ≤350KB, ảnh theo chủ đề ≤200KB/bản tối ưu nếu đạt chất lượng. Không preload mọi tranh.
- Unit/integration và E2E MC/Solo qua mỗi vòng; kiểm tra Undo, lưu/khôi phục. Đo Lighthouse riêng sau hoàn tất, không suy điểm từ build.
- Không deploy hoặc publish trong phạm vi lập kế hoạch này.

## 9. Phần đã làm so với phần còn chờ

Đã tải một ảnh thật, thay Welcome, thêm credit/manifest, sửa bảng kiểm kê sai thực tế, lập kế hoạch và prompt. Chưa thay toàn bộ 3 vòng, chưa tạo mẫu Stitch, chưa có bộ ảnh La Vang/vòng 3 được duyệt, chưa đo Lighthouse. Ảnh hiện tại là bước triển khai đầu của hướng đề xuất; mẫu Stitch tiếp theo sẽ xác định mức hoa văn và cân bằng bố cục trước khi triển khai phần còn lại.
