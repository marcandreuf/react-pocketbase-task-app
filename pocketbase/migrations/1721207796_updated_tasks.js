/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h8qb3t6iqpc8ma8")

  collection.listRule = "user.id=@request.auth.id"
  collection.viewRule = "user.id=@request.auth.id"
  collection.createRule = "user.id=@request.auth.id"
  collection.updateRule = "user.id=@request.auth.id"
  collection.deleteRule = "user.id=@request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h8qb3t6iqpc8ma8")

  collection.listRule = ""
  collection.viewRule = ""
  collection.createRule = ""
  collection.updateRule = ""
  collection.deleteRule = ""

  return dao.saveCollection(collection)
})
