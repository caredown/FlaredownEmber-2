class SaveBase64ToLogoJob
  include Sidekiq::Worker

  def perform(client_id, base64, filename, file_extn_name)
    client = Client.find_by(id: client_id)

    return unless client || base64.present?

    client.logo = decode_base64(base64, filename, file_extn_name)
    client.save
  end

  def decode_base64(base, filename, file_extn_name)
    file = Tempfile.new([file_base_name(filename), file_extn_name])
    file.binmode
    file.write(Base64.decode64(base))
    file.close
    file
  end

  def file_base_name(filename)
    File.basename(filename, file_extn_name)
  end
end
