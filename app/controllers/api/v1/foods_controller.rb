class Api::V1::FoodsController < ApplicationController

  def index
    foods = Restaurant.find(params[:restaurant_id]).foods 
    render json: {
      foods: foods
    }, status: :ok
  end
end
