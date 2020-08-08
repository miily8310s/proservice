class CreateProservices < ActiveRecord::Migration[6.0]
  def change
    create_table :proservices do |t|
      t.string :name
      t.text :image_url
      t.text :site_url
      t.string :slug

      t.timestamps
    end
  end
end
