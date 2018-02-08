class WebManifestService
  attr_reader :client, :api_url

  def initialize(client, api_url)
    @client = client
    @api_url = api_url
  end

  def as_json
    logo_url = client.logo.try(:url)
    src_url = logo_url ? api_url + logo_url : logo_url

    {
      name: client.name,
      short_name: client.slug_name,
      start_url: ".",
      display: "standalone",
      background_color: client.background_color || '',
      theme_color: client.theme_color,
      description: "A simply symptom tracker",
      icons: [{
        src: src_url,
        type: client.logo.try(:content_type)
      }]
    }
  end
end
