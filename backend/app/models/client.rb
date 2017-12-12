class Client < ActiveRecord::Base
  mount_uploader :logo, LogoUploader
  validates :slug_name, presence: true, uniqueness: true

  has_many :users
end
