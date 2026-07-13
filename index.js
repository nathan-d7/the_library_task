(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();async function e(e,t=`all`){let n=`https://openlibrary.org/search.json?${t===`author`?`author`:`q`}=${encodeURIComponent(e)}&limit=10`;try{let e=await fetch(n,{method:`GET`,headers:{"User-Agent":`TheLibraryLearningApp, (nathandurand604@gmail.com)`}});if(!e.ok)throw Error(`Http error! status: ${e.status}`);let t=await e.json();return console.log(t.docs),t.docs||[]}catch(e){return console.error(`Failed to fetch books from Open Library`,e.message),null}}function t(){let e=localStorage.getItem(`favourites`);return e?JSON.parse(e):[]}function n(e){localStorage.setItem(`favourites`,JSON.stringify(e))}function r(e){let r=t(),i=r.find(t=>e.key===t.key),a;return a=i?r.filter(t=>t.key!==e.key):[...r,e],n(a),a}var i=`data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M12%207V21'%20stroke='%23F8F6F1'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M3%2018C2.73478%2018%202.48043%2017.8946%202.29289%2017.7071C2.10536%2017.5196%202%2017.2652%202%2017V4C2%203.73478%202.10536%203.48043%202.29289%203.29289C2.48043%203.10536%202.73478%203%203%203H8C9.06087%203%2010.0783%203.42143%2010.8284%204.17157C11.5786%204.92172%2012%205.93913%2012%207C12%205.93913%2012.4214%204.92172%2013.1716%204.17157C13.9217%203.42143%2014.9391%203%2016%203H21C21.2652%203%2021.5196%203.10536%2021.7071%203.29289C21.8946%203.48043%2022%203.73478%2022%204V17C22%2017.2652%2021.8946%2017.5196%2021.7071%2017.7071C21.5196%2017.8946%2021.2652%2018%2021%2018H15C14.2044%2018%2013.4413%2018.3161%2012.8787%2018.8787C12.3161%2019.4413%2012%2020.2044%2012%2021C12%2020.2044%2011.6839%2019.4413%2011.1213%2018.8787C10.5587%2018.3161%209.79565%2018%209%2018H3Z'%20stroke='%23F8F6F1'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e`,a=document.querySelector(`.books__list`),o=document.querySelector(`.books-section`);document.querySelector(`.books__loading-container`);var s=document.querySelector(`.favor-books-list`),c=document.querySelector(`.favor__items-counter`);function l(e){o.innerHTML=``;let n=t();e&&(n.length>0?o.classList.add(`self-start`):o.classList.remove(`self-start`),e.style.display=`flex`,o.append(e))}function u(e,t){let n=!!e.cover_i,r=`https://covers.openlibrary.org/b/id/${e.cover_i}-M.jpg`,a=t.find(t=>t.key===e.key);return`
    <article class="books__card" data-id="${e.key}">

      <div class="books__card-cover-box">
      
        ${n?`<img class="books__card-cover" src="${r}" alt="${e.title}" />`:`<div class="books__card-cover-placeholder">
          <img class="books__card-cover-placeholder--icon" src="${i}" alt="No cover" />
        </div>`}

        <button class="books__liked-icon ${a?`books__liked-icon--active`:``}">
          <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12.6667 9.33333C13.66 8.36 14.6667 7.19333 14.6667 5.66667C14.6667 4.69421 14.2804 3.76158 13.5928 3.07394C12.9051 2.38631 11.9725 2 11 2C9.82671 2 9.00004 2.33333 8.00004 3.33333C7.00004 2.33333 6.17337 2 5.00004 2C4.02758 2 3.09495 2.38631 2.40732 3.07394C1.71968 3.76158 1.33337 4.69421 1.33337 5.66667C1.33337 7.2 2.33337 8.36667 3.33337 9.33333L8.00004 14L12.6667 9.33333Z"
              stroke="#7C736A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>

      <a href="https://openlibrary.org/${e.key}" class="books__info" target="_blank">
        <span class="books__title">${e.title}</span>
        <span class="books__author text">${e.author_name?e.author_name[0]:`Unknown Author`}</span>
        <span class="books__year text">${e.first_publish_year}</span>
      </a>
  </article>
  `}function d(e,t){let n=!!e.cover_i,r=`https://covers.openlibrary.org/b/id/${e.cover_i}-S.jpg`,a=t.find(t=>t.key===e.key);return`
  
    <li class="favor__book" data-id="${e.key}">

      <a href="https://openlibrary.org/${e.key}" class="favor__book-cover-box" target="_blank">
        <img class="favor__book-cover" src="${n?r:i}" style="object-fit:${n?`cover`:`contain`}" alt="No cover">
      </a>

      <div class="favor__book-info">
        <span class="favor__book-title">${e.title}</span>
        <span class="favor__book-author text">${e.author_name?e.author_name[0]:`Unknown Author`}</span>
        <span class="favor__book-year text">${e.first_publish_year}</span>
      </div>

      <div class="favor__book-liked-icon-box ${a?`books__liked-icon--active`:``}">
        <svg width="16px" height="16px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12.6667 9.33333C13.66 8.36 14.6667 7.19333 14.6667 5.66667C14.6667 4.69421 14.2804 3.76158 13.5928 3.07394C12.9051 2.38631 11.9725 2 11 2C9.82671 2 9.00004 2.33333 8.00004 3.33333C7.00004 2.33333 6.17337 2 5.00004 2C4.02758 2 3.09495 2.38631 2.40732 3.07394C1.71968 3.76158 1.33337 4.69421 1.33337 5.66667C1.33337 7.2 2.33337 8.36667 3.33337 9.33333L8.00004 14L12.6667 9.33333Z"
            stroke="#7C736A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
    </li>
  
  `}function f(e){l(null),a.style.display=`grid`;let n=t();a.innerHTML=e.map(e=>u(e,n)).join(``),o.append(a)}function p(e){if(!e.length){console.log(e),s.innerHTML=`<li class="favor-books-list--empty text">Your favourite books list is empty</li>`,c.textContent=`0`;return}let n=t();c.textContent=e.length,s.innerHTML=e.map(e=>d(e,n)).join(``)}var m=document.documentElement;function h(){let e=document.querySelector(`.toggle-theme-button`);if(!e)return;let t=localStorage.getItem(`theme`)||`light`;g(e,t),m.setAttribute(`data-theme`,t),e.addEventListener(`click`,()=>{let t=m.getAttribute(`data-theme`)===`light`?`dark`:`light`;g(e,t),m.setAttribute(`data-theme`,t),localStorage.setItem(`theme`,t)})}function g(e,t){e.innerHTML=``,e.innerHTML=t===`light`?`
    <svg class="toggle-theme-icon" width="16" height="16" viewBox="0 0 24 24" stroke="currentColor"
      stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  `:`
    <svg class="toggle-theme-icon" width="16" height="16" viewBox="0 0 16 16">
      <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
    </svg>
  `}var _=document.querySelector(`.search__box`),v=document.querySelector(`.search__input`),y=document.querySelector(`.books-section`),b=document.querySelector(`.books__loading-container`),x=document.querySelector(`.books__search--empty-query-container`),S=document.querySelector(`.favor-books-list`),C=document.querySelector(`.books-api__fail-container`),w=document.querySelector(`.search__mode-select-box`),T=[];function E(){h();let n=t();n&&n.length>0?(p(n),f(n),T=n):p([]),_.addEventListener(`submit`,async t=>{t.preventDefault();let n=v.value.trim(),r=w.value;if(!n){l(x);return}l(b),v.value=``;let i=await e(n,r);if(b.style.display=`none`,!i){l(C),T=[];return}T=i,f(i)});function i(e,n){let i=n?`.favor__book-liked-icon-box`:`.books__liked-icon`,a=n?`.favor__book`:`.books__card`,o=e.target.closest(i);if(!o)return;let s=o.closest(a).dataset.id,c;if(c=n?t().find(e=>e.key===s):T.find(e=>e.key===s),c)if(p(r(c)),n){let e=y.querySelector(`[data-id="${s}"]`);if(e){let t=e.querySelector(`.books__liked-icon`);t&&t.classList.remove(`books__liked-icon--active`)}}else o.classList.toggle(`books__liked-icon--active`);else return}y.addEventListener(`click`,e=>i(e,!1)),S.addEventListener(`click`,e=>i(e,!0))}E();