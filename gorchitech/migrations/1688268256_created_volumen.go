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
			"id": "eyd2u1v1hmjrr4x",
			"created": "2023-07-02 03:24:15.989Z",
			"updated": "2023-07-02 03:24:15.989Z",
			"name": "volumen",
			"type": "base",
			"system": false,
			"schema": [
				{
					"system": false,
					"id": "4yapglcb",
					"name": "name",
					"type": "text",
					"required": false,
					"unique": false,
					"options": {
						"min": null,
						"max": null,
						"pattern": ""
					}
				},
				{
					"system": false,
					"id": "vntrdcsh",
					"name": "mount",
					"type": "text",
					"required": false,
					"unique": false,
					"options": {
						"min": null,
						"max": null,
						"pattern": ""
					}
				},
				{
					"system": false,
					"id": "uzqvtfog",
					"name": "label",
					"type": "text",
					"required": false,
					"unique": false,
					"options": {
						"min": null,
						"max": null,
						"pattern": ""
					}
				},
				{
					"system": false,
					"id": "wrukg8gq",
					"name": "volumenId",
					"type": "text",
					"required": false,
					"unique": false,
					"options": {
						"min": null,
						"max": null,
						"pattern": ""
					}
				},
				{
					"system": false,
					"id": "oifucmwg",
					"name": "deleted",
					"type": "date",
					"required": false,
					"unique": false,
					"options": {
						"min": "",
						"max": ""
					}
				},
				{
					"system": false,
					"id": "v0vnqyvw",
					"name": "driver",
					"type": "select",
					"required": false,
					"unique": false,
					"options": {
						"maxSelect": 1,
						"values": [
							"local",
							"nfs"
						]
					}
				}
			],
			"indexes": [
				"CREATE INDEX ` + "`" + `idx_SjmddmC` + "`" + ` ON ` + "`" + `volumen` + "`" + ` (` + "`" + `volumenId` + "`" + `)"
			],
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

		collection, err := dao.FindCollectionByNameOrId("eyd2u1v1hmjrr4x")
		if err != nil {
			return err
		}

		return dao.DeleteCollection(collection)
	})
}
