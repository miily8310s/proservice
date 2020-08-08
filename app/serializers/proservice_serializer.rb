# frozen_string_literal: true

class ProserviceSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :image_url, :site_url, :slug, :avg_score

  has_many :reviews
end
