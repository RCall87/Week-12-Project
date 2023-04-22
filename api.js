const BASE_URL = 'https://6444048f466f7c2b4b5fbc96.mockapi.io/api/v1/entities';

function getAllEntities() {
  return fetch(`${BASE_URL}`)
    .then(res => res.json());
}

function addEntity(entity) {
  return fetch(`${BASE_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(entity)
  })
    .then(res => res.json());
}

function updateEntity(entity) {
  return fetch(`${BASE_URL}/${entity.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(entity)
  })
    .then(res => res.json());
}

function deleteEntity(entityId) {
  return fetch(`${BASE_URL}/${entityId}`, {
    method: 'DELETE'
  })
    .then(res => res.json());
}
