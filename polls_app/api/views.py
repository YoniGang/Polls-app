from django.shortcuts import render,get_object_or_404
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import QuestionSerializer, ChoiceSerializer, VoteSerializer
from .models import Question, Choice, Vote

@api_view(['GET'])
def questions_list(request):
    qustions = Question.objects.all()
    serializer = QuestionSerializer(qustions, many=True)

    return Response(serializer.data)

@api_view(['GET'])
def get_question(request, pk):
    qustion = get_object_or_404(Question, id = pk)
    serializer = QuestionSerializer(qustion, many=False)

    return Response(serializer.data)

@api_view(['GET'])
def get_choices(request, pk):
    qustion = get_object_or_404(Question, id = pk)
    choices = qustion.choice_set.all()
    serializer = ChoiceSerializer(choices, many=True)

    return Response(serializer.data)

@api_view(['GET'])
def get_votes(request, pk):
    qustion = get_object_or_404(Question, id = pk)
    choices = qustion.choice_set.all()
    serializer = []
    for choice in choices:
        votes = choice.vote_set.all()
        serializer.extend(VoteSerializer(votes, many=True).data)

    return Response(serializer)

def create_question(data):
    serializer = QuestionSerializer(data=data)

    if serializer.is_valid():
        serializer.save()

    return serializer.data

@api_view(['POST'])
def create_poll(request):
    #If there is no text
    if len(request.data.get("question_text", "")) == 0:
        return Response({"Bad Request": "missing question text"}, status.HTTP_400_BAD_REQUEST)

    #If there are no choices
    if len(request.data.get("choices", [])) == 0:
        return Response({"Bad Request": "missing choices"}, status.HTTP_400_BAD_REQUEST)
    
    new_question = create_question({"question_text": request.data["question_text"]})
    new_question_id = new_question['id']

    qustion = get_object_or_404(Question, id = new_question_id)
    for choice_text in request.data["choices"]:
        qustion.choice_set.create(choice_text=choice_text)

    return Response(new_question, status.HTTP_201_CREATED)




# @api_view(['DELETE'])
# def delete_poll(request):
# 	serializer = QuestionSerializer(data=request.data)

# 	if serializer.is_valid():
# 		serializer.save()

# 	return Response(serializer.data)


# class QuestionsListView(generics.ListAPIView):
#     queryset = Question.objects.all()
#     serializer_class = QuestionSerializer

# # class ChoiceView(generics.ListAPIView):
# #     queryset = Choice.objects.all()
# #     serializer_class = ChoiceSerializer

# class ChoicesListView(generics.ListAPIView):
#     serializer_class = ChoiceSerializer
#     lookup_url_kwarg = "pk"

#     def get_queryset(self):
#         pk = self.kwargs.get(self.lookup_url_kwarg)
#         choice = Choice.objects.filter(question=pk)
#         return choice

# class QuestionView(generics.ListAPIView):
#     serializer_class = QuestionSerializer
#     lookup_url_kwarg = "pk"

#     def get_queryset(self):
#         pk = self.kwargs.get(self.lookup_url_kwarg)
#         question = Question.objects.get(id=pk)
#         # choices = question.choice_set.all()
#         return question

# class VotesListView(generics.ListAPIView):
#     serializer_class = VoteSerializer
#     lookup_url_kwarg = "pk"

#     def get_queryset(self):
#         pk = self.kwargs.get(self.lookup_url_kwarg)
#         vote = Vote.objects.filter(choice=pk)
#         return vote




