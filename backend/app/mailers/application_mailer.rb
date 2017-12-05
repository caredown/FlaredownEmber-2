class ApplicationMailer < ActionMailer::Base
  default from: Rails.application.secrets.smtp_email_from

  def client_url(subdomain)
    return if subdomain.empty?

    "#{ENV['BASE_PROTOCOL']}#{subdomain}.#{ENV['BASE_DOMAIN']}"
  end
end
