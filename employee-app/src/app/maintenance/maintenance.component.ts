
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LayoutService } from '@backbase/ui-ang/layout';
import { filter, map } from 'rxjs';

@Component({
  selector: 'bb-app-maintenance',
  templateUrl: './maintenance.component.html',
})
export class MaintenanceComponent implements OnInit {
  readonly notificationsAllowedRoutes = 'conversation-view, arrangement-view, transaction-view';
  showError = false;
  errorMessage = '';
  link = '';
  linkText = '';
  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly titleService: Title,
    public readonly layoutService: LayoutService,
  ) {}
  ngOnInit() {
    // Can be removed
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        map(() => {
          let route = this.activatedRoute;
          // find first route with a title set (if any)
          let lastRouteWithTitle = route;
          while (route.firstChild) {
            route = route.firstChild;
            if (this.getTitle(route)) {
              lastRouteWithTitle = route;
            }
          }
          return lastRouteWithTitle;
        }),
        filter((route: any) => route.outlet === 'primary'),
        map((route: any) => this.getTitle(route)),
        filter((title): title is string => title !== undefined),
      )
      .subscribe((title) => {
        this.titleService.setTitle(title);
      });
  }

  // Can be removed
  private getTitle(route: ActivatedRoute): string | undefined {
    const routeData = route.snapshot.data;
    return routeData?.title ? routeData?.title : routeData?.custom?.title;
    // return routeData?.custom?.title;
  }
}
