class AuthService
  include Callable

  class InvalidToken < StandardError
    def to_s; 'Invalid token'; end
  end
  class InvalidCredentials < StandardError
    def to_s; 'Invalid credentials'; end
  end

  def authenticate(email, password)
    user = User.find_by(email: email)
    raise InvalidCredentials if user.blank? || !user.authenticate(password)

    [JWTUtils.encode({ user_id: user.id, exp: 1.year.from_now.to_f }), user]
  end
end
