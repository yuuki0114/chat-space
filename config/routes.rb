Rails.application.routes.draw do
  get 'message/index'
  root "messages#index"
end
