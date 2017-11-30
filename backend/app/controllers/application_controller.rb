class ApplicationController < ActionController::API
  include ExceptionLogger, ActionController::Serialization, CanCan::ControllerAdditions

  before_action :authenticate_user_from_token!, if: :presence_of_authentication_token?
  before_action :authenticate_user!, except: [:root]
  before_action :set_locale, :set_client_by_subdomain

  helper_method :current_tenant if respond_to?(:helper_method)

  def root
    render json: {
      ios: {
        major: 0,
        minor: 0
      },
      android: {
        major: 0,
        minor: 0
      }
    }
  end

  def set_client_by_subdomain
    client = Client.find_by(slug_name: set_subdomain)

    set_current_tenant(client)
  end

  protected

  def set_locale
    I18n.locale = user_signed_in? ? current_user.locale : I18n.default_locale
  rescue I18n::InvalidLocale
    # FIXME
    # rubocop:disable Metrics/LineLength
    Rails.logger.warn("'#{current_user.profile.locale}' locale for user '#{current_user.email}' not available or invalid, using default")
    # rubocop:enable Metrics/LineLength
    I18n.locale = I18n.default_locale
  end

  private

  def authenticate_user_from_token!
    user = User.find_by(authorization)
    sign_in user, store: false if user
  end

  def authorization
    @authorization ||=
      begin
        /^Token token="(?<token>.*)", email="(?<email>.*)"$/.match(request.headers['Authorization']) || {}
      end

    { authentication_token: @authorization[:token], email: @authorization[:email] }
  end

  def presence_of_authentication_token?
    authorization[:authentication_token].present?
  end

  def set_subdomain
    subdomain = request.subdomain
    return subdomain if subdomain.present?

    referer = request.referer
    return URI(request.referer).host.split('.').shift if referer.present?
  end

  def set_current_tenant(current_tenant_object)
    ActsAsTenant.current_tenant = current_tenant_object
  end

  def current_tenant
    ActsAsTenant.current_tenant
  end
end
