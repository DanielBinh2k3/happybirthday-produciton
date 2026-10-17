# 🎉 Happy Birthday Production Web App

Trang web chúc mừng sinh nhật người yêu được thiết kế đặc biệt với trải nghiệm tương tác liền mạch, lãng mạn và ngập tràn bất ngờ 💖.

---

## 🔐 1. Mật mã mở cổng (Passcode)
- **Mật mã mặc định**: `18102021` (Định dạng chấp nhận linh hoạt: `18102021`, `18/10/2021`, `18.10.2021` hoặc `18-10-2021`).
- **Gợi ý (Hint)**: *"Ngày đặc biệt tụi mình chính thức quen nhau (đủ ngày tháng năm nhé) 💕"*.

---

## 🎮 2. Các màn chơi & Trải nghiệm tương tác

### ✨ Màn 1: Cổng bí mật & Lời chào ngọt ngào
- Lời thoại gõ máy từng ký tự (Typewriter effect) chào mừng công chúa.
- Nhập đúng mật mã để mở cổng, tự động phát nhạc sinh nhật Nhật Bản lãng mạn (*Happy Birthday Japanese Theme*).

### 📸 Màn 2: Bộ sưu tập ảnh kỷ niệm Polaroid
- **Solo Photos**: Ngắm nhìn những khoảnh khắc rạng rỡ của bạn gái với hiệu ứng chạm zoom to xem chi tiết ảnh polaroid.
- **Together Photos**: Hành trình những kỷ niệm ngọt ngào của hai người từ những ngày đầu bên nhau.

### 🎂 Màn 3A: Thử thách thổi nến sinh nhật lò xo
- Mini-game bấm/chạm nhanh (tap frenzy) tạo sức gió thổi nến.
- Tự động chuyển đổi giai điệu Happy Birthday nhạc hộp âm thanh Web Audio du dương khi đến lượt ước và thổi nến.
- Khi nến tắt, hiệu ứng pháo hoa giấy (confetti) và bóng bay bay lượn ngập tràn màn hình.

### 💌 Màn 3B: Bức thư & Thiệp 3D lật sách
- Thiệp chúc mừng sinh nhật 3D với hiệu ứng lật mở bìa sách hai mặt cực kỳ mượt mà.
- Hỗ trợ đổi ảnh đại diện trên bìa thiệp khi chạm vào.
- Tự động căn chỉnh chế độ đọc chữ to rõ nét trên điện thoại (Mobile Friendly).

### 🎩 Màn 4: Ảo thuật 3 Chiếc Cốc Bạc (Trúng Tiền Mặt Lì Xì)
- **3 Cốc bạc tương ứng 3 mức tiền mặt may mắn**:
  - 💸 **500.000đ** (Lộc Phát May Mắn)
  - 💸 **1.000.000đ** (Tình Yêu Vĩnh Cửu)
  - 💸 **2.000.000đ** (Đại Lộc Phú Quý)
- Gồm 2 vòng chơi: **Vòng thử nháp (chậm)** và **Vòng thật tốc độ cao (Siêu tốc độ)**.
- Khi người chơi chọn mở cốc trúng giải:
  - Hiển thị số tiền mặt may mắn cùng **Mã xác thực độc quyền 16 ký tự** (VD: `LOVE-7C3A-DF91-88E4`).
  - Bấm nút **"Gửi Mã Nhận Tiền Qua Messenger 💌"** sẽ tự động sao chép mã trúng thưởng và mở ngay cửa sổ Messenger của bạn trai để nhận lì xì!

---

## 🚀 3. Hướng dẫn chạy cục bộ

```bash
# 1. Cài đặt thư viện
npm install

# 2. Chạy môi trường dev
npm run dev

# 3. Đóng gói bản production
npm run build
```

---

## 🛠️ 4. Tùy chỉnh thông tin cá nhân
Toàn bộ thông tin tên gọi, ngày quen nhau, link liên hệ Messenger, ảnh và giải thưởng đều có thể tùy chỉnh trực tiếp tại phần `CONFIG` ở đầu file `app.jsx`.
