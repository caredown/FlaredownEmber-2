namespace :clients do

  desc 'caredown | setup clients'
  task setup: :environment do
    add_clients_with_logo
  end

  LIST = [{ name: "Body Balance Wellness Studio", app_name: "iBalance", slug_name: "ibalance", theme_color: "#20B36C" },
          { name: "Balanced Body Mind", app_name: "Tempulse", slug_name: "tempulse", theme_color: "#3498db" },
          { name: "VitaMac Holistic Health", app_name: "VitaMac", slug_name: "vitamac", theme_color: "#e67e22" },
          { name: "Elixirs by Kindness", app_name: "KindWell", slug_name: "kindwell", theme_color: "#DA3F77" },
          { name: "Nordic Clinic", app_name: "Nordic Clinic", slug_name: "nordic-clinic", theme_color: "#34495e" }]

  def add_clients_with_logo
    LIST.map do |client_hash|
      client = Client.create(client_hash)
      icon_name = client_hash[:app_name].split(' ').join('') + "Icon.png"
      client.logo = Rails.root.join("./public/clients/#{icon_name}").open

      client.save
    end
  end

end
