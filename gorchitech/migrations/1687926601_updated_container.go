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

		collection, err := dao.FindCollectionByNameOrId("lqgwrlzc9viduru")
		if err != nil {
			return err
		}

		// remove
		collection.Schema.RemoveField("bgpz3n1z")

		// add
		new_status := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "l7wfpcis",
			"name": "status",
			"type": "select",
			"required": false,
			"unique": false,
			"options": {
				"maxSelect": 1,
				"values": [
					"runnig",
					"stoped",
					"deleted",
					"restarts"
				]
			}
		}`), new_status)
		collection.Schema.AddField(new_status)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("lqgwrlzc9viduru")
		if err != nil {
			return err
		}

		// add
		del_status := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "bgpz3n1z",
			"name": "status",
			"type": "text",
			"required": false,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"pattern": ""
			}
		}`), del_status)
		collection.Schema.AddField(del_status)

		// remove
		collection.Schema.RemoveField("l7wfpcis")

		return dao.SaveCollection(collection)
	})
}
