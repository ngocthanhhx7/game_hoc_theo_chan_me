import React, { useState } from 'react';
import {
  Download,
  Upload,
  RotateCcw,
  PlusCircle,
  MinusCircle,
  ArrowLeft,
  Volume2,
  VolumeX,
  Eye,
  Check,
  AlertTriangle,
} from 'lucide-react';
import { useGame } from '@/app/AppProviders';
import { Button } from '@/components/ui/Button';
import { GothicCard } from '@/components/ui/GothicCard';
import { Modal } from '@/components/ui/Modal';
import {
  exportSessionJson,
  importSessionJson,
  clearSessionStorage,
} from '@/domain/session/session-manager';
import styles from './SettingsView.module.css';

export const SettingsView: React.FC = () => {
  const { session, dispatch } = useGame();

  const [selectedTeamId, setSelectedTeamId] = useState(
    session.teams[0]?.id || ''
  );
  const [selectedRound, setSelectedRound] = useState<1 | 2 | 3>(1);
  const [adjustPoints, setAdjustPoints] = useState<number>(10);
  const [adjustReason, setAdjustReason] = useState<string>('Điểm khuyến khích của MC');
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState<boolean>(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleManualAdjust = (isAdd: boolean) => {
    if (!selectedTeamId) return;
    const finalPoints = isAdd ? Math.abs(adjustPoints) : -Math.abs(adjustPoints);

    dispatch({
      type: 'MANUAL_SCORE_ADJUSTMENT',
      payload: {
        teamId: selectedTeamId,
        round: selectedRound,
        points: finalPoints,
        reason: adjustReason || 'MC điều chỉnh điểm thủ công',
      },
    });
  };

  const handleExportJson = () => {
    const jsonStr = exportSessionJson(session);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `marian-session-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const text = evt.target?.result as string;
        const imported = importSessionJson(text);
        dispatch({ type: 'LOAD_SESSION', payload: imported });
        setImportSuccess(true);
        setImportError(null);
      } catch (err: any) {
        setImportError('Dữ liệu JSON không hợp lệ hoặc sai cấu trúc schema.');
        setImportSuccess(false);
      }
    };
    reader.readAsText(file);
  };

  const handleResetGame = () => {
    clearSessionStorage();
    dispatch({ type: 'RESET_GAME' });
    setShowResetConfirm(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Button
          variant="outline"
          size="sm"
          icon={<ArrowLeft size={16} />}
          onClick={() => dispatch({ type: 'SET_VIEW', payload: 'WELCOME' })}
        >
          Quay lại
        </Button>
        <h2 className={styles.title}>CẤU HÌNH & QUẢN TRỊ TRÒ CHƠI</h2>
      </div>

      <div className={styles.grid}>
        {/* MC Manual Score Adjustment */}
        <GothicCard
          title="ĐIỀU CHỈNH ĐIỂM SỐ THỦ CÔNG (MC)"
          subtitle="Dành cho MC cộng hoặc trừ điểm theo tình huống thực tế tại hội trường"
        >
          <div className={styles.fieldGroup}>
            <label>Chọn Đội Cần Điều Chỉnh:</label>
            <select
              className={styles.select}
              value={selectedTeamId}
              onChange={(e) => setSelectedTeamId(e.target.value)}
            >
              {session.teams.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} (Hiện có: {t.score}đ)
                </option>
              ))}
            </select>
          </div>

          <div className={styles.rowFields}>
            <div className={styles.fieldGroup}>
              <label>Thuộc Vòng Thi:</label>
              <select
                className={styles.select}
                value={selectedRound}
                onChange={(e) =>
                  setSelectedRound(Number(e.target.value) as 1 | 2 | 3)
                }
              >
                <option value={1}>Vòng 1 (Ô Chữ)</option>
                <option value={2}>Vòng 2 (Trắc Nghiệm)</option>
                <option value={3}>Vòng 3 (Tự Luận)</option>
              </select>
            </div>

            <div className={styles.fieldGroup}>
              <label>Số Điểm:</label>
              <input
                type="number"
                className={styles.input}
                value={adjustPoints}
                onChange={(e) => setAdjustPoints(Number(e.target.value))}
                min={1}
                max={100}
              />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label>Lý Do Điều Chỉnh (Ghi chú log):</label>
            <input
              type="text"
              className={styles.input}
              value={adjustReason}
              onChange={(e) => setAdjustReason(e.target.value)}
              placeholder="VD: Trả lời xuất sắc, vi phạm quy chế..."
            />
          </div>

          <div className={styles.btnRow}>
            <Button
              variant="emerald"
              icon={<PlusCircle size={18} />}
              onClick={() => handleManualAdjust(true)}
            >
              Cộng {adjustPoints} Điểm
            </Button>
            <Button
              variant="ruby"
              icon={<MinusCircle size={18} />}
              onClick={() => handleManualAdjust(false)}
            >
              Trừ {adjustPoints} Điểm
            </Button>
          </div>
        </GothicCard>

        {/* Data Persistence & Backup */}
        <GothicCard
          title="SAO LƯU & KHÔI PHỤC DỮ LIỆU PHIÊN CHƠI"
          subtitle="Xuất và nhập file JSON để lưu hồ sơ trận đấu"
        >
          <p className={styles.desc}>
            Dữ liệu trò chơi được tự động lưu trong trình duyệt này. Nếu muốn
            chuyển máy tính khác hoặc lưu kết quả sự kiện, bạn có thể tải file
            JSON.
          </p>

          <div className={styles.backupActions}>
            <Button
              variant="gold"
              icon={<Download size={18} />}
              onClick={handleExportJson}
            >
              Tải Xuống File JSON
            </Button>

            <label className={styles.uploadLabel}>
              <Upload size={18} />
              <span>Khôi Phục Từ File JSON</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportJson}
                className={styles.hiddenFileInput}
              />
            </label>
          </div>

          {importSuccess && (
            <div className={styles.successMessage}>
              <Check size={18} /> Đã khôi phục phiên chơi từ JSON thành công!
            </div>
          )}
          {importError && (
            <div className={styles.errorMessage}>
              <AlertTriangle size={18} /> {importError}
            </div>
          )}
        </GothicCard>

        {/* System & Accessibility Preferences */}
        <GothicCard
          title="TÙY CHỌN HỆ THỐNG & TRỢ NĂNG"
          subtitle="Cấu hình âm thanh, hiệu ứng thị giác và thiết lập lại"
        >
          <div className={styles.prefList}>
            <div className={styles.prefRow}>
              <div>
                <strong>Âm Thanh Hiệu Ứng (Web Audio):</strong>
                <p>Tiếng chuông nhà thờ, hiệu ứng đúng/sai, tiếng đếm giờ.</p>
              </div>
              <Button
                variant={session.isMuted ? 'outline' : 'marian'}
                size="sm"
                icon={session.isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                onClick={() => dispatch({ type: 'TOGGLE_MUTE' })}
              >
                {session.isMuted ? 'Đang Tắt' : 'Đang Bật'}
              </Button>
            </div>

            <div className={styles.prefRow}>
              <div>
                <strong>Chế Độ Giảm Chuyển Động (Reduced Motion):</strong>
                <p>Tắt bớt các hiệu ứng xoay lật để thân thiện với mắt.</p>
              </div>
              <Button
                variant={session.reducedMotion ? 'marian' : 'outline'}
                size="sm"
                icon={<Eye size={16} />}
                onClick={() => dispatch({ type: 'TOGGLE_REDUCED_MOTION' })}
              >
                {session.reducedMotion ? 'Đang Bật' : 'Đang Tắt'}
              </Button>
            </div>

            <div className={styles.prefRow}>
              <div>
                <strong>Khởi Tạo Lại Trò Chơi (Reset Game):</strong>
                <p>Đặt lại điểm số các đội về 0 và mở lại toàn bộ câu hỏi.</p>
              </div>
              <Button
                variant="ruby"
                size="sm"
                icon={<RotateCcw size={16} />}
                onClick={() => setShowResetConfirm(true)}
              >
                Khởi Tạo Lại
              </Button>
            </div>
          </div>
        </GothicCard>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <Modal
          isOpen={showResetConfirm}
          onClose={() => setShowResetConfirm(false)}
          title="XÁC NHẬN KHỞI TẠO LẠI TRÒ CHƠI"
          maxWidth="450px"
        >
          <div className={styles.resetModalBody}>
            <p>
              Bạn có chắc chắn muốn đặt lại điểm số và trạng thái của toàn bộ ba
              vòng thi đấu về ban đầu không? Thao tác này sẽ xóa tiến trình hiện
              tại.
            </p>
            <div className={styles.modalActions}>
              <Button
                variant="outline"
                onClick={() => setShowResetConfirm(false)}
              >
                Hủy
              </Button>
              <Button variant="ruby" onClick={handleResetGame}>
                Đồng Ý Xóa & Khởi Tạo Lại
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
