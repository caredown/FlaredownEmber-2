class AddTenantReferenceToUser < ActiveRecord::Migration
  def change
    add_column :users, :client_id, :integer

    add_index :users, :client_id

    remove_index :users, :email
    add_index :users, [:email, :client_id]
  end
end
