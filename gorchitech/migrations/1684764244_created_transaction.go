package migrations

import (
	"encoding/json"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/pocketbase/pocketbase/models"
)

func init() {
	m.Register(func(db dbx.Builder) error {
		jsonData := `{
			"id": "14rev4w2b9u48qe",
			"created": "2023-05-22 14:04:04.735Z",
			"updated": "2023-05-22 14:04:04.735Z",
			"name": "transaction",
			"type": "base",
			"system": false,
			"schema": [
				{
					"system": false,
					"id": "kzmi2qey",
					"name": "constainerId",
					"type": "relation",
					"required": false,
					"unique": false,
					"options": {
						"collectionId": "lqgwrlzc9viduru",
						"cascadeDelete": false,
						"minSelect": null,
						"maxSelect": 1,
						"displayFields": []
					}
				},
				{
					"system": false,
					"id": "qwgnuizk",
					"name": "userId",
					"type": "relation",
					"required": false,
					"unique": false,
					"options": {
						"collectionId": "_pb_users_auth_",
						"cascadeDelete": false,
						"minSelect": null,
						"maxSelect": 1,
						"displayFields": []
					}
				},
				{
					"system": false,
					"id": "fpb1swty",
					"name": "daleted",
					"type": "date",
					"required": false,
					"unique": false,
					"options": {
						"min": "",
						"max": ""
					}
				}
			],
			"indexes": [],
			"listRule": null,
			"viewRule": null,
			"createRule": null,
			"updateRule": null,
			"deleteRule": null,
			"options": {}
		}`

		collection := &models.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return daos.New(db).SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("14rev4w2b9u48qe")
		if err != nil {
			return err
		}

		return dao.DeleteCollection(collection)
	})
}
