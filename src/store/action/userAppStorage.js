export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const REFRESH_LOGIN= 'REFRESH_LOGIN'
export const LOGOUT = 'LOGOUT'
export const GET_THEME = 'GET_THEME'


export const FETCH_COSSIGNMENTS = 'FETCH_COSSIGNMENTS'
export const UPDATE_COSSIGNMENT = 'UPDATE_COSSIGNMENT'
export const DELETE_COSSIGNMENT = 'DELETE_COSSIGNMENT'
export const CREATE_COSSIGNMENT = 'CREATE_COSSIGNMENT'


export const FETCH_HISTORIES = 'FETCH_HISTORIES'
export const UPDATE_HISTORY = 'UPDATE_HISTORY'
export const DELETE_HISTORY = 'DELETE_HISTORY'
export const CREATE_HISTORY = 'CREATE_HISTORY'



export const UPDATE_ADMIN = 'UPDATE_ADMIN'

//pure functions to calculate the time remaining
//https://kargoofreightll.cloud

let calculateRemainingTime = (hoursUntilExpiry) => {
  const currentTime = new Date().getTime();
  const expirationTime = currentTime + hoursUntilExpiry * 60 * 60 * 1000; // Convert hours to milliseconds
  const timeLeft = expirationTime - currentTime; // Time left in milliseconds
  return Math.max(timeLeft, 0); // Ensure non-negative result
};

// Function to retrieve admin token and check its validity
let retrievedAdminStoredToken = () => {
  const tokenFromStorage = localStorage.getItem('token');
  const expiryDate = localStorage.getItem('expiry'); // This should be a timestamp


  if (!expiryDate) {
    return {
      token: "",
      expiresIn: ""
    };
  }

  const timeLeft = calculateRemainingTime(Number(expiryDate)); // Ensure expiryDate is a number

  if (timeLeft <= 1000) {

    // Less than or equal to 1 hour
    localStorage.removeItem('token');
    localStorage.removeItem('expiry');
    localStorage.removeItem('user');

    return {
      token: "",
      expiresIn: ""
    };
  }

  return {
    token: tokenFromStorage,
    expiresIn: timeLeft
  };
}

// Redux async function for automatic login based on stored token
export const autoLogin = () => {
  return async (dispatch, getState) => {
    // Get the admin token and its expiry
    const { token, expiresIn } = retrievedAdminStoredToken();

    if (!token) {

      return {
        bool: false,
        message: "No valid session found",
        url: "/login"
      };
    }

    // Check if the token is still valid
    if (expiresIn <= 0) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("expiry");
      return {
        bool: false,
        message: "Session expired, please log in again",
        url: "/login"
      };
    }

    // Optionally validate the token with the server
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/validate-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        const data = await response.json();


        dispatch({ type: REFRESH_LOGIN, payload: data });
        return {
          bool: true,
          message: "Successfully logged in",
          url: `/template`
        };
      } else {

        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("expiry");
        return {
          bool: false,
          message: "Invalid token, please log in again",
          url: "/login"
        };
      }

    } catch (err) {
      return {
        bool: false,
        message: "Network error"
      };
    }
  }
}



export const loginAdmin = (data) => {
  let dataObj = data
  return async (dispatch, getState) => {
    try {
      let response = await fetch(`https://kargoofreight.cloud/adminlogin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          url: '/signup'
        }
      }

      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          url: '/login'
        }
      }


      if (response.status === 200) {
        let data = await response.json()
        //saving credentials to local storage

        localStorage.setItem("admin", JSON.stringify(data.response.admin))

        localStorage.setItem("token", JSON.stringify(data.response.token))

        localStorage.setItem("expiry", JSON.stringify(data.response.expiresIn))
        //dispatch login events
        dispatch({ type: LOGIN, payload: data.response })

        return {
          bool: true,
          message: data.response,
          url: `/cossignments`
        }
      }
    }
    catch (err) {
      return {
        bool: false,
        message: err.message,
        url: `/login`
      }
    }
  }
}



export const signupAdmin = (data) => {
  let dataObj = data
  return async (dispatch, getState) => {
    try {
      let response = await fetch(`https://kargoofreight.cloud/adminsignup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })

      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          url: '/signup'
        }
      }

      if (response.status === 301) {
        let data = await response.json()

        return {
          bool: false,
          message: data.response,
          url: '/login'
        }
      }
   

      if (response.status === 200) {
        let data = await response.json()

        
        localStorage.setItem("admin", JSON.stringify(data.response.admin))

        localStorage.setItem("token", JSON.stringify(data.response.token))

        localStorage.setItem("expiry", JSON.stringify(data.response.expiresIn))
        //dispatch login events
        dispatch({ type: LOGIN, payload: data.response })


        return {
          bool: true,
          message: data.response,
          url: `/cossignments`
        }
      }

    }
    catch (err) {
      return {
        bool: false,
        message: err.message,
        url: `/signup`
      }
    }
  }
}










//cossignment methods
export const fetchCossignments = ()=>{
  return async (dispatch, getState) => {
    let {
      token
    } = getState().userAuth

    try {
      let response = await fetch(`https://kargoofreight.cloud/cosignments`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "header": `${token}`
        }
      })
      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {
        let data = await response.json()
        dispatch({type:FETCH_COSSIGNMENTS,payload:data.response})

        return {
          bool: true,
          message: data.response
        }
      }
    }

    catch (err) {
      return {
        bool: false,
        message: err.message
      }
    }
  }

}
export const deleteCossignment = (id)=>{
  return async (dispatch, getState) => {
    let {
      token
    } = getState().userAuth
//
    try {
      let response = await fetch(`https://kargoofreight.cloud/cosignments/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "header": `${token}`
        }
      })
      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {
        let data = await response.json()

        dispatch({type:DELETE_COSSIGNMENT,payload:id})
        return {
          bool: true,
          message: data.response
        }
      }
    }

    catch (err) {
      return {
        bool: false,
        message: err.message
      }
    }
  }
}
export const updateCossignment = (data)=>{
  return async (dispatch, getState) => {
    let {
      token
    } = getState().userAuth
    try {
      let response = await fetch(`https://kargoofreight.cloud/cosignments/${data._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "header": `${token}`
        },
        body:JSON.stringify(data)
      })
      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {
        let data = await response.json()

        console.log(data.response)
        dispatch({type:UPDATE_COSSIGNMENT,payload:data.response})
        return {
          bool: true,
          message: data.response
        }
      }
    }

    catch (err) {
      console.log(err)
      return {
        bool: false,
        message: err.message
      }
    }
  }
}
export const createCossignment = (data)=>{
  return async (dispatch, getState) => {
    let {
      token
    } = getState().userAuth

    try {
      let response = await fetch(`https://kargoofreight.cloud/cosignment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "header": `${token}`
        },
        body:JSON.stringify(data)
      })


      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {
        let data = await response.json()

        dispatch({type:CREATE_COSSIGNMENT,payload:data.response})
        return {
          bool: true,
          message: data.response
        }
      }
    }

    catch (err) {
      console.log(err)
      return {
        bool: false,
        message: err.message
      }
    }
  }
}




//history methods
export const fetchHistories = (id)=>{
  return async (dispatch, getState) => {
    let {
      token
    } = getState().userAuth
  

    try {
      let response = await fetch(`https://kargoofreight.cloud/histories/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "header": `${token}`
        }
      })
      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {
        let data = await response.json()
        dispatch({type:FETCH_HISTORIES,payload:data.response})

        return {
          bool: true,
          message: data.response
        }
      }
    }

    catch (err) {
      return {
        bool: false,
        message: err.message
      }
    }
  }

}
export const deleteHistory = (id)=>{
  return async (dispatch, getState) => {
    let {
      token
    } = getState().userAuth

    try {
      let response = await fetch(`https://kargoofreight.cloud/history/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "header": `${token}`
        }
      })
      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {
        let data = await response.json()

        dispatch({type:DELETE_HISTORY,payload:id})
        return {
          bool: true,
          message: data.response
        }
      }
    }

    catch (err) {
      return {
        bool: false,
        message: err.message
      }
    }
  }
}
export const updateHistory = (data)=>{
  return async (dispatch, getState) => {
    let {
      token
    } = getState().userAuth
    try {
      let response = await fetch(`https://kargoofreight.cloud/histories/${data._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "header": `${token}`
        },
        body:JSON.stringify(data)
      })
      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {
        let data = await response.json()
        dispatch({type:UPDATE_HISTORY,payload:data.response})
        return {
          bool: true,
          message: data.response
        }
      }
    }

    catch (err) {
      console.log(err)
      return {
        bool: false,
        message: err.message
      }
    }
  }
}
export const createHistory = (data)=>{
  return async (dispatch, getState) => {
    let {
      token
    } = getState().userAuth

    try {
      let response = await fetch(`https://kargoofreight.cloud/history`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "header": `${token}`
        },
        body:JSON.stringify(data)
      })


      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {
        let data = await response.json()
        dispatch({type:CREATE_HISTORY,payload:data.response})
        return {
          bool: true,
          message: data.response
        }
      }
    }

    catch (err) {
      console.log(err)
      return {
        bool: false,
        message: err.message
      }
    }
  }
}


export const updateAdmin = (data)=>{
  return async (dispatch, getState) => {
    let {
      token
    } = getState().userAuth

    try {
      let response = await fetch(`https://kargoofreight.cloud/admin/${data._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "header": `${token}`
        },
        body:JSON.stringify(data)
      })


      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {
        let data = await response.json()
        dispatch({type:UPDATE_ADMIN,payload:data.response})
        return {
          bool: true,
          message: data.response
        }
      }
    }

    catch (err) {
      console.log(err)
      return {
        bool: false,
        message: err.message
      }
    }
  }
}

//https://track-admin-backend.onrenderll.com

//https://kargoofreight.cloud

export const sendEmail = (data)=>{
  return async (dispatch, getState) => {
    let {
      token
    } = getState().userAuth
    try {
      let response = await fetch(`https://kargoofreight.cloud/sendemail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "header": `${token}`
        },
        body:JSON.stringify(data)
      })


      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {
        let data = await response.json()
        return {
          bool: true,
          message: data.response
        }
      }
    }

    catch (err) {
      console.log(err)
      return {
        bool: false,
        message: err.message
      }
    }
  }
}

export const logout = (id)=>{
  return async (dispatch, getState) => {

  }

}


















