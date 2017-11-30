class Client < ActiveRecord::Base
  mount_uploader :logo, LogoUploader

  has_many :users
end
