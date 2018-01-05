class ClientApprovementMailer < ApplicationMailer
  layout 'mailer_layout'

  def notify_owner(client_email, client_id)
    @client_email = client_email
    @client = Client.find_by(id: client_id)
    return unless @client

    encrypted_client_id = SymmetricEncryption.encrypt(@client.id)
    @approvement_link = ENV['BASE_URL'] + "/approved/#{encrypted_client_id}"

    mail(to: ENV['SMTP_EMAIL_FROM'], from: ENV['SMTP_EMAIL_FROM'], subject: 'Request for approvement"')
  end
end
