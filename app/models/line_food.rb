class LineFood < ApplicationRecord
  belongs_to :food
  belongs_to :restaurant 
  belongs_to :order, optional: true

  validates :count, numericality: { greater_than: 0 }

  scope :active, -> { where(active: true)}
  # (picked_restaurant_id) は、このラムダが受け取る引数(LineFood.other_restaurant(1))
  scope :other_restaurant, -> (picked_restaurant_id) { where.not(restaurant_id: picked_restaurant_id) }

  def total_amount
    food.price * price
  end

end