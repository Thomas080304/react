<script type="text/html" id="stats-template">
  <h3 class="left-todo todo-count"><b><%= remaining %></b> <%= remaining == 1 ? 'item' : 'items' %> left</h3>
  <% if(done){ %>
    <a id="clear-completed" class="clear-complete" href="javascript:void(0)" rel="not-follow">
      Clear <%= done %> completed <%= done == 1 ? 'item' : 'items' %>
    </a>
  <% } %>
</script>