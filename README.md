# eztv-extension
> an extension for your browser to download tv series and shows provided by famous eztv group. It is avalaible in chrome/firefox. This extensions includes various features which can be seen on screenshots below

##### Links:
Chrome: https://chrome.google.com/webstore/detail/eztv-ext/opkjfbndmlgelahollaapbhhlfpfcomo?hl=ru&authuser=0
FireFox: https://addons.mozilla.org/ru/firefox/addon/eztv-fast-and-easy/

##### first launch:
![Alt text](images/ScreenInit.JPG?raw=true "scheme")
##### Search:
![Alt text](images/screen-search.png?raw=true "scheme")
##### Favs:
![Alt text](images/screen-favs.png?raw=true "scheme")
##### Eztv:
![Alt text](images/Screen-eztv.png?raw=true "scheme")
##### on error:
![Alt text](images/Screen-search-wrongjpg.jpg?raw=true "scheme")
##### history:
![Alt text](images/history.JPG?raw=true "scheme")
##### Scheme:
![Alt text](images/scheme.png?raw=true "scheme")
```sh
npm run serve - dev auto refresh
npm run build - build
```

##### todo:

- [x] filter fetched data so only  SERIES and maybe TVSHOWS are displayed (NO MOVIES) (13.10.2020) ✅
- [x] add input to change pages manually (13.10.2020) ✅
- [x] add some credits | link for eztv api (13.10.2020) ✅
- [x] favorites list should update every  time torrent search is performed,  so the searched item has index 0; (13.10.2020) ✅(array of id's will update every time fav's item search performed, re-render will hapen every app restart, imidiate rerender is commented in store/favorites.js as it's not good user experience probably) <br>:cow2::cow2::cow2:+ **release v.0.1.5**:cow2::cow2::cow2:
- [x] add info about latest downloaded file or magnet somewhere - created a page for  downloads history, it has table, filter input and pagination, fields include file link, date downloaded and file name. (08.11.2020) ✅<br>:cow2::cow2::cow2:+ **release v.0.1.6**:cow2::cow2::cow2:

