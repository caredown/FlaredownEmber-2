class Registration
  include ActiveModel::Validations
  include ActiveModel::Serialization

  attr_accessor :user, :errors, :captcha_response, :screen_name, :is_client

  validates :screen_name, presence: true

  with_options unless: Proc.new { |object| object.is_client } do |client|
    client.validates :captcha_response, presence: true
    client.validate :captcha_response_verified
  end

  def initialize(params)
    @user_params = permitted(params).to_hash
    @screen_name = @user_params.delete('screen_name')
    @captcha_response = @user_params.delete('captcha_response')
    @is_client = @user_params["role"] == 'client'
    @errors = ActiveModel::Errors.new(self)
  end

  def save!
    # FIXME
    # rubocop:disable Style/SignalException
    fail ActiveRecord::RecordInvalid, self unless valid?
    # rubocop:enable Style/SignalException

    begin
      @user = User.create!(@user_params)
      @user.profile.update_attributes!(screen_name: screen_name) if screen_name.present?
    rescue ActiveRecord::RecordInvalid => e
      self.errors = e.record.errors
      raise ActiveRecord::RecordInvalid, self
    end

    self
  end

  def self.create!(params)
    new(params).save!
  end

  # Use AR's i18n scope so that we can raise RecordInvalid exceptions
  def self.i18n_scope
    :activerecord
  end

  private

  def permitted(params)
    params.require(:registration).permit(
      :email, :password, :password_confirmation, :screen_name, :captcha_response, :role
    )
  end

  def captcha_response_verified
    verified = Google::RecaptchaVerifier.exec(captcha_response)
    errors.add(:captcha_response, 'verification failed or response expired') unless verified
  end

end
