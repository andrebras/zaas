Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  scope ':tenant_slug' do
    post '/login', to: 'login#create'
    post '/registrations', to: 'registrations#create'
  end
end
