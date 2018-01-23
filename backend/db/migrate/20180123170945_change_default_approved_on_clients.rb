class ChangeDefaultApprovedOnClients < ActiveRecord::Migration
  def up
    change_column :clients, :approved, :boolean, default: true
  end

  def down
    change_column :clients, :approved, :boolean, default: false
  end
end
