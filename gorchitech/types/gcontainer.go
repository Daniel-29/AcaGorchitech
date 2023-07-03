package types

import (
	"errors"
	"github.com/pocketbase/pocketbase"
	_ "github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/gorchitech/helpers"
	"github.com/pocketbase/pocketbase/models"
	"log"
)

type GContainerRecord struct {
	Name        string         `json:"name"`
	Cpu         int64          `json:"cpu"`
	Memory      int64          `json:"memory"`
	Ip          string         `json:"ip"`
	Status      string         `json:"status"`
	Port        string         `json:"port"`
	Label       string         `json:"label"`
	Environment string         `json:"environment"`
	ContainerId string         `json:"containerId"`
	Command     string         `json:"command"`
	Deleted     string         `json:"deleted"`
	Scope       *models.Record `json:"scope"`
	Image       *models.Record `json:"image"`
	Volumen     *models.Record `json:"volumen"`
	Network     *models.Record `json:"network"`
}

func (s *GContainerRecord) FromRecordToContainer(record *models.Record, app *pocketbase.PocketBase) error {
	log.Println("on FromRecordToContainer, record", record)
	errs := app.Dao().ExpandRecord(record, []string{"id_scope", "id_image"}, helpers.AdminExpandFetch(app.Dao()))

	log.Println("Error expanding service", errs)
	if len(errs) > 0 {
		return errors.New("error expanding service")
	}
	//Set the fields
	s.Name = record.GetString("name")
	s.Cpu = int64(record.GetInt("cpu"))
	s.Memory = int64(record.GetInt("memory"))
	s.Ip = record.GetString("ip")
	s.Status = record.GetString("status")
	s.Port = record.GetString("port")
	s.Label = record.GetString("label")
	s.Environment = record.GetString("environment")
	s.Command = record.GetString("command")
	s.ContainerId = record.GetString("containerId")
	s.Deleted = record.GetString("deleted")
	s.Scope = record.Expand()["id_scope"].(*models.Record)
	s.Image = record.Expand()["id_image"].(*models.Record)

	log.Println("on record.GetString(id_volumen)", record.GetString("id_volumen"))

	if record.GetString("id_volumen") != "" {
		app.Dao().ExpandRecord(record, []string{"id_volumen"}, helpers.AdminExpandFetch(app.Dao()))
		s.Volumen = record.Expand()["id_volumen"].(*models.Record)
	}
	if record.GetString("id_network") != "" {
		app.Dao().ExpandRecord(record, []string{"id_network"}, helpers.AdminExpandFetch(app.Dao()))
		s.Volumen = record.Expand()["id_network"].(*models.Record)
	}
	log.Println("on end FromRecordToContainer, record", s)
	return nil
}

func FromContainerToRecord(record *models.Record, gNetwork *GContainerRecord) error {
	log.Println("on FromContainerToRecord, record", record)
	record.Set("name", gNetwork.Name)
	record.Set("cpu", gNetwork.Cpu)
	record.Set("memory", gNetwork.Memory)
	record.Set("ip", gNetwork.Ip)
	record.Set("status", gNetwork.Status)
	record.Set("port", gNetwork.Port)
	record.Set("label", gNetwork.Label)
	record.Set("environment", gNetwork.Environment)
	record.Set("command", gNetwork.Command)
	record.Set("containerId", gNetwork.ContainerId)
	record.Set("deleted", gNetwork.Deleted)
	record.Set("scope", gNetwork.Scope)
	record.Set("image", gNetwork.Image)
	log.Println("on end FromContainerToRecord, record", record)
	return nil
}
