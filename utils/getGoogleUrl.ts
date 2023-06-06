function getGoogleOAuthURL() {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

  //todo env file
  const options = {
    response_type: "code",
    redirect_uri: "http://localhost:5000/api/auth/google/callback",
    client_id: "670078277317-ujnpbd7arakkeko8ceckhsskv1b0io96.apps.googleusercontent.com",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" ")
  };

  const qs = new URLSearchParams(options);
  return `${rootUrl}?${qs.toString()}`;
}

export default getGoogleOAuthURL;
