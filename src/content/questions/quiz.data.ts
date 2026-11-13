import { QuizQuestion } from '@/types/game';

export const QUIZ_DATA: QuizQuestion[] = [
  {
    id: 'q01',
    index: 1,
    prompt:
      'Tín điều Đức Mẹ Vô Nhiễm Nguyên Tội (Ineffabilis Deus) được Đức Giáo Hoàng Piô IX công bố chính thức vào năm nào và khẳng định điều gì về Đức Maria?',
    options: {
      A: 'Năm 1854; khẳng định Đức Maria được thụ thai mà không hề mắc bất kỳ hình phạt trần thế nào.',
      B: 'Năm 1854; khẳng định ngay từ giây phút đầu tiên thụ thai, Đức Maria đã được gìn giữ khỏi mọi vết nhơ của nguyên tội do công nghiệp cứu chuộc của Chúa Giêsu Kitô.',
      C: 'Năm 1950; khẳng định Đức Maria không hề trải qua cái chết thể lý giống như nhân loại bình thường.',
      D: 'Năm 431; khẳng định Đức Maria hoàn toàn đồng trinh trước, trong và sau khi sinh Chúa Giêsu.',
    },
    answer: 'B',
    explanation:
      'Ngày 08/12/1854, Đức Giáo hoàng Piô IX ban hành Tông sắc Ineffabilis Deus, định tín rằng ngay từ giây phút đầu thai, Đức Trinh Nữ Maria đã được gìn giữ khỏi nguyên tội nhờ công nghiệp Chúa Cứu Thế.',
    reference: 'Ineffabilis Deus (1854) / CCC 491',
  },
  {
    id: 'q02',
    index: 2,
    prompt:
      'Tước hiệu "Theotokos" (Mẹ Thiên Chúa) dành cho Đức Maria đã được chính thức tuyên xưng tại Công đồng nào để chống lại lạc giáo Nestorius?',
    options: {
      A: 'Công đồng Nicea I (năm 325)',
      B: 'Công đồng Chalcedon (năm 451)',
      C: 'Công đồng Laterano IV (năm 1215)',
      D: 'Công đồng Ephesus (năm 431)',
    },
    answer: 'D',
    explanation:
      'Công đồng Ê-phê-xô năm 431 tuyên xưng Đức Maria là "Theotokos" (Mẹ Thiên Chúa) vì Đức Giêsu Kitô là Thiên Chúa thật và con người thật trong một Ngôi Vị thần linh duy nhất.',
    reference: 'Công đồng Ê-phê-xô (431) / CCC 495',
  },
  {
    id: 'q03',
    index: 3,
    prompt:
      'Tông hiến Munificentissimus Deus (ngày 1/11/1950) của Đức Piô XII đã định tín điều nào về Đức Maria?',
    options: {
      A: 'Đức Maria vô nhiễm nguyên tội, cả hồn lẫn xác đã được rước về vinh quang thiên quốc khi mãn thời gian sống ở gian trần.',
      B: 'Đức Maria được đặt làm Nữ Vương trời đất và trung gian mọi ơn thánh.',
      C: 'Đức Maria đã cộng tác trực tiếp ngang hàng với Chúa Kitô trong hy tế thập giá.',
      D: 'Đức Maria được ơn miễn chuẩn khỏi mọi tội nhẹ trong suốt cuộc đời dương thế.',
    },
    answer: 'A',
    explanation:
      'Tông hiến Munificentissimus Deus công bố ngày 01/11/1950 định tín: "Đấng Vô Nhiễm Nguyên Tội Mẹ Thiên Chúa trọn đời đồng trinh Maria, sau khi hoàn tất cuộc đời dương thế, đã được rước cả hồn lẫn xác vào vinh quang thiên quốc."',
    reference: 'Munificentissimus Deus (1950) / CCC 966',
  },
  {
    id: 'q04',
    index: 4,
    prompt:
      'Trong truyền thống Công giáo, ý nghĩa thần học sâu xa của tín điều "Đồng trinh trọn đời" (Semper Virgo) đối với Đức Maria là gì?',
    options: {
      A: 'Khẳng định đời sống hôn nhân với thánh Giuse là một sự kết hợp hoàn toàn mang tính tượng trưng không có thực tế.',
      B: 'Chứng minh thân xác con người là thứ ô uế cần phải được tách rời khỏi các mối dây quan hệ tự nhiên.',
      C: 'Diễn tả việc Đức Maria hoàn toàn hiến dâng trọn vẹn tâm hồn và thân xác cho một mình Thiên Chúa, và Chúa Giêsu là hoa trái độc nhất của sự sung mãn ấy.',
      D: 'Ngăn chặn việc sinh thêm con cái vì lý do kinh tế và xã hội trong gia đình Nadarét thời bấy giờ.',
    },
    answer: 'C',
    explanation:
      'Đức Đồng trinh trọn đời của Mẹ là dấu chỉ của một đức tin trọn vẹn, không phân chia, sự hiến dâng toàn diện không chia sẻ của một thụ tạo đối với Đấng Tạo Hóa (CCC 506).',
    reference: 'CCC 499-507',
  },
  {
    id: 'q05',
    index: 5,
    prompt:
      'Khi đứng dưới chân thập giá (Ga 19,26-27), việc Chúa Giêsu trao phó Đức Mẹ cho môn đệ yêu dấu và ngược lại mang ý nghĩa nền tảng nào về mặt sinh hoa kết quả thiêng liêng?',
    options: {
      A: 'Chỉ đơn thuần là bổn phận hiếu thảo của một người con trai cả đối với mẹ ruột trước lúc lâm chung.',
      B: 'Thiết lập vai trò làm Mẹ của Đức Maria đối với toàn thể nhân loại, biểu trưng qua môn đệ đại diện cho các tín hữu trong Hội Thánh.',
      C: 'Chuyển giao quyền lãnh đạo nhóm các tông đồ sang cho Đức Maria sau khi Ngài qua đời.',
      D: 'Giải phóng Đức Mẹ khỏi đau khổ để tránh chứng kiến cái chết oan nghiệt của con mình.',
    },
    answer: 'B',
    explanation:
      'Bằng lời trăng trối trên Thập giá, Chúa Giêsu đã trao ban Mẹ Ngài làm Mẹ của mọi môn đệ, qua đó Đức Maria chính thức trở thành Mẹ của Hội Thánh và Mẹ toàn thể nhân loại.',
    reference: 'Ga 19,26-27 / Lumen Gentium 58',
  },
  {
    id: 'q06',
    index: 6,
    prompt:
      'Trong Sách Khải Huyền chương 12, hình ảnh "Người Phụ Nữ mình mặc áo mặt trời, chân đạp mặt trăng, đầu đội triều thiên mười hai ngôi sao" được Giáo hội diễn giải theo nghĩa cánh chung và hội thánh học như thế nào?',
    options: {
      A: 'Chỉ tượng trưng cho dân tộc Israel thời Cựu Ước mà không có liên hệ gì đến thời Tân Ước.',
      B: 'Hoàn toàn ám chỉ Giáo hội chiến thắng trên trời mà không liên quan đến cá nhân Đức Maria.',
      C: 'Là hình ảnh nhân hóa của đền thờ Giêrusalem bị tàn phá trong lịch sử.',
      D: 'Vừa biểu trưng cho Đức Maria trong vinh quang thiên quốc, vừa tượng trưng cho Hội Thánh đang lữ hành và sinh ra những người con trong đau khổ.',
    },
    answer: 'D',
    explanation:
      'Giáo hội giải thích "Người Phụ Nữ" mang ý nghĩa kép trác tuyệt: Mẹ Maria - Mẹ Đấng Cứu Thế hiển vinh trên trời, đồng thời là hình ảnh Hội Thánh đang vượt qua cơn đau sinh nở và bách hại giữa trần gian.',
    reference: 'Kh 12,1-6 / Redemptoris Mater 24',
  },
  {
    id: 'q07',
    index: 7,
    prompt:
      'Trong bài ca ngợi Magnificat (Lc 1,46-55), câu nói "Ngài hạ bệ những kẻ quyền thế, nâng cao mọi người khiêm nhường" phản ánh chiều kích thần học nào của Kinh Thánh?',
    options: {
      A: 'Cuộc cách mạng cánh chung của Thiên Chúa: đảo ngược các giá trị trần thế để thiết lập triều đại công lý và lòng thương xót của Ngài.',
      B: 'Lời kêu gọi nổi dậy bạo lực chống lại đế quốc Rôma đang cai trị Palestine thời bấy giờ.',
      C: 'Sự phân chia giai cấp vĩnh viễn không thể thay đổi trong xã hội do định mệnh ấn định.',
      D: 'Sự tự hào kiêu hãnh của dòng dõi vua Đavít đối với các quốc gia ngoại giáo xung quanh.',
    },
    answer: 'A',
    explanation:
      'Bài ca Magnificat loan báo trật tự cứu độ mới của Nước Trời: Thiên Chúa tôn vinh những tâm hồn bé mọn, khiêm hạ và hạ bệ những kẻ kiêu ngạo tự mãn cậy dựa vào sức mạnh trần gian.',
    reference: 'Lc 1,51-53',
  },
  {
    id: 'q08',
    index: 8,
    prompt:
      'Các thông điệp cốt lõi được Đức Mẹ truyền lại tại Fatima (Bồ Đào Nha) năm 1917 đặc biệt kêu gọi nhân loại thực hiện điều gì?',
    options: {
      A: 'Di cư hàng loạt đến các vùng đất hoang vu để lánh nạn chiến tranh thế giới thứ nhất.',
      B: 'Ăn năn đền tội, cải thiện đời sống, siêng năng lần chuỗi Mân Côi và sùng kính Trái Tim Vẹn sạch Đức Mẹ.',
      C: 'Thành lập một lực lượng quân đội thánh chiến bảo vệ Giáo hội châu Âu.',
      D: 'Dừng mọi hoạt động phụng vụ công khai để tránh bị bách hại chính trị.',
    },
    answer: 'B',
    explanation:
      'Ba mệnh lệnh Fatima gồm: 1) Cải thiện đời sống và ăn năn đền tội; 2) Siêng năng lần chuỗi Mân Côi hằng ngày; 3) Tôn sùng Trái Tim Vẹn Sạch Mẹ Maria để cầu cho người có tội ăn năn trở lại.',
    reference: 'Sứ điệp Fatima 1917',
  },
  {
    id: 'q09',
    index: 9,
    prompt:
      'Lời thưa "Fiat" (Xin vâng) của Đức Maria trong biến cố Truyền Tin được các Giáo phụ và Thần học gia định vị như thế nào trong tương quan với lịch sử nhân loại?',
    options: {
      A: 'Là một hành vi miễn cưỡng chấp nhận định mệnh do Thiên sứ truyền đạt.',
      B: 'Là quyết định chính trị nhằm tìm kiếm sự che chở cho gia đình tương lai của mình.',
      C: 'Là khoảnh khắc Đức Maria được ban quyền phán xét các tạo vật trên trời dưới đất.',
      D: 'Là tiếng "Xin vâng" đảo ngược lại sự bất tuân của Evà xưa, trở thành cánh cửa mở ra công trình Nhập Thể của Con Thiên Chúa.',
    },
    answer: 'D',
    explanation:
      'Thánh Irênê và các Giáo phụ khẳng định: Sự bất tuân của Evà thắt chặt sợi dây diệt vong, nhưng sự vâng phục xin vâng của Đức Maria đã tháo gỡ nút thắt ấy, mở lối cho Đấng Cứu Thế đến với nhân loại.',
    reference: 'Lc 1,38 / CCC 494 / Thánh Irênê',
  },
  {
    id: 'q10',
    index: 10,
    prompt:
      'Có bao nhiêu lễ về Đức Maria trong năm phụng vụ theo lịch chung của Giáo hội Công giáo La-tinh?',
    options: {
      A: '4 lễ trọng, 3 lễ kính, 11 lễ nhớ (6 buộc, 5 tự do)',
      B: '3 lễ trọng, 3 lễ kính, 11 lễ nhớ',
      C: '3 lễ trọng, 4 lễ kính, 12 lễ nhớ (la vang)',
      D: '4 lễ trọng, 4 lễ kính, 11 lễ nhớ',
    },
    answer: 'A',
    explanation:
      'Lịch Chung Rôma gồm: 4 Lễ Trọng (01/01, 25/03, 15/08, 08/12), 3 Lễ Kính (31/05, 08/09, Thứ Bảy sau Lễ Thánh Tâm), và 11 Lễ Nhớ (6 lễ buộc và 5 lễ tự chọn). Tại Việt Nam có thêm đại lễ Đức Mẹ La Vang theo lịch riêng.',
    reference: 'Lịch Chung Rôma / Quy chế Tổng quát về Năm Phụng vụ',
  },
];
