describe AuthService do
  describe '#authenticate' do
    let(:user) { build_user }
    before { user.save }

    it 'authenticates valid credentials and returns a JWT and user' do
      token, authenticated_user = described_class.authenticate('email@example.com', '111')

      data = JWTUtils.decode(token)
      expect(data['user_id']).to eq(user.id)
      expect(data['exp']).to_not eq(nil)
      expect(authenticated_user.id).to eq(user.id)
    end

    it 'does not authenticate email not found' do
      expect { described_class.authenticate('wrong@email.com', '222') }
        .to raise_error(AuthService::InvalidCredentials)
    end

    it 'does not authenticate wrong password' do
      expect { described_class.authenticate('example@email.com', 'wrong') }
        .to raise_error(AuthService::InvalidCredentials)
    end
  end
end
