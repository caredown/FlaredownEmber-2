class AddUserReferenceToClient < ActiveRecord::Migration
  def change
    add_column :clients, :user_id, :integer
    add_index :clients, :user_id

    add_column  :clients, :approved, :boolean, default: false
  end
end
