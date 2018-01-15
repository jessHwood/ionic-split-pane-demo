import { Component } from '@angular/core';
import {
    IonicPage,
    NavController,
    NavParams } from 'ionic-angular';
import { NavProxyService } from '../../services/NavProxy.service';
import {
    _MasterPage,
    ItemPage } from '../';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'

@IonicPage()
@Component({
    selector: 'page-items',
    templateUrl: 'items.html',
})
export class ItemsPage extends _MasterPage {

    information: any[];

    // items: Array<any> = [
    //     { id: 0, description: 'Project1' },
    //     { id: 1, description: 'Project2' },
    //     { id: 2, description: 'Project3' },
    //     { id: 3, description: 'Project4' },
    //     { id: 4, description: 'Project5' },
    //     { id: 5, description: 'Project6' },
    //     { id: 6, description: 'Project7' },
    //     { id: 7, description: 'Project8' },
    //     { id: 8, description: 'Project9' },
    //     { id: 9, description: 'Project10' },
    // ];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private navProxy: NavProxyService,
        private http: Http) {
        super();
        let localData = http.get('assets/information.json').map(res => res.json().items);
        localData.subscribe(data => {
            this.information = data;
            console.log(data);
        })
    }

    toggleSection(i) {
        this.information[i].open = !this.information[i].open;
    }

    toggleItem(i, j) {
        this.information[i].children[j].open = !this.information[i].children[j].open;
    }

    onItemSelected(item) {
        // Rather than using:
        //     this.navCtrl.push(...)
        // Use our proxy:
        this.navProxy.pushDetail(ItemPage, item);
    }

    onChildSelected(item) {
        this.navProxy.pushDetail(ItemPage, item.children);
    }

}
