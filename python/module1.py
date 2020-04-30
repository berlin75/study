'''
为模块编写说明文档,可通过模块的 __doc__ 属性来访问文档
这是编写的第一个模块，该模块包含以下内容：
my_book：字符串变量
say_hi：简单的函数
User：代表用户的类
'''

print('这是module 1')
my_book = 'Python入门教程'

def say_hi(user):
    print('%s,您好，欢迎学习Python' % user)

class User:
    '''class User: __init__, walk, __repr__'''
    def __init__(self, name):
        self.name = name
    def walk(self):
        print('%s正在慢慢地走路' % self.name)
    def __repr__(self):
        return 'User[name=%s]' % self.name

'''
为模块编写测试代码
当模块编写完成之后，可能还需要为模块编写一些测试代码，用于测试模块中的每一个程序单元是否都能正常运行
下面代码为module1定义了三个函数，分别用于测试模块中的变量、函数和类，不过这三个函数并没有得到调用的机会。因此如果使用python命令来运行该模块，程序并不会运行它们
对于实际开发的项目，对每个函数、类可能都需要使用更多的测试用例进行测试，这样才能达到各种覆盖效果,比如语句覆盖、条件覆盖等
如果只是简单地调用上面的测试程序则会导致一个问题：当其他程序每次导入该模块时这三个测试函数都会自动运行，这显然不是期望看到的结果。此时希望实现的效果是，如果直接使用python命令运行该模块（相当于测试），程序应该执行该模块的测试函数；如果是其他程序导入该模块，程序不应该执行该模块的测试函数
此时可借助于所有模块内置的__name__变量进行区分，如果直接使用python命令来运行一个模块，name变量的值为__main__；如果该模块被导入其他程序中，__name__ 变量的值就是模块名。因此如果希望测试函数只有在使用python命令直接运行时才执行，则可在调用测试函数时增加判断，只有当 __name__ 属性为 __main__ 时才调用测试函数
'''

# ===以下部分是测试代码===
def test_my_book ():
    print(my_book)
def test_say_hi():
    say_hi('孙悟空')
    say_hi(User('Charlie'))
def test_User():
    u = User('白骨精')
    u.walk()
    print(u)

# 当__name__为'__main__'即直接使用python运行该模块时执行如下代码
if __name__ == '__main__':
    test_my_book()
    test_say_hi()
    test_User()