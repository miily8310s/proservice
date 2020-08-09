# frozen_string_literal: true

module Api
  module V1
    class ReviewsController < ApplicationController
      protect_from_forgery with: :null_session
      def create
        review = proservice.reviews.new(review_params)

        if review.save
          render json: ReviewSerializer.new(review).serialized_json
        else
          render json: { error: review.errors.messages }, status: 422
        end
      end

      def destroy
        review = Review.find(params[:id])

        if review.destroy
          head :no_content
        else
          render json: { error: review.errors.messages }, status: 422
        end
      end

      private

      def proservice
        @proservice ||= Proservice.find(params[:proservice_id])
      end

      def review_params
        params.require(:review).permit(:title, :description, :score, :proservice_id)
      end
    end
  end
end
