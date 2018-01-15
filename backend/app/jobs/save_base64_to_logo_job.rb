class SaveBase64ToLogoJob
  include Sidekiq::Worker

  def perform(client_id, base64, filename, file_extn_name)
    client = Client.find_by(id: client_id)

    return unless client || base64.present?

    client.logo = decode_base64_to_file(base64, filename, file_extn_name)
    client.save
  end

  def decode_base64_to_file(base, filename, file_extn_name)
    file_base_name = File.basename(filename, file_extn_name)

    file = Tempfile.new([file_base_name, file_extn_name])
    file.binmode
    file.write(Base64.decode64(base))
    file.close
    file
  end
end
