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
			"id": "yepazfdcyl39t7n",
			"created": "2023-05-08 03:13:30.453Z",
			"updated": "2023-05-08 03:13:30.453Z",
			"name": "network",
			"type": "base",
			"system": false,
			"schema": [
				{
					"system": false,
					"id": "cnworogq",
					"name": "name",
					"type": "text",
					"required": true,
					"unique": false,
					"options": {
						"min": 5,
						"max": 25,
						"pattern": ""
					}
				},
				{
					"system": false,
					"id": "jy2zmviy",
					"name": "label",
					"type": "text",
					"required": true,
					"unique": false,
					"options": {
						"min": null,
						"max": null,
						"pattern": ""
					}
				},
				{
					"system": false,
					"id": "gj40tmmq",
					"name": "alias",
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
					"id": "z02mg83j",
					"name": "subnet",
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
					"id": "dkgt2o6w",
					"name": "gateway",
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
				},
				{
					"system": false,
					"id": "7kp2f9zf",
					"name": "networkId",
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
					"id": "7k12ngwt",
					"name": "deleted",
					"type": "date",
					"required": false,
					"unique": false,
					"options": {
						"min": "",
						"max": ""
					}
				}
			],
			"indexes": [
				"CREATE INDEX ` + "`" + `idx_544Knld` + "`" + ` ON ` + "`" + `network` + "`" + ` (` + "`" + `networkId` + "`" + `)"
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

		collection, err := dao.FindCollectionByNameOrId("yepazfdcyl39t7n")
		if err != nil {
			return err
		}

		return dao.DeleteCollection(collection)
	})
}
