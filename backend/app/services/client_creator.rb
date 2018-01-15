class ClientCreator
  attr_accessor :email, :name, :app_name, :slug_name, :theme_color, :background_color,
                :password, :user, :base64, :filename, :file_extn_name

  def initialize(options, author_id)
    @email = options[:email]
    @name = options[:name]
    @app_name = options[:app_name]
    @slug_name = options[:slug_name]
    @theme_color = options[:theme_color]
    @background_color = options[:background_color]
    @password = options[:password]
    @base64 = options[:logo]
    @filename = options[:filename]
    @file_extn_name = File.extname(filename || '')

    @user = User.find_by(id: author_id)
  end

  def create
    ActiveRecord::Base.transaction do
      @client = user.create_client!(name: name,
        app_name: app_name,
        slug_name: slug_name,
        theme_color: theme_color,
        background_color: background_color,
        user_id: user.id)

      user.update_columns(client_id: @client.id)
    end

    ClientApprovementMailer.notify_owner(user.email, @client.id).deliver_later
    SaveBase64ToLogoJob.perform_async(@client.id, base64, filename, file_extn_name)

    @client
  end
end
