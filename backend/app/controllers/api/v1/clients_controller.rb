class Api::V1::ClientsController < ApplicationController
  skip_before_action :authenticate_user!
  before_action :find_client

  def show
    render json: @client, root: 'client'
  end

  def theme
    @client ||= Client.last
    return unless @client

    @background_color = @client.background_color
    @theme_color = @client.theme_color
    @theme_color_rgba = @theme_color.gsub('#', '').scan(/../).map {|color| color.to_i(16)}.join(', ')

    render file: Rails.root.join('app/themes/', 'theme.css'), content_type: 'text/css'
  end

  def find_client
    @client ||= Client.find_by(slug_name: params[:subdomain])
  end
end
