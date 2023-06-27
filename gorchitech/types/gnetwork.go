package types

import (
	"github.com/pocketbase/pocketbase/models"
	"log"
)

type GNetworkRecord struct {
	Name      string `json:"name"`
	Label     string `json:"label"`
	Alias     string `json:"alias"`
	SubNet    string `json:"subnet"`
	GateWay   string `json:"gateway"`
	Driver    string `json:"driver"`
	NetworkId string `json:"networkId"`
	Deleted   string `json:"deleted"`
}

func (s *GNetworkRecord) FromRecordToNetwork(record *models.Record) error {
	log.Println("on FromRecordToNetwork, record", record)
	//Set the fields
	s.Name = record.GetString("name")
	s.Label = record.GetString("label")
	s.Alias = record.GetString("alias")
	s.SubNet = record.GetString("subnet")
	s.GateWay = record.GetString("gateway")
	s.Driver = record.GetString("driver")
	s.NetworkId = record.GetString("networkId")
	s.Deleted = record.GetString("deleted")
	return nil
}

// func to set NetworkId into record *models.Record
func FromGnetworkToRecord(record *models.Record, gNetwork *GNetworkRecord) error {
	log.Println("on FromGnetworkToRecord, record", record)
	record.Set("name", gNetwork.Name)
	record.Set("label", gNetwork.Label)
	record.Set("alias", gNetwork.Alias)
	record.Set("subnet", gNetwork.SubNet)
	record.Set("gateway", gNetwork.GateWay)
	record.Set("driver", gNetwork.Driver)
	record.Set("networkId", gNetwork.NetworkId)
	record.Set("deleted", gNetwork.Deleted)
	log.Println("on end FromGnetworkToRecord, record", record)
	return nil
}
