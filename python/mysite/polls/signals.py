from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Question

# 创建函数,监听信号,当信号触发时进行函数的调用
# 将函数进行注册,声明为回调函数,第一个参数为信号类型,如果声明sender,那么接收器只会接收这个sender的信号,这里声明为只接收MyModel模型的信号
# post_save在某个Model保存之后调用, 对于每个唯一的dispatch_uid,接收器都只被信号调用一次
@receiver(post_save, sender=Question, dispatch_uid="my_unique_identifier")
def my_handler(sender, instance, **kwargs):
    #参数:**kwargs必须.第一个参数必须为sender,当信号类型为Model_signals,接收到的第二个参数为模型对象
    # print(instance.name) # 可以直接使用这个模型实例对象进行操作
    print("**********************")
    print(sender)   # <class 'polls.models.Question'>
    print(instance) # what is the month?
    print(kwargs)   # {'signal': <django.db.models.signals.ModelSignal object at 0x7fe8bbd37e80>, 'created': True, 'update_fields': None, 'raw': False, 'using': 'default'}
    print("**********************")

from django.core.signals import request_finished
@receiver(request_finished)
def my_callback(sender, **kwargs):
    print("1**********************")
    print(sender) # < class 'django.core.handlers.wsgi.WSGIHandler'>
    print(kwargs) # {'signal': <django.dispatch.dispatcher.Signal object at 0x7f12105be208>}
    print("2**********************")