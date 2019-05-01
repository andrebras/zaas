class ApplicationController < ActionController::API
  class TenantNotFound < StandardError
    def to_s; 'Tenant not found'; end
  end

  rescue_from TenantNotFound, with: :not_found_error
  before_action :connect_to_tenant_database

  private

  def connect_to_tenant_database
    config = ActiveRecord::Base.configurations.configs_for(
      env_name: Rails.env,
      spec_name: app_params[:tenant_slug]
    )

    raise TenantNotFound.new unless config
    return if Rails.env.test?

    ActiveRecord::Base.establish_connection(config.config)
  end

  def app_params
    params.permit(:tenant_slug)
  end

  def not_found_error(error)
    render json: { message: error.message }, status: 404
  end
end
