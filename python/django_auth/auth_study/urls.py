from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.Register.as_view(),name='register'),
    path('login/',views.Login.as_view(),name='login'),
    path('index/',views.Index.as_view(),name='index'),
    path('logout/',views.Logout.as_view(),name='logout'),
    path('resetpassword/',views.ResetPassword.as_view(),name='resetpassword'),
    path('home/', views.Home.as_view(), name='home'),
    path('addProduct/', views.AddProduct.as_view(), name='addProduct'),
]