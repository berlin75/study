from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from app import db, login
from hashlib import md5

class User(UserMixin, db.Model):  # UserMixin提供了对flask_login用户类所有这些方法的默认实现
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))

    about_me = db.Column(db.String(140))
    last_seen = db.Column(db.DateTime, default=datetime.utcnow)

    # back是反向引用,User和Post是一对多的关系，backref是表示在Post中新建一个属性author，关联的是Post中的user_id外键关联的User对象。
    #lazy属性常用的值的含义，select就是访问到属性的时候，就会全部加载该属性的数据;joined则是在对关联的两个表进行join操作，从而获取到所有相关的对象;dynamic则不一样，在访问属性的时候，并没有在内存中加载数据，而是返回一个query对象, 需要执行相应方法才可以获取对象，比如.all()
    posts = db.relationship('Post', backref='author', lazy='dynamic')

    def __repr__(self):
        return '<用户{}>'.format(self.username)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    # 用户头像使用的是Gravatar来提供，使用这个网站生成头像是https:// s.gravatar.com/avatar/(hash) 这种格式，会把邮箱地址用md5加密拼接在后面。如果感兴趣可以去上传一个玩一玩，如果不想去的话可以直接使用我提供的。https://www.gravatar.com/avatar/6b541a0a667f5558208aad7309c22936，默认像素是80x80，但是你可以在这个地址后面添加参数?s=128，会变成128x128像素，当然你可以尝试改成更大的数字也可以
    def avatar(self, size):
        return 'https://www.gravatar.com/avatar/6b541a0a667f5558208aad7309c22936?s={}'.format(size)
        digest = md5(self.email.lower().encode('utf-8')).hexdigest()
        return 'https://www.gravatar.com/avatar{}?d=identicon$s={}'.format(digest, size)

class Post(db.Model):
    __tablename__ = 'post'

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(140))
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __repr__(self):
        return '<post{}>'.format(self.body)

@login.user_loader
def load_user(id):
    return User.query.get(int(id))

'''
# 数据库初始化
(env) E:\wamp64\www\study\python\flaskapp\flask>flask db init

# 创建数据库的管理工具
(env) E:\wamp64\www\study\python\flaskapp\flask>flask db migrate -m 'users_table'

# 生成新的数据库关系：
(env) E:\wamp64\www\study\python\flaskapp\flask>flask db migrate -m 'posts_table'

# 提交到数据库中,创建数据库的中的表
(env) E:\wamp64\www\study\python\flaskapp\flask>flask db upgrade

(env) E:\wamp64\www\study\python\flaskapp\flask>python
Python 3.7.4 (tags/v3.7.4:e09359112e, Jul  8 2019, 20:34:20) [MSC v.1916 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license" for more information.
>>> from app import db
>>> from app.models import User, Post
>>> u = User(username='admin', email='admin@example.com')
>>> db.session.add(u)
>>> db.session.commit()
>>> u = User(username='berlin', email='berlin@example.com')
>>> db.session.add(u)
>>> db.session.commit()
>>> users
[<用户admin>, <用户berlin>]
>>> u = User.query.get(2)
>>> u
<用户berlin>
>>> p = Post(body='第一次提交数据', author = u)
>>> db.session.add(p)
>>> db.session.commit()
>>> p = Post(body='第二次提交数据', author = u)
>>> db.session.add(p)
>>> db.session.commit()
>>> posts = u.posts.all()
>>> posts
[<post第一次提交数据>, <post第二次提交数据>]
>>> u = User.query.get(1)
>>> u
<用户admin>
>>> u.posts.all()
[]
>>> posts = Post.query.all()
>>> posts
[<post第一次提交数据>, <post第二次提交数据>]
>>> User.query.order_by(User.username.desc()).all()
[<用户berlin>, <用户admin>]
>>> users = User.query.all()
>>> for u in users: db.session.delete(u)
...
>>> posts = Post.query.all()
>>> for p in posts: db.session.delete(p)
>>> exit()

(env) E:\wamp64\www\study\python\flaskapp\flask>flask shell
Python 3.7.4 (tags/v3.7.4:e09359112e, Jul  8 2019, 20:34:20) [MSC v.1916 64 bit (AMD64)] on win32
App: app [production]
Instance: E:\wamp64\www\study\python\flaskapp\flask\instance
>>> from werkzeug.security import generate_password_hash
>>> hash = generate_password_hash('admin')
>>> hash
'pbkdf2:sha256:150000$HPV6CkyZ$3a77030b1b0bf60b49f76d9b47b5ebf458842aef0061afae42d44d47ba8d94ca'
>>> from werkzeug.security import check_password_hash
>>> check_password_hash(hash, 'haha')
False
>>> check_password_hash(hash, 'admin')
True

>>> u = User(username='heiying', email='heiying@example.com')
>>> u.set_password('heiying')
>>> u.check_password('heiying')
True

'''