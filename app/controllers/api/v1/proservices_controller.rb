# frozen_string_literal: true

module Api
  module V1
    class ProservicesController < ApplicationController
      protect_from_forgery with: :null_session
      def index
        proservices = Proservice.all
        render json: ProserviceSerializer.new(proservices, options).serialized_json
      end

      def show
        proservice = Proservice.find_by(slug: params[:slug])
        render json: ProserviceSerializer.new(proservice, options).serialized_json
      end

      def create
        proservice = Proservice.new(proservice_params)

        if proservice.save
          render json: ProserviceSerializer.new(proservice).serialized_json
        else
          render json: { error: proservice.errors.messages }, status: 422
        end
      end

      def update
        proservice = Proservice.find_by(slug: params[:slug])

        if proservice.update(proservice_params)
          render json: ProserviceSerializer.new(proservice, options).serialized_json
        else
          render json: { error: proservice.errors.messages }, status: 422
        end
      end

      def destroy
        proservice = Proservice.find_by(slug: params[:slug])

        if proservice.destroy
          head :no_content
        else
          render json: { error: proservice.errors.messages }, status: 422
        end
      end

      private

      def options
        @options ||= { include: %i[reviews] }
      end

      def proservice_params
        params.require(:proservice).permit(:name, :image_url, :site_url)
      end
    end
  end
end
