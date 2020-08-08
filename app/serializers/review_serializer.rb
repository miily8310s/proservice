class ReviewSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :description, :score, :proservice_id
end
