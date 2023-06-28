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
		edit_id_scope := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "asxnxvat",
			"name": "id_scope",
			"type": "relation",
			"required": true,
			"unique": false,
			"options": {
				"collectionId": "kxyhj0q39kzj572",
				"cascadeDelete": false,
				"minSelect": null,
				"maxSelect": 1,
				"displayFields": []
			}
		}`), edit_id_scope)
		collection.Schema.AddField(edit_id_scope)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("lqgwrlzc9viduru")
		if err != nil {
			return err
		}

		// update
		edit_id_scope := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "asxnxvat",
			"name": "id_scope",
			"type": "relation",
			"required": false,
			"unique": false,
			"options": {
				"collectionId": "kxyhj0q39kzj572",
				"cascadeDelete": false,
				"minSelect": null,
				"maxSelect": 1,
				"displayFields": []
			}
		}`), edit_id_scope)
		collection.Schema.AddField(edit_id_scope)

		return dao.SaveCollection(collection)
	})
}
