let s;
(()=>{
  let cookieText = getCookie("s");
  try {
    s = JSON.parse(cookieText);
    if (s.v != defaultSettings.v) {
      s = resetCookies();
    } // if version changed, reset cookies
  } catch (e) {
    s = resetCookies();
  }
})();

function resetCookies() {
  deleteCookie("s");
  saveSettings(defaultSettings);
  return {...defaultSettings};
}

function saveSettings(settings) {
  setCookie("s", JSON.stringify(settings));
}

function setCookie(cname, cvalue) {
  document.cookie = cname + "=" + cvalue + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function deleteCookie (name) {
  document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
