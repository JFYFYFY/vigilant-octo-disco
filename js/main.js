// 江苏师范大学网站 JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // 初始化轮播图
  initCarousel();

  // 初始化导航高亮
  initNavigation();

  // 初始化通知滚动
  initNoticeScroll();

  // 初始化图片画廊
  initGallery();

  // 初始化统计计数动画
  initCountAnimation();

  // 初始化表单验证
  initFormValidation();

  // 初始化时间显示
  initTimeDisplay();
});

// 轮播图功能
function initCarousel() {
  const carousel = document.getElementById("carousel");
  if (!carousel) return;

  const items = carousel.querySelectorAll(".carousel-item");
  const prevBtn = carousel.querySelector(".carousel-controls.prev");
  const nextBtn = carousel.querySelector(".carousel-controls.next");
  const indicators = carousel.querySelectorAll(".carousel-indicators button");

  if (items.length === 0) return;

  let currentIndex = 0;
  let autoPlayInterval;

  // 显示指定索引的图片
  function showSlide(index) {
    if (index < 0) index = items.length - 1;
    if (index >= items.length) index = 0;

    // 移除所有活跃状态
    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove("active");
      if (indicators[i]) indicators[i].classList.remove("active");
    }

    // 添加活跃状态到当前图片
    items[index].classList.add("active");
    if (indicators[index]) indicators[index].classList.add("active");

    currentIndex = index;
  }

  // 下一个图片
  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  // 上一个图片
  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  // 自动播放
  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 4000);
  }

  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  // 绑定事件
  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      prevSlide();
      stopAutoPlay();
      startAutoPlay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      nextSlide();
      stopAutoPlay();
      startAutoPlay();
    });
  }

  // 指示器点击
  for (let i = 0; i < indicators.length; i++) {
    indicators[i].addEventListener("click", function () {
      showSlide(i);
      stopAutoPlay();
      startAutoPlay();
    });
  }

  // 鼠标悬停暂停
  carousel.addEventListener("mouseenter", stopAutoPlay);
  carousel.addEventListener("mouseleave", startAutoPlay);

  // 触摸滑动支持
  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener("touchstart", function (e) {
    touchStartX = e.changedTouches[0].screenX;
  });

  carousel.addEventListener("touchend", function (e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (diff > swipeThreshold) {
      nextSlide();
    } else if (diff < -swipeThreshold) {
      prevSlide();
    }
  }

  // 开始自动播放
  startAutoPlay();
}

// 导航高亮
function initNavigation() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll("nav ul li a");

  for (let i = 0; i < navLinks.length; i++) {
    const href = navLinks[i].getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      navLinks[i].classList.add("active");
    }
  }
}

// 通知滚动效果
function initNoticeScroll() {
  const noticeList = document.querySelector(".notice-list");
  if (!noticeList) return;

  // 添加鼠标悬停停止滚动
  noticeList.addEventListener("mouseenter", function () {
    noticeList.style.animationPlayState = "paused";
  });

  noticeList.addEventListener("mouseleave", function () {
    noticeList.style.animationPlayState = "running";
  });
}

// 图片画廊
function initGallery() {
  const galleryItems = document.querySelectorAll(".gallery-item");

  for (let i = 0; i < galleryItems.length; i++) {
    galleryItems[i].addEventListener("click", function () {
      const img = this.querySelector("img");
      const overlay = this.querySelector(".gallery-overlay");
      if (overlay) {
        overlay.style.transform =
          overlay.style.transform === "translateY(0px)"
            ? ""
            : "translateY(0px)";
      }
    });
  }
}

// 统计计数动画
function initCountAnimation() {
  const statNumbers = document.querySelectorAll(".stat-item h3[data-count]");

  if (statNumbers.length === 0) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const target = entry.target;
          const count = parseInt(target.getAttribute("data-count"));
          animateCount(target, count);
          observer.unobserve(target);
        }
      });
    },
    { threshold: 0.5 },
  );

  statNumbers.forEach(function (num) {
    observer.observe(num);
  });
}

function animateCount(element, target) {
  let current = 0;
  const increment = target / 50;
  const duration = 1500;
  const stepTime = duration / 50;

  const timer = setInterval(function () {
    current += increment;
    if (current >= target) {
      element.textContent = target + "+";
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current) + "+";
    }
  }, stepTime);
}

// 表单验证
function initFormValidation() {
  const forms = document.querySelectorAll("form");

  for (let i = 0; i < forms.length; i++) {
    forms[i].addEventListener("submit", function (e) {
      const requiredFields = this.querySelectorAll("[required]");
      let isValid = true;

      for (let j = 0; j < requiredFields.length; j++) {
        if (!requiredFields[j].value.trim()) {
          isValid = false;
          requiredFields[j].style.borderColor = "#dc3545";
        } else {
          requiredFields[j].style.borderColor = "#ddd";
        }
      }

      if (!isValid) {
        e.preventDefault();
        alert("请填写所有必填项！");
      }
    });
  }
}

// 时间显示
function initTimeDisplay() {
  const timeElements = document.querySelectorAll(".current-time");

  if (timeElements.length === 0) return;

  function updateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");

    const timeString =
      year +
      "年" +
      month +
      "月" +
      date +
      "日 " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds;

    for (let i = 0; i < timeElements.length; i++) {
      timeElements[i].textContent = timeString;
    }
  }

  updateTime();
  setInterval(updateTime, 1000);
}

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href === "#") return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// 回到顶部
function createBackToTopButton() {
  const btn = document.createElement("button");
  btn.innerHTML = "↑";
  btn.className = "back-to-top";
  btn.style.cssText =
    "position:fixed;bottom:30px;right:30px;width:50px;height:50px;border-radius:50%;background:linear-gradient(135deg,#1a5f7a,#2d8f6f);color:white;border:none;font-size:24px;cursor:pointer;opacity:0;transition:opacity 0.3s;z-index:999;";

  document.body.appendChild(btn);

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      btn.style.opacity = "1";
    } else {
      btn.style.opacity = "0";
    }
  });

  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

createBackToTopButton();
