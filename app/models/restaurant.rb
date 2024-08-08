class Restaurant < ApplicationRecord
  has_many :foods
  # この関連付けによりそのレストランにある商品が仮注文されているかどうかを簡単に取得できる
  has_many :line_foods, through: :foods

  validates :name, :fee, :time_required, presence: true
  validates :name, length: { maximum: 30}
  validates :fee, numericality: { grater_than: 0 }

end