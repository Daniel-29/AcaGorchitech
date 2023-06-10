package types

import (
	"errors"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/gorchitech/helpers"
	"github.com/pocketbase/pocketbase/models"
	"log"
)

type ServiceRecord struct {
	Name        string         `json:"name"`
	Database    *models.Record `json:"database"`
	Environment *models.Record `json:"environment"`
	Image       string         `json:"image"`
	Command     []string       `json:"command"`
}

func (s *ServiceRecord) FromRecord(record *models.Record, app *pocketbase.PocketBase) error {
	//Expand the database field
	errs := app.Dao().ExpandRecord(record, []string{"database", "environment"}, helpers.AdminExpandFetch(app.Dao()))
	if len(errs) > 0 {
		log.Println("Error expanding service", errs)
		return errors.New("error expanding service")
	}
	//Set the fields
	s.Name = record.GetString("name")
	s.Database = record.Expand()["database"].(*models.Record)
	s.Environment = record.Expand()["environment"].(*models.Record)
	return nil
}

func (s *ServiceRecord) InferInfo() error {
	//Infer the image and command from the Database and Environment, depending on the combination of the two
	combined := s.Environment.GetString("name") + "-" + s.Database.GetString("name")
	switch combined {
	case "Go-Sqlite":
		s.Image = "ghcr.io/muchobien/pocketbase:latest"
		s.Command = []string{"/usr/local/bin/pocketbase", "serve", "--http=0.0.0.0:8090", "--dir=/pb_data", "--publicDir=/pb_public"}
	}
	return nil
}
