# STATE MACHINE SPECIFICATION
## Mô hình Trạng thái Trò chơi — Marian Light Journey

### 1. Game State Transitions

```mermaid
stateDiagram-v2
    [*] --> WELCOME: App Boot
    WELCOME --> EVENT_INTRO: Bắt đầu
    EVENT_INTRO --> MODE_SELECT: Tiếp tục
    MODE_SELECT --> TEAM_SETUP: Chọn MC Mode
    MODE_SELECT --> ROUND_1: Chọn Solo Mode (1 Player)
    TEAM_SETUP --> RULES_INTRO: Đã tạo đội
    RULES_INTRO --> ROUND_SELECT: Sẵn sàng
    ROUND_SELECT --> ROUND_1: Vào Vòng 1 (Ô Chữ)
    ROUND_SELECT --> ROUND_2: Vào Vòng 2 (Trắc Nghiệm)
    ROUND_SELECT --> ROUND_3: Vào Vòng 3 (Tự Luận)

    state ROUND_1 {
        [*] --> R1_BOARD_IDLE
        R1_BOARD_IDLE --> R1_CLUE_ACTIVE: MC/Player chọn câu
        R1_CLUE_ACTIVE --> R1_ANSWER_SUBMITTED: Trả lời / MC Xác nhận
        R1_ANSWER_SUBMITTED --> R1_TILE_REVEAL: Hiệu ứng mở chữ
        R1_TILE_REVEAL --> R1_BOARD_IDLE: Cập nhật điểm & Trở về bảng
        R1_BOARD_IDLE --> R1_FINAL_CIPHER_REVEAL: Hoàn thành 11 câu hoặc đoán đúng sớm
    }

    ROUND_1 --> SCOREBOARD: Kết thúc Vòng 1

    state ROUND_2 {
        [*] --> R2_READY
        R2_READY --> R2_QUESTION_ACTIVE: MC/Player bấm Bắt đầu
        R2_QUESTION_ACTIVE --> R2_ANSWER_LOCKED: Chọn phương án / Hết giờ (Timeout)
        R2_ANSWER_LOCKED --> R2_ANSWER_REVEALED: Công bố đáp án đúng & Giải thích
        R2_ANSWER_REVEALED --> R2_NEXT_QUESTION: Sang câu tiếp theo
        R2_NEXT_QUESTION --> R2_READY: Còn câu
        R2_NEXT_QUESTION --> R2_FINISHED: Hết 10 câu
    }

    ROUND_2 --> SCOREBOARD: Kết thúc Vòng 2

    state ROUND_3 {
        [*] --> R3_CONFIG_SELECTION
        R3_CONFIG_SELECTION --> R3_QUESTION_ACTIVE: Chọn câu tự luận
        R3_QUESTION_ACTIVE --> R3_THINKING_TIMER: Đếm ngược thời gian suy nghĩ
        R3_THINKING_TIMER --> R3_ANSWER_REVEALED: MC mở đáp án tham khảo
        R3_ANSWER_REVEALED --> R3_SCORING_DECISION: MC/Player chấm điểm (+20 / +10 / 0)
        R3_SCORING_DECISION --> R3_QUESTION_ACTIVE: Chọn câu tiếp
        R3_SCORING_DECISION --> R3_FINISHED: Hoàn thành số câu quy định
    }

    ROUND_3 --> SCOREBOARD: Kết thúc Vòng 3
    SCOREBOARD --> FINAL_RESULTS: Kết thúc tất cả các vòng
    FINAL_RESULTS --> CLOSING_SCENE: Xem tổng kết & Vinh danh
```

---

### 2. Định nghĩa Dữ liệu Phiên chơi (Game Session Schema)
- `sessionId`: Chuỗi UUID định danh phiên chơi.
- `version`: Số nguyên biểu thị phiên bản schema (hiện tại `1`).
- `gameMode`: `'MC_MODE' | 'SOLO_MODE'`.
- `currentRound`: `1 | 2 | 3`.
- `currentStage`: Trạng thái con trong vòng (ví dụ `'IDLE' | 'ACTIVE' | 'LOCKED' | 'REVEALED'`).
- `teams`: Danh sách các đội:
  - `id`: string.
  - `name`: string.
  - `color`: string (mã màu đại diện).
  - `score`: number.
  - `roundScores`: `{ round1: number; round2: number; round3: number }`.
- `round1State`:
  - `solvedClues`: Mảng các ID câu hỏi đã giải.
  - `cipherRevealed`: Boolean (đã mở toàn bộ từ khóa hay chưa).
  - `activeClueId`: string | null.
- `round2State`:
  - `currentQuestionIndex`: number.
  - `answers`: Record mapping `questionId` tới `{ selectedOption: 'A'|'B'|'C'|'D'; isCorrect: boolean; teamId?: string; timeRemaining: number }`.
  - `isLocked`: boolean.
- `round3State`:
  - `selectedQuestionIds`: Mảng ID các câu được chọn trong phiên thi.
  - `currentQuestionId`: string | null.
  - `scores`: Record mapping `questionId` tới `{ teamId: string; scoreAwarded: 0 | 10 | 20 }`.
- `history`: Danh sách các biến cố (Actions log) hỗ trợ **Undo** chính xác một hoặc nhiều bước trước đó.
- `updatedAt`: Timestamp ISO 8601.
