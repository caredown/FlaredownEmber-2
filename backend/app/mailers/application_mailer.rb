class ApplicationMailer < ActionMailer::Base
  default from: ENV['SMTP_EMAIL_FROM']

  def client_url(subdomain)
    return if subdomain.empty?

    "#{ENV['BASE_PROTOCOL']}#{subdomain}.#{ENV['BASE_DOMAIN']}"
  end
end
