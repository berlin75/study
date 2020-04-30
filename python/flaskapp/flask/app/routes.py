from app import app, forms, db
from app.models import User
from flask import render_template, redirect, flash, url_for, request
from werkzeug.urls import url_parse
from flask_login import current_user, login_user, logout_user, login_required
from datetime import datetime

@app.route('/')
@app.route('/index')
# @login_required # 登录限制,访问首页会自动跳转至登录页,地址栏变成http:// localhost:5000/login?next=%2F
def index():
    posts = [
      {'author': {'username': 'Jack'}, 'body': '这是模板模块中的循环例子～1'},
      {'author': {'username': 'Jaen'}, 'body': '这是模板模块中的循环例子～2'},
    ]
    return render_template('index.html', title='home page', posts=posts)

@app.route('/login', methods=['GET', 'POST'])
def login():
    # 验证当前用户是否验证
    if current_user.is_authenticated:
        return redirect(url_for('index'))

    form = forms.LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username = form.username.data).first()
        if user is None or not user.check_password(form.password.data):
            flash('用户名或密码错误')
            return redirect(url_for('login'))
        login_user(user, remember = form.remember.data)
        next_page = request.args.get('next')
        if not next_page or url_parse(next_page).netloc != '':  # 如果next_page记录的地址不存在那么就返回首页
            next_page = url_for('index')
        return redirect(next_page)                     # 登录后要么重定向至跳转前的页面，要么跳转至首页
    return render_template('login.html', title='登录', form=form)

@app.before_request
def before_request():
    if current_user.is_authenticated:
        current_user.last_seen = datetime.utcnow()
        db.session.commit()

@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('index'))

@app.route('/register', methods=['GET', 'POST'])
def register():
    # 验证当前用户是否验证
    if current_user.is_authenticated:
        return redirect(url_for('index'))

    form = forms.RegistrationForm()
    if form.validate_on_submit():
        user = User(username = form.username.data, email = form.email.data)
        user.set_password(form.password.data)
        db.session.add(user)
        db.session.commit()
        flash('恭喜您成为我们网站的新用户')
        return redirect(url_for('login'))
    return render_template('register.html', title='注册', form = form)

@app.route('/user/<username>')
@login_required
def user(username):
    user = User.query.filter_by(username=username).first_or_404()
    posts = [
        {'author': user, 'body': '测试post#1'},
        {'author': user, 'body': '测试post#2'},
    ]
    return render_template('user.html', user=user, posts=posts)

@app.route('/edit_profile', methods=['GET', 'POST'])
@login_required
def edit_profile():
    form = forms.EditProfileForm()
    if form.validate_on_submit():
        current_user.username = form.username.data
        current_user.about_me = form.about_me.data
        db.session.commit()
        flash('您的提交已变更')
        return redirect(url_for('edit_profile'))
    elif request.method == 'GET':
        form.username.data = current_user.username
        form.about_me.data = current_user.about_me
    return render_template('edit_profile.html', title="个人资料编辑", form=form)