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
		collection.Schema.RemoveField("5x4ltush")

		// remove
		collection.Schema.RemoveField("k4gm8slo")

		// add
		new_memory := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "cdoj1rwu",
			"name": "memory",
			"type": "number",
			"required": true,
			"unique": false,
			"options": {
				"min": 125,
				"max": 1024
			}
		}`), new_memory)
		collection.Schema.AddField(new_memory)

		// add
		new_cpu := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "qkpqwnl3",
			"name": "cpu",
			"type": "number",
			"required": true,
			"unique": false,
			"options": {
				"min": 1,
				"max": 9
			}
		}`), new_cpu)
		collection.Schema.AddField(new_cpu)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("lqgwrlzc9viduru")
		if err != nil {
			return err
		}

		// add
		del_cpu := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "5x4ltush",
			"name": "cpu",
			"type": "text",
			"required": false,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"pattern": ""
			}
		}`), del_cpu)
		collection.Schema.AddField(del_cpu)

		// add
		del_memory := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "k4gm8slo",
			"name": "memory",
			"type": "text",
			"required": false,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"pattern": ""
			}
		}`), del_memory)
		collection.Schema.AddField(del_memory)

		// remove
		collection.Schema.RemoveField("cdoj1rwu")

		// remove
		collection.Schema.RemoveField("qkpqwnl3")

		return dao.SaveCollection(collection)
	})
}
