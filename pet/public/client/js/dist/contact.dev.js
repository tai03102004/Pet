"use strict";

//step 1: get DOM
var nextDom = document.getElementById('next');
var prevDom = document.getElementById('prev');
var carouselDom = document.querySelector('.carousel');
var SliderDom = carouselDom.querySelector('.carousel .list');
var thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
var thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
var timeDom = document.querySelector('.carousel .time');
thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
var timeRunning = 3000;
var timeAutoNext = 7000;

nextDom.onclick = function () {
  showSlider('next');
};

prevDom.onclick = function () {
  showSlider('prev');
};

var runTimeOut;
var runNextAuto = setTimeout(function () {
  next.click();
}, timeAutoNext);

function showSlider(type) {
  var SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
  var thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');

  if (type === 'next') {
    SliderDom.appendChild(SliderItemsDom[0]);
    thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
    carouselDom.classList.add('next');
  } else {
    SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
    thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
    carouselDom.classList.add('prev');
  }

  clearTimeout(runTimeOut);
  runTimeOut = setTimeout(function () {
    carouselDom.classList.remove('next');
    carouselDom.classList.remove('prev');
  }, timeRunning);
  clearTimeout(runNextAuto);
  runNextAuto = setTimeout(function () {
    next.click();
  }, timeAutoNext);
}