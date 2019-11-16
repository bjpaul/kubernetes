FROM nginx
MAINTAINER bijoy.paul@tothenew.com

RUN mkdir -p /etc/nginx/ssl && rm /etc/nginx/conf.d/*.conf
COPY nginx.conf /etc/nginx/
COPY conf.d/ /etc/nginx/conf.d/

EXPOSE 80
EXPOSE 443
