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
			"id": "lqgwrlzc9viduru",
			"created": "2023-05-08 03:13:30.454Z",
			"updated": "2023-05-08 03:13:30.454Z",
			"name": "container",
			"type": "base",
			"system": false,
			"schema": [
				{
					"system": false,
					"id": "zqlqyxkf",
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
				},
				{
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
				},
				{
					"system": false,
					"id": "vbhtyvwq",
					"name": "storage",
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
					"id": "fl6ljxuq",
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
					"id": "5vhovwum",
					"name": "ip",
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
					"id": "fpw3ddpt",
					"name": "port",
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
				},
				{
					"system": false,
					"id": "uziyjksh",
					"name": "containerId",
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
					"id": "ublh5aju",
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
				},
				{
					"system": false,
					"id": "ftmnydik",
					"name": "id_image",
					"type": "relation",
					"required": false,
					"unique": false,
					"options": {
						"collectionId": "0crqzq20h6c0rze",
						"cascadeDelete": false,
						"minSelect": null,
						"maxSelect": 1,
						"displayFields": []
					}
				},
				{
					"system": false,
					"id": "qktc2x0p",
					"name": "id_volumen",
					"type": "relation",
					"required": false,
					"unique": false,
					"options": {
						"collectionId": "eyd2u1v1hmjrr4x",
						"cascadeDelete": false,
						"minSelect": null,
						"maxSelect": 1,
						"displayFields": []
					}
				},
				{
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
				}
			],
			"indexes": [
				"CREATE INDEX ` + "`" + `idx_Gputuo3` + "`" + ` ON ` + "`" + `container` + "`" + ` (` + "`" + `containerId` + "`" + `)"
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

		collection, err := dao.FindCollectionByNameOrId("lqgwrlzc9viduru")
		if err != nil {
			return err
		}

		return dao.DeleteCollection(collection)
	})
}
