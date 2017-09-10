<script type="text/html" id="todo-view">
  <div class="list-item view">
    <input class="toggle" type="checkbox" name="list-item-checkbox" <%= done ? 'checked="checked"' : '' %> />
    <label><%- title %></label>
    <a class="destroy" href="javascript:void(0)" rel="not-follow"></a>
  </div>
  <input class="list-item-edit edit" type="text" name="list-item" value="<%- title %>" />
</script>