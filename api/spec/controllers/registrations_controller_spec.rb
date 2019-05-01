describe RegistrationsController, type: :request do
  describe 'POST /signup' do
    it 'creates a new registration' do
      post '/tenant/registrations', params: {
        email: 'email@example.com', password: '111', password_confirmation: '111'
      }

      expect(response.code).to eq('201')
      expect(User.count).to eq(1)
    end

    it 'does not duplicate emails' do
      build_user

      post '/tenant/registrations', params: {
        email: 'email@example.com', password: '111', password_confirmation: '111'
      }

      expect(response.status).to eq(409)
      expect(JSON.parse(response.body)['message']).to eq('Already registered')
    end

    it 'validates password match' do
      post '/tenant/registrations', params: {
        email: 'email@example.com', password: '333', password_confirmation: '111'
      }

      expect(response.status).to eq(409)
      expect(JSON.parse(response.body)['message']).to eq('Password does not match the confirmation')
    end
  end
end
