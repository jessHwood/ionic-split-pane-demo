import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { _DetailPage } from '../';
import { Http } from '@angular/http';

@IonicPage()
@Component({
    selector: 'page-item',
    templateUrl: 'item.html',
})
export class ItemPage extends _DetailPage {

    files: any = null;
    item: any = null;
    folderObjId: "string";

    constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {
        super();
        // let fileData = http.get('assets/files.json').map(res => res.json().files);
        // fileData.subscribe(data => {
        //     this.files = data;
        //     this.folderObjId = data[0].folderObjId;
        //     console.log(this.files);
        // })

        this.item = navParams.data;
        console.log(this.item);
    }

}
