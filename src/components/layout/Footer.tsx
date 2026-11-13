import styles from './Footer.module.css';
import { ARTWORKS } from '@/content/artworks';
export const Footer = () => <footer className={styles.footer}>
  <div className={styles.container}>
    <span className={styles.eventInfo}>✧ Gia đình Tận hiến · Lương Sơn · 25.11.2026</span>
    <span className={styles.shortcutsHint}>Space: đếm giờ · U: hoàn tác · F: toàn màn hình · M: âm thanh</span>
    <details className={styles.credits}><summary>Nguồn hình ảnh & chữ</summary><div>
      <p>Ảnh kiến trúc Chartres · Txllxt TxllxT · <a href="https://commons.wikimedia.org/wiki/File:Chartres,_Cath%C3%A9drale,_nef_central,_vue_vers_le_haut.jpg" target="_blank" rel="noreferrer">Nguồn ảnh</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noreferrer">CC BY-SA 4.0</a>. Bản WebP được thu nhỏ; hiển thị có crop và lớp phủ tối, cùng giấy phép CC BY-SA 4.0.</p>
      <p>Kính màu Chartres · David Whelan · <a href="https://commons.wikimedia.org/wiki/File:Stained_glass_window,_Chartres_Cathedral,_France_(25846429952).jpg" target="_blank" rel="noreferrer">CC0, nguồn ảnh</a>.</p>
      <p>Virgin Annunciate · Antonello da Messina; Truyền Tin · Fra Angelico: Public Domain. Liên kết nguồn nằm dưới từng tranh.</p>
      {Object.entries(ARTWORKS).filter(([id]) => !['mary','glass','annunciation'].includes(id)).map(([id,art]) => <p key={id}>{art.title} · {art.author} · {art.generated ? 'Minh họa tạo bằng AI, không phải tư liệu lịch sử.' : <><a href={art.source} target="_blank" rel="noreferrer">Nguồn</a> · <a href={art.licenseUrl} target="_blank" rel="noreferrer">{art.license}</a>. Thu nhỏ, chuyển WebP, có crop khi hiển thị; giữ giấy phép nguồn.</>}</p>)}
      <p>Logo M–khăn choàng–hoa huệ và nền xanh Marian: tạo bằng AI cho dự án.</p>
      <p>Lora, Nunito, Patrick Hand · SIL Open Font License 1.1; font lưu cục bộ. Âm thanh hiệu ứng được tổng hợp bằng Web Audio.</p>
    </div></details>
  </div>
</footer>;
