describe User, type: :model do
  let(:user) { build_user }

  it 'uses UUID as ID' do
    expect(user.id).to match(/^[\w]{8}-[\w]{4}-[\w]{4}-[\w]{4}-[\w]{12}$/)
  end
end
