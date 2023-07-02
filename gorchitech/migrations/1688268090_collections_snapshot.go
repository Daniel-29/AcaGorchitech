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
		jsonData := `[
			{
				"id": "yepazfdcyl39t7n",
				"created": "2023-05-08 03:13:30.453Z",
				"updated": "2023-07-02 03:21:30.624Z",
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
					},
					{
						"system": false,
						"id": "8qsnnxob",
						"name": "driver",
						"type": "select",
						"required": false,
						"unique": false,
						"options": {
							"maxSelect": 1,
							"values": [
								"bridge",
								"host",
								"overlay",
								"macvlan",
								"ipvlan"
							]
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
			},
			{
				"id": "lqgwrlzc9viduru",
				"created": "2023-05-08 03:13:30.454Z",
				"updated": "2023-07-02 03:21:30.664Z",
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
				"listRule": null,
				"viewRule": null,
				"createRule": null,
				"updateRule": null,
				"deleteRule": null,
				"options": {}
			},
			{
				"id": "0crqzq20h6c0rze",
				"created": "2023-05-08 03:13:30.454Z",
				"updated": "2023-07-02 03:21:30.633Z",
				"name": "image",
				"type": "base",
				"system": false,
				"schema": [
					{
						"system": false,
						"id": "i2lif4no",
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
						"id": "nqafwlo9",
						"name": "date",
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
						"id": "8nedqyny",
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
						"id": "y97qvirv",
						"name": "imageId",
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
						"id": "dnmc9cuj",
						"name": "size",
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
					"CREATE INDEX ` + "`" + `idx_QxCrCrg` + "`" + ` ON ` + "`" + `image` + "`" + ` (` + "`" + `imageId` + "`" + `)"
				],
				"listRule": null,
				"viewRule": null,
				"createRule": null,
				"updateRule": null,
				"deleteRule": null,
				"options": {}
			},
			{
				"id": "kxyhj0q39kzj572",
				"created": "2023-05-08 03:13:30.454Z",
				"updated": "2023-05-08 03:13:30.454Z",
				"name": "scope",
				"type": "base",
				"system": false,
				"schema": [
					{
						"system": false,
						"id": "x8s4izdi",
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
						"id": "isgm9yku",
						"name": "description",
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
						"id": "zntbqx7h",
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
				"indexes": [],
				"listRule": null,
				"viewRule": null,
				"createRule": null,
				"updateRule": null,
				"deleteRule": null,
				"options": {}
			},
			{
				"id": "eyd2u1v1hmjrr4x",
				"created": "2023-05-08 03:13:30.454Z",
				"updated": "2023-05-08 03:13:30.454Z",
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
						"id": "m9lfbvse",
						"name": "type",
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
						"id": "d6aepifx",
						"name": "source",
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
						"id": "tvus7a9w",
						"name": "target",
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
						"id": "eb3uhc2r",
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
						"id": "nirqgr3w",
						"name": "size",
						"type": "number",
						"required": false,
						"unique": false,
						"options": {
							"min": null,
							"max": null
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
			},
			{
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
			},
			{
				"id": "_pb_users_auth_",
				"created": "2023-07-02 03:21:30.617Z",
				"updated": "2023-07-02 03:21:30.618Z",
				"name": "users",
				"type": "auth",
				"system": false,
				"schema": [
					{
						"system": false,
						"id": "users_name",
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
						"id": "users_avatar",
						"name": "avatar",
						"type": "file",
						"required": false,
						"unique": false,
						"options": {
							"maxSelect": 1,
							"maxSize": 5242880,
							"mimeTypes": [
								"image/jpeg",
								"image/png",
								"image/svg+xml",
								"image/gif",
								"image/webp"
							],
							"thumbs": null,
							"protected": false
						}
					}
				],
				"indexes": [],
				"listRule": "id = @request.auth.id",
				"viewRule": "id = @request.auth.id",
				"createRule": "",
				"updateRule": "id = @request.auth.id",
				"deleteRule": "id = @request.auth.id",
				"options": {
					"allowEmailAuth": true,
					"allowOAuth2Auth": true,
					"allowUsernameAuth": true,
					"exceptEmailDomains": null,
					"manageRule": null,
					"minPasswordLength": 8,
					"onlyEmailDomains": null,
					"requireEmail": false
				}
			}
		]`

		collections := []*models.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collections); err != nil {
			return err
		}

		return daos.New(db).ImportCollections(collections, true, nil)
	}, func(db dbx.Builder) error {
		return nil
	})
}
