function getGoogleOAuthURL() {
  const rootUrl = process.env.NEXT_PUBLIC_GOOGLE_ROOT_URL;

  //todo env file
  const options = {
    response_type: "code",
    redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_CALLBACK || "",
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" ")
  };

  const qs = new URLSearchParams(options);
  return `${rootUrl}?${qs.toString()}`;
}

export default getGoogleOAuthURL;
