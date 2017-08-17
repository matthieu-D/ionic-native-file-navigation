import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import { File } from '@ionic-native/file';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items;
  savedParentNativeURLs = [];

  constructor(public navCtrl: NavController, public fileNavigator: File, public plt: Platform) {

    const ROOT_DIRECTORY = 'file:///';

    plt.ready()
      .then(() => {
        this.listDir(ROOT_DIRECTORY, '');
    })
  }

  listDir = (path, dirName) => {
    this.fileNavigator.listDir(path, dirName)
      .then((entries) => {
        this.items = entries;
      })
      .catch(this.handleError);
  }

  goDown = (item) => {
    const parentNativeURL = item.nativeURL.replace(item.name, '');
    this.savedParentNativeURLs.push(parentNativeURL);

    this.listDir(parentNativeURL, item.name);
  }

  goUp = () => {
    const parentNativeURL = this.savedParentNativeURLs.pop();

    this.listDir(parentNativeURL, '');
  }

  handleError = (error) => {
    console.log('error reading,', error)
  };
}
