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
      console.log("//-- Client/authServices: getToken() catch error")
      return false;
    }

    // return localStorage.getItem('id_token');
  }

  login(idToken,data) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);
    
    console.log("login data",data)

    const jwtData = {
      "id_token"  :  idToken,
      "data"  :   JSON.stringify(data)
    };
    localStorage.setItem('calendari', JSON.stringify(jwtData));

    window.location.assign('/');
  }

  logout() {
    // Clear user token and profile data from localStorage
    // axios.defaults.headers.common["Authorization"] = null;
    
    localStorage.removeItem('calendari');
    localStorage.removeItem('id_token');
    // this will reload the page and reset the state of the application
    window.location.assign('/');
  }
}

export default new AuthService();

// export function auth(){
//   return new AuthService()
// }
