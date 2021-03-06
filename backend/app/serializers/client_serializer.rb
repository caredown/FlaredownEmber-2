class ClientSerializer < ApplicationSerializer
  attributes :name, :app_name, :slug_name, :logo, :theme_color, :background_color, :approved, :author_id, :user_count

  has_many :users, except: [:profile]

  def logo
    root_url = serialization_options[:root_url]
    return unless root_url

    root_url + object.logo.url.to_s
  end

  def author_id
    object.user_id
  end

  def user_count
    object.users.count
  end
end
