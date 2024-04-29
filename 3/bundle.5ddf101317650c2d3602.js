(()=>{"use strict";function e(e){const t=document.createElement("div");return t.innerHTML=e,t.firstElementChild}function t(e,t,n="beforeend"){t.insertAdjacentElement(n,e.getElement())}const n=["Day","Event","Time","Price","Offers"];class s{getTemplate(){return`\n  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n    ${n.map((e=>(e=>{const t=e.toLowerCase();return`\n    <div class="trip-sort__item  trip-sort__item--${t}">\n      <input id="sort-${t}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>\n      <label class="trip-sort__btn" for="sort-${t}">${e}</label>\n    </div>`})(e))).join("")}\n  </form>\n`}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}const i=["Taxi","Bus","Train","Ship","Drive","Flight","Check-in","Sightseeing","Restaurant"],l=[{type:"luggage",prefix:"Add"},{type:"comfort",prefix:"Switch to"},{type:"meal",prefix:"Add"},{type:"seats",prefix:"Choose"},{type:"train",prefix:"Travel by"}],a=(e,t)=>`\n  <label class="visually-hidden" for="event-${e}-time-1">From</label>\n  <input class="event__input  event__input--time" id="event-${e}-time-1" type="text" name="event-${e}-time" value="${t}">`;class o{getTemplate(){return((e=!1)=>`\n  <form class="event event--edit" action="#" method="post">\n    <header class="event__header">\n      <div class="event__type-wrapper">\n        <label class="event__type  event__type-btn" for="event-type-toggle-1">\n          <span class="visually-hidden">Choose event type</span>\n          <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">\n        </label>\n        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n\n        <div class="event__type-list">\n          <fieldset class="event__type-group">\n            <legend class="visually-hidden">Event type</legend>\n            ${i.map((e=>(e=>{const t=e.toLowerCase();return`\n  <div class="event__type-item">\n    <input id="event-type-${t}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${t}">\n    <label class="event__type-label  event__type-label--${t}" for="event-type-${t}-1">${e}</label>\n  </div>`})(e))).join("")}\n          </fieldset>\n        </div>\n      </div>\n\n      <div class="event__field-group  event__field-group--destination">\n        <label class="event__label  event__type-output" for="event-destination-1">\n          Flight\n        </label>\n        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Chamonix" list="destination-list-1">\n        <datalist id="destination-list-1">\n          <option value="Amsterdam"></option>\n          <option value="Geneva"></option>\n          <option value="Chamonix"></option>\n        </datalist>\n      </div>\n\n      \n  <div class="event__field-group  event__field-group--time">\n    ${a("start","18/03/19 12:25")}\n    &mdash;\n    ${a("end","18/03/19 13:35")}\n  </div>\n\n\n      <div class="event__field-group  event__field-group--price">\n        <label class="event__label" for="event-price-1">\n          <span class="visually-hidden">Price</span>\n          &euro;\n        </label>\n        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="160">\n      </div>\n\n      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n      <button class="event__reset-btn" type="reset">Delete</button>\n      <button class="event__rollup-btn" type="button">\n        <span class="visually-hidden">Open event</span>\n      </button>\n    </header>\n    <section class="event__details">\n      <section class="event__section  event__section--offers">\n        <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n\n        <div class="event__available-offers">\n          ${l.map((e=>(({type:e,prefix:t},n="")=>`\n  <div class="event__offer-selector">\n    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${e}-1" type="checkbox" name="event-offer-${e}" ${n}>\n    <label class="event__offer-label" for="event-offer-${e}-1">\n      <span class="event__offer-title">${t} ${e}</span>\n      &plus;&euro;&nbsp;\n      <span class="event__offer-price">50</span>\n    </label>\n  </div>\n  `)(e))).join("")}\n        </div>\n      </section>\n\n      <section class="event__section  event__section--destination">\n        <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n        <p class="event__destination-description">Chamonix-Mont-Blanc (usually shortened to Chamonix) is a resort area near the junction of France, Switzerland and Italy. At the base of Mont Blanc, the highest summit in the Alps, it's renowned for its skiing.</p>\n      </section>\n\n      ${e?'\n  <section class="event__section  event__section--destination">\n    <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n    <p class="event__destination-description">Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.</p>\n\n    <div class="event__photos-container">\n      <div class="event__photos-tape">\n        <img class="event__photo" src="img/photos/1.jpg" alt="Event photo">\n        <img class="event__photo" src="img/photos/2.jpg" alt="Event photo">\n        <img class="event__photo" src="img/photos/3.jpg" alt="Event photo">\n        <img class="event__photo" src="img/photos/4.jpg" alt="Event photo">\n        <img class="event__photo" src="img/photos/5.jpg" alt="Event photo">\n      </div>\n    </div>\n  </section>\n  ':""}\n    </section>\n  </form>\n`)(!0)}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class r{getTemplate(){return'\n  <li class="trip-events__item">\n    <div class="event">\n      <time class="event__date" datetime="2019-03-18">MAR 18</time>\n      <div class="event__type">\n        <img class="event__type-icon" width="42" height="42" src="img/icons/flight.png" alt="Event type icon">\n      </div>\n      <h3 class="event__title">Flight Chamonix</h3>\n      <div class="event__schedule">\n        <p class="event__time">\n          <time class="event__start-time" datetime="2019-03-18T12:25">12:25</time>\n          &mdash;\n          <time class="event__end-time" datetime="2019-03-18T13:35">13:35</time>\n        </p>\n        <p class="event__duration">01H 10M</p>\n      </div>\n      <p class="event__price">\n        &euro;&nbsp;<span class="event__price-value">160</span>\n      </p>\n      <h4 class="visually-hidden">Offers:</h4>\n      <ul class="event__selected-offers">\n        <li class="event__offer">\n          <span class="event__offer-title">Add luggage</span>\n          &plus;&euro;&nbsp;\n          <span class="event__offer-price">50</span>\n        </li>\n        <li class="event__offer">\n          <span class="event__offer-title">Switch to comfort</span>\n          &plus;&euro;&nbsp;\n          <span class="event__offer-price">80</span>\n        </li>\n      </ul>\n      <button class="event__favorite-btn" type="button">\n        <span class="visually-hidden">Add to favorite</span>\n        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n        </svg>\n      </button>\n      <button class="event__rollup-btn" type="button">\n        <span class="visually-hidden">Open event</span>\n      </button>\n    </div>\n  </li>\n'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class p{getTemplate(){return'\n  <ul class="trip-events__list">\n  </ul>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class c{constructor(e){this.container=e}init(){t(new s,this.container);const e=new p;t(e,this.container),t(new o,e.getElement());for(let n=0;n<3;n++)t(new r,e.getElement())}}const v=["Everything","Future","present","Past"];class _{getTemplate(){return`\n  <form class="trip-filters" action="#" method="get">\n    ${v.map((e=>(e=>{const t=e.toLowerCase();return`\n    <div class="trip-filters__filter">\n      <input id="filter-${t}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${t}" checked>\n      <label class="trip-filters__filter-label" for="filter-${t}">${e}</label>\n    </div>`})(e))).join("")}\n\n    <button class="visually-hidden" type="submit">Accept filter</button>\n  </form>\n`}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}(()=>{const e=document.querySelector(".trip-events"),n=document.querySelector(".trip-controls__filters");new c(e).init(),t(new _,n)})()})();
//# sourceMappingURL=bundle.5ddf101317650c2d3602.js.map