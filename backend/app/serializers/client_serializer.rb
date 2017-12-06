class ClientSerializer < ApplicationSerializer
  attributes :name, :app_name, :slug_name, :logo, :theme_color, :background_color, :term_of_service, :privacy_policy

  def logo
    serialization_options[:root_url] + object.logo.url.to_s
  end
end
