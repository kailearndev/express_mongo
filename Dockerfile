# Bước 1: Sử dụng image Node.js làm base image
FROM node:20-alpine

# Bước 2: Thiết lập thư mục làm việc trong container
WORKDIR /app

# Bước 3: Copy file package.json và package-lock.json vào container
COPY package*.json ./

# Bước 4: Cài đặt các phụ thuộc của ứng dụng
RUN npm install

# Bước 5: Copy toàn bộ mã nguồn vào container
COPY . .

# Bước 6: Cài đặt TypeScript và biên dịch mã nguồn
RUN npm run build  # Chạy build script để biên dịch TypeScript sang JavaScript

# Bước 7: Mở port cho ứng dụng
EXPOSE 8386

# Bước 8: Lệnh để chạy ứng dụng với mã đã biên dịch
CMD ["node", "./dist/index.js"]
