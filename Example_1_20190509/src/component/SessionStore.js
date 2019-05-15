import colors from "../res/colors";

class Session {
  bgColor = colors.colorMain;

  setBgColorForApp(bg) {
    this.bgColor = bg;
  }

  getBgColorForApp() {
    return this.bgColor;
  }
}

var SessionStore = SessionStore || new Session();
export default SessionStore;
