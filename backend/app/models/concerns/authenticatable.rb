module Authenticatable
  extend ActiveSupport::Concern

  included do
    #
    # Devise
    #
    devise :database_authenticatable,
           :rememberable,
           :recoverable,
           :trackable,
           :invitable,
           :omniauthable

    #
    # Validates
    #
    validates :password, confirmation: true
    validates :email, uniqueness: { scope: :client_id, allow_blank: false },
                      format: { with: Devise.email_regexp },
                      presence: true
  end
end
