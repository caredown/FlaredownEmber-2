class Api::V1::ClientsController < ApplicationController
  skip_before_action :authenticate_user!

  def show
    return unless params[:subdomain].present?

    render json: current_tenant, root: 'client'
  end

  def theme
    @client = current_tenant
    return unless @client

    @theme_color = @client.theme_color
    return unless @theme_color

    @background_color = @client.background_color
    @theme_color_rgba = @theme_color && @theme_color.gsub('#', '').scan(/../).map {|color| color.to_i(16)}.join(', ')

    render file: Rails.root.join('app/themes/', 'theme.css'), content_type: 'text/css'
  end

  def manifest
    return unless current_tenant

    render json: WebManifestService.new(current_tenant, request.protocol + request.host_with_port).as_json
  end
end
