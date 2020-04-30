from django.apps import AppConfig

class PollsConfig(AppConfig):
    name = 'polls'

    def ready(self):
        super().ready()
        from . import signals