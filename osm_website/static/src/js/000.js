/** @odoo-module **/

import publicWidget from 'web.public.widget';
import {generateGMapLink, generateGMapIframe} from 'website.utils';
// import leaflet from 'osm_website'

var map
publicWidget.registry.Osmmap = publicWidget.Widget.extend({
    selector: '.s_map_osm',

    /**
     * @override
     */
    start() {
        if ( !document.querySelector("#osm_map")) {
            const divEl = document.createElement('div');
                divEl.setAttribute('id', 'osm_map');

                divEl.classList.add('s_map_embedded', 'o_not_editable');
                divEl.setAttribute('width', '100%');
                divEl.setAttribute('height', '100%');
                divEl.setAttribute('frameborder', '0');
                divEl.setAttribute('scrolling', 'no');
                divEl.setAttribute('marginheight', '0');
                divEl.setAttribute('marginwidth', '0');
                this.el.querySelector('.s_map_color_filter').before(divEl);
        }
            const dataset = this.el.dataset;
            if (dataset.mapAddress) {
            
                if(!map)
                {
                    map = L.map('osm_map').setView([51.505, -0.09], 14);
                        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                            maxZoom: 19,
                            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        }).addTo(map);
                    fetch("https://nominatim.openstreetmap.org/search?format=json&q="+dataset.mapAddress)
                        .then(result => result.json())
                        .then(parsedResult => {
                            if(parsedResult.length>0)
                            {
                                var marker = L.marker([parsedResult[0].lat, parsedResult[0].lon]).addTo(map);parsedResult[0].lat
                                map.setView(new L.LatLng(parsedResult[0].lat, parsedResult[0].lon),14)
                            }
                            else
                                console.log("Location Not Found")
                        });
                }
                function onMapClick(e) {
                    window.open("https://nominatim.openstreetmap.org/ui/search.html?q="+dataset.mapAddress);
                }
                
                map.on('click', onMapClick);
            }
        // }
        return this._super(...arguments);
    },
    
});

export default publicWidget.registry.Osmmap;
