class CheckinReminderMailer < ApplicationMailer
  layout 'mailer_layout'

  def remind(notification_hash)
    @email = notification_hash[:email]

    user = User.find_by(email: @email)
    return unless user

    @notify_token = user.notify_token
    return unless @notify_token

    @client = user.client
    return unless @client

    @subdomain = @client.slug_name
    @app_name = "#{@client.app_name}"

    @click_here_link = client_url(@subdomain)

    @unsubscribe_link = @click_here_link + "/unsubscribe/#{@notify_token}?stop_remind"
    @client_logo = @client.logo

    attachments.inline['attachment'] =
     @client_logo.present? ? File.read(@client_logo.path) : File.read('public/images/optional_email_img.png')

    mail(to: @email, subject: I18n.t('checkin_reminder_mailer.subject', app_name: @app_name))
  end
end
