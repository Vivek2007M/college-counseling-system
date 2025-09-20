from django.core.cache import cache
from django.db import connection

class SQLQueryCollectorMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        # Only collect queries for authenticated users (optional)
        queries = connection.queries
        cache.set('all_sql_queries', queries, timeout=60)  # Store for 1 minute
        return response