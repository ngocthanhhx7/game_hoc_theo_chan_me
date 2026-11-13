# Chạy website trên GitHub Pages

Repository: https://github.com/ngocthanhhx7/game_hoc_theo_chan_me

Website dự kiến: https://ngocthanhhx7.github.io/game_hoc_theo_chan_me/

## Bật Pages lần đầu

1. Mở repository, chọn **Settings → Pages**.
2. Trong **Build and deployment → Source**, chọn **GitHub Actions**.
3. Mở tab **Actions**, chọn **Deploy to GitHub Pages**.
4. Nếu chưa có lượt chạy, bấm **Run workflow → main → Run workflow**.
5. Chờ hai job **build** và **deploy** có dấu xanh. URL xuất hiện trong **Settings → Pages → Visit site** và trong environment **github-pages**.

Không chọn “Deploy from a branch”: dự án React/Vite cần build trước. Không đưa node_modules hoặc dist vào Git. Workflow sẽ cài dependencies, chạy kiểm thử, build dist và xuất bản artifact đó.

## Cập nhật những lần sau

Trong thư mục dự án:

```powershell
npm test
npm run build
git add .
git commit -m "feat: update Marian game"
git push origin main
```

Mỗi push lên main tự chạy kiểm thử và triển khai lại. Không cần upload thủ công thư mục dist.

## Kiểm tra khi gặp lỗi

- Trang 404: kiểm tra Source = GitHub Actions, workflow deploy đã xanh và URL có đúng `/game_hoc_theo_chan_me/`.
- Trang trắng hoặc mất ảnh: xem Console/Network. Vite dùng base tương đối `./`; ảnh runtime phải đi qua `import.meta.env.BASE_URL`.
- Workflow đỏ: mở job đỏ trong Actions và đọc step lỗi. Không xem deploy là thành công chỉ vì đã push.
- Thấy giao diện cũ: đợi lượt deploy mới hoàn tất rồi Ctrl+F5.
- Không thấy favicon mới: thử tab riêng tư sau khi deploy xong vì favicon thường được cache.

## Lưu ý vận hành

Website hoàn toàn tĩnh, không cần API key, backend hoặc đăng nhập. Font và ảnh phục vụ từ tài nguyên trong bản build. Chưa có service worker nên không bảo đảm reload offline; hãy tải thử các màn cần dùng trước buổi sinh hoạt. Điểm/phiên chơi lưu trong trình duyệt của từng thiết bị, không đồng bộ nhiều máy.

Tài liệu DOCX gốc trong docs/source được giữ trên máy và không đưa vào nhánh công khai. Nhánh master cũ được giữ cục bộ; nhánh main phát hành chỉ chứa snapshot công khai.

Nguồn hướng dẫn GitHub: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
