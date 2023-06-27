package types

import (
	"github.com/pocketbase/pocketbase/models"
	"log"
)

type GVolumenRecord struct {
	Name      string `json:"name"`
	Label     string `json:"label"`
	Type      string `json:"type"`
	Source    string `json:"source"`
	Mount     string `json:"mount"`
	Target    string `json:"target"`
	Driver    string `json:"driver"`
	Size      string `json:"size"`
	VolumenId string `json:"volumenId"`
	Deleted   string `json:"deleted"`
}

func (s *GVolumenRecord) FromRecordToVolumen(record *models.Record) error {
	log.Println("on FromRecordToNetwork, record", record)
	//Set the fields
	s.Name = record.GetString("name")
	s.Label = record.GetString("label")
	s.Type = record.GetString("type")
	s.Source = record.GetString("source")
	s.Mount = record.GetString("mount")
	s.Target = record.GetString("target")
	s.Driver = record.GetString("driver")
	s.Size = record.GetString("size")
	s.VolumenId = record.GetString("volumenId")
	s.Deleted = record.GetString("deleted")
	return nil
}

func FromGVolumenToRecord(record *models.Record, gVolumen *GVolumenRecord) error {
	log.Println("on FromGVolumenToRecord, record", record)
	record.Set("name", gVolumen.Name)
	record.Set("label", gVolumen.Label)
	record.Set("type", gVolumen.Type)
	record.Set("source", gVolumen.Source)
	record.Set("mount", gVolumen.Mount)
	record.Set("target", gVolumen.Target)
	record.Set("driver", gVolumen.Driver)
	record.Set("size", gVolumen.Size)
	record.Set("volumenId", gVolumen.VolumenId)
	record.Set("deleted", gVolumen.Deleted)
	log.Println("on end FromGVolumenToRecord, record", record)
	return nil
}
