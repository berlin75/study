from django import forms
from django.forms import ModelForm # 首先从django.forms导入ModelForm
from .models import Question, Choice, ModelWithFileField

# 创建表单类,编写一个继承ModelForm的类
class QuestionForm(ModelForm):
    # 在新类里设置元类Meta
    class Meta:
        model = Question
        fields = ['question_text', 'pub_date']

class ChoiceForm(ModelForm):
    # 在新类里设置元类Meta
    class Meta:
        model = Choice
        fields = ['question', 'choice_text', 'votes']

class ModelFormWithFileField(ModelForm):
    class Meta:
        model = ModelWithFileField
        fields = ['title', 'file']