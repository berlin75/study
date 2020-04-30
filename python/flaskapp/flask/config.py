import os
BASE_DIR = os.path.abspath(os.path.dirname(__file__))

class Config():
    SECRET_KEY = 'development'
    # 格式为mysql+pymysql://数据库用户名:密码@数据库地址:端口号/数据库的名字?数据库格式
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://admin@127.0.0.1:3306/python?charset=utf8'
    SQLALCHEMY_TRACK_MODIFICATIONS = False