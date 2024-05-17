import{a as u,i as l,S as p}from"./assets/vendor-f736e62a.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();async function d(n){const t="https://pixabay.com/api/",a="42892988-1a177f86546a7a1e93a2f736f",s=new URLSearchParams({key:a,q:n,image_type:"photo",orientation:"horizontal",safesearch:"true",page:1,per_page:40});try{return(await u.get(`${t}?${s}`)).data}catch{throw new Error("Failed to fetch data from Pixabay API")}}function f(n){return n.map(({webformatURL:t,largeImageURL:a,tags:s,likes:e,views:r,comments:i,downloads:c})=>`
  <a class="photo-card" href="${a}" alt="${s}"><img src="${t}" alt="${s}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b><span class="value">${e}</span>
    </p>
    <p class="info-item">
      <b>Views</b><span class="value">${r}</span>
    </p>
    <p class="info-item">
      <b>Comments</b><span class="value">${i}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b><span class="value">${c}</span>
    </p>
  </div>
</a>`).join("")}const o={form:document.querySelector(".search-form"),input:document.querySelector("input"),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader")};o.form.addEventListener("submit",y);async function y(n){n.preventDefault();const t=o.input.value.toLowerCase();if(!t||t.includes(" ")){o.gallery.innerHTML="",l.show({message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"red"}),o.loader.style.display="none";return}o.loader.style.display="block",o.gallery.innerHTML="";let a;try{if(a=await d(t),a.hits.length===0){o.loader.style.display="none",l.show({message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"red"});return}}catch(e){console.log(e);return}o.loader.style.display="none";const s=f(a.hits);o.gallery.innerHTML=s,new p(".gallery a",{captionsData:"alt",captionDelay:250})}
//# sourceMappingURL=commonHelpers.js.map
