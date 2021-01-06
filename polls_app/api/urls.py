from django.urls import path
# from .views import QuestionsListView, ChoicesListView, QuestionView
from .views import questions_list, get_question, get_choices, get_votes, create_poll, vote, get_internal_ip, delete_poll

urlpatterns = [
    path('questions', questions_list),
    path('choices/<str:qid>', get_choices),
    path('votes/<str:qid>', get_votes),
    path('question/<str:qid>',get_question),
    path('create_poll', create_poll),
    path('vote/<str:qid>', vote),
    path('get_ip', get_internal_ip),
    path('delete_poll/<str:qid>', delete_poll)

]