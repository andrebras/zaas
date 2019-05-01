describe Callable do
  class MyService
    include Callable

    def call
      'It works!'
    end
  end

  it 'calls the service using callable' do
    expect(MyService.call()).to eq('It works!')
  end
end
