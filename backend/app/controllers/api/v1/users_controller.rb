class Api::V1::UsersController < ApplicationController
  load_and_authorize_resource

  def index
    page = params[:page] || 1
    @users = User.accessible_by(current_ability).all

    render json: @users.page(page).per(10)
  end

  def show
    render json: @user
  end

  def destroy
    render json: @user.destroy
  end

  def current_ability
    Ability.new(current_user)
  end
end
