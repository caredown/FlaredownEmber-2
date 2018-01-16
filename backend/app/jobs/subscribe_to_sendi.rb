class SubscribeToSendi
  include Sidekiq::Worker

  def perform(options)
    email = options['email']
    return unless email.present?

    SendiService.new(name: options['name'], email: email).subscribe
  end
end
