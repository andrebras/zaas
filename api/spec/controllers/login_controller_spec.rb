describe LoginController, type: :request do
  let(:user) { build_user }
  before { user.save }

  describe 'POST /login' do
    it 'performs a new login and returns a JWT' do
      post '/tenant/login', params: { email: 'email@example.com', password: '111' }
      expect(response.code).to eq('201')

      token = JSON.parse(response.body)['token']
      data = JWTUtils.decode(token)
      expect(data['user_id']).to eq(user.id)
    end

    it 'on success, also return some user data' do
      post '/tenant/login', params: { email: 'email@example.com', password: '111' }
      expect(response.code).to eq('201')

      result = JSON.parse(response.body)
      expect(result['email']).to eq('email@example.com')
      expect(result['id']).to eq(user.id)
    end

    it 'returns 404 when invalid credentials' do
      post '/tenant/login', params: { email: 'email@example.com', password: 'invalid' }
      expect(response.code).to eq('404')
    end

    it 'returns 404 when tenant does not exist' do
        post '/unknown/login', params: { email: 'email@example.com', password: '111' }
        expect(response.code).to eq('404')
    end
  end
end
