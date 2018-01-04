class Api::V1::ClientsController < ApplicationController
  skip_before_action :authenticate_user!

  def show
    render json: Client.find_by(id: params[:id]), root_url: root_url
  end

  def create
    client_params = params[:client]
    return unless client_params.present?

    render json: ClientCreator.new(client_params).create, root_url: root_url, root: 'client'
  end

  def show_tenant
    return unless params[:subdomain].present?

    render json: current_tenant, root_url: root_url, root: 'client'
  end

  def theme
    return unless current_tenant

    @theme_color = current_tenant.theme_color
    return unless @theme_color

    @background_color = current_tenant.background_color
    @theme_color_rgba = @theme_color && @theme_color.delete('#').scan(/../).map { |color| color.to_i(16) }.join(', ')

    render file: Rails.root.join('app/themes/', 'theme.css'), content_type: 'text/css'
  end

  def manifest
    return unless current_tenant

    render json: WebManifestService.new(current_tenant, root_url).as_json
  end

  def root_url
    request.protocol + request.host_with_port
  end
end
