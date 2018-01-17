require 'dnsimple'

class DNSService
  attr_accessor :client, :slug_name

  DOMAIN = 'caredown.com'.freeze
  ZONE_ID = 'caredown.com'.freeze
  DNSSIMPLE_ACCOUNT_TOKEN = ENV['DNSSIMPLE_ACCOUNT_TOKEN']
  ACCOUNT_ID = ENV['DNSSIMPLE_ACOUNT_ID']
  CONTENT = ENV['DNSSIMPLE_CONTENT']

  def initialize(options)
    @slug_name = options[:slug_name]

    @client = Dnsimple::Client.new(access_token: DNSSIMPLE_ACCOUNT_TOKEN)
  end

  def domain(name = nil)
    domain_name = name.present? ? name : DOMAIN
    client.domains.list(ACCOUNT_ID, filter: { name_like: domain_name }).data.try(:first)
  end

  def create_subdomain
    client.zones.create_record(ACCOUNT_ID, ZONE_ID, name: slug_name, type: 'CNAME', ttl: 3600, content: CONTENT)
  end
end
