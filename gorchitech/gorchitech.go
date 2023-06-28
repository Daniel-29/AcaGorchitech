package main

import (
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/gorchitech/hooks"
	_ "github.com/pocketbase/pocketbase/gorchitech/migrations"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"
	"go.uber.org/zap"
	"log"
	"runtime/debug"
)

func main() {
	app := pocketbase.New()

	logger, _ := zap.NewProduction()
	defer logger.Sync() // flushes buffer, if any
	sugar := logger.Sugar()
	sugar.Infow("🚀 Gorchitech server starting:",
		// Structured context as loosely typed key-value pairs.
		"commit hash", getCommit(),
	)
	migratecmd.MustRegister(app, app.RootCmd, &migratecmd.Options{
		Automigrate: true, // auto creates migration files when making collection changes
	})
	migratecmd.Register(app, app.RootCmd, &migratecmd.Options{
		Automigrate: true, // auto creates migration files when making collection changes
	})
	setupHooks(app)
	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}

func setupHooks(app *pocketbase.PocketBase) {
	hooks.SetupOnBeforeContainerHooks(app)
	hooks.SetupOnBeforeNetworkHooks(app)
	hooks.SetupOnBeforeVolumeHooks(app)
	hooks.SetupOnBeforeImagesHooks(app)
}

func getCommit() string {
	var Commit = func() string {
		if info, ok := debug.ReadBuildInfo(); ok {
			for _, setting := range info.Settings {
				if setting.Key == "vcs.revision" {
					return setting.Value
				}
			}
		}
		return ""
	}()
	return Commit
}
