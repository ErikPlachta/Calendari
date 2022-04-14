import decode from 'jwt-decode';
class AuthService {
  
  //-- Get token if user has one
  getCurrentUser() {
    return decode(this.getToken());
  }

  // Checks if there is a saved token and it's still valid
  isLoggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // handwaiving here
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage calendari jwt storage
    
    //-- Attempt to get token if it exists in JWT local Storage
    try{
      const jwtData = localStorage.getItem('calendari');
      const jwtDataJSON = JSON.parse(jwtData);
      let idToken = jwtDataJSON.id_token;
      return idToken;
    }
    //-- If does not, just return false
    catch {
      return false;
    }
    // return localStorage.getItem('id_token');
  }

  login(dataLogin) {
    // Saves user token to localStorage
    // localStorage.setItem('id_token', idToken);    

    //-- extracting JWT token
    const idToken       = dataLogin.token ? dataLogin.token : "NaN";

    //-- deconstructing to simplify below
    const user = dataLogin.user;
    //-- extracting values for local storage
    const _id           = user._id ? user._id : "NaN";
    const username      = user.username  ? user.username  : "NaN";
    const date_created  = user.date_created  ? user.date_created  : "NaN";
    const business_id   = user.business_id ? user.business_id : "NaN";

    const jwtData = {
      "id_token"      :  idToken,
      "_id"           : _id,
      "name"          : username,
      "date_created"  : date_created,
      "business_id"   : business_id,
      'all'           : user,
    };
    localStorage.setItem('calendari', JSON.stringify(jwtData));

    // if(user.business_id){
    //   window.location.assign(`/b/${user.busines_id}`);
    // }
    // if(!user.business_id){
      window.location.assign('/');
    // }
  }

  logout() {
    // Clear user token and profile data from localStorage
    // axios.defaults.headers.common["Authorization"] = null;
    localStorage.removeItem('calendari');
    
    // localStorage.removeItem('id_token');
    // this will reload the page and reset the state of the application
    window.location.assign('/');
  }
}

export default new AuthService();

// export function auth(){
//   return new AuthService()
// }
