# 使用官方 Nginx 鏡像
FROM nginx:latest

# 將自定義的 Nginx 配置文件複製到容器內
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 將 dist 目錄中複製到 Nginx 的默認靜態文件目錄
COPY ./dist/ /usr/share/nginx/html/web

# 暴露port
EXPOSE 8317

# 啟動 Nginx
CMD ["nginx", "-g", "daemon off;"]
