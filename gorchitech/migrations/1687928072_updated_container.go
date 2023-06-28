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

		// add
		new_label := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "jkag8ezx",
			"name": "label",
			"type": "text",
			"required": false,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"pattern": ""
			}
		}`), new_label)
		collection.Schema.AddField(new_label)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("lqgwrlzc9viduru")
		if err != nil {
			return err
		}

		// remove
		collection.Schema.RemoveField("jkag8ezx")

		return dao.SaveCollection(collection)
	})
}
