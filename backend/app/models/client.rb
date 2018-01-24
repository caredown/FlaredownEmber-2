class Client < ActiveRecord::Base
  attr_accessor :filename, :filetype, :logo_changed

  mount_base64_uploader :logo, LogoUploader, file_name: ->(u) { u.filename }
  SLUG_FORMAT = /([[:lower:]]|[0-9]+-?[[:lower:]])(-[[:lower:]0-9]+|[[:lower:]0-9])*/

  validates :slug_name,
            presence: true,
            uniqueness: true,
            exclusion: { in: %w(admin api stg), message: "Do not allowed such App name" },
            format: { with: Regexp.new('\A' + SLUG_FORMAT.source + '\z'),
                      message: 'Subdomain should be lowercase with dashes instead of space and dots' }

  has_many :users

  alias_attribute :author_id, :user_id

  def author
    User.find_by(id: author_id)
  end
end
