import{a as d,i as m,S as y}from"./assets/vendor-f736e62a.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();async function l(s,a){const r="https://pixabay.com/api/",o="42892988-1a177f86546a7a1e93a2f736f",e=new URLSearchParams({key:o,q:s,image_type:"photo",orientation:"horizontal",safesearch:"true",page:a,per_page:40});try{return(await d.get(`${r}?${e}`)).data}catch{throw new Error("Failed to fetch data from Pixabay API")}}function u(s){return s.map(({webformatURL:a,largeImageURL:r,tags:o,likes:e,views:t,comments:i,downloads:f})=>`
  <a class="photo-card" href="${r}" alt="${o}"><img src="${a}" alt="${o}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b><span class="value">${e}</span>
    </p>
    <p class="info-item">
      <b>Views</b><span class="value">${t}</span>
    </p>
    <p class="info-item">
      <b>Comments</b><span class="value">${i}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b><span class="value">${f}</span>
    </p>
  </div>
</a>`).join("")}const n={form:document.querySelector(".search-form"),input:document.querySelector("input"),gallery:document.querySelector(".gallery"),target:document.querySelector(".js-guard")};let c=1;const g=14;let p,h={root:null,rootMargin:"200px",threshold:0};n.form.addEventListener("submit",b);async function b(s){s.preventDefault(),n.gallery.innerHTML="";const a=n.input.value.trim().toLowerCase();document.querySelector(".loader").style.display="block";let r;try{if(r=await l(a,c),r.hits.length===0){m.show({message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"red"});return}}catch(e){console.log(e);return}document.querySelector(".loader").style.display="none";const o=u(r.hits);n.gallery.innerHTML=o,c+=1,v.observe(n.target),p=new y(".gallery a",{captionsData:"alt",captionDelay:250})}let v=new IntersectionObserver(L,h);function L(s,a){s.forEach(async r=>{if(r.isIntersecting){const o=n.input.value.trim().toLowerCase();try{const e=await l(o,c),t=u(e.hits);n.gallery.insertAdjacentHTML("beforeend",t),c+=1,p.refresh()}catch(e){console.log(e)}(!r.isIntersecting||c>=g)&&a.unobserve(n.target)}})}
//# sourceMappingURL=commonHelpers.js.map
