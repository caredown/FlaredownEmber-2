class ClientCreator
  attr_accessor :email, :name, :app_name, :slug_name, :theme_color, :background_color, :password

  def initialize(options)
    @email = options[:email]
    @name = options[:name]
    @app_name = options[:app_name]
    @slug_name = options[:slug_name]
    @theme_color = options[:theme_color]
    @background_color = options[:background_color]
    @password = options[:password]
  end

  def create
    ActiveRecord::Base.transaction do
      user = User.create!(email: email, password: password, password_confirmation: password)

      @client = user.create_client!(name: name,
        app_name: app_name,
        slug_name: slug_name,
        theme_color: theme_color,
        background_color: background_color,
        user_id: user.id)

      user.update_columns(client_id: @client.id)
    end

    @client
  end
end
