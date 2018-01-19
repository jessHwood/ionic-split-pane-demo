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

    drives: any[];
    information: any[];
    folders: any[];

    showLevel1 = null;
    showLevel2 = null;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private navProxy: NavProxyService,
        private http: Http) {
        super();
        // let localData = http.get('assets/information.json').map(res => res.json().items);
        // localData.subscribe(data => {
        //     this.information = data;
        //     console.log(data);
        // })

        let driveData = http.get('assets/drives.json').map(res => res.json().drives);
        driveData.subscribe(data => {
            this.drives = data;
        })

        let folderData = http.get('assets/folders.json').map(res => res.json().folders);
        folderData.subscribe(data => {
            this.folders = data;
            console.log(this.folders);
        })
    }

    isLevel1Shown(idx) {
        return this.showLevel1 === idx;
      };
      
      isLevel2Shown(idx) {
        return this.showLevel2 === idx;
      };
    
    toggleLevel1(idx) {
        if (this.isLevel1Shown(idx)) {
          this.showLevel1 = null;
        } else {
          this.showLevel1 = idx;
        }
      };
      
      toggleLevel2(idx) {
        if (this.isLevel2Shown(idx)) {
          this.showLevel1 = null;
          this.showLevel2 = null;
        } else {
          this.showLevel1 = idx;
          this.showLevel2 = idx;
        }
      };

    getFolders(driveId) {
        console.log(driveId);
        let fileData = this.http.get('assets/folders.json/' + driveId).map(res => res.json().folders);
        fileData.subscribe(data => {
            this.folders = data;
        })
        this.navProxy.pushDetail(ItemPage, this.folders);
        console.log(this.folders);
    }

    getSubfolders(folderId) {
        console.log(folderId);
        let fileData = this.http.get('assets/folders.json/' + folderId).map(res => res.json().folders);
        fileData.subscribe(data => {
            this.folders = data;
        })
        this.navProxy.pushDetail(ItemPage, this.folders);
        console.log(this.folders);
    }

    onItemSelected(item) {
        // Rather than using:
        //     this.navCtrl.push(...)
        // Use our proxy:
        this.navProxy.pushDetail(ItemPage, item);
    }

    


}
