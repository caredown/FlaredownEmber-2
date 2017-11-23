class CreateClients < ActiveRecord::Migration
  def change
    create_table :clients do |t|
      t.string :name, null: false
      t.string :app_name, null: false
      t.string :theme_color
      t.string :background_color
      t.text   :term_of_service, limit: 1073741823
      t.text   :privacy_policy,  limit: 1073741823
      t.string :logo
    end
  end
end
