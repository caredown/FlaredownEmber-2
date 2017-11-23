class ClientSerializer < ApplicationSerializer
  attributes :name, :app_name, :logo, :theme_color, :background_color, :term_of_service, :privacy_policy
end
