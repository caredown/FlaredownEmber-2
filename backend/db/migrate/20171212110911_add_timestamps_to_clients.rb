class AddTimestampsToClients < ActiveRecord::Migration
  def change
    add_column :clients, :created_at, :datetime
    add_column :clients, :updated_at, :datetime

    Client.find_each { |client| client.update_columns(created_at: Time.current, updated_at: Time.current) }
  end
end
