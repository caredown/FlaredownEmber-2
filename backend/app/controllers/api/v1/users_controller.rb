class Api::V1::UsersController < ApplicationController
  load_and_authorize_resource

  def index
    render json: @users
  end

  def show
    render json: @user
  end

  def destroy
    render json: @user.destroy
  end
end
