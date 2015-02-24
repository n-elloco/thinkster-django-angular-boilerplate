# coding:utf-8
from rest_framework import serializers

from authentication.serializers import AccountSerializer

from .models import Post


class PostSerializer(serializers.ModelSerializer):
    author = AccountSerializer(read_only=True, required=False)

    class Meta:
        model = Post

        fields = ('id', 'author', 'content', 'created', 'modified')
        read_only_fields = ('id', 'created', 'modified')

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(PostSerializer, self).get_validation_exclusions()
        return exclusions + ['author']
