class ApplicationMailer < ActionMailer::Base
  def client_url(subdomain)
    return if subdomain.empty?

    "#{ENV['BASE_PROTOCOL']}#{subdomain}.#{ENV['BASE_DOMAIN']}"
  end
end
