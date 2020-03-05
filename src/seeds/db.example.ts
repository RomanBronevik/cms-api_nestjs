import { UserRole } from "../entities/role.entity";

export const DbExample = {
    clients: [
        {
            name: "nets",
            siteUrl: "http://dotnets.org",
            phone: "(+84) 906 848 502",
            email: "hung.nguyen@dotnets.org",
            createdBy: ""
        }
    ],
    counters: [
        { name: "article" },
        { name: "category" },
        { name: "user" },
        { name: "client" },
    ],
    roles: [
        {
            role: UserRole.SUPER_ADMIN,
            text: "Super admin",
            clientId: "",
            permissions: []
        },
        {
            role: UserRole.ADMIN,
            text: "Admin",
            clientId: "",
            permissions: []
        },
        {
            role: UserRole.USER,
            text: "User",
            clientId: "",
            permissions: []
        },
    ],
    permissions: [
        {
            name: "getArticles",
            text: "Get Articles",
        },
        {
            name: "getArticle",
            text: "Get Article",
        },
        {
            name: "createArticle",
            text: "Create Article",
        },
        {
            name: "updateArticle",
            text: "Update Article",
        },
        {
            name: "deleteArticle",
            text: "Delete Article",
        },
        {
            name: "getUsers",
            text: "Get Users",
        },
        {
            name: "getUser",
            text: "Get User",
        },
        {
            name: "createUser",
            text: "Create User",
        },
        {
            name: "updateUser",
            text: "Update User",
        },
        {
            name: "deleteUser",
            text: "Delete User",
        },
        {
            name: "getClients",
            text: "Get Clients",
        },
        {
            name: "getClient",
            text: "Get Client",
        },
        {
            name: "createClient",
            text: "Create Client",
        },
        {
            name: "updateClient",
            text: "Update Client",
        },
        {
            name: "deleteClient",
            text: "Delete Client",
        },
        {
            name: "getCategories",
            text: "Get Categories",
        },
        {
            name: "getCategory",
            text: "Get Category",
        },
        {
            name: "createCategory",
            text: "Create Category",
        },
        {
            name: "updateCategory",
            text: "Update Category",
        },
        {
            name: "deleteCategory",
            text: "Delete Category",
        },
        {
            name: "getRoles",
            text: "Get Roles",
        },
        {
            name: "getRole",
            text: "Get Role",
        },
        {
            name: "createRole",
            text: "Create Role",
        },
        {
            name: "updateRole",
            text: "Update Role",
        },
        {
            name: "deleteRole",
            text: "Delete Role",
        },
        {
            name: "getTags",
            text: "Get Tags",
        },
        {
            name: "getTag",
            text: "Get Tag",
        },
        {
            name: "createTag",
            text: "Create Tag",
        },
        {
            name: "updateTag",
            text: "Update Tag",
        },
        {
            name: "deleteTag",
            text: "Delete Tag",
        },
        {
            name: "getPermissions",
            text: "Get Permissions",
        },
        {
            name: "getPermission",
            text: "Get Permission",
        },
        {
            name: "createPermission",
            text: "Create Permission",
        },
        {
            name: "updatePermission",
            text: "Update Permission",
        },
        {
            name: "deletePermission",
            text: "Delete Permission",
        },
        {
            name: "importFile",
            text: "Import File",
        },
        {
            name: "exportFile",
            text: "Export File",
        },
    ],
    users: [
        {
            username: "admin",
            password: "123",
            roleId: "",
            clientId: "",
            displayName: "NETS"
        }
    ],
    categories: [
        {
            id: 'db48a274-7265-4110-8e11-17ea983d14e4',
            title: "Tin tức",
            content: "Tin tức",
            clientId: "",
            userId: "",
            humanId: "CA1"
        }
    ],
    articles: [
        {
            id: "61afd3e8-b222-41c6-83f6-3089976da1c0",
            title: "High quality medication management software",
            content: "In fact, apart from subjective factors from patients such as age, gender, health status, psychophysiology, eating and living habits, drugs play a very important role in the success of the process. therapy.",
            description: 'The importance of drugs in the treatment of diseases',
            image: "https://i.imgur.com/k7iKUAO.jpg",
            clientId: "",
            categoryId: "",
            userId: "",
            humanId: "A13",
            url: 'http://seamlesscare.ca/'
        },
        {
            id: "629392a5-ac31-4482-82c8-7704e4f8686d",
            title: "Clean food management software",
            content: "According to experts, clean foods are those that are cultivated with certain regulations. When caring, farmers can use pesticides or synthetic chemicals ... But, only used to a certain extent, and products must be guaranteed at harvest.",
            description: 'What is clean food?',
            image: "https://i.imgur.com/rV6tXVC.jpg",
            clientId: "",
            categoryId: "",
            userId: "",
            humanId: "A14",
            url: 'https://asystyou.com/'
        },
        {
            id: "70f931f3-8705-428b-acab-7dddfb059f59",
            title: "Bakery management software",
            content: "On special occasions, of course, we always like big, beautiful cakes. However, big cakes also have some limitations so small cakes are getting a lot of attention, especially from students. So let's find out why small cakes are so popular!",
            description: 'Benefits of small cream cakes',
            image: "https://i.imgur.com/YSqbB48.jpg",
            clientId: "",
            categoryId: "",
            userId: "",
            humanId: "A15",
            url: 'https://tiembanhngon.com/'
        },
        {
            id: "8d3d7fe2-9313-4842-8484-22b1a478491d",
            title: "Daily prayer management software",
            content: "God wants to give us good gifts and gifts. He wants us to seek Him and He will bless us, but God requires us to pray, seek and knock. Let these verses of Matthew 7 be the inspiration for us to come before His throne to pray, knock and keep searching in prayer.",
            description: 'Join in the prayer with everyone',
            image: "https://i.imgur.com/70BJ7ur.jpg",
            clientId: "",
            categoryId: "",
            userId: "",
            humanId: "A16",
            url: 'https://wallofprayer.org/'
        },
        {
            id: "c05705fd-c3b7-403d-b717-3ec5b053ee7a",
            title: "School management software",
            content: "Currently, more and more training centers are applying technology to the management of students. Indeed, using a professional solution is an inevitable consequence when you want your training center to maintain and develop operations.",
            description: 'Attendance for students with the software',
            image: "https://i.imgur.com/DEtl6wb.jpg",
            clientId: "",
            categoryId: "",
            userId: "",
            humanId: "A17",
            url: 'https://cleverbees.com/'
        },
        {
            id: "007907e7-ab2d-44cc-a756-567cf3570659",
            title: "Phần mềm quản lý cầu nguyện hằng ngày",
            content: "Chúa muốn ban cho chúng ta những món quà và ân tứ tốt lành. Ngài muốn chúng ta tìm kiếm Ngài và Ngài sẽ đổ phước xuống cho chúng ta, nhưng Chúa đòi hỏi chúng ta phải cầu nguyện, tìm kiếm và gõ cửa. Hãy để những câu Kinh Thánh Ma-thi-ơ đoạn 7 này là nguồn cảm hứng để chúng ta đến trước ngôi của Ngài để cầu hỏi, gõ cửa và tìm kiếm liên tục không thôi trong sự cầu nguyện.",
            description: 'Tham gia cầu nguyện cùng mọi người',
            image: "https://i.imgur.com/70BJ7ur.jpg",
            clientId: "",
            categoryId: "",
            userId: "",
            humanId: "A8",
            url: 'https://wallofprayer.org/'
        },
        {
            id: "548f181e-3a79-43c0-b45b-86305ba61294",
            title: "Phần mềm quản lý tiệm bánh",
            content: "Trong những dịp đặc biệt, hẳn nhiên chúng ta luôn thích những chiếc bánh kem thật lớn, thật đẹp. Tuy nhiên, bánh kem lớn cũng có một số hạn chế nên những chiếc bánh kem nhỏ đang nhận được khá nhiều sự quan tâm, nhất là từ học sinh, sinh viên. Vậy thì chúng ta hãy cùng nhau tìm hiểu tại sao bánh kem nhỏ lại được ưa thích đến thế nhé!",
            description: 'Lợi ích của những chiếc bánh kem nhỏ',
            image: "https://i.imgur.com/YSqbB48.jpg",
            clientId: "",
            categoryId: "",
            userId: "",
            humanId: "A9",
            url: 'https://tiembanhngon.com/'
        },
        {
            id: "b4e69879-f7bf-4e86-ac8a-becb2f173c27",
            title: "Phần mềm quản lý trường học",
            content: "Hiện nay, càng ngày càng có nhiều những trung tâm đào tạo áp dụng công nghệ vào việc quản lý các học viên. Thật vậy, sử dụng một giải pháp chuyên nghiệp là một hệ quả tất yếu khi bạn muốn trung tâm đào tạo của mình duy trì và phát triển hoạt động.",
            description: 'Điểm danh học sinh với phần mềm',
            image: "https://i.imgur.com/DEtl6wb.jpg",
            clientId: "",
            categoryId: "",
            userId: "",
            humanId: "A10",
            url: 'https://cleverbees.com/'
        },
        {
            id: "bdf649fd-ea4b-4a68-8c9e-ff2a50962d76",
            title: "Phần mềm quản lý thuốc chất lượng cao",
            content: "Thực tế là ngoài yếu tố chủ quan từ người bệnh như độ tuổi, giới tính, tình trạng sức khỏe, tâm sinh lý, thói quen ăn uống và sinh hoạt, thuốc đóng một vai trò rất quan trọng trong sự thành công của quá trình trị liệu.",
            description: 'Tầm quan trọng của thuốc trong điều trị bệnh',
            image: "https://i.imgur.com/k7iKUAO.jpg",
            clientId: "",
            categoryId: "",
            userId: "",
            humanId: "A11",
            url: 'http://seamlesscare.ca/'
        },
        {
            id: "d88ecb21-9b55-4ddc-b02c-3745a9beb87c",
            title: "Phần mềm quản lý thực phẩm sạch",
            content: "Theo các chuyên gia, thực phẩm sạch là những loại thực phẩm được nuôi trồng với những quy định nhất định. Khi chăm sóc, người nông dân có thể sử dụng thuốc trừ sâu hoặc những loại thuốc hóa học tổng hợp…Nhưng, chỉ được sử dụng ở một mức độ cho phép, và sản phẩm khi thu hoạch phải đảm bảo.",
            description: 'Thực phẩm sạch là gì?',
            image: "https://i.imgur.com/rV6tXVC.jpg",
            clientId: "",
            categoryId: "",
            userId: "",
            humanId: "A12",
            url: 'https://asystyou.com/'
        },
        {
            id: "0bd199f3-23db-42c3-ae48-d44bb7e07776",
            title: "Chiếu sáng không gian bếp bằng đèn treo",
            content: "<p style='text-align: right'><strong>Nguồn: </strong> <a href='https://www.houseopedia.com'>https://www.houseopedia.com</a></p><h1 style='margin: 20px 0'><strong>Chiếu sáng không gian bếp bằng đèn treo</strong></h1 style='margin: 20px 0'><p><strong><img src='https://www.upsieutoc.com/images/2019/07/03/image336dc066f7cf1eea.png' alt='view' style='width: 75%' /></strong></p><p>Là một trong những căn phòng bận bịu nhất trong nhà, nhà bếp cần được chiếu sáng một cách thẩm mỹ cũng như cần có một lượng sáng cho việc nấu nướng, ăn uống, học tập và dọn dẹp, khiến không gian này trở thành tâm điểm của cuộc sống gia đình.</p><p>Như một sự bổ sung cho đèn âm trần và thay thế cho đèn chùm truyền thống, đèn treo ngày càng được sử dụng rộng rãi trong những thiết kế mới cũng như cải tạo không gian bếp.</p><h3><strong>Đèn treo là một lựa chọn xuất sắc</strong></h3><p> cho những quầy bar dùng điểm tâm sáng và những “đảo bếp”. Đôi khi còn được gọi là đèn thả, đèn treo được treo vào trần nhà. Với số lượng nhiều, đèn treo có thể được sử dụng hiệu quả để chiếu sáng và tạo nên phong cách cho không gian. Chúng còn ít cồng kềnh hơn và rẻ hơn rất nhiều so với đèn chùm.</p><h3><strong>Đèn treo rất phổ biến</strong></h3><p> và đa dạng về kiểu dáng cũng như vật liệu. Đèn treo sử dụng vật liệu kính trong suốt có thể phân tán ánh sáng ra khắp căn phòng, trong khi một đèn treo bằng kim loại có thể phản xạ ánh sáng. Chất liệu bằng vải và nhựa cũng có thể được sử dụng, nhưng hãy đề phòng nhiệt phát ra từ bóng đèn có thể làm phai màu hoặc hư hại vật liệu.</p><h3><strong>Vậy bạn nên sử dụng đèn to hay nhỏ ? </strong></h3><p> Khi băn khoăn về kích thước của một đèn treo lớn, đặc biệt khi được treo đơn lẻ, bạn sẽ ngạc nhiên khi thấy một cái đèn trông nhỏ như thế nào khi được treo lên trần nhà. Đèn treo nhỏ hiệu quả khi được sử dụng thành một nhóm, chắc hạn như để chiếu sáng cho một “đảo bếp”. Chúng có thể được sử dụng như một loại đèn thay thế cho đèn rọi ray.</p><h3><strong>Ta nên đầu tư vào những bóng đèn LED,</strong></h3><p> vì chúng có tuổi thọ lâu hơn những bóng đèn sợi đốt hoặc huỳnh quang. Mặc dù chi phí ban đầu có thể đắt hơn, đèn LED lại sử dụng năng lượng hiệu quả hơn trong khi vẫn cung cấp một lượng ánh sáng tương đương.</p>",
            description: '',
            image: "https://www.upsieutoc.com/images/2019/07/03/image336dc066f7cf1eea.png",
            clientId: "",
            categoryId: "",
            userId: "",
            humanId: "A1",
            url: ''
        },
        {
            id: "3b44231e-af0b-439d-8ee0-1ebb121f3994",
            title: "Để có một văn phòng tại nhà hiệu quả",
            content: "<p style='text-align: right'><strong>Nguồn: </strong><a href='www.houseopedia.com'>http://www.tcnhadep.com</a></p><h1 style='margin: 20px 0'><strong>Để có một văn phòng tại nhà hiệu quả</strong></h1 style='margin: 20px 0'><p><strong><img src='https://www.upsieutoc.com/images/2019/07/03/image4cd53b8378cf6c61.png' alt='decor-workplace' style='width: 75%' /></strong></p><p>Khi số người làm việc tại nhà ngày càng nhiều hơn, văn phòng làm việc trở thành một phần thiết yếu trong mỗi ngôi nhà. Dù cho bạn có một căn phòng dành riêng để làm việc hoặc một không gian làm việc linh động trong một căn phòng khác, nội thất độc đáo và tiên nghi sẽ giúp tạo nên một không gian thu hút và đem lại năng suất làm việc cao.</p><h3><strong>Bàn làm việc</strong></h3><p>Những loại máy tính ngày nay bao gồm phần cứng tích hợp và màn hình mỏng, nhiều người cũng sử dụng laptop, máy tính bảng, smartphone, và máy in không dây để thực hiện công việc của họ. Chính vì điều này, một chiếc bàn lớn là không cần thiết nhưng cũng cần được bố trí hợp lý. Theo những chuyên gia, bạn nên nhìn thẳng vào màn hình máy tính và sử dụng bàn phím và chuột mà không phải cong khuỷu tay. Một lựa chọn tốt hơn là đứng thay vì ngồi. Điều này giúp bạn di chuyển nhiều trong ngày, tránh những bệnh liên quan tới việc ngồi quá lâu. Nếu đứng, hãy đảm bảo rằng bàn cùa bạn được thiết kế với độ cao hợp lý để bảo vệ bàn chân và khớp khỏi mệt mỏi và áp lực.</p><h3><strong>Kho lưu trữ tài liệu</strong></h3><p>Một trong những hạn chế của văn phòng tại gia là sự lộn xộn mà nó mang tới. Kho lưu trữ ẩn và ngăn nắp là một điều quan trọng để giữ cho không gian gọn gàng. Những ngăn chứa là những thứ có thể sử dụng nếu bạn cần truy cập tài liệu nhanh chóng. Những kệ sách di động và treo tường mang tới một lựa chọn thẩm mỹ và đa năng hơn, thứ sẽ rất tuyệt vời nếu bạn không có một phòng làm việc cố định. Một giải pháp khác là sử dụng smartphone để chuyển tài liệu thành file, nhằm giảm lượng giấy sử dụng xuống.</p><h3><b>Ghế ngồi</b></h3><p>Sau bàn làm việc, ghế ngồi là một thứ quan trọng khác bạn phải mua. Vì việc ngồi có thể gây hại cho cơ thể, bạn nên tìm một chiếc ghế mang lại đầy đủ sự tiện nghi, trong khi vẫn giúp bạn có một tư thế ngồi hợp lý. Ngày nay, có rất nhiều loại ghế ngồi văn phòng mang lại sự thẩm mỹ, cùng với đó là những bộ phận có thể điều chỉnh, hỗ trợ cột sống khi ngồi và sử dụng vật liệu thoáng khí.</p><h3><strong>Phụ kiện</strong></h3><p>Khi bạn đã có đầy đủ những vật dụng nệu trên, hãy tập trung vào những vật dụng khác để hoàn thiện không gian. Nếu bạn sử dụng laptop, hãy suy nghĩ tới việc mua một giá để laptop. Nó sẽ giúp bạn điều chỉnh màn hình tới độ cao thích hợp để tránh đau cổ, tránh gây chói và giảm nhiệt mà máy tỏa ra. Sau cùng, hãy đảm bảo một hệ thống chiếu sáng thẩm mỹ và không gây mỏi mắt. Những chuyên gia khuyến cáo bạn nên sử dụng những “Tầng ánh sáng”. Nói cách khác, bạn cần chiếu sáng cả không gian làm việc cũng như không gian xung quanh. Hãy tìm những loại đèn có thể điều chỉnh độ sáng.</p><p>Trên hết, hãy nhớ rằng văn phòng tại nhà nên là một nơi bạn muốn lưu tới. Vật dụng tiện nghi, thoải mái là điều quan trọng, nhưng cũng đừng quên những yếu tố màu sắc, điểm nhấn, kiểu cách khác, thứ có thể giúp bạn trở nên năng động và sáng tạo.</p>",
            description: '',
            image: "https://www.upsieutoc.com/images/2019/07/04/view01.png",
            clientId: "",
            categoryId: "",
            userId: "",
            humanId: "A2",
            url: ''
        },
        {
            id: "82df1871-3b44-47c3-a5d5-e7ddb8a9d208",
            title: "Không gian nhỏ - Phong cách lớn: Phòng tắm",
            content: "<h1 style='margin: 20px 0'><strong>Small Space, Big Style: Bathroom</strong></h1 style='margin: 20px 0'><p><strong><img src='https://www.upsieutoc.com/images/2019/07/03/image9e2599e09792dd31.png' alt='bathroom-decor' style='width: 75%' /></strong></p><p>Một phòng vệ sinh với diện tích nhỏ có thể là một trở ngại nếu muốn căn phòng đó trở nên hiệu quả. Phòng vệ sinh tất nhiên cần phải tiện nghi, nhưng điều đó không có nghĩa rằng nó không được có phong cách. Với những đồ nội thất hợp lý, kho chứa thông minh và một số mẹo khi thiết kế, bạn có thể tạo ra một không gian phòng vệ sinh đẹp mắt và phù hợp với bạn.</p><h3><strong>Tìm không gian cho kho chứa</strong></h3><p>Bạn không cần một cabin để làm kho chứa. Những kệ tủ mở, kệ treo tường và thang xếp là những lựa chọn thích hợp vì không chiếm nhiều chỗ. Nếu bạn có một cabin để làm kho, hãy cân nhắc lắp những ngăn kéo vào cabin đó. Chúng giúp tối ưu không gian mà không chiếm thêm phần diện tích nào trên mặt bằng. Những phòng vệ sinh nhỏ nhất cũng có những không gian ẩn để tận dụng và tạo thêm chỗ chứa. Đằng sau những bức tường không có đường ống đi qua đều có không gian có thể sử dụng được, hãy dùng không gian này để tạo một lỗ âm vào tường để chứa đồ.</p><h3><strong>Chọn thiết bị phù hợp</strong></h3><p>Mỗi phòng vệ sinh đều có những vật dụng quan trọng – lavabo, bồn tắm hay vòi sen và bồn cầu. Sử dụng những thiết bị có kích thước hợp lý sẽ giúp giải phóng không gian mà không mất đi các chức năng cần có.</p><h3><strong>Dùng loại của phù hợp</strong></h3><p>Nếu cửa nhà tắm của bạn chiếm quá nhiều không gian, hãy cân nhắc đổi sang cửa kéo hoặc lật ngược cửa lại để nó mở sang phía ngoài.</p><h3><strong>Phối màu một cách thông minh</strong></h3><p>Khi xử lý những không gian nhỏ, điều quan trọng không chỉ là những thứ bạn để vào mà còn là cách bạn phối màu cho căn phòng đó. Tông màu sáng và trung tính sẽ giúp căn phòng trông như rộng hơn.</p><h3><strong>Sử dụng kính</strong></h3><p>Chìa khóa để giúp không gian cảm thấy rộng hơn đó là “mở” nó ra. Bởi vì kính trong suốt nên nó sẽ đánh lừa thị giác. Nó cũng giúp ánh sáng phân tán ra khắp căn phòng. Nếu bạn có vòi tắm, vách kính sẽ là một lựa chọn tốt. Kệ bằng kính giúp mang đến thêm chỗ chứa mà không tốn thêm quá nhiều diện tích.</p><h3><strong>Chiếu sáng hiệu quả</strong></h3><p>Để chiếu sáng phòng vệ sinh tốt, hãy sử dụng ánh sáng từ nhiều nguồn. Tận dụng tối đa ánh sáng tự nhiên thay vì che rèm. Một cái gương lớn cũng giúp phản xạ ánh sáng và giúp không gian trông rộng hơn. Mẹo: đặt đèn phía trên kính sẽ tạo ra bóng đổ từ trên xuống gây khó khăn khi người sử dụng cần cạo râu hoặc trang điểm, thay vào đó hãy lắp đặt đèn phía sau kính.</p>",
            description: '',
            image: "https://www.upsieutoc.com/images/2019/07/04/view01390cb0fe18b73f46.png",
            clientId: "",
            categoryId: "",
            userId: "",
            humanId: "A3",
            url: ''
        },
        {
            id: "8c552197-073f-444b-af3f-da4bce618648",
            title: "Màu của nắng",
            content: "<p style='text-align: right'><span><strong>Nguồn: </strong><a href='http://www.tcnhadep.com/'>http://www.tcnhadep.com</a></span></p><h1 style='margin: 20px 0'><strong>Màu của nắng</strong></h1 style='margin: 20px 0'><h3><strong>KTNĐ – Khi ánh sáng tự nhiên đi qua khu vườn và nhẹ nhàng phủ lên không gian nội thất, một không khí tinh khôi được khơi dậy.</strong></h3><p>Trên những vật dụng nội thất cộng hưởng giữa thiết kế bản quyền của các thương hiệu nội thất lớn từ Mỹ và sự khéo léo sản xuất của người thợ Việt Nam, ánh nắng còn mang thêm vào đó nét màu tươi mới và chiều sâu biểu cảm.</p><p>Từng chi tiết thủ công nhỏ được thực hiện với sự tập trung cao như càng nổi bật, độc đáo hơn. </p><p><img src='https://www.upsieutoc.com/images/2019/07/03/image8f6ffc5b9287eb1c.png' alt='view01' style='width: 75%' /></p><p><img src='https://www.upsieutoc.com/images/2019/07/03/image59e129765577dff4.png' alt='view02' style='width: 75%' /></p><p><img src='https://www.upsieutoc.com/images/2019/07/03/image729f429a4afad020.png' alt='view03' style='width: 75%' /></p><p><img src='https://www.upsieutoc.com/images/2019/07/03/image694eea081d055c7c.png' alt='view04' style='width: 75%' /></p>",
            description: '',
            image: "https://www.upsieutoc.com/images/2019/07/04/view01172133e728dbce50.png",
            clientId: "",
            categoryId: "",
            userId: "",
            humanId: "A4",
            url: ''
        },
        {
            id: "a9aa87cd-ed0a-4070-a93b-64b8402729c1",
            title: "Nét duyên hình học",
            content: "<p style='text-align: right'><strong>Nguồn: </strong><a href='http://www.tcnhadep.com/'>http://www.tcnhadep.com</a></p><h1 style='margin: 20px 0'><strong>Nét duyên hình học</strong></h1 style='margin: 20px 0'><h3><strong>KTNĐ – Những đường nét hình học tưởng chừng đơn điệu và cứng nhắc, vậy mà khi ứng dụng vào thiết kế nội thất lại tạo đầy chất riêng.</strong></h3><p>Sự hài hòa trong phối hợp, gắn kết giữa nhiều loại đường nét, hình khối đem lại cho tổng thể không gian những góc nhìn thật lý thú. Người yêu nét duyên của hình học trong bài trí vừa có thể khai thác từ chính hình khối, yếu tố cấu thành của các món vật dụng, hoặc có thể đơn giản chọn lựa những họa tiết hình học được áp lên bề mặt.</p><p>Dù bằng cách nào, sự hài hòa về bố cục, màu sắc và chất liệu cũng sẽ góp phần đáng kể vào hiệu ứng hình học này!</p><p class='row'><img src='https://www.upsieutoc.com/images/2019/07/03/image6112cdf26f20c549.png' alt='view01' class='col-md-3' /><img src='https://www.upsieutoc.com/images/2019/07/03/image573e3a1e5f7e2f31.png' alt='view02' class='col-md-3' /><img src='https://www.upsieutoc.com/images/2019/07/03/imageeae90a89ffb0ee5b.png' alt='view03' class='col-md-3' /><img src='https://www.upsieutoc.com/images/2019/07/03/image8fd4e0a5f1e382b0.png' alt='view04' class='col-md-3' /></p>",
            description: '',
            image: "https://www.upsieutoc.com/images/2019/07/03/image6112cdf26f20c549.png",
            clientId: "",
            categoryId: "",
            userId: "",
            humanId: "A5",
            url: ''
        },
        {
            id: "d665e0fd-9d72-4610-8cfd-25b1156cf5ed",
            title: "Nhà đẹp Nha Trang",
            content: "<p style='text-align: right'><strong>Nguồn:</strong> <a href='http://nguoinhatrang.com/'>http://nguoinhatrang.com</a></p><h1 style='margin: 20px 0'><strong>Nhà đẹp Nha Trang xuất sắc đứng trang đầu tạp chí kiến trúc ngoại</strong></h1 style='margin: 20px 0'><p><strong><img src='https://www.upsieutoc.com/images/2019/07/03/image5afcaae401055464.png' alt='view01' style='width: 75%' /></strong></p><p>Ngôi nhà đẹp tọa lạc trong khu vực yên bình, tĩnh lặng, cách trung tâm thành phố du lịch Nha Trang bận rộn không xa, được thiết kế với mục đích là tạo ra một không gian yên tĩnh, gần thiên nhiên để gia chủ (là một người đã nghỉ hưu) có thể thư giãn mọi lúc mọi nơi trong nhà.</p><p><img src='https://www.upsieutoc.com/images/2019/07/03/imagef6d4a4546e9221cb.png' alt='view02' style='width: 75%' /></p><p>Chỉ có 3 tầng nhưng vẫn đảm bảo đủ chức năng sử dụng và không gian sống thoải mái. Đó chính là điểm ấn tượng của ngôi nhà này.</p><p><strong><img src='https://www.upsieutoc.com/images/2019/07/03/image5afcaae401055464.png' alt='view01' style='width: 75%' /></strong></p><p>Ngôi nhà đặc biệt gây ấn tượng với khu vườn, không quá lớn nhưng đủ để tạo ra bản sắc thiên nhiên phong phú. Ngay cả khi trời mưa, gia chủ cũng có thể thưởng thức bữa tối ngay cạnh bãi cỏ tự nhiên.</p><p><img src='https://www.upsieutoc.com/images/2019/07/03/image775722e703854a5a.png' alt='view03' style='width: 75%' /></p><p>Các kiến trúc sư đã lược bớt những bức tường khô cứng bên ngoài và các vách ngăn bên trong để không gian được thoáng và rộng hơn.</p><p><img src='https://www.upsieutoc.com/images/2019/07/03/image55769417bb898477.png' alt='view04' style='width: 75%' /></p><p>Tầng trệt của căn nhà rất rộng rãi, không gian mở gồm phòng khách, nhà bếp thông nhau. Nội thất được sử dụng đơn giản hết mức có thể làm cho những căn phòng không bị rối mắt và luộm thuộm.</p><p><img src='https://www.upsieutoc.com/images/2019/07/03/image0b724ef09d727c88.png' alt='view05' style='width: 75%' /></p><p>Để tạo nên sự riêng tư đồng thời vẫn kết nối được những hoạt động chung của tất cả các thành viên trong gia đình, phòng khách và phòng ngủ được ngăn bằng kính trong suốt.</p><p><img src='https://www.upsieutoc.com/images/2019/07/03/imagebfaf8280b9af2bae.png' alt='view06' style='width: 75%' /></p><p>Ý tưởng thiết kế của ngôi nhà này là tạo ra một “thiên đường” không gian sống, hoặc đơn giản hơn là đặt cuộc sống ngày thường trong niềm vui và hạnh phúc.</p><p><img src='https://www.upsieutoc.com/images/2019/07/03/image6598bcb670816d1e.png' alt='view07' style='width: 75%' /></p><p>Thêm những hình ảnh trong ngôi nhà hiện đại ỏ Nha Trang:</p><p><img src='https://www.upsieutoc.com/images/2019/07/03/imageb87f7cf3eabecb6c.png' alt='view08' style='width: 75%' /></p><p><img src='https://www.upsieutoc.com/images/2019/07/03/image53a12dd90035220c.png' alt='view09' style='width: 75%' /></p><p><img src='https://www.upsieutoc.com/images/2019/07/03/image30c0a5bcf1fb81f4.png' alt='view10' style='width: 75%' /></p><p><img src='https://www.upsieutoc.com/images/2019/07/03/image61dbb37f965ef36f.png' alt='view11' style='width: 75%' /></p><p><img src='https://www.upsieutoc.com/images/2019/07/03/image1464787f05880f96.png' alt='view12' style='width: 75%' /></p><p><img src='https://www.upsieutoc.com/images/2019/07/03/imagebc4417b90263feb7.png' alt='view13' style='width: 75%' /></p>",
            description: '',
            image: "https://www.upsieutoc.com/images/2019/07/03/image5afcaae401055464.png",
            clientId: "",
            categoryId: "",
            userId: "",
            humanId: "A6",
            url: ''
        },
        {
            id: "f3792485-a7e3-4b4d-9a44-9e19439ccdce",
            title: "Văn phòng không chỉ là nơi làm việc",
            content: "<p style='text-align: right'><strong>Nguồn: </strong><a href='http://www.tcnhadep.com/'>http://www.tcnhadep.com</a></p><h1 style='margin: 20px 0'><strong>Văn phòng không chỉ là nơi làm việc</strong></h1 style='margin: 20px 0'><h3><strong>KTNĐ – Khi thiết kế nội thất văn phòng cho một công ty nước ngoài, đơn vị kiến trúc kiêm vai trò là nhà tư vấn cần thấu hiểu sự quan trọng về hình ảnh cũng như tầm vóc của công ty đó. Và khi đặt ra mong muốn “văn phòng không chỉ là nơi làm việc”, những câu chuyện và trải nghiệm qua không gian lại còn đòi hỏi thêm nhiều cung bậc cảm xúc.</strong></h3><p><strong><img src='https://www.upsieutoc.com/images/2019/07/03/image1982adc4e637bb78.png' alt='view01' style='width: 75%' /></strong></p><p>Với dự án này cũng không ngoại lệ, sau những tìm hiểu kỹ lưỡng về sản phẩm của doanh nghiệp, nhu cầu, mô hình làm việc, tính cách của nhân viên… để đưa ra đánh giá, nhận xét và đáp án tích cực. Nhóm thiết kế đã tập trung vào phát triển ý tưởng theo tiêu chí hiện đại và thân thiện.</p><p>Sự chuyên nghiệp và mạnh mẽ được chọn làm tinh thần chung cho vật dụng và các chi tiết nội thất. Sắt sơn đen, kính, gỗ và sàn xi măng trở thành vật liệu chủ đạo. Nét năng động và cá tính được mang đến qua những mảng tường kính lớn và “chia ô” bằng khung sắt. Kích thước của từng “ô kính” được cân nhắc để không tạo cảm giác tù túng và nhàm chán. Không gian làm việc được thiết kế theo hướng mở, không chia thành từ cabin riêng biệt như thường thấy. Việc giao lưu và trao đổi giữa các thành viên và giữa các phòng ban với nhau cũng sẽ dễ dàng hơn.</p><p><img src='https://www.upsieutoc.com/images/2019/07/03/image77cf6e6c5fa71e0f.png' alt='view02' style='width: 75%' /></p><p><img src='https://www.upsieutoc.com/images/2019/07/03/imagec617060aeacedb30.png' alt='view03' style='width: 75%' /></p><p><img src='https://www.upsieutoc.com/images/2019/07/03/image537381e7bec63318.png' alt='view04' style='width: 75%' /></p><p>Tổng diện tích văn phòng 180m2 nhưng đến 1/3 diện tích được sử dụng cho không gian bar – café và tiếp khách. Bởi chức năng là nơi mang lại sự dễ chịu, thư giãn cho nhân viên giữa những giờ làm việc căng thẳng, khu vực chung này được thiết kế kỹ lưỡng như một điểm nhấn. Bar – café còn bắt mắt và thu hút với trang trí từ những sản phẩm của thương hiệu, được trưng bày trang trọng và nổi bật như một niềm tự hào của công ty. Thiết kế rộng rãi cũng cho phép không gian này trở thành địa điểm tập trung, tiệc tùng trong các dịp quan trọng.</p><p><img src='https://www.upsieutoc.com/images/2019/07/03/imageb2eacfa3fc903a6a.png' alt='view05' style='width: 75%' /></p><p><img src='https://www.upsieutoc.com/images/2019/07/03/image182ba3f2a0b05589.png' alt='view07' style='width: 75%' /></p><p><img src='https://www.upsieutoc.com/images/2019/07/03/imageb838c4e570df2327.png' alt='view08' style='width: 75%' /></p><p>Diện tích dành cho bar – café và tiếp khách tuy nhiều nhưng là sự hài hòa và hợp lý cần thiết. Sau những giờ làm việc căng thẳng, họ có thể chia sẻ những câu chuyện về cuộc sống. Hay sau những bản hợp đồng, khách hàng cùng chủ nhân của không gian đó có cơ hội trải nghiệm và nhâm nhi những thức uống ngon lành được pha chế ngay tại đây, để từ đó có thể cảm thấy gắn kết với nhau hơn…</p><p><img src='https://www.upsieutoc.com/images/2019/07/03/imagedd1bb96086a22b68.png' alt='view09' style='width: 75%' /></p>",
            description: '',
            image: "https://www.upsieutoc.com/images/2019/07/04/vie.png",
            clientId: "",
            categoryId: "",
            userId: "",
            humanId: "A7",
            url: ''
        }
    ]
}
