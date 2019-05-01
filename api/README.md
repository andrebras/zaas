# saas-b2b-boilerplate-api

[![Build Status](https://semaphoreci.com/api/v1/leandronsp/saas-b2b-boilerplate-api/branches/master/badge.svg)](https://semaphoreci.com/leandronsp/saas-b2b-boilerplate-api)

Examples:
```
./bin/rails g model admin/tenant --database=admin
./bin/rails g migration create_admin_tenants --database=admin

# Admin tenant
config = ActiveRecord::Base.configurations.configs_for(env_name: Rails.env, spec_name: 'admin')
ActiveRecord::Base.establish_connection(config.config)

irb>Admin::User.count


# Switching tenant
config = ActiveRecord::Base.configurations.configs_for(env_name: Rails.env, spec_name: 'tenant_two')
ActiveRecord::Base.establish_connection(config.config)

irb>User.count
```

### Docker usage

This app uses docker for containerization:
```
  # builds the api and db container
  docker-compose build api

  # starts api container and listens to http://localhost:3000
  docker-compose up api

  # builds ngninx proxy service
  docker-compose build nginx

  # starts nginx proxy and listens to http://api.test
  docker-compose up nginx

  # stops everything
  docker-compose down
```

By default the database will write data to the local machine at `$(pwd)/.pgdata`.
