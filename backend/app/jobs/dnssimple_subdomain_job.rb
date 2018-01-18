class DnssimpleSubdomainJob
  include Sidekiq::Worker

  def perform(options)
    slug_name = options['slug_name']
    return unless slug_name.present?

    DNSService.new(slug_name: slug_name).create_subdomain
  end
end
