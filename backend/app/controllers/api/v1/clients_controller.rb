class Api::V1::ClientsController < ApplicationController
  skip_before_action :authenticate_user!
  load_and_authorize_resource
  skip_authorize_resource only: :theme

  def index
    if params[:subdomain].present?
      raise ActiveRecord::RecordNotFound unless current_tenant.present?

      render json: current_tenant, root_url: root_url, root: 'client'
    else
      page = params[:page] || 1

      render json: @clients.page(page).per(5), root_url: root_url, meta: { client_count: Client.count }
    end
  end

  def show
    render json: @client, root_url: root_url
  end

  def create
    return unless client_params.present?

    render json: ClientCreator.new(client_params, current_user.id).create, root_url: root_url, root: 'client'
  end

  def update
    @client = Client.find_by(id: params[:id])

    @client.update_attributes(client_params.permit(:theme_color, :filename))
    @client.logo = client_params[:logo] if client_params[:logo_changed]

    if @client.save!
      render json: @client, root_url: root_url
    else
      render json: @client,
             serializer: ActiveModel::Serializer::ErrorSerializer,
             status: :unprocessable_entity
    end
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

  private

  def client_params
    params.require(:client).permit!
  end
end
