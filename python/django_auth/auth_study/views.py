from __future__ import unicode_literals
from django.shortcuts import render,redirect,reverse
from django.contrib.auth.models import User,Permission
from django.views import View
from .forms import *
from django.http import HttpResponse
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.mixins import LoginRequiredMixin,PermissionRequiredMixin
from .models import Product
# import TestApp
# from TestApp.models import *

#注册功能
class Register(View):
    def get(self,request):
        return render(request,'sign_up.html')

    def post(self,request):
        form = RegisterForm(request.POST)
        print(form.is_bound)

        if form.is_valid():
            userName = form.cleaned_data['userName']
            userPassword = form.cleaned_data['userPassword']
            userConfirmPassword = form.cleaned_data['userConfirmPassword']
            userEmail = form.cleaned_data['userEmail']
            #create_user可以由Django自动将密码加密,而create还需要先将密码自己加密再给
            user = User.objects.create_user(username=userName,email=userEmail,password=userPassword)
            #给用户添加权限,多对多关系,用add添加
            user.user_permissions.add(Permission.objects.get(codename='view_product'))
            user.save() #需要save,因为他们都是一个数据库操作
            return HttpResponse(u'注册成功,请返回<a href="/auth/login">登录</a>')
        else:
            return render(request,'sign_up.html',locals())

#登录功能
class Login(View):
    def get(self,request):
        return render(request,'sign_in.html')

    def post(self,request):
        userName = request.POST.get('userName')
        userPassword = request.POST.get('userPassword')
        print(userName,userPassword)
        #验证用户,它接受两个参数,用户名 username 和 密码 password,认证只有是否激活跟用户名密码。
        user = authenticate(username = userName,password = userPassword)
        #并在密码对给出的用户名合法的情况下返回一个 User 对象。 如果密码不合法,authenticate()返回None。
        if user is not None:
            if user.is_active:
                #登录,向session中添加SESSION_KEY, 便于对用户进行跟踪:
                login(request,user)
                # 如果调用login方法以后request对象就会激活user属性,这个属性不管登录或者未登录都是存在
                return redirect(reverse('index'))
            else:
                message = '该用户未激活'
        else:
            message = '用户名或密码错误'

        return render(request,'sign_in.html',locals())

class Index(LoginRequiredMixin,View): #登录验证,主要用于直接输入地址情况。
    # 如果需要指定单独的跳转,则该类中指定login_url属性,如果需要指定全局的,则在settings中指定LOGIN_URL属性
    login_url = '/auth/login/'#没有登录则指定跳转
    def get(self,request):
        print(request.COOKIES)
        return render(request, 'index.html', locals())

# 注销功能
class Logout(View):
    def get(self,request):
        #注销用户,这个方法就会把我们的session跟cookie清理掉
        logout(request)
        message = u'注销成功'
        return render(request,'sign_in.html',locals())

# 重置密码
class ResetPassword(View):
    def get(self,request):
        return render(request,'resetpassword.html')

    def post(self,request):
        form = ResetPasswordForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['userName']
            userPassword = form.cleaned_data['userPassword']
            user = User.objects.get(username=username)
            print(user)
            if user:
                user.set_password(userPassword)
                user.save()
                return render(request, 'sign_in.html', locals())

        return render(request, 'resetpassword.html', locals())

# 展示主页
class Home(PermissionRequiredMixin,View):
    #单个权限
    permission_required = 'auth_study.view_product'
    #多个权限,要同时具有,且的关系,元祖或列表都可
    # permission_required = ['auth_study.view_products','auth_study.update_products']
    #上面个相当于全局的,只有满足了上面权限中的一个就可以进入下面的get了,否则就跳转到setting配置的LOGIN_URL去了
    def get(self,request):
        print('get...',request.user.user_permissions.all())
        #has_perm(perm)： 判断用户是否有某个权限。
        #has_perms(perm_list)： 判断用户是否有权限列表中的某个列表。
        if request.user.has_perm('auth_study.view_product'):
            products = Product.objects.all()
            if request.user.has_perm('auth_study.add_product'):
                canAdd = True   #判断有没有添加权限,然后置为True,页面去判断是否显示相关
        else:
            message = '没有查看商品的权限'
        return render(request,'home.html',locals())

# 添加商品
class AddProduct(View):
    def get(self,request):
        return render(request,'addProduct.html')

    def post(self,request):
        print('post')
        name = request.POST.get('name')
        price = request.POST.get('price')
        detail = request.POST.get('detail')
        print(name,price,detail)
        product = Product.objects.create(name = name,price = price,detail= detail)
        if product:
            return HttpResponse('添加商品成功<a href="/auth/home/">返回首页</a>')

        return HttpResponse('添加商品失败<a href="/auth/home/">返回首页</a>')

