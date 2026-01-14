# Website Dịch Vụ Cá Nhân

Website tĩnh giới thiệu và gom các dịch vụ cá nhân với giao diện hiện đại, responsive.

## Tính năng chính

- Hiển thị danh sách dịch vụ dưới dạng card
- Modal hiển thị chi tiết dịch vụ khi click "Xem chi tiết"
- Responsive design (mobile-first)
- Form liên hệ
- Navigation mobile-friendly
- Dễ dàng mở rộng và tùy chỉnh

## Cấu trúc thư mục
project-folder/
├── index.html
├── css/
│ └── style.css
├── js/
│ └── main.js
├── data/
│ └── services.json
├── images/
│ └── service-placeholder.jpg
└── README.md



## Hướng dẫn sử dụng

### 1. Thêm dịch vụ mới

Có hai cách để thêm dịch vụ mới:

**Cách 1: Sử dụng file JSON (Khuyến nghị)**
1. Mở file `data/services.json`
2. Thêm một object mới vào mảng services theo cấu trúc:

```json
{
  "id": 4,
  "name": "Tên dịch vụ",
  "shortDescription": "Mô tả ngắn",
  "longDescription": "Mô tả chi tiết",
  "price": "Giá dịch vụ",
  "image": "URL ảnh đại diện",
  "features": [
    "Tính năng 1",
    "Tính năng 2",
    "Tính năng 3"
  ],
  "instructionImages": [
    "URL ảnh hướng dẫn 1",
    "URL ảnh hướng dẫn 2",
    "URL ảnh hướng dẫn 3"
  ]
}