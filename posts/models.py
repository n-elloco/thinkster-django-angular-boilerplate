from django.db import models


class Post(models.Model):
    author = models.ForeignKey('authentication.Account')
    content = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return self.content

    class Meta:
        db_table = 'post'
