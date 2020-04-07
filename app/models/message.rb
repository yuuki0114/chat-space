class Message < ApplicationRecord
  belongs_to :grouup
  belongs_to :user

  validate :content, presence: true, unless: :image?

  mount_uploader :image, ImageUploader  
end