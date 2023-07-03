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

		// update
		edit_id_network := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "erflaqkl",
			"name": "id_network",
			"type": "relation",
			"required": false,
			"unique": false,
			"options": {
				"collectionId": "yepazfdcyl39t7n",
				"cascadeDelete": false,
				"minSelect": null,
				"maxSelect": 1,
				"displayFields": []
			}
		}`), edit_id_network)
		collection.Schema.AddField(edit_id_network)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("lqgwrlzc9viduru")
		if err != nil {
			return err
		}

		// update
		edit_id_network := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "erflaqkl",
			"name": "id_network",
			"type": "relation",
			"required": true,
			"unique": false,
			"options": {
				"collectionId": "yepazfdcyl39t7n",
				"cascadeDelete": false,
				"minSelect": null,
				"maxSelect": 1,
				"displayFields": []
			}
		}`), edit_id_network)
		collection.Schema.AddField(edit_id_network)

		return dao.SaveCollection(collection)
	})
}
