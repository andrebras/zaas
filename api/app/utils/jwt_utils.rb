class JWTUtils
  def self.encode(payload)
    JWT.encode(payload, nil, 'none')
  end

  def self.decode(token)
    JWT.decode(token, nil, false)[0]
  end
end
