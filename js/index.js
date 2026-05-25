// 首页渲染函数
function renderCarousel(slidesData) {
  var container = document.querySelector(".carousel");
  var html = "";
  slidesData.forEach(function (slide, i) {
    html += '<div class="carousel-item' + (i === 0 ? " active" : "") + '">';
    html += '<img src="' + slide.img + '" alt="' + slide.alt + '" />';
    html +=
      '<div class="carousel-caption"><h3>' +
      slide.title +
      "</h3><p>" +
      slide.desc +
      "</p></div>";
    html += "</div>";
  });
  container.innerHTML = html;

  var indicators = document.querySelector(".carousel-indicators");
  var indHtml = "";
  slidesData.forEach(function (_, i) {
    indHtml +=
      '<button onclick="goToSlide(' +
      i +
      ')"' +
      (i === 0 ? ' class="active"' : "") +
      "></button>";
  });
  indicators.innerHTML = indHtml;
}

function renderNotices(noticesData) {
  var container = document.querySelector(".notice-list");
  var html = "";
  noticesData.forEach(function (notice) {
    html += "<li>";
    if (notice.tag) {
      html +=
        '<span class="notice-tag' +
        (notice.important ? " important" : "") +
        '">' +
        notice.tag +
        "</span>";
    }
    html += '<a href="pages/news.html">' + notice.title + "</a>";
    html += '<span class="notice-date">' + notice.date + "</span>";
    html += "</li>";
  });
  container.innerHTML = html;
}

function renderMotto(mottoData) {
  var container = document.querySelector(".motto-section");
  var html = "";
  html +=
    '<h2 style="border:none;margin-bottom:30px;">' + mottoData.title + "</h2>";
  html += '<div class="motto-main">' + mottoData.main + "</div>";
  html +=
    '<p class="motto-desc">' + mottoData.desc.replace(/\n/g, "<br>") + "</p>";
  html += '<div style="margin-top:30px">';
  mottoData.items.forEach(function (item) {
    html +=
      '<div class="motto-item"><h4>' +
      item.name +
      "</h4><p>" +
      item.desc +
      "</p></div>";
  });
  html += "</div>";
  container.innerHTML = html;
}

function renderQuickLinks(linksData) {
  var container = document.querySelector(".quick-links");
  var html = "";
  linksData.forEach(function (link) {
    html += '<a href="' + link.url + '" class="quick-link-item">';
    html +=
      '<div class="quick-link-icon">' +
      link.icon +
      "</div><span>" +
      link.title +
      "</span>";
    html += "</a>";
  });
  container.innerHTML = html;
}

function renderFeatures(featuresData) {
  var container = document.querySelector(".grid-3");
  var html = "";
  featuresData.forEach(function (feature) {
    html += '<article class="card">';
    html += "<h3>" + feature.title + "</h3>";
    html += "<p>" + feature.desc + "</p>";
    html += "</article>";
  });
  container.innerHTML = html;
}

function renderStats(statsData) {
  var container = document.querySelector(".stats-grid");
  var html = "";
  statsData.forEach(function (stat) {
    html += '<div class="stat-item">';
    html += '<h3 data-count="' + stat.count + '">0</h3>';
    html += "<p>" + stat.label + "</p>";
    html += "</div>";
  });
  container.innerHTML = html;
}

function renderFooter(footerData) {
  var container = document.querySelector(".footer-content");
  var html = "";

  html += '<div class="footer-section">';
  html += "<h4>联系方式</h4>";
  html += "<p>地址：" + footerData.contact.address + "</p>";
  html += "<p>电话：" + footerData.contact.phone + "</p>";
  html += "<p>邮箱：" + footerData.contact.email + "</p>";
  html += "</div>";

  html += '<div class="footer-section">';
  html += "<h4>快速链接</h4>";
  html += '<ul style="list-style:none;padding:0">';
  footerData.quickLinks.forEach(function (link) {
    html += '<li><a href="' + link.url + '">' + link.title + "</a></li>";
  });
  html += "</ul></div>";

  html += '<div class="footer-section">';
  html += "<h4>关注我们</h4>";
  html += "<p>" + footerData.social.wechat + "</p>";
  html += "<p>" + footerData.social.weibo + "</p>";
  html += "</div>";

  html += '<div class="footer-section">';
  html += "<h4>版权信息</h4>";
  html += "<p>" + footerData.copyright + "</p>";
  html += "<p>" + footerData.icp + "</p>";
  html += "</div>";

  container.innerHTML = html;
  document.querySelector(".footer-bottom p").textContent =
    footerData.bottomText;
}
