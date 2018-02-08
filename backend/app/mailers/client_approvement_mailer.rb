class ClientApprovementMailer < ApplicationMailer
  layout 'mailer_layout'

  def notify_owner(client_email, client_id)
    @client_email = client_email
    @client = Client.find_by(id: client_id)
    return unless @client

    @email = @client.author.try(:email)

    slug_name = @client.slug_name
    subdomain = ENV['APP_ENV'] == 'staging' ? "#{slug_name}.stg" : slug_name
    @app_link = "#{subdomain}.caredown.com"

    mail(to: ENV['SMTP_EMAIL_FROM'], from: ENV['SMTP_EMAIL_FROM'], subject: 'New Client signed up to Caredown')
  end
end
