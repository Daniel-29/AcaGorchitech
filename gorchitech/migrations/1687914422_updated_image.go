package migrations

import (
	"encoding/json"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/pocketbase/pocketbase/models/schema"
)

func init() {
	m.Register(func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("0crqzq20h6c0rze")
		if err != nil {
			return err
		}

		// remove
		collection.Schema.RemoveField("juum6dea")

		// remove
		collection.Schema.RemoveField("goyxgdve")

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("0crqzq20h6c0rze")
		if err != nil {
			return err
		}

		// add
		del_label := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "juum6dea",
			"name": "label",
			"type": "text",
			"required": false,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"pattern": ""
			}
		}`), del_label)
		collection.Schema.AddField(del_label)

		// add
		del_repository := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "goyxgdve",
			"name": "repository",
			"type": "text",
			"required": false,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"pattern": ""
			}
		}`), del_repository)
		collection.Schema.AddField(del_repository)

		return dao.SaveCollection(collection)
	})
}
