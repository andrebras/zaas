#!/usr/bin/env puma

root_dir = "/home/ubuntu/saas-b2b-boilerplate-api"
working_directory "#{root_dir}/current"
listen "#{root_dir}/shared/tmp/sockets/puma.sock", backlog: 64
timeout 600
pid "#{root_dir}/current/tmp/pids/puma.pid"
stderr_path "#{root_dir}/shared/log/puma.stderr.log"
stdout_path "#{root_dir}/shared/log/puma.stdout.log"

preload_app true

rackup "#{root_dir}/current/config.ru"
environment 'production'

tag ''

pidfile "#{root_dir}/shared/tmp/pids/puma.pid"
state_path "#{root_dir}/shared/tmp/pids/puma.state"
stdout_redirect "/home/ubuntu/saas-b2b-boilerplate-api/shared/log/puma_access.log', '/home/ubuntu/monumentr.#{instance}/shared/log/puma_error.log", true

threads 0,16

bind "unix:///#{root_dir}/shared/tmp/sockets/.puma.sock"

workers 0
prune_bundler

on_restart do
  puts 'Refreshing Gemfile'
  ENV["BUNDLE_GEMFILE"] = ""
end
