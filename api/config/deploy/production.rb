set :stage, :production
set :rails_env, 'production'

role :app, %w(ubuntu@95.179.187.155)
role :web, %w(ubuntu@95.179.187.155)
role :db, %w(ubuntu@95.179.187.155)

server '95.179.187.155', user: 'ubuntu', roles: %w{app db}

set :deploy_to, "/home/ubuntu/saas-b2b-boilerplate-api"

set :ssh_options, keys: [File.expand_path('~/.ssh/id_rsa')],
                  forward_agent: true, auth_methods: %w(publickey)

set :branch, %x`git rev-parse --abbrev-ref HEAD`.delete("\n")

set :puma_conf, "/home/ubuntu/saas-b2b-boilerplate-api/shared/puma.rb"
