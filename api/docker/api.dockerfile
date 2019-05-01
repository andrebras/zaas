FROM ruby:2.5
MAINTAINER leandronsp

RUN apt-get update && \
    apt-get install -y build-essential vim libxml2-dev libxslt-dev

COPY . /var/www/saas-b2b-boilerplate-api
WORKDIR /var/www/saas-b2b-boilerplate-api
RUN gem install bundler
RUN bundle config --global frozen 1
RUN bundle install --path vendor/bundle
EXPOSE 3000
