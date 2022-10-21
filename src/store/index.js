import { createStore } from "vuex";
import checkUserLogin from "@/utils/checkUserLogin";
import { authService } from "@/services/authService";
import { blogService } from "@/services/blogService";
import { baseService } from "@/services/baseService";
import { chatService } from "@/services/chatService";

export default createStore({
  state: {
    statusShowPopup: false,
    dataCurrentCampaign: null,
    dataCurrentAuction: null,
    dataUserCurrent: null,
    dataListAnimal: [
      {
        id: 0,
        listImage: [
          "https://nld.mediacdn.vn/2013/11-chot-ee76b.jpg",
          "https://thesaigontimes.vn/Uploads/Articles/50059/e86f1_seu-o-tram-chim-tam-nong.jpg",
          "https://ktmt.vnmediacdn.com/images/2021/01/09/9-1610186880-seu-dau-do.jpg",
          "https://thesaigontimes.vn/Uploads/Articles/50059/e86f1_seu-o-tram-chim-tam-nong.jpg",
        ],
        name: "Sếu đầu đỏ",
        main_img_not_bg: "seu_dau_do.jpg",
        description:
          "Sếu đầu đỏ, hay còn gọi là sếu cổ trụi, danh pháp ba phần: Grus antigone sharpii[2], là một phân loài của loài sếu sarus. Đây là phân loài chim quý hiếm tại miền nam Việt Nam, nằm trong Sách đỏ Việt Nam và Sách đỏ IUCN thế giới. Sếu đầu đỏ phương Đông trưởng thành cao khoảng 150–180 cm; sải cánh từ 220–250 cm và có trọng lượng trung bình 8–10 kg, là loài lớn nhất trong họ sếu.",
        species: "G. a. sharpii",
        habitat:
          "Đầm lầy, các vùng nước nông, các vùng đất ngập nước chua phèn có nhiều cỏ năn.",
        quantity: "Khoảng 11 cá thể",
        classAnimal: "Lớp chim",
        distribution: "Việt Nam, Lào, Campuchia, Myanmar, Thái Lan và Vân Nam",
      },
      {
        id: 1,
        listImage: [
          "https://cdn.pixabay.com/photo/2016/05/20/21/50/pigeon-1406081_960_720.jpg",
          "https://www.thespruce.com/thmb/aRa8MwXZTmoeQ80Zy5jLXuYygZM=/1500x1000/filters:fill(auto,1)/mourning-dove-58a6daf65f9b58a3c9161352.jpg",
          "https://feederwatch.org/wp-content/uploads/2021/02/MD-7-1024x683.jpg",
          "https://cdn.download.ams.birds.cornell.edu/api/v1/asset/60386921/1800",
        ],
        main_img_not_bg: "bo_cau_nau.jpg",
        name: "Bồ cầu nâu",
        description:
          "Bồ câu nâu (danh pháp hai phần: Columba punicea) là một loài chim trong họ Columbidae. Chiều dài của bồ câu nâu là từ 36 - 40,5 cm. Bồ câu đực khi trưởng thành có phần đầu màu xám trắng còn phần trên thì có màu nâu tía với độ bóng màu xanh lá cây mờ nhạt trên cổ, thân và lưng có màu xanh nhưng óng ánh hơn, mông sẫm và đuôi có màu xám phủ hết mông, cổ họng và phần dưới có màu xám. Còn con cái thì có phần đầu màu nâu xám và nâu.",
        species: "Columbiformes",
        habitat: "rừng thường xanh nguyên sinh hoặc thứ sinh",
        classAnimal: "Lớp chim",
        quantity: "3.750-14.999 cá thể",
        distribution:
          "Bắc Ấn Độ, Bangladesh, Myanmar, Thái Lan, Lào, Campuchia và Việt Nam",
      },
      {
        id: 2,
        listImage: [
          "https://i-vnexpress.vnecdn.net/2013/11/14/Saola-010-in-viet-nam-1992-ap-9875-1384401101_m_460x0.jpg",
          "https://vnn-imgs-f.vgcloud.vn/2021/07/09/15/google-phoi-hop-bao-ton-loai-dong-vat-hoang-da-quy-hiem-bac-nhat-viet-nam.jpg",
          "https://photo-cms-anninhthudo.zadn.vn/w600/Uploaded/2022/206/2019_10_29/4-vuon-di-san-asean-moi-tai-viet-nam_13.jpg",
          "https://vcdn-vnexpress.vnecdn.net/2017/07/11/saola-6599-1499739855.jpg",
        ],
        main_img_not_bg: "sao-la.jpg",
        name: "Sao la",
        classAnimal: "Lớp thú",
        description:
          "Sao la, được mệnh danh là 'Kỳ lân châu Á', là một trong những loài thú lớn đặc hữu có nguy cơ tuyệt chủng cao nhất trên thế giới. Cho đến nay chưa có nhà sinh vật học nào từng nhìn thấy Sao la ngoài tự nhiên, và những hình ảnh hoang dã hiếm hoi của loài này có được là nhờ vào hệ thống bẫy ảnh do các nhà bảo tồn thiết lập trong các khu rừng tại Lào và Việt Nam. Chính vì sự quý hiếm và bí ẩn đó mà ít người biết được tính cấp thiết của việc bảo vệ những cá thể Sao la cuối cùng, cũng như sự quan trọng của việc dành nguồn lực cho công tác bảo tồn trước khi loài này hoàn toàn biến mất",
        species: "P.nghetinhensis",
        habitat:
          "Nơi có suối có độ cao trên 200 – 600 m trên mực nước biển dọc dãy Trường Sơn",
        quantity: "50 cá thể",
        distribution: "rừng Trường Sơn tại Việt Nam và Lào",
      },
      {
        id: 3,
        listImage: [
          "https://vcdn-vnexpress.vnecdn.net/2021/09/06/vuon-den-ma-trang-7322-1628607-5767-5110-1630922830.jpg",
          "https://image.xahoi.com.vn/resize_480x600/news/2012/5/25/vuon2.jpg",
          "https://photo-cms-sggp.zadn.vn/Uploaded/2022/duaeymdrei/2021_08_11/untitled-1_riht.jpg",
          "https://kenh14cdn.com/Images/Uploaded/Share/2011/07/25/110725kpvuonbacma-1.jpg",
        ],
        main_img_not_bg: "vuon_den.jpg",
        name: "Vượn đen má trắng",
        classAnimal: "Lớp thú",
        description:
          "Vượn đen má trắng (danh pháp khoa học: Nomascus leucogenys) là loài vượn bản địa của Việt Nam, Lào và tỉnh Vân Nam thuộc Trung Quốc. Loài này có quan hệ họ hàng gần gũi với loài Nomascus siki. Các con cái của hai loài này hầu như không phân biệt với nhau. Bộ gen của N. leucogenys đã được lập trình tự và công bố năm 2011. Một quần thể 455 con vượn đen má trắng gồm nhiều đàn nhỏ đã được phát hiện năm 2011 tại Vườn quốc gia Pù Mát, tỉnh Nghệ An, Việt Nam, gần biên giới với Lào. Quần thể này nằm cách xa khu dân cư và chiếm 2/3 số lượng vượn đen má trắng tại Việt Nam. Tính đến năm 2011, số lượng vượn má trắng đã giảm hơn 80% trong 45 năm.",
        species: "N. leucogenys",
        habitat: "rừng rậm",
        quantity: "Khoảng 60 cá thể",
        distribution: "Việt Nam, Lào và tỉnh Vân Nam thuộc Trung Quốc",
      },
    ],
    dataCharityOrganization: [
      {
        id: 0,
        link: "https://www.thiennhien.org/",
        logo: "logo-env3.png",
        name: "Trung tâm giáo dục thiên nhiên",
        location: "Nha trang",
        description:
          "Chương trình Chính sách và Pháp luật ENV ra đời năm 2007 nhằm góp phần cải tiến các văn bản pháp luật, các cơ chế, chính sách liên quan đến bảo vệ và bảo tồn ĐVHD.",
      },

      {
        id: 1,
        link: "https://www.facebook.com/VietnamWWF/",
        logo: "wwf_to_chuc.png",
        name: "Tổ chức Quốc tế về Bảo tồn Thiên nhiên tại Việt Nam",
        location: "Hà Nội",
        description:
          "WWF được thành lập vào năm 1961 bởi một nhóm các nhà yêu môi trường trên thế giới. Bắt đầu từ năm 1995, WWF chính thức có văn phòng đại diện tại Việt Nam.",
      },

      {
        id: 2,
        link: "https://vnuf.edu.vn/to-chuc-bao-ton-dong-thuc-vat-hoang-da-quoc-te-ffi-tuyen-dung-can-bo-du-an-bao-ton-thuc-vat.html",
        logo: "ffi_to_chuc.png",
        name: "Tổ chức Bảo tồn động thực vật quốc tế",
        location: "Huế",
        description:
          "Nhiệm vụ của FFI là bảo tồn các loài và hệ sinh thái bị đe dọa trên toàn thế giới, lựa chọn các giải pháp bền vững, dựa trên khoa học đúng đắn và có tính đến nhu cầu của con người.",
      },

      {
        id: 3,
        link: "https://www.facebook.com/animalsasiavietnam/",
        logo: "aa_to_chuc.png",
        name: "Tổ chức Động vật châu Á",
        location: "Quãng ngãi",
        description:
          "Từ những ngày đầu hoạt động tại Việt Nam vào năm 2006, Tổ chức Động vật Châu Á đã vươn lên trở thành một trong những tổ chức hàng đầu và có uy tín trong hoạt động kêu gọi chấm dứt việc nuôi nhốt gấu, cũng như quan tâm và cải thiện quyền lợi cho loài vật nguy cấp này.F",
      },
    ],
    dataMapVietName: [
      {
        id: 0,
        link: "home",
        description:
          "Miền Bắc Việt Nam là một khái niệm để chỉ vùng địa lý ở phía bắc nước Việt Nam. Tuy nhiên, tùy theo từng thời điểm lịch sử và thói quen sử dụng mà khái niệm này đôi lúc còn được dùng để chỉ các vùng lãnh thổ chính trị khác nhau một cách không chính thức. ",
        name: "Miền Bắc",
        img: "bgbac.png",
      },

      {
        id: 1,
        link: "home",
        description:
          "Miền Bắc Việt Nam là một khái niệm để chỉ vùng địa lý ở phía bắc nước Việt Nam. Tuy nhiên, tùy theo từng thời điểm lịch sử và thói quen sử dụng mà khái niệm này đôi lúc còn được dùng để chỉ các vùng lãnh thổ chính trị khác nhau một cách không chính thức. ",
        name: "Miền Trung",
        img: "bgtrung.png",
      },

      {
        id: 2,
        link: "home",
        description:
          "Miền Bắc Việt Nam là một khái niệm để chỉ vùng địa lý ở phía bắc nước Việt Nam. Tuy nhiên, tùy theo từng thời điểm lịch sử và thói quen sử dụng mà khái niệm này đôi lúc còn được dùng để chỉ các vùng lãnh thổ chính trị khác nhau một cách không chính thức. ",
        name: "Miền Nam",
        img: "bgnam.png",
      },
    ],
    dataListOrganization: [
      {
        id: 0,
        listImage: [
          "https://www.animalsasia.org/us/assets/images/events/uk/AAtwitterlogoWB.png",
          "https://thesaigontimes.vn/Uploads/Articles/50059/e86f1_seu-o-tram-chim-tam-nong.jpg",
          "https://ktmt.vnmediacdn.com/images/2021/01/09/9-1610186880-seu-dau-do.jpg",
          "https://thesaigontimes.vn/Uploads/Articles/50059/e86f1_seu-o-tram-chim-tam-nong.jpg",
        ],
        name: "Tổ chức Động vật châu Á (Animals Asia)",
        main_img_not_bg: "seu_dau_do.jpg",
        activity:
          "Năm 2005, tổ chức AAF và chính phủ Việt Nam đã ký kết thỏa thuận nhằm xây dựng một Trung tâm cứu hộ gấu tại Vườn quốc gia Tam Đảo, tỉnh Vĩnh Phúc và cam kết tài trợ và duy trì hoạt động của Trung tâm trong thời gian tối thiểu là 20 năm. Đây là một bước đi quan trọng hướng tới việc cứu hộ các cá thể gấu gặp nạn trong khu vực và chấm dứt việc nuôi gấu lấy mật tại Việt Nam.Với tôn chỉ và phương châm hoạt động nhân đạo, Tổ chức luôn hết mình với công tác cứu hộ gấu và hàng năm luôn dẫn đầu về giá trị giải ngân trong hạng mục các dự án phi chính phủ đang được thực hiện tại tỉnh Vĩnh Phúc.",
        establish: "Tiến sỹ Jill Robinson",
        founding: "Năm 1998",
        headquarters: "có trụ sở tại Hồng Kông",
        distribution:
          "văn phòng đại diện tại nhiều nước như Anh, Mỹ, Đức, Ý, Úc.",
      },
      {
        id: 1,
        listImage: [
          "https://yt3.ggpht.com/ytc/AKedOLS0aqyo4voGcMuF1LaoIb0ovqn2Z72HogCaW7tPLg=s900-c-k-c0x00ffffff-no-rj",
        ],
        name: "Trung tâm giáo dục thiên nhiên (ENV)",
        activity:
          "Hoàn thiện chính sách pháp luật: Từ năm 2008, ENV bắt đầu tích cực tham gia đóng góp cải tiến các văn bản pháp luật liên quan đến bảo vệ ĐVHD. ENV hợp tác với các bộ và các cá nhân, tổ chức có liên quan để từng bước cải tiến các văn bản pháp luật, các chính sách để các văn bản pháp luật ngày càng có tính thực thi và hiệu quả cao, giảm thiểu các lỗ hổng pháp lý, tránh sự mâu thuẫn và chồng chéo giữa các văn bản. Tăng cường thực thi pháp luật: Từ năm 2005, ENV thành lập đường dây nóng bảo vệ ĐVHD để khuyến khích người dân thông báo các vi phạm về ĐVHD cho ENV. Sau khi nhận được thông báo, ENV phối hợp với các cơ quan chức năng xử lý các vi phạm rồi thông báo kết quả cho người báo tin. Ngoài ra, ENV còn tổ chức các chiến dịch giảm thiểu vi phạm về ĐVHD tại các thành phố và các đô thị lớn trên cả nước. Giảm nhu cầu tiêu thụ: ENV thường xuyên thực hiện các chiến dịch nâng cao nhận thức cho cộng đồng nhằm giảm thiểu nhu cầu tiêu thụ ĐVHD, đồng thời khuyến khích sự tham gia của người dân trong việc bảo vệ ĐVHD. ENV sử dụng nhiều phương pháp tiếp cận khác nhau như báo chí, phát thanh, truyền hình và tổ chức các sự kiện cho nhiều đối tượng khác nhau.",
        establish:
          "được thành lập trên cơ sở những thành công và kinh nghiệm của Chương trình nâng cao nhận thức bảo tồn tại Vườn quốc gia (VQG) Cúc Phương (CAP).",
        founding: "Năm 2000",
        headquarters: "có trụ sở tại Việt Nam ",
        distribution: "văn phòng đại diện tại Việt Nam",
      },
      {
        id: 2,
        listImage: ["https://mentori.vn/upload/recruitment/chi1625325739.jpg"],
        name: "Tổ chức Bảo tồn động thực vật quốc tế (FFI)",
        activity:
          "Mục tiêu của hiệp hội là bảo vệ tương lai của các quần thể động vật có vú ở khu vực Nam Châu Phi, vốn đang ở trạng thái báo động do sự xâm lấn môi trường sống và săn bắt quá mức. Nhờ làm việc đồng thời giữa các chủ đất, chính phủ và các thợ săn mang mục đích giải trí, Hiệp hội đã giúp chính quyền thông qua các đạo luật kiểm soát săn bắn diện rộng ở Đông Phi và Nam Phi. Việc này đã nhanh chóng mở đường cho một loạt các công viên quốc gia, như Vườn quốc gia Kruger and Vườn quốc gia Serengeti.",
        establish:
          "bởi một nhóm các nhà tự nhiên học người Anh và chính trị gia Mỹ tại Châu Phi.",
        founding: "thành lập năm 1903",
        headquarters: "có trụ sở tại Mỹ và Châu Phi",
        distribution: "FFI hiện có thành viên ở 80 quốc gia.",
      },
      {
        id: 3,
        listImage: [
          "http://static.ybox.vn/2021/3/3/1616561035763-h%E1%BB%8Dc%20b%E1%BB%95ng%20c%C3%A1c%20ch%C3%A2u%20l%E1%BB%A5c%20(50).png",
        ],
        name: "Four Paws",
        activity:
          "Tại các khu bảo tồn của chúng tôi ở Áo, Đức, Ukraina, Kosovo, Bulgari, Thụy Sĩ, Nam Phi và Việt Nam, chúng tôi cung cấp một ngôi nhà an toàn cho các loài động vật hoang dã như mèo lớn, gấu, đười ươi và voi được giải cứu khỏi những điều kiện nuôi nhốt không phù hợp từ khắp nơi trên thế giới.Chăm sóc động vật đi lạc: Tại nhiều quốc gia, động vật đi lạc thường bị coi thường và bị giết. Các dự án triệt sản của chúng tôi nhằm mục đích hỗ trợ lâu dài. Triệt sản động vật giúp hạn chế số lượng thú hoang, đồng thời, dịch vụ chăm sóc y tế giúp ngăn ngừa bệnh tật và dịch bệnh.Cứu trợ Thảm họa dành cho Động vật: Khi thảm họa xảy ra với con người và động vật, một nhóm chuyên gia của chúng tôi sẽ hỗ trợ thông qua hình thức trực tiếp giải cứu động vật, cung cấp các dịch vụ y tế công cộng và bảo vệ sinh kế cùng với động vật.",
        establish: "thành lập bởi Heli Dungler",
        founding: "năm 1988 tại Vienna",
        headquarters: "có trụ sở tại Vienna",
        distribution:
          "với các văn phòng tại Úc, Áo, Bỉ, Bulgary, Đức, Kosovo, Hà Lan, Thụy Sĩ, Nam Phi, Thái Lan, Ukraina, Anh, Mỹ và Việt Nam cũng như các khu bảo tồn động vật được giải cứu tại 11 quốc gia.",
      },
      {
        id: 4,
        listImage: [
          "https://bio-env.ued.udn.vn/wp-content/uploads/2021/07/1.jpg.png",
        ],
        name: "Hiệp hội các vườn thú Frankfurt (FZS)",
        activity:
          "Các Zoological Society Frankfurt (FZS) được thành lập vào năm 1858 bởi công dân của Frankfurt thành lập Vườn động vật học, mà nó hoạt động cho đến khi Chiến tranh thế giới thứ nhất . Hội đồng thành phố sau đó nhận trách nhiệm về sở thú cho đến năm 1950, khi FZS một lần nữa trở thành hiệp hội phát triển của sở thú. Bài viết này trên một sở thú , hồ cá , công viên Safari , Dolphinarium , hoặc chuồng là một cuống . Bạn có thể giúp Wikipedia bằng cách mở rộng nó .",
        establish: "bởi công dân của Frankfurt.",
        founding: "được thành lập vào năm 1858",
        headquarters: "nằm ở phần phía đông của Innenstadt (nội thành)",
        distribution: "hiện có thành viên ở 80 quốc gia.",
      },
      {
        id: 5,
        listImage: [
          "https://images.squarespace-cdn.com/content/v1/535bb1a7e4b0fcd1575ff4ff/1593500063262-SEYPSYED3OTO1VC9I8NK/WhatsApp+Image+2020-04-14+at+14.42.33.jpeg?format=500w",
        ],
        name: "WildAct",
        activity:
          "Bảo tồn các loài và hệ sinh thái bị đe dọa dựa trên cơ sở khoa học; Cung cấp chương trình giáo dục bảo tồn và xây dựng năng lực địa phương cho giới trẻ Việt Nam ở cả nông thôn và thành phố trên cả nước; Thay đổi tư duy của người Việt Nam thông qua các bằng chứng khoa học và kế sinh nhai của người dân địa phương; Hợp tác với các tổ chức bảo tồn và các bên liên quan khác để giải quyết các vấn đề bảo tồn tại Việt Nam cũng như trên thế giới.",
        establish: "được thành lập bởi một tổ chức phi lợi nhuận tại Việt Nam.",
        founding: "được thành lập vào năm 2015",
        headquarters: "có trụ sở tại Việt Nam",
        distribution: "các tỉnh thành trên Việt Nam.",
      },
    ],
    dataAuction: [
      {
        id: 0,
        category: "",
        img: "https://vcdn1-vnexpress.vnecdn.net/2018/12/31/a32-1546245488.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=40RDEE7tFUYVLFLAfCJpkQ",
        description:
          "nhằm gây quỹ bảo vệ loài tê giác ở châu Phi đang đứng trước nạn tuyệt sủng vì sự săn bắt trái phép sừng tê giác làm cho số lượng cá thể tê giác ngày càng giảm nghiêm trọng.",
        name: "Đấu giá thành Cham-pa 1990",
        auctionartifacts: "hiện vật thành cổ Chăm-pa thành 1990",
        time: "10:00am",
        date: "Thứ 5, ngày 18/6/2022",
        thu: "Thursday",
        status: "New",
        location: "470 Trần Đại Nghĩa - Đà Nẵng",
        organizer: "Abc",
        phonenumber: "0358559461",
        startingprice: "1000",
      },
      {
        id: 1,
        category: "",
        img: "https://media.ex-cdn.com/EXP/media.nongnghiep.vn/files/bao_in/2022/01/12/1-tranh-dau-gia-1440_20220112_629-150219.jpeg",
        description:
          "Phiên đấu giá vật phẩm 30 mỹ thuật được Quỹ Sống tổ chức từ ngày 13 đến ngày 16/7, nhằm huy động nguồn lực xã hội để trồng và phủ xanh những cánh rừng..",
        name: "Đấu giá vật phẩm mỹ thuật để gây quỹ trồng rừng",
        auctionartifacts:
          "những tác phẩm của các hoạ sỹ nổi tiếng như Nguyễn Quân, Đặng Xuân Hòa, Hà Trí Hiếu,...",
        time: "15:00pm",
        date: "Thứ 5, ngày 30/7/2022",
        thu: "Thursday",
        status: "New",
        location: "470 Trần Đại Nghĩa - Đà Nẵng",
        organizer: "Trung gian Admin US Love",
        phonenumber: "0358559461",
        startingprice: "1000",
      },
      {
        id: 2,
        category: "",
        img: "https://cdnmedia.baotintuc.vn/2014/01/30/11/56/y2.jpg",
        description:
          "gây quỹ xây dựng các trường học nội trú cho các em nhỏ ở vùng cao và các trung tâm bảo vệ nạn khai thác rừng trái phép.",
        name: "Đấu giá vật phẩm để gây quỹ ‘Mùa đông không lạnh’ xây trường",
        auctionartifacts:
          "tiến hành đấu giá một số vật phẩm để huy động tài chính phục vụ chương trình",
        time: "10:00pm",
        date: "Thứ 5, ngày 18/6/2022",
        thu: "Thursday",
        status: "New",
        location: "xã Xuân Nha, huyện Vân Hồ, tỉnh Sơn La",
        organizer: "CLB 'Người Hà Nội Thanh Lịch' ",
        phonenumber: "0358559461",
        startingprice: "Không có mức định giá cụ thể",
      },
      {
        id: 3,
        category: "",
        img: "https://song.org.vn/wp-content/uploads/Main-KV-FN-03-1024x1011.jpg",
        description:
          "nhằm gây quỹ bảo vệ loài tê giác ở châu Phi đang đứng trước nạn tuyệt sủng vì sự săn bắt trái phép sừng tê giác làm cho số lượng cá thể tê giác ngày càng giảm nghiêm trọng.",
        name: "Quỹ một trái đất xanh 2022 - 2025",
        auctionartifacts:
          "các bức trang về chủ đề động vật và môi trường của các nhiếp ảnh gia và hoạ sỹ.",
        time: "10:00pm",
        date: "Thứ 5, ngày 18/6/2022",
        thu: "Thursday",
        status: "New",
        location: "Landmark 81 - TP.Hồ Chí Minh",
        organizer: "Tổ chức USLOVE",
        phonenumber: "0358559461",
        startingprice: "không có mức định giá cụ thể",
      },
    ],
    dataBlogSlide: [
      {
        id: 0,
        img: "https://photo-cms-tpo.zadn.vn/w890/Uploaded/2022/cq-fkxdsoz/2021_11_18/anh-bia-3705.jpg",
        category: "Tình nguyện",
        description:
          "Tham gia chuyển đi lần này nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn nnnnnnnnnnnnnn nnnnnnnnnnnnnnnnnnnnn nnnnnnnnnnnnn",
        name: "1 nhóm các bạn sinh viên tham gia di chuyển động vật quý hiểm",
        time: "10:00pm",
        date: "Jan 7th, 2022",
        thu: "Thursday",
        status: "New",
        location: "Son Tra - Da Nang",
        organizer: "Pet Coffee",
      },

      {
        id: 1,
        img: "https://upanh123.com/wp-content/uploads/2020/09/hinh-anh-con-voi-khong-lo_111944888.jpg",
        category: "Dọn rác",
        description:
          "We exist to help people get answers to questions threy’ve not found. Either that they cannot ask them or they do not know to frame them, or the answers are not framed well. Either that they cannot ask them or they do not know to frame them, or the answers are not framed well.",
        name: "Pet Coffee Shop Day",
        time: "10:00pm",
        date: "Jan 7th, 2022",
        thu: "Thursday",
        status: "New",
        location: "Thành phố Hồ Chí Minh",
        organizer: "Pet Coffee",
      },

      {
        id: 2,
        img: "https://tanbaocorp.vn/public/manipulate/800x500/article-images/1584515515-bao-ton-dong-vat-hoang-da-tai-vipearl.jpg",
        category: "Bảo vệ",
        description:
          "Chương trình bảo vệ động vật tại Vinpearl quy tụ gồm nhiều tổ chức từ thiện và các bạn tình nguyện viên đông đảo tham dự",
        name: "Pet Coffee Shop Day",
        time: "10:00pm",
        date: "Jan 7th, 2022",
        thu: "Thursday",
        status: "New",
        location: "Son Tra - Da Nang",
        organizer: "Pet Coffee",
      },

      {
        id: 3,
        img: "https://upanh123.com/wp-content/uploads/2020/09/hinh-anh-con-voi-khong-lo_111944888.jpg",
        category: "Tố giác",
        description:
          "We exist to help people get answers to questions threy’ve not found. Either that they cannot ask them or they do not know to frame them, or the answers are not framed well. Either that they cannot ask them or they do not know to frame them, or the answers are not framed well.",
        name: "Pet Coffee Shop Day",
        time: "10:00pm",
        date: "Jan 7th, 2022",
        thu: "Thursday",
        status: "New",
        location: "Son Tra - Da Nang",
        organizer: "Pet Coffee",
      },

      {
        id: 4,
        img: "https://upanh123.com/wp-content/uploads/2020/09/hinh-anh-con-voi-khong-lo_111944888.jpg",
        category: "Events",
        description:
          "We exist to help people get answers to questions threy’ve not found. Either that they cannot ask them or they do not know to frame them, or the answers are not framed well. Either that they cannot ask them or they do not know to frame them, or the answers are not framed well.",
        name: "Pet Coffee Shop Day",
        time: "10:00pm",
        date: "Jan 7th, 2022",
        thu: "Thursday",
        status: "New",
        location: "Son Tra - Da Nang",
        organizer: "Pet Coffee",
      },

      {
        id: 5,
        img: "https://upanh123.com/wp-content/uploads/2020/09/hinh-anh-con-voi-khong-lo_111944888.jpg",
        category: "Thông tin ",
        description:
          "We exist to help people get answers to questions threy’ve not found. Either that they cannot ask them or they do not know to frame them, or the answers are not framed well. Either that they cannot ask them or they do not know to frame them, or the answers are not framed well.",
        name: "Pet Coffee Shop Day",
        time: "10:00pm",
        date: "Jan 7th, 2022",
        thu: "Thursday",
        status: "New",
        location: "Son Tra - Da Nang",
        organizer: "Pet Coffee",
      },

      {
        id: 6,
        img: "https://static.ybox.vn/2015/07/b8384bec407fd290bd1a47c63e77b346.jpg",
        category: "Tình nguyện",
        description:
          "Bạn yêu thiên nhiên? Bạn muốn góp phần bảo vệ động vật hoang dã Việt Nam? Bạn muốn trở nên tự tin, năng động hơn? Bạn muốn giao lưu với mạng lưới tình nguyện viên năng động nhiệt tình đến từ nhiều trường đại học khác nhau?Còn chờ gì nữa, nhanh tay đăng ký tham gia để có cơ hội trở thành Tình nguyện viên của Tổ chức Bảo vệ Động vật hoang.",
        name: "Chương trình tình nguyện SOS animals 2022",
        time: "10:00pm",
        date: "Jan 7th, 2022",
        thu: "Thursday",
        status: "New",
        location: "Son Tra - Da Nang",
        organizer: "Pet Coffee",
      },
    ],
    dataBlogMostRead: null,
    dataTopBlog: null,
    dataLocationVietNam: null,
    dataBankVietNam: null,
    dataListGroupChat: null,
    dataGroupChat: null,
    dataMessOfGroupChat: null,
    idCurrentGroupChat: null,
  },
  getters: {
    getLocationVietNam: (state) => state.dataLocationVietNam,
    getDataGroupChat: (state) => state.dataGroupChat,
    getListMessenger: (state) => state.dataMessOfGroupChat,
    getIdCurrentGroupChat: (state) => state.idCurrentGroupChat,
  },
  mutations: {
    setStatusShowPopup(state, status) {
      state.statusShowPopup = status;
    },
    setDataCurrentCampaign(state, data) {
      state.dataCurrentCampaign = data;
    },
    setDataCurrentAuction(state, data) {
      state.dataCurrentAuction = data;
    },
    setDataUserCurrent(state, data) {
      state.dataUserCurrent = data;
    },
    setDataBlogMostRead(state, data) {
      state.dataBlogMostRead = data[0];
    },
    setDataTopBlog(state, data) {
      state.dataTopBlog = data;
    },
    setDataLocationVietNam(state, data) {
      state.dataLocationVietNam = data;
    },
    setDataBankVietNam(state, data) {
      state.dataBankVietNam = data;
    },
    setDataGroupChat(state, data) {
      state.dataGroupChat = data;
    },
    setDataMessengerOfGroupChat(state, data) {
      state.dataMessOfGroupChat = data;
    },
    setIdCurrentGroupChat(state, id) {
      state.idCurrentGroupChat = id;
    },
    addMessChatCurrent(state, mess) {
      state.dataMessOfGroupChat.push(mess);
    },
  },
  actions: {
    async getDataUser({ commit }) {
      const resData = await authService.getMe();
      if (resData.success) {
        commit("setDataUserCurrent", resData.data);
        return resData.data;
      } else {
        commit("setDataUserCurrent", null);
        return null;
      }
    },

    async getBlogMostRead({ commit }) {
      const dataRefBlog = await blogService.getBlogMostRead("all", 1);
      if (dataRefBlog.success) {
        commit("setDataBlogMostRead", dataRefBlog.data);
      } else {
        commit("setDataBlogMostRead", null);
      }
    },

    async getTopBlog({ commit }) {
      const dataTopBlog = await blogService.getBlogTop(12);
      if (dataTopBlog.success) {
        commit("setDataTopBlog", dataTopBlog.data);
      } else {
        commit("setDataTopBlog", null);
      }
    },

    async getAllLocationsVietNam({ commit }) {
      const dataLocationVietNam = await baseService.getListLocation();
      if (dataLocationVietNam.success) {
        commit("setDataLocationVietNam", dataLocationVietNam.data);
      } else {
        commit("setDataLocationVietNam", null);
      }
    },

    async getAllBankVietNam({ commit }) {
      const dataBankVietNam = await baseService.getListbank();
      if (dataBankVietNam.success) {
        commit("setDataBankVietNam", dataBankVietNam.data);
      } else {
        commit("setDataBankVietNam", null);
      }
    },

    async getAllGroupChat({ commit }) {
      if (checkUserLogin) {
        const dataGroupChat = await chatService.getAllGroupChat();

        if (dataGroupChat.success) {
          commit("setDataGroupChat", dataGroupChat.data);
        } else {
          commit("setDataGroupChat", null);
        }
      } else {
        commit("setDataGroupChat", null);
      }
    },

    async getMessengerOfGroupChat({ commit }, idGroupChat, linit, skip) {
      const dataMessenger = await await chatService.getMessenger(
        idGroupChat,
        linit,
        skip
      );

      if (dataMessenger.success) {
        commit("setDataMessengerOfGroupChat", dataMessenger.data);
      } else {
        commit("setDataMessengerOfGroupChat", null);
      }
    },
  },
  modules: {},
});
