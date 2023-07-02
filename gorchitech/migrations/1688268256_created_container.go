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
			"created": "2023-07-02 03:24:15.988Z",
			"updated": "2023-07-02 03:24:15.988Z",
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
					"required": true,
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
					"required": true,
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
					"required": true,
					"unique": false,
					"options": {
						"collectionId": "yepazfdcyl39t7n",
						"cascadeDelete": false,
						"minSelect": null,
						"maxSelect": 1,
						"displayFields": []
					}
				},
				{
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
				},
				{
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
				},
				{
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
				},
				{
					"system": false,
					"id": "yf3wqtjg",
					"name": "environment",
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
					"id": "a9uud874",
					"name": "command",
					"type": "text",
					"required": false,
					"unique": false,
					"options": {
						"min": null,
						"max": null,
						"pattern": ""
					}
				}
			],
			"indexes": [
				"CREATE INDEX ` + "`" + `idx_Gputuo3` + "`" + ` ON ` + "`" + `container` + "`" + ` (` + "`" + `containerId` + "`" + `)"
			],
			"listRule": "",
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
