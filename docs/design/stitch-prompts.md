# Bộ prompt Google Stitch — Marian Light Journey

Dùng theo thứ tự. Gửi Prompt 1 trước để tạo Welcome, sau đó Prompt 2 trong cùng project để thiết kế Quiz. Khi hai màn thống nhất phong cách mới tiếp tục Prompt 3–5. Không yêu cầu Stitch tự tìm ảnh Pinterest hoặc suy luận quyền ảnh. Nếu thêm hình tham khảo vào Stitch, dùng ảnh Public Domain đã lưu trong public/assets/images/virgin-annunciate.jpg hoặc ảnh bạn có quyền sử dụng. Chưa gửi file nào lên Stitch trong lượt khảo sát này.

Kết quả cần lấy về: ảnh preview đủ màn, HTML/Tailwind nếu Stitch cho xuất, và thông số màu/font/kích thước. Không coi HTML xuất ra là React production hoặc bằng chứng responsive. Skill ck:stitch đã được đọc để chuẩn bị handoff; không cần thiết lập API key cho việc sao chép prompt thủ công này.

## Prompt 1 — Art direction và trang đón tiếp

```text
Design a high-fidelity DESKTOP welcome screen for an existing Vietnamese Catholic educational game, “Marian Light Journey — Hành Trình Ánh Sáng”, about the Virgin Mary. It is used at a parish community event with a projector, led by an MC. This is a real three-round game, not a marketing website. Output one coherent screen at 1440×900, plus a separate 390×844 mobile version. Use exact Vietnamese copy below with correct diacritics.

ART DIRECTION: “Chapel of Light / illuminated devotional book”. A reverent combination of actual sacred artwork, Marian blue, aged gold, ivory paper and restrained church architectural ornament. Quiet, warm, contemplative but welcoming for families and young people. Original composition, not a generic dashboard. Architectural references: arched stained-glass panels with a clear central figure, fine double-line borders, floral tracery. Do not reproduce a specific Pinterest pin. Do not introduce neon, purple gradients, fantasy-game weapons, stock dashboard widgets or dense glowing effects.

RESEARCH-BASED IMAGE DIRECTION: use the supplied image of Antonello da Messina’s “Virgin Annunciate” as the main artwork, if attached. Its blue veil, dark ground and open book inform the palette and composition. It depicts Mary; do not label it Our Lady of La Vang. Preserve the face and hands. Do not generate replacement sacred figures, paint over the artwork or place text over the face. If the image is unavailable, keep an explicitly labelled artwork region in the mockup rather than inventing an authentic historic painting.

DESKTOP COMPOSITION: about 38% left column for the portrait inside a tall architectural arch with a fine double gold border; about 62% right column for content. Leave generous negative space. Thin, quiet header with the product mark and access to sound/settings; primary control hierarchy must be obvious. Small top event line, modest English product name, large Vietnamese serif title. Two compact mode choices beneath; MC is visually primary with a gold button, Solo secondary with an outlined button. Avoid two giant boxed cards. Bottom of content: a subtle three-chapter journey strip. Keep essential controls visible at 1280×720 with a compact adaptation; do not shrink labels into unreadable text to force a fit.

COLORS: background #08162F, panels #11213B, Marian accent #315AA8, aged gold #D6B36B, ivory #F7F0E2, muted text #C9C9CC. Gold for hierarchy and borders, not every sentence. Typography: Playfair Display for the large title, Be Vietnam Pro for UI and body, with Vietnamese support. Avoid all-caps for body copy. Use fine lily dividers and a star medallion as restrained decorative accents; at most two ornamental families on this screen. Keep decorative motifs distinct from functional icons.

COPY:
Event: “GIA ĐÌNH TẬN HIẾN · LƯƠNG SƠN · 25.11.2026”
Small product name: “MARIAN LIGHT JOURNEY”
Title: “Cùng Mẹ bước vào hành trình ánh sáng.”
Description: “Khám phá cuộc đời Đức Maria, học hỏi đức tin và cùng nhau sống lời Xin Vâng qua ba vòng thi dành cho cộng đoàn.”
Mode 1: “Cùng cộng đoàn”
Description: “MC điều khiển các đội thi và trình chiếu tại hội trường.”
Button: “Bắt đầu trình chiếu”
Mode 2: “Tự mình khám phá”
Description: “Học hỏi, trả lời và suy ngẫm theo nhịp độ của bạn.”
Button: “Chơi một mình”
Secondary link: “Tìm hiểu chủ đề và giáo lý”
Journey: “01 Mật mã đức tin” / “02 Thử thách đức tin” / “03 Hành trình Xin Vâng”
Art credit: “Virgin Annunciate · Antonello da Messina · Public Domain”

MOBILE: a smaller portrait above content, no horizontal scrolling, title remains readable, modes stack vertically, touch controls at least 44px. Scrolling is acceptable. Preserve all exact content. Do not hide the main action behind decoration.

ACCESSIBILITY: visible focus style, legible contrast, readable secondary text. Provide the mockup, reusable component names, color and typography specifications, spacing and breakpoint notes. Describe how the image-error fallback retains the title and both actions. Do not claim accessibility conformance from a static mockup.
```

## Prompt 2 — Màn quiz, kiểm chứng khả năng trình chiếu

```text
Using the exact art direction and tokens of the approved Marian Light Journey welcome design in this project, design the ROUND 2 quiz stage. Produce a 1920×1080 presentation view, a compact 1280×720 view and a 390×844 mobile view. This is the screen actually used during a Catholic parish quiz. Prioritize reading from the back of a hall.

Keep the architectural gold border, restrained lily divider and Marian blue identity, but reduce decoration to the outer 10–15% of the screen. No large portrait behind the question, no text on busy stained glass, no generic admin sidebar. Treat the central question as the clear visual focus. Main functional question and answers use Be Vietnam Pro, not ornate serif.

LAYOUT: quiet header with “Vòng 2 · Thử thách đức tin”, question progress “Câu 03 / 10”, visible timer “00:20”. Large question above a 2×2 answer grid. At 1080p question target 36–40px, answers 26–30px. A bottom strip shows team names and scores; below or beside it a compact labelled MC control bar on the same device. No assumptions about a second controller device or synchronized phones. Controls must not cover the answers. At 720p reduce ornaments and spacing before reducing question font below 28px. Mobile: answers one column, team strip wraps cleanly, MC controls remain reachable.

Use this sample only as UI layout content, without adding extra theological claims:
Question: “Đức Maria đã đáp lời sứ thần bằng thái độ nào?”
A. “Tin tưởng và xin vâng”
B. “Từ chối đón nhận”
C. “Chỉ im lặng bỏ đi”
D. “Yêu cầu một phần thưởng”
Team samples: “Sao Biển · 40”, “Hoa Huệ · 20”, “Xin Vâng · 30”. These are mockup scores, not actual session data.
Controls: “Bắt đầu”, “Tạm dừng”, “Khóa đáp án”, “Công bố đáp án”, “Câu tiếp”, “Hoàn tác”. Show only actions appropriate to each state, not every button equally emphasized.

Create variants for READY, ACTIVE, ANSWER_LOCKED, ANSWER_REVEALED and TIMEOUT. Correct state has check icon + “Đúng”; incorrect has X + “Chưa đúng”; color alone is insufficient. Reveal explanation in a clearly separated panel without moving or hiding the question. Use “Phần giải thích theo nội dung đã duyệt” as explanatory placeholder in the mockup; do not invent scripture quotations or sources. Include a paused indicator and disabled-state examples.

Deliver screen previews and component specifications. Identify what is decorative versus interactive. Keep all three device versions visually consistent with the welcome screen.
```

## Prompt 3 — Vòng mật mã

```text
Continue the approved Marian Light Journey visual system. Design Round 1 as “11 Mật Mã Đức Tin”. It is a cipher-reveal game, not a literal intersecting crossword. Do not draw fake crossing letters or imply that each revealed letter must occur in the answer.

Desktop 1920×1080: top shows the final mystery phrase as 11 unrevealed character tiles grouped 3–2–2–4; do not expose the answer in the initial gameplay state. Under this, left area shows eleven numbered stained-glass medallions in a compact grid; the main right area shows ONE current clue at large size. Example clue: “Tên bài ca ngợi khen nổi tiếng của Đức Mẹ bằng tiếng Latinh là gì?” State text “Đã giải 3 / 11”. The final key in the revealed-completion variant is “ĐỨC MẸ LA VANG”. Use clear numbering and status icons for unopened, active and solved clues. Do not list all eleven long clues at once.

Bottom: selected team, score strip, labelled controls “Mở gợi ý”, “Mở đáp án”, “Đúng”, “Chưa đúng”, “Hoàn tác”. Show a separate answer-revealed variant with “MAGNIFICAT” and a restrained reference area. An optional early-guess action is visible but secondary. Do not reveal the reference answer in the initial clue state.

Religious visual cues: fine architectural tracery around the board and a quiet lily divider. If no properly identified La Vang image is supplied, use decorative architecture and the round title, not a generic Madonna labelled as La Vang. Mobile 390×844: cipher grouped by words, number selector then one clue and action area; no horizontal overflow. Include a 1280×720 adaptation. Preserve type legibility and the calm navy/ivory/gold palette.
```

## Prompt 4 — Vòng suy ngẫm

```text
Continue the approved Marian Light Journey visual system. Design Round 3, “Hành trình Xin Vâng”, at 1920×1080 and 390×844. This is an MC-led reflection round using a bank of 12 questions, typically 4 in a session. Avoid turning it into a 12-row administration screen.

Before question selection: a compact library organized by topic, using numbers and simple book/lily motifs. During an active question: main stage with a relevant sacred artwork area occupying about 25–30%, a large readable question and thinking timer. Keep current team and session question progress visible. Use the supplied Virgin Annunciate artwork for an Annunciation-themed example only; do not reuse it under unrelated captions. No invented “authentic” religious artwork.

Sample question: “Lời Xin Vâng của Đức Maria gợi cho chúng ta điều gì trong đời sống đức tin?” This is mockup content, not a replacement for the approved question bank.

Design two states: question only; reference-answer revealed in an illuminated-book panel with clear rubric headings “Ý chính”, “Giải thích”, “Nguồn tham khảo”. Use neutral placeholder reference text, not invented Bible quotations. MC grading controls: “Đầy đủ · 20 điểm”, “Một phần · 10 điểm”, “Chưa đạt · 0 điểm”, and Undo. Solo variant must explicitly say “Tự đối chiếu và tự đánh giá”; do not imply automatic AI grading. A next-question action is secondary until grading is complete.

On mobile place the artwork smaller above the question and move the question library into a labelled expandable section. Preserve calm spacing, accessible contrast and full Vietnamese diacritics. Never place interactive badges or victory effects on Mary's face.
```

## Prompt 5 — Các màn phụ và trạng thái lỗi

```text
Extend the approved Marian Light Journey components to the remaining screens. Generate screens in small groups to preserve fidelity: (1) event introduction and team setup, (2) round introduction and rules, (3) scoreboard and final result, (4) settings, credits and recovery.

Use the same navy, Marian blue, aged gold, ivory and restrained lily/star motifs. Make utility screens simpler than the opening and reflection screens. Do not repeat the same large framed card everywhere. Do not add a backend, login, live multiplayer, purchases or social feed.

Team setup: 1–6 editable teams, name field, color and distinct emblem previews, add/remove actions, clear confirm CTA. Show long Vietnamese names and six-team layout.
Rules: three chapters with brief instructions, points and timing, clear continue/back. Round introduction: one chapter at a time, architectural border and progress; do not invent a fourth round.
Scoreboard title: “Thành quả hành trình”. Make scores large; show round breakdown, equal-score example, next round. Final result: celebratory but reverent, floral border separated from sacred artwork, team name, total points, “Xem chi tiết” and “Chơi lại”. Do not rank holiness or call a team spiritually superior.
Settings: sound, reduced motion, text size, export/import local session, reset confirmation. Credits: artwork thumbnail, title, artist, source link and license. Recovery states: missing session, invalid JSON import, image load failure; plain-language message and safe recovery action. Reset must not look like the primary everyday action.

Deliver desktop and mobile variants, reusable components, focus/disabled/error examples. This remains a local static game with one-device MC operation. List any screen you could not produce; do not silently omit required states.
```

## Prompt sửa mẫu nếu Stitch làm quá rối

```text
Refine the current design while retaining its sacred identity. Reduce ornament density by about half. Keep one architectural arch and one lily-divider family, reserve aged gold for primary hierarchy, and remove large glows and continuous particles. Increase question contrast and size, simplify the header, preserve exact Vietnamese text and the supplied artwork. Distinguish primary, secondary and destructive actions. Do not remove the real artwork or revert to two generic dashboard cards. Show the revised full screen at both 1280×720 and 390×844.
```

## Tiêu chí chọn mẫu

Chỉ chọn khi cả Welcome và Quiz thuyết phục: nhận ra chủ đề Đức Maria qua hình ảnh, chữ tiếng Việt đúng, MC có trọng tâm, câu hỏi dài dễ đọc, họa tiết không chen vào nội dung, 720p không bị cắt điều khiển, mobile không tràn. Sau đó xuất ảnh và HTML/CSS nếu có để triển khai React theo cấu trúc hiện tại. Mẫu chỉ đẹp ở Welcome nhưng làm câu hỏi nhỏ là chưa đạt.
