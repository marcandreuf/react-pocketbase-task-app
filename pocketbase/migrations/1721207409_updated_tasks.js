/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h8qb3t6iqpc8ma8")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sphdsduu",
    "name": "completed",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h8qb3t6iqpc8ma8")

  // remove
  collection.schema.removeField("sphdsduu")

  return dao.saveCollection(collection)
})
