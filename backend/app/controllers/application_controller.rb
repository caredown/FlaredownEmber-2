class ApplicationController < ActionController::API
  include ExceptionLogger, ActionController::Serialization, CanCan::ControllerAdditions

  before_action :authenticate_user_from_token!, if: :presence_of_authentication_token?
  before_action :authenticate_user!, except: [:root]
  before_action :set_locale, :set_client

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

  def set_client
    subdomain = request.host.split('.')[0]
    @subdomain ||= request.subdomain
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
end
