class ApplicationMailer < ActionMailer::Base
  default from: Rails.application.secrets.smtp_email_from

  def client_url(subdomain)
    secrets = Rails.application.secrets

    return if subdomain.empty?

    secrets.base_protocol + subdomain + ".#{secrets.base_domain}"
  end
end
