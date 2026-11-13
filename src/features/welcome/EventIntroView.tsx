import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useGame } from '@/app/AppProviders';
import { Button } from '@/components/ui/Button';
import { GothicCard } from '@/components/ui/GothicCard';
import styles from './EventIntroView.module.css';

export const EventIntroView: React.FC = () => {
  const { dispatch } = useGame();

  return (
    <div className={styles.container}>
      <div className={styles.headerBar}>
        <Button
          variant="outline"
          size="sm"
          icon={<ArrowLeft size={16} />}
          onClick={() => dispatch({ type: 'SET_VIEW', payload: 'WELCOME' })}
        >
          Quay lại
        </Button>
        <h2 className={styles.pageTitle}>GIỚI THIỆU CHỦ ĐỀ & NỀN TẢNG GIÁO LÝ</h2>
      </div>

      <div className={styles.grid}>
        <GothicCard
          title="SỰ KIỆN GẶP MẶT GIA ĐÌNH TẬN HIẾN"
          subtitle="Giáo xứ Lương Sơn • Thứ Tư, ngày 25 tháng 11 năm 2026"
          hasGothicArch
        >
          <p className={styles.paragraph}>
            Chương trình hội ngộ và học hỏi được tổ chức nhằm giúp các thành viên
            trong Gia đình Tận hiến và cộng đoàn giáo dân đào sâu hiểu biết về Đức
            Trinh Nữ Maria — Mẹ Thiên Chúa, Mẹ Hội Thánh và Mẹ của mỗi chúng ta.
            Qua ba vòng thi, người tham dự được gợi mở tâm tình kính mến, noi gương
            nhân đức Xin Vâng (Fiat) và vững bước trong đức tin.
          </p>
        </GothicCard>

        <GothicCard
          title="BỐN TÍN ĐIỀU VỀ ĐỨC MARIA"
          subtitle="Nền tảng Thánh Mẫu học trong Giáo lý Hội Thánh Công Giáo"
        >
          <ul className={styles.dogmaList}>
            <li>
              <strong>1. Mẹ Thiên Chúa (Theotokos - 431):</strong> Đức Maria cưu
              mang và sinh ra Ngôi Hai Thiên Chúa làm người. Ngài là Thiên Chúa
              thật và con người thật.
            </li>
            <li>
              <strong>2. Trọn Đời Đồng Trinh (Semper Virgo - 649):</strong> Đức Mẹ
              đồng trinh trước, trong và mãi mãi sau khi sinh Chúa Giêsu, dâng
              hiến toàn diện cho Thiên Chúa.
            </li>
            <li>
              <strong>3. Vô Nhiễm Nguyên Tội (1854):</strong> Ngay từ giây phút
              đầu thai, Mẹ được gìn giữ khỏi mọi vết nhơ tội nguyên tổ nhờ ơn cứu
              độ dự phòng của Chúa Kitô.
            </li>
            <li>
              <strong>4. Hồn Xác Lên Trời (1950):</strong> Sau khi hoàn tất cuộc
              đời trần thế, Đức Mẹ được Thiên Chúa đưa cả linh hồn và thể xác vào
              vinh quang thiên quốc.
            </li>
          </ul>
        </GothicCard>

        <GothicCard
          title="PHÂN BIỆT THỜ PHƯỢNG & BIỆT KÍNH"
          subtitle="Thần học về lòng sùng kính Công giáo (Cultus)"
        >
          <div className={styles.cultusGrid}>
            <div className={styles.cultusItem}>
              <span className={styles.cultusTag}>LATRIA</span>
              <h4>Thờ Phượng</h4>
              <p>
                Dành <strong>duy nhất</strong> cho Thiên Chúa Ba Ngôi (Chúa Cha,
                Chúa Con, Chúa Thánh Thần).
              </p>
            </div>
            <div className={styles.cultusItem}>
              <span className={styles.cultusTag}>HYPERDULIA</span>
              <h4>Biệt Kính</h4>
              <p>
                Tôn kính đặc biệt dành riêng cho <strong>Đức Mẹ Maria</strong>,
                Đấng trổi vượt trên mọi thụ tạo.
              </p>
            </div>
            <div className={styles.cultusItem}>
              <span className={styles.cultusTag}>DULIA</span>
              <h4>Tôn Kính</h4>
              <p>
                Dành cho các <strong>Thánh Thiên Thần</strong> và các Thánh Nam Nữ
                trên trời.
              </p>
            </div>
          </div>
        </GothicCard>

        <GothicCard
          title="TIẾN TRÌNH TRÒ CHƠI BA VÒNG"
          subtitle="Cấu trúc thiết kế trò chơi phục vụ sự kiện"
        >
          <div className={styles.roundStep}>
            <span className={styles.stepNum}>V1</span>
            <div>
              <strong>Giải Mã Ô Chữ Thánh (11 Mật Mã Đức Tin):</strong> Khám phá
              11 mảnh ghép mở ra từ khóa vàng <em>ĐỨC MẸ LA VANG</em>.
            </div>
          </div>
          <div className={styles.roundStep}>
            <span className={styles.stepNum}>V2</span>
            <div>
              <strong>Thử Thách Đức Tin (10 Câu Trắc Nghiệm):</strong> Trả lời
              chính xác 10 câu hỏi thần học sâu sắc trong 20 giây mỗi câu.
            </div>
          </div>
          <div className={styles.roundStep}>
            <span className={styles.stepNum}>V3</span>
            <div>
              <strong>Hành Trình Xin Vâng (Tự Luận & Chia Sẻ):</strong> Thảo luận
              các câu hỏi mở, đối chiếu giáo lý và chấm điểm theo rubric chuẩn.
            </div>
          </div>
        </GothicCard>
      </div>

      <div className={styles.footerAction}>
        <Button
          variant="gold"
          size="lg"
          onClick={() => dispatch({ type: 'SET_VIEW', payload: 'WELCOME' })}
        >
          Tôi Đã Hiểu — Sẵn Sàng Vào Chơi
        </Button>
      </div>
    </div>
  );
};
