$(document).ready(function() {
    loadEntities();
  
    $('#add-entity-button').click(function() {
      $('#add-entity-form').show();
      $('#name').val('');
      $('#description').val('');
    });
  
    $('#cancel-add-entity').click(function() {
      $('#add-entity-form').hide();
    });
  
    $('#cancel-edit-entity').click(function() {
      $('#edit-entity-form').hide();
    });
  
    $('#add-entity-form').submit(function(event) {
      event.preventDefault();
      var name = $('#name').val();
      var description = $('#description').val();
      addEntity(name, description);
    });
  
    $('#edit-entity-form').submit(function(event) {
      event.preventDefault();
      var id = $('#edit-entity-id').val();
      var name = $('#edit-name').val();
      var description = $('#edit-description').val();
      updateEntity(id, name, description);
    });
  });
  
  function loadEntities() {
    $.ajax({
      url: 'https://6444048f466f7c2b4b5fbc96.mockapi.io/api/v1/entities',
      type: 'GET',
      dataType: 'json',
      success: function(entities) {
        displayEntities(entities);
      }
    });
  }
  
  function displayEntities(entities) {
    var entityList = $('#entity-list');
    entityList.empty();
    for (var i = 0; i < entities.length; i++) {
      var entity = entities[i];
      var row = $('<tr>');
      var nameColumn = $('<td>').text(entity.name);
      var descriptionColumn = $('<td>').text(entity.description);
      var actionsColumn = $('<td>');
      var editButton = $('<button>').text('Edit').addClass('btn btn-sm btn-primary mr-2').click(editButtonClickHandler(entity));
      var deleteButton = $('<button>').text('Delete').addClass('btn btn-sm btn-danger').click(deleteButtonClickHandler(entity.id));
      actionsColumn.append(editButton);
      actionsColumn.append(deleteButton);
      row.append(nameColumn);
      row.append(descriptionColumn);
      row.append(actionsColumn);
      entityList.append(row);
    }
  }
  
  function addEntity(name, description) {
    $.ajax({
      url: 'https://6444048f466f7c2b4b5fbc96.mockapi.io/api/v1/entities',
      type: 'POST',
      dataType: 'json',
      data: {
        name: name,
        description: description
      },
      success: function(entity) {
        $('#add-entity-form').hide();
        loadEntities();
      }
    });
  }
  
  function editButtonClickHandler(entity) {
    return function() {
      $('#edit-entity-id').val(entity.id);
      $('#edit-name').val(entity.name);
      $('#edit-description').val(entity.description);
      $('#edit-entity-form').show();
    };
  }
  
  function updateEntity(id, name, description) {
    $.ajax({
      url: `https://6444048f466f7c2b4b5fbc96.mockapi.io/api/v1/entities/${id}`,
      type: 'PUT',
      dataType: 'json',
      data: {
        name: name,
        description: description
      },
      success: function(entity) {
        $('#edit-entity-form').hide();
        loadEntities();
      }
    });
  }
  
  function deleteButtonClickHandler(id) {
    return function() {
      $.ajax({
        url: `https://6444048f466f7c2b4b5fbc96.mockapi.io/api/v1/entities/${id}`,
        type: 'DELETE',
        dataType: 'json',
        success: function(entity) {
          loadEntities();
        }
      });
    };
  }
    