import { Component } from '@angular/core';
import { MenusModel } from './sotre-logic/models/menus.interface';
import { Router } from '@angular/router';
import { SideBarAnimation } from './sotre-logic/animation/toggle-sidebar.animation';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [SideBarAnimation.ToggleSidebar]
})
export class SidebarComponent   {
  toggleSideBar = false;
  sliderToggleState = 'inactive';
  menus : MenusModel[] = [
    {
      title: 'صفحه اصلی',
      icon: 'home',
      active: false,
      route: '/panel/home'
    },
    {
      title: 'گردش حساب',
      icon: 'receipt-item',
      active: false,
      route: '/panel/dashboard'
    },
    {
      title: 'سفارشات',
      icon: 'note',
      active: false,
      route: '/panel/messages'
    },
    {
      title: 'پرتفوی سپرده گذاری',
      icon: 'personalcard',
      active: false,
      route: '/panel/messages'
    },
    {
      title: 'پرتفوی لحظه ای',
      icon: 'graph',
      active: false,
      route: '/panel/messages'
    },
    {
      title: 'سفارشات عرضه اولیه',
      icon: 'menu-board',
      active: false,
      route: '/panel/messages'
    },
    {
      title: 'واریز وجه',
      icon: 'wallet-add',
      active: false,
      route: '/panel/messages'
    },
    {
      title: 'برداشت وجه',
      icon: 'wallet-minus',
      active: false,
      route: '/panel/messages'
    },
    {
      title: 'تغییر کارگزار ناظر',
      icon: 'user-edit',
      active: false,
      route: '/panel/messages'
    },
    {
      title: 'گزارشات',
      icon: 'document-text',
      active: false,
      route: '/panel/messages'
    },
  ];

  constructor(private router:Router){}

  changeRoute(menu:MenusModel){
    this.menus.forEach((item) => {
      item.active = false;
    });
    menu.active = true;
    this.router.navigate([menu.route]);
  }

  onToggleSideBar(){
    this.toggleSideBar = !this.toggleSideBar;
    this.sliderToggleState = '*';
    setTimeout(() => {
      this.toggleSideBar ? this.sliderToggleState = 'active' : this.sliderToggleState = 'inactive';
    }, 200);
  }

}
