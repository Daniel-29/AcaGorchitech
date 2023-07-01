import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

interface sidebarMenu {
  link: string;
  icon: string;
  menu: string;
}

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent {

  search: boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router) { }

  onLogout():void {
    localStorage.removeItem("token")
    this.router.navigate(["/login"]);
  }

  routerActive: string = "activelink";

  sidebarMenu: sidebarMenu[] = [
    {
      link: "/home",
      icon: "home",
      menu: "Home",
    },
    {
      link: "/containers",
      icon: "box",
      menu: "Containers",
    },
    {
      link: "/images",
      icon: "server",
      menu: "Images",
    },
    {
      link: "/networks",
      icon: "share-2",
      menu: "Networks",
    },
    {
      link: "/scopes",
      icon: "file-text",
      menu: "Scopes",
    },
    {
      link: "/volumes",
      icon: "database",
      menu: "Volumes",
    },
    {
      link: "/users",
      icon: "user",
      menu: "Users",
    },
   
  ]

}
