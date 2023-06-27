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

		collection, err := dao.FindCollectionByNameOrId("yepazfdcyl39t7n")
		if err != nil {
			return err
		}

		// remove
		collection.Schema.RemoveField("sk2ydgg1")

		// add
		new_driver := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "8qsnnxob",
			"name": "driver",
			"type": "select",
			"required": false,
			"unique": false,
			"options": {
				"maxSelect": 1,
				"values": [
					"bridge",
					"host",
					"overlay",
					"macvlan",
					"ipvlan"
				]
			}
		}`), new_driver)
		collection.Schema.AddField(new_driver)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("yepazfdcyl39t7n")
		if err != nil {
			return err
		}

		// add
		del_driver := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "sk2ydgg1",
			"name": "driver",
			"type": "text",
			"required": false,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"pattern": ""
			}
		}`), del_driver)
		collection.Schema.AddField(del_driver)

		// remove
		collection.Schema.RemoveField("8qsnnxob")

		return dao.SaveCollection(collection)
	})
}
