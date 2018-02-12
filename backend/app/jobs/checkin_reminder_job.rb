class CheckinReminderJob
  require 'sidekiq/api'
  include Sidekiq::Worker

  def perform(profile_id, checkin_reminder_at)
    profile = Profile.find_by(id: profile_id)

    return unless profile
    return unless profile.checkin_reminder
    return if profile.client? || profile.admin?

    CheckinReminderMailer.remind(email: profile.email, client_id: profile.client_id).deliver_later

    profile.update_column(:reminder_job_id, self.class.perform_in(24.hours, profile_id, checkin_reminder_at))
  end
end
