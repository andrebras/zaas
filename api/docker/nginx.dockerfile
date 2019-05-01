FROM nginx:1.15

COPY ./docker/nginx/site-http /etc/nginx/conf.d/site-http.conf
EXPOSE 80
