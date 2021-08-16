const jsonp = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    const query = Object.entries(data)
      .map((a) => `${a[0]}=${a[1]}`)
      .join("&");
    window.__fn__ = (dataReceive) => {
      resolve(dataReceive);
    };
    const script = document.createElement("script");
    script.src = url + "?callback=__fn__&" + query;
    script.onerror = () => {
      reject("err");
    };
    document.head.appendChild(script);
    document.head.removeChild(script);
  });
};

jsonp("http://api.jirengu.com/getWeather.php", { city: "北京" })
  .then((data) => {
    console.log(data);
  })
  .catch((e) => console.log(e));
