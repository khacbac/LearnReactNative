import colors from "../res/colors";

class Session {
  bgColor = colors.colorMain;

  updateBgColor = color => {};
  
}

var SessionStore = SessionStore || new Session();
export default SessionStore;
