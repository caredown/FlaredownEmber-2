class WebManifestService
  attr_reader :client, :api_url

  def initialize(client, api_url)
    @client = client
    @api_url = api_url
  end

  def as_json
    {
      name: client.name,
      short_name: client.slug_name,
      start_url: ".",
      display: "standalone",
      background_color: client.background_color,
      theme_color: client.theme_color,
      description: "A simply symptom tracker",
      icons: [{
        src: api_url + client.logo.url,
        type: client.logo.content_type
      }]
    }
  end
end
