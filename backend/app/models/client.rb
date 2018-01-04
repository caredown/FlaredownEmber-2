class Client < ActiveRecord::Base
  mount_uploader :logo, LogoUploader
  SLUG_FORMAT = /([[:lower:]]|[0-9]+-?[[:lower:]])(-[[:lower:]0-9]+|[[:lower:]0-9])*/

  validates :slug_name, presence: true, uniqueness: true, format: { with: Regexp.new('\A' + SLUG_FORMAT.source + '\z'),
    message: 'Subdomain should be lowercase with dashes instead of space' }

  has_many :users
end
