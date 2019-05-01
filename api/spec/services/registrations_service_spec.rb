describe RegistrationsService do
  describe '#register' do
    it 'registers a new user' do
      user = described_class.register('email@example.com', '111', '111')
      expect(user.email).to eq('email@example.com')
    end

    it 'does not duplicate users' do
      described_class.register('email@example.com', '111', '111')

      expect { described_class.register('email@example.com', '222', '222') }
        .to raise_error(RegistrationsService::AlreadyRegisteredError)
    end

    it 'validates password match' do
      expect { described_class.register('email@example.com', '111', '222') }
        .to raise_error(RegistrationsService::PasswordNotMatch)
    end
  end
end
