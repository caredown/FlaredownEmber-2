class ClientApprovementMailerPreview < ActionMailer::Preview
  # Preview emails at http://localhost:3000/rails/mailers/checkin_reminder_mailer/remind
  def notify_owner
    ClientApprovementMailer.notify_owner(email: 'test@flaredown.com')
  end
end
