from django.urls import path
# from .views import QuestionsListView, ChoicesListView, QuestionView
from .views import questions_list, get_question, get_choices, get_votes, create_poll

urlpatterns = [
    path('questions', questions_list),
    path('choices/<str:pk>', get_choices),
    path('votes/<str:pk>', get_votes),
    path('question/<str:pk>',get_question),
    path('create_poll', create_poll)

]