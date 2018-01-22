class ClientApprovementMailer < ApplicationMailer
  layout 'mailer_layout'

  def notify_owner(client_email, client_id)
    @client_email = client_email
    @client = Client.find_by(id: client_id)
    return unless @client

    @email = @client.author.try(:email)
    encrypted_client_id = SymmetricEncryption.encrypt(@client.id)
    @approvement_link = ENV['BASE_URL'] + "/approved/#{encrypted_client_id}"

    mail(to: ENV['SMTP_EMAIL_FROM'], from: ENV['SMTP_EMAIL_FROM'], subject: 'Request for approvement"')
  end

  def notify_client(client_email, client_id)
    @client = Client.find_by(id: client_id)
    return unless @client

    slug_name = @client.slug_name
    subdomain = ENV['APP_ENV'] == 'staging' ? "#{slug_name}.stg" : slug_name

    @app_link = "#{slug_name}.caredown.com"

    mail(to: client_email, from: ENV['SMTP_EMAIL_FROM'], subject: 'Request was approved')
  end
end
