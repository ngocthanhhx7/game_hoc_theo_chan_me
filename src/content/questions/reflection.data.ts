import { ReflectionQuestion } from '@/types/game';

export const REFLECTION_DATA: ReflectionQuestion[] = [
  {
    id: 'r01',
    index: 1,
    category: 'LIFE',
    categoryLabel: 'Cuộc Đời & Gia Thế',
    prompt: 'Ai là cha mẹ của Đức Maria theo truyền thống thánh truyền của Giáo hội?',
    referenceAnswer: 'Thánh Gio-akim (Joachim) và thánh An-na (Anne).',
    keyPoints: ['Thánh Gio-akim', 'Thánh An-na', 'Truyền thống mừng kính ngày 26 tháng 7 hằng năm'],
    rubric: {
      full: 20,
      partial: 10,
      none: 0,
    },
    reference: 'Truyền thống Giáo hội / Phúc âm Giacôbê',
  },
  {
    id: 'r02',
    index: 2,
    category: 'LIFE',
    categoryLabel: 'Cuộc Đời & Gia Thế',
    prompt: 'Đức Maria sinh sống tại đâu khi được sứ thần truyền tin?',
    referenceAnswer: 'Thành Na-da-rét (Nazareth), thuộc miền Ga-li-lê (Galilee) (Lc 1,26).',
    keyPoints: ['Thành Na-da-rét', 'Xứ Ga-li-lê', 'Nơi thánh gia sinh sống âm thầm'],
    rubric: {
      full: 20,
      partial: 10,
      none: 0,
    },
    reference: 'Lc 1,26',
  },
  {
    id: 'r03',
    index: 3,
    category: 'LIFE',
    categoryLabel: 'Cuộc Đời & Gia Thế',
    prompt: 'Sứ thần nào đã được Thiên Chúa sai đến truyền tin cho Đức Maria?',
    referenceAnswer: 'Sứ thần Gáp-ri-en (Tổng lãnh Thiên thần Gabriel) (Lc 1,26).',
    keyPoints: ['Sứ thần Gáp-ri-en (Gabriel)', 'Lời chào kính: Đầy ơn phúc, Đức Chúa ở cùng bà'],
    rubric: {
      full: 20,
      partial: 10,
      none: 0,
    },
    reference: 'Lc 1,26-28',
  },
  {
    id: 'r04',
    index: 4,
    category: 'LIFE',
    categoryLabel: 'Cuộc Đời & Gia Thế',
    prompt: 'Khi được truyền tin, Đức Maria đã thưa với sứ thần như thế nào để đón nhận Ngôi Hai Nhập Thể?',
    referenceAnswer:
      '“Vâng, tôi đây là nữ tỳ của Chúa, xin cứ làm cho tôi như lời sứ thần nói” (Lc 1,38) (Tiếng Latinh: Fiat mihi secundum verbum tuum).',
    keyPoints: [
      'Xưng mình là nữ tỳ khiêm hạ của Chúa',
      'Xin vâng trọn vẹn theo thánh ý Thiên Chúa',
      'Tiếng thưa Fiat mở ra công trình Cứu Độ',
    ],
    rubric: {
      full: 20,
      partial: 10,
      none: 0,
    },
    reference: 'Lc 1,38 / CCC 494',
  },
  {
    id: 'r05',
    index: 5,
    category: 'LIFE',
    categoryLabel: 'Cuộc Đời & Gia Thế',
    prompt: 'Bài ca nào Đức Maria đã hát khi đi thăm viếng bà thánh Ê-li-sa-bét (Isave)?',
    referenceAnswer:
      'Bài ca "Linh hồn tôi ngợi khen Chúa" (Thánh thi Magnificat) (Lc 1,46-55).',
    keyPoints: [
      'Bài ca Magnificat / Linh hồn tôi ngợi khen Chúa',
      'Diễn tả tâm tình tạ ơn sâu xa và lòng thương xót của Thiên Chúa đối với kẻ nghèo hèn',
    ],
    rubric: {
      full: 20,
      partial: 10,
      none: 0,
    },
    reference: 'Lc 1,46-55',
  },
  {
    id: 'r06',
    index: 6,
    category: 'DOGMAS',
    categoryLabel: 'Đặc Ân & Tín Điều',
    prompt: 'Đặc ân “Vô nhiễm nguyên tội” nghĩa là gì và tại sao ơn này lại cần thiết?',
    referenceAnswer:
      'Nghĩa là ngay từ giây phút đầu tiên được thụ thai trong lòng thân mẫu (bà thánh An-na), nhờ công nghiệp cứu chuộc của Chúa Giêsu Kitô, Đức Maria đã được gìn giữ khỏi mọi vết nhơ của tội nguyên tổ. Điều này cần thiết để Mẹ có một cung lòng và tâm hồn hoàn toàn tinh tuyền, thánh thiện xứng đáng cưu mang Con Chí Thánh của Thiên Chúa.',
    keyPoints: [
      'Được gìn giữ khỏi tội nguyên tổ ngay giây phút thụ thai',
      'Nhờ công nghiệp cứu chuộc của Chúa Giêsu Kitô',
      'Cần thiết để xứng đáng làm Mẹ Thiên Chúa',
    ],
    rubric: {
      full: 20,
      partial: 10,
      none: 0,
    },
    reference: 'Ineffabilis Deus (1854) / CCC 490-493',
  },
  {
    id: 'r07',
    index: 7,
    category: 'DOGMAS',
    categoryLabel: 'Đặc Ân & Tín Điều',
    prompt: 'Tại sao Đức Maria được Giáo hội tuyên xưng là Mẹ Thiên Chúa (Theotokos)?',
    referenceAnswer:
      'Vì Đức Giêsu Kitô là Thiên Chúa thật và là người thật (hai bản tính trong một Ngôi Vị thần linh). Đức Maria sinh ra Đức Giêsu về mặt nhân tính, nhưng Đấng Mẹ sinh ra chính là Ngôi Hai Thiên Chúa làm người. Tín điều này được Công đồng Ê-phê-xô long trọng định tín năm 431.',
    keyPoints: [
      'Chúa Giêsu là Ngôi Lời Thiên Chúa nhập thể (Thiên Chúa thật và người thật)',
      'Đức Mẹ cưu mang và sinh ra Ngôi Vị Con Thiên Chúa',
      'Công đồng Ê-phê-xô định tín năm 431 chống lạc giáo Nestorius',
    ],
    rubric: {
      full: 20,
      partial: 10,
      none: 0,
    },
    reference: 'Công đồng Ê-phê-xô (431) / CCC 495',
  },
  {
    id: 'r08',
    index: 8,
    category: 'DOGMAS',
    categoryLabel: 'Đặc Ân & Tín Điều',
    prompt: 'Tín điều "Đức Maria trọn đời đồng trinh" khẳng định điều gì?',
    referenceAnswer:
      'Khẳng định Đức Maria đồng trinh trước khi sinh Chúa Giêsu, trong khi sinh và mãi mãi về sau (Semper Virgo); Mẹ dâng hiến trọn vẹn cả hồn lẫn xác cho một mình Thiên Chúa và không hề có người con nào khác ngoài Chúa Giêsu.',
    keyPoints: [
      'Đồng trinh trước khi sinh (ante partum)',
      'Đồng trinh trong khi sinh (in partu)',
      'Đồng trinh trọn đời mãi mãi về sau (post partum)',
    ],
    rubric: {
      full: 20,
      partial: 10,
      none: 0,
    },
    reference: 'Công đồng Laterano (649) / CCC 496-507',
  },
  {
    id: 'r09',
    index: 9,
    category: 'DOGMAS',
    categoryLabel: 'Đặc Ân & Tín Điều',
    prompt: 'Ai là người đã công bố tín điều Đức Maria Hồn Xác Lên Trời và vào năm nào?',
    referenceAnswer:
      'Đức Giáo hoàng Pi-ô XII công bố ngày 1 tháng 11 năm 1950 qua Tông hiến Munificentissimus Deus, khẳng định rằng sau khi hoàn tất cuộc đời dương thế, Mẹ Maria được đưa cả hồn lẫn xác vào vinh quang thiên quốc.',
    keyPoints: [
      'Đức Giáo hoàng Pi-ô XII',
      'Ngày 01 tháng 11 năm 1950',
      'Tông hiến Munificentissimus Deus (Đưa cả hồn lẫn xác về trời)',
    ],
    rubric: {
      full: 20,
      partial: 10,
      none: 0,
    },
    reference: 'Munificentissimus Deus (1950) / CCC 966',
  },
  {
    id: 'r10',
    index: 10,
    category: 'FAITH_INQUIRIES',
    categoryLabel: 'Giải Đáp Thắc Mắc',
    prompt: 'Người Công giáo có "thờ" Đức Maria không? Hãy giải thích sự phân biệt giữa việc thờ phượng và tôn kính trong đức tin Công giáo.',
    referenceAnswer:
      'Không. Người Công giáo chỉ thờ phượng (latria) một mình Thiên Chúa Ba Ngôi. Đối với Đức Maria, Giáo hội dành sự tôn kính đặc biệt (hyperdulia / biệt kính) vì Mẹ là Mẹ Thiên Chúa và là gương mẫu trác tuyệt của lòng vâng phục tin kính. Đối với các thánh khác, Giáo hội dành sự tôn kính (dulia).',
    keyPoints: [
      'Khẳng định rõ: KHÔNG thờ Đức Maria',
      'Thờ phượng (latria): Dành riêng cho duy nhất Thiên Chúa Ba Ngôi',
      'Biệt kính (hyperdulia): Tôn kính đặc biệt dành cho Đức Mẹ',
      'Tôn kính (dulia): Dành cho các Thánh',
    ],
    rubric: {
      full: 20,
      partial: 10,
      none: 0,
    },
    reference: 'Lumen Gentium 66 / CCC 971 / Thánh Tôma Aquinô',
  },
  {
    id: 'r11',
    index: 11,
    category: 'FAITH_INQUIRIES',
    categoryLabel: 'Giải Đáp Thắc Mắc',
    prompt: 'Tại sao người Công giáo lại cầu nguyện với Đức Maria thay vì chỉ cầu nguyện trực tiếp với Chúa Giêsu?',
    referenceAnswer:
      'Chúng ta vẫn luôn cầu nguyện trực tiếp với Chúa Giêsu. Việc cầu nguyện với Đức Maria thực chất là nhờ Mẹ chuyển cầu (bầu cử) cùng với chúng ta lên Thiên Chúa, giống như con cái nhờ mẹ hiền tha thiết khẩn cầu giúp mình. Mẹ Maria không bao giờ giữ ai lại cho riêng mình, Mẹ luôn hướng dẫn con cái đến với Chúa Giêsu ("Hãy làm bất cứ điều gì Người bảo anh chị em" - Ga 2,5).',
    keyPoints: [
      'Chúng ta vẫn luôn luôn cầu nguyện trực tiếp với Chúa',
      'Đức Mẹ là Đấng chuyển cầu quyền thế (Đấng Bầu Cử)',
      'Lời dạy của Mẹ tại tiệc cưới Cana: "Hãy làm bất cứ điều gì Người bảo"',
    ],
    rubric: {
      full: 20,
      partial: 10,
      none: 0,
    },
    reference: 'Ga 2,1-11 / CCC 969-970',
  },
  {
    id: 'r12',
    index: 12,
    category: 'FAITH_INQUIRIES',
    categoryLabel: 'Giải Đáp Thắc Mắc',
    prompt: 'Đức Maria có cần được Chúa Giêsu cứu độ không? Ơn cứu độ của Mẹ có điểm gì đặc biệt?',
    referenceAnswer:
      'Có, Đức Maria vẫn cần được cứu độ. Nhưng Mẹ được cứu độ theo một cách thức tuyệt hảo nhất gọi là "ơn cứu độ dự phòng" (redemptio praeservativa): Thay vì được cứu vớt sau khi đã sa ngã vào tội lỗi như nhân loại chúng ta, Thiên Chúa đã gìn giữ Mẹ hoàn toàn tinh tuyền khỏi tội tổ tông ngay từ khi tượng thai nhờ vào công nghiệp cứu chuộc tiên liệu của Đức Giêsu Kitô.',
    keyPoints: [
      'Đức Mẹ vẫn cần được Chúa Giêsu cứu chuộc',
      'Được cứu độ bằng "ơn cứu độ dự phòng" (tiên liệu ngăn ngừa)',
      'Nhờ công nghiệp tử nạn và phục sinh của Chúa Giêsu Kitô',
    ],
    rubric: {
      full: 20,
      partial: 10,
      none: 0,
    },
    reference: 'Ineffabilis Deus / Chân phước Duns Scotus / CCC 492',
  },
];
