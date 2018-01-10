class ClientSerializer < ApplicationSerializer
  attributes :name, :app_name, :slug_name, :logo, :theme_color, :background_color, :approved
  def logo
    root_url = serialization_options[:root_url]
    return unless root_url

    root_url + object.logo.url.to_s
  end
end
