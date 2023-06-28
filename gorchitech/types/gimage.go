package types

import (
	"github.com/pocketbase/pocketbase/models"
	"log"
)

type GImageRecord struct {
	Name    string `json:"name"`
	Size    string `json:"size"`
	Date    string `json:"date"`
	ImageID string `json:"imageId"`
	Deleted string `json:"deleted"`
}

func (s *GImageRecord) FromRecordToImage(record *models.Record) error {
	log.Println("on FromRecordToImage, record", record)
	//Set the fields
	s.Name = record.GetString("name")
	s.Size = record.GetString("size")
	s.Date = record.GetString("date")
	s.ImageID = record.GetString("imageId")
	s.Deleted = record.GetString("deleted")
	return nil
}

func FromImageToRecord(record *models.Record, gNetwork *GImageRecord) error {
	log.Println("on FromImageToRecord, record", record)
	record.Set("name", gNetwork.Name)
	record.Set("size", gNetwork.Size)
	record.Set("date", gNetwork.Date)
	record.Set("imageId", gNetwork.ImageID)
	record.Set("deleted", gNetwork.Deleted)
	log.Println("on end FromImageToRecord, record", record)
	return nil
}
