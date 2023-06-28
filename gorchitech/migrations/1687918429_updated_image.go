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
		collection.Schema.RemoveField("gw1renbo")

		// add
		new_size := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "dnmc9cuj",
			"name": "size",
			"type": "text",
			"required": false,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"pattern": ""
			}
		}`), new_size)
		collection.Schema.AddField(new_size)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("0crqzq20h6c0rze")
		if err != nil {
			return err
		}

		// add
		del_size := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "gw1renbo",
			"name": "size",
			"type": "number",
			"required": false,
			"unique": false,
			"options": {
				"min": null,
				"max": null
			}
		}`), del_size)
		collection.Schema.AddField(del_size)

		// remove
		collection.Schema.RemoveField("dnmc9cuj")

		return dao.SaveCollection(collection)
	})
}
