module.exports = {
    title: "Lucas文档库",
    base:"/front-end-progress-track/", 
    description: "Lucas document collection",
    head: [
      ["link", { rel: "icon", href: "compass.svg" }],
    ],
    markdown: {
      lineNumbers: true,
    },
    themeConfig: {
      logo: '/compass.svg',
      nav: require("./nav.js"),
      sidebar: require("./sidebar.js"),
      collapsable:true,
      sidebarDepth: 2,
      lastUpdated: "Last Updated",
      searchMaxSuggestoins: 10,
      serviceWorker: {
        updatePopup: {
          message: "有新的内容.",
          buttonText: "更新",
        },
      },
      editLinks: true,
      editLinkText: "在 GitHub 上编辑此页 ！",
    },
  
  };
  