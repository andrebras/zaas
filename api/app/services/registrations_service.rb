class RegistrationsService
  include Callable

  class AlreadyRegisteredError < StandardError
    def to_s; 'Already registered'; end
  end
  class PasswordNotMatch < StandardError
    def to_s; 'Password does not match the confirmation'; end
  end

  def register(email, password, password_confirmation)
    raise AlreadyRegisteredError if User.find_by(email: email)
    raise PasswordNotMatch if password != password_confirmation

    User.create(email: email, password: password, password_confirmation: password_confirmation)
  end
end
