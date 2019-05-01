module HelperMethods
  def build_user(params = {})
    email = params.fetch(:email, 'email@example.com')
    password = params.fetch(:password, '111')
    password_confirmation = params.fetch(:password_confirmation, '111')

    User.create({
      email: email,
      password: password,
      password_confirmation: password_confirmation
    })
  end

  def user_token
    JWTUtils.encode({ user_id: build_user.id })
  end

  def invalid_token
    JWTUtils.encode({})
  end

  def authenticate_as_user
    set_request_token(user_token)
  end

  def set_request_token(token)
    request.headers['Authorization'] = "Bearer #{token}"
  end
end
