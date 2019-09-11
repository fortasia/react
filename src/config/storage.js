export class jsonStorage {
  constructor(){
    this.storage = localStorage;
  }

  static getItem(key){
    let self = new this();
    let jsonObject = JSON.parse(self.storage.getItem(key));
    return (jsonObject? jsonObject: {});
  }

  static setItem(key, value){
    let self = new this();
    let json = JSON.stringify(value);
    return self.storage.setItem(key, json);
  }

  static removeItem(key){
    let self = new this();
    self.storage.removeItem(key);
  }

  static clear(){
    let self = new this();
    self.storage.clear();
  }

  setCookie(cname, cvalue, cexpires, path) {
    document.cookie = `${cname}=${cvalue}; expires=${cexpires}; path=${path}`;
  }

  getCookie (cname) {
    let name = cname + '=';
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return null;
  }

  static setSession(key, value){
    let self = new this();
    self.setCookie(key, value, '0', '/');
  }

  static getSession (key){
    let self = new this();
    if(!self.getCookie(key)){
      this.clear();
    }
    return self.getCookie(key);
  }

  static removeSession(key){
    let self = new this();
    let expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() - 1);
    let session = self.getCookie(key);
    if(session){
      self.setCookie(key, session, expiryDate.toUTCString(), '/');
    }
  }

}

