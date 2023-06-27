package hooks

import (
	"context"
	"fmt"
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/network"
	"github.com/docker/docker/client"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
	Gtype "github.com/pocketbase/pocketbase/gorchitech/types"
	"github.com/pocketbase/pocketbase/models"
	"log"
	"strings"
)

func SetupOnBeforeNetworkHooks(app *pocketbase.PocketBase) {
	onBeforeCreateNetwork(app)
	onBeforeDeleteNetwork(app)
	onBeforeUpdateNetwork(app)
}

func onBeforeCreateNetwork(app *pocketbase.PocketBase) {
	app.OnModelBeforeCreate("network").Add(func(e *core.ModelEvent) error {
		log.Println("onBeforeCreateNetwork", e.Dao, e.Model, e.Tags())

		gnetwork := Gtype.GNetworkRecord{}
		err := gnetwork.FromRecordToNetwork(e.Model.(*models.Record))

		log.Println("on  FromRecordToNetwork")

		log.Println("on  Create CLI docker")
		ctx := context.Background()
		cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
		if err != nil {
			panic(err)
		}
		defer cli.Close()

		log.Println("on  Create network Labels", gnetwork.Label)
		LabelsString := strings.Split(gnetwork.Label, ",")
		log.Println("on  Create network Labels", LabelsString)
		Labels := make(map[string]string)

		for i, label := range LabelsString {
			log.Println("on  label", label, i)
			Labels["key"+fmt.Sprintf("%d", i)] = label
		}

		log.Println("on Labels", Labels)

		log.Println("on NetworkCreate")

		ipamConfig := network.IPAMConfig{
			Subnet:  gnetwork.SubNet,
			IPRange: gnetwork.SubNet,
			Gateway: gnetwork.GateWay,
		}

		resp, err := cli.NetworkCreate(ctx, gnetwork.Name, types.NetworkCreate{
			Driver:         gnetwork.Driver,
			CheckDuplicate: true,
			EnableIPv6:     false,
			IPAM: &network.IPAM{
				Driver: "default",
				Config: []network.IPAMConfig{ipamConfig},
			},
			Internal:   false,
			Attachable: false,
			Ingress:    false,
			ConfigOnly: false,
			ConfigFrom: nil,
			Options:    nil,
			Labels:     Labels,
		})
		if err != nil {
			panic(err)
		}
		log.Println("on Show response SDK", resp)
		gnetwork.NetworkId = resp.ID
		log.Println("on Show response SDK", gnetwork)
		networkFinal, err := cli.NetworkInspect(context.Background(), gnetwork.NetworkId, types.NetworkInspectOptions{})
		gnetwork.SubNet = networkFinal.IPAM.Config[0].Subnet
		gnetwork.GateWay = networkFinal.IPAM.Config[0].Gateway
		Gtype.FromGnetworkToRecord(e.Model.(*models.Record), &gnetwork)

		if err != nil {
			panic(err)
		}
		return nil
	})
}

func onBeforeDeleteNetwork(app *pocketbase.PocketBase) {
	app.OnModelBeforeDelete("network").Add(func(e *core.ModelEvent) error {
		log.Println("onBeforeDeleteNetwork", e.Dao, e.Model, e.Tags())

		gnetwork := Gtype.GNetworkRecord{}
		err := gnetwork.FromRecordToNetwork(e.Model.(*models.Record))

		log.Println("on  OnModelBeforeDelete")

		log.Println("on  Create CLI docker")
		cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
		if err != nil {
			panic(err)
		}
		defer cli.Close()

		log.Println("La red %s ha sido eliminada.\n", gnetwork.NetworkId)
		return nil
	})
}

func onBeforeUpdateNetwork(app *pocketbase.PocketBase) {
	app.OnModelBeforeUpdate("network").Add(func(e *core.ModelEvent) error {
		log.Println("OnModelBeforeUpdate", e.Dao, e.Model, e.Tags())

		gnetwork := Gtype.GNetworkRecord{}
		err := gnetwork.FromRecordToNetwork(e.Model.(*models.Record))
		cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())

		if gnetwork.Deleted != "" {
			err = cli.NetworkRemove(context.Background(), gnetwork.NetworkId)
			if err != nil {
				panic(err)
			}

			return nil
		}

		log.Println("on  onBeforeUpdateNetwork")
		ctx := context.Background()
		networkInspect, err := cli.NetworkInspect(context.Background(), gnetwork.NetworkId, types.NetworkInspectOptions{})
		if err != nil {
			panic(err)
		}

		// Get the list of container IDs connected to the network
		containerIDs := networkInspect.Containers

		log.Println("on  network.Containers", networkInspect.Containers)

		// Print the containers connected to the network
		fmt.Printf("Containers connected to network %s:\n", gnetwork.NetworkId)
		for containerID := range containerIDs {
			err = cli.NetworkDisconnect(context.Background(), gnetwork.NetworkId, containerID, true)
			if err != nil {
				panic(err)
			}
			fmt.Println(" -", containerID)
		}

		log.Println("on  NetworkRemove")

		err = cli.NetworkRemove(context.Background(), gnetwork.NetworkId)
		if err != nil {
			panic(err)
		}

		log.Println("La red %s ha sido eliminada.\n", gnetwork.NetworkId)

		log.Println("on  Create network Labels", gnetwork.Label)
		LabelsString := strings.Split(gnetwork.Label, ",")
		log.Println("on  Create network Labels", LabelsString)
		Labels := make(map[string]string)

		for i, label := range LabelsString {
			log.Println("on  label", label, i)
			Labels["key"+fmt.Sprintf("%d", i)] = label
		}

		log.Println("on Labels", Labels)

		log.Println("on NetworkCreate")

		ipamConfig := network.IPAMConfig{
			Subnet:  gnetwork.SubNet,
			IPRange: gnetwork.SubNet,
			Gateway: gnetwork.GateWay,
		}

		resp, err := cli.NetworkCreate(ctx, gnetwork.Name, types.NetworkCreate{
			Driver:         gnetwork.Driver,
			CheckDuplicate: true,
			EnableIPv6:     false,
			IPAM: &network.IPAM{
				Driver: "default",
				Config: []network.IPAMConfig{ipamConfig},
			},
			Internal:   false,
			Attachable: false,
			Ingress:    false,
			ConfigOnly: false,
			ConfigFrom: nil,
			Options:    nil,
			Labels:     Labels,
		})
		if err != nil {
			panic(err)
		}
		log.Println("on Show response SDK", resp)
		gnetwork.NetworkId = resp.ID
		log.Println("on Show response SDK", gnetwork)
		networkFinal, err := cli.NetworkInspect(context.Background(), gnetwork.NetworkId, types.NetworkInspectOptions{})
		gnetwork.SubNet = networkFinal.IPAM.Config[0].Subnet
		gnetwork.GateWay = networkFinal.IPAM.Config[0].Gateway
		Gtype.FromGnetworkToRecord(e.Model.(*models.Record), &gnetwork)

		fmt.Printf("Containers connected to network %s:\n", gnetwork.NetworkId)
		for containerID := range containerIDs {
			err = cli.NetworkConnect(context.Background(), gnetwork.NetworkId, containerID, nil)
			if err != nil {
				panic(err)
			}
			fmt.Println(" -", containerID)
		}

		log.Printf("La red %s ha sido actualizada.\n", gnetwork.NetworkId)
		return nil
	})
}
