# Sử dụng một image Node.js cơ bản
FROM node:14

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Expose cổng mà ứng dụng sẽ chạy
EXPOSE 8000

# Lệnh để chạy ứng dụng
CMD ["npm", "start"]
