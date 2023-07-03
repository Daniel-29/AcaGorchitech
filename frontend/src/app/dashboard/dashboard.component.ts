import { Component, OnInit } from "@angular/core";
import { ContainerService } from "../core/services/container.service";
import Swal from "sweetalert2";
import { HttpParams } from "@angular/common/http";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  formPostgres: any[] = [
    {
      name: "name",
      placeholder: "Nombre",
    },
    {
      name: "user",
      placeholder: "Usuario",
    },
    {
      name: "pass",
      placeholder: "Contraseña",
    },
    {
      name: "dbname",
      placeholder: "Base de datos nombre",
    },
    {
      name: "port",
      placeholder: "Puerto",
    },
  ];

  formMysqld: any[] = [
    {
      name: "name",
      placeholder: "Nombre",
    },
    {
      name: "user",
      placeholder: "Usuario",
    },
    {
      name: "pass",
      placeholder: "Contraseña",
    },
    {
      name: "dbname",
      placeholder: "Base de datos nombre",
    },
    {
      name: "port",
      placeholder: "Puerto",
    },
  ];

  formMariadbd: any[] = [
    {
      name: "name",
      placeholder: "Nombre",
    },
    {
      name: "user",
      placeholder: "Usuario",
    },
    {
      name: "pass",
      placeholder: "Contraseña",
    },
    {
      name: "dbname",
      placeholder: "Base de datos nombre",
    },
    {
      name: "port",
      placeholder: "Puerto",
    },
  ];

  formWORDPRESS: any[] = [
    {
      name: "name",
      placeholder: "Nombre",
    },
    {
      name: "port",
      placeholder: "Puerto",
    },
  ];

  constructor(private _service: ContainerService) {}

  ngOnInit(): void {
    this.onLoadContainerPostgres();
    this.onLoadContainerMysqld();
    this.onLoadContainerMariadbd();
    this.onLoadContainerWordpress();
  }

  handleformPostgres(jsonForm: any) {
    let data = {
      name: jsonForm.name,
      port: jsonForm.port + ":5432/tcp",
      memory: "400",
      cpu: "1",
      label: "postgres,db,sql,postgresql,pg",
      status: "start",
      command: "postgres",
      environment: `POSTGRES_USER=${jsonForm.user},POSTGRES_PASSWORD=${jsonForm.pass},POSTGRES_DB=${jsonForm.dbname}`,
      id_scope: "iy49dz43zl11ke3", //id_scope: "iy49dz43zl11ke3", agregar el id del scope especifico
      id_image: "ximyt21n4crvq40", //id_image: "ximyt21n4crvq40", agregar el id de la imagen especifica
    };

    this._service.createContainer(data).subscribe((response) => {
      if (response) {
        Swal.fire("Agregado", "Se agrego correctamente", "success");
        this.onLoadContainerPostgres();
      }
    });
  }

  handleformMysqld(jsonForm: any) {
    let data = {
      name: jsonForm.name,
      port: jsonForm.port + ":3306/tcp",
      memory: "400",
      cpu: "1",
      label: "mysql,db,sql",
      status: "start",
      command: "mysqld",
      environment: `MYSQL_USER=${jsonForm.user},MYSQL_PASSWORD=${jsonForm.pass},MYSQL_DATABASE=${jsonForm.dbname},MYSQL_ROOT_PASSWORD=${jsonForm.pass}`,
      id_scope: "iy49dz43zl11ke3", //id_scope: "iy49dz43zl11ke3", agregar el id del scope especifico
      id_image: "hbanq58qnoddwb8", //id_image: "ximyt21n4crvq40", agregar el id de la imagen especifica
    };

    this._service.createContainer(data).subscribe((response) => {
      if (response) {
        Swal.fire("Agregado", "Se agrego correctamente", "success");
        this.onLoadContainerMysqld();
      }
    });
  }

  handleformMariadbd(jsonForm: any) {
    let data = {
      name: jsonForm.name,
      port: jsonForm.port + ":3306/tcp",
      memory: "400",
      cpu: "1",
      label: "mariadb,db,sql",
      status: "start",
      command: "mariadbd",
      environment: `MARIADB_USER=${jsonForm.user},MARIADB_PASSWORD=${jsonForm.pass},MARIADB_DATABASE=${jsonForm.dbname},MARIADB_ROOT_PASSWORD=${jsonForm.pass}`,
      id_scope: "iy49dz43zl11ke3", //id_scope: "iy49dz43zl11ke3", agregar el id del scope especifico
      id_image: "9cgsgj1rekuezhl", //id_image: "ximyt21n4crvq40", agregar el id de la imagen especifica
    };

    this._service.createContainer(data).subscribe((response) => {
      if (response) {
        Swal.fire("Agregado", "Se agrego correctamente", "success");
        this.onLoadContainerMariadbd();
      }
    });
  }

  handleformWORDPRESS(jsonForm: any) {
    let data = {
      name: jsonForm.name,
      port: jsonForm.port + ":80/tcp",
      memory: "400",
      cpu: "1",
      label: "wiki,wordpress,php,apache,web",
      status: "start",
      command: "apache2-foreground",
      environment: "",
      id_scope: "iy49dz43zl11ke3", //id_scope: "iy49dz43zl11ke3", agregar el id del scope especifico
      id_image: "pnabb8x0wk769iv", //id_image: "ximyt21n4crvq40", agregar el id de la imagen especifica
    };

    this._service.createContainer(data).subscribe((response) => {
      if (response) {
        Swal.fire("Agregado", "Se agrego correctamente", "success");
      }
    });
  }

  wordpressList: any[] = []; 
  onLoadContainerWordpress() {
    let httpParams = new HttpParams().append("filter", 'id_image.id = "pnabb8x0wk769iv"').append("expand", "id_scope,id_image,id_volumen,id_network");
    this._service
      .getContainers(httpParams)
      .then((response: any) => {
        this.wordpressList = response.items;
      })
      .catch((error) => {
        // Ocurrió un error durante la ejecución de la solicitud
        console.error("Error al ejecutar la solicitud:", error);
        this.onLoadContainerWordpress();
      });
  }

  postgresList: any[] = []; 
  onLoadContainerPostgres() {
    let httpParams = new HttpParams().append("filter", 'id_image.id = "ximyt21n4crvq40"').append("expand", "id_scope,id_image,id_volumen,id_network");
    this._service
      .getContainers(httpParams)
      .then((response: any) => {
        this.postgresList = response.items;
      })
      .catch((error) => {
        // Ocurrió un error durante la ejecución de la solicitud
        console.error("Error al ejecutar la solicitud:", error);
      });
  }

  mysqlList: any[] = []; 
  onLoadContainerMysqld() {
    let httpParams = new HttpParams().append("filter", 'id_image.id = "hbanq58qnoddwb8"').append("expand", "id_scope,id_image,id_volumen,id_network");
    this._service
      .getContainers(httpParams)
      .then((response: any) => {
        this.mysqlList = response.items;
      })
      .catch((error) => {
        // Ocurrió un error durante la ejecución de la solicitud
        console.error("Error al ejecutar la solicitud:", error);
      });
  }

  mariadbList: any[] = []; 
  onLoadContainerMariadbd() {
    let httpParams = new HttpParams().append("filter", 'id_image.id = "9cgsgj1rekuezhl"').append("expand", "id_scope,id_image,id_volumen,id_network");
    this._service
      .getContainers(httpParams)
      .then((response: any) => {
        this.mariadbList = response.items;
      })
      .catch((error) => {
        // Ocurrió un error durante la ejecución de la solicitud
        console.error("Error al ejecutar la solicitud:", error);
      });
  }
}
