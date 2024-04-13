/** @odoo-module **/

import {_t} from 'web.core';
import options from 'web_editor.snippets.options';
import {generateGMapIframe, generateGMapLink} from 'website.utils';


options.registry.Osmmap = options.Class.extend({
    selector: '.s_map_osm',

    /**
     * @override
     */
    onBuilt() {
        if ( !document.querySelector("#osm_map")){

            const divEl = document.createElement('div');
            const aEl = document.createElement('a');
            aEl.setAttribute('id', 'osm_map_link');
            divEl.setAttribute('id', 'osm_map');

            divEl.classList.add('row');
            divEl.setAttribute('width', '100%');
            divEl.setAttribute('height', '100%');
            divEl.setAttribute('frameborder', '0');
            divEl.setAttribute('scrolling', 'no');
            divEl.setAttribute('marginheight', '0');
            divEl.setAttribute('marginwidth', '0');

            this.$target[0].querySelector('.s_map_osm_color_filter').before(divEl);
            this.$target[0].querySelector('.s_map_osm_color_filter').before(divEl);

           
        }
    },
    // destroy()
    // {
    //     this.$target[0].querySelector('#osm_map').remove()
    // }


});

export default {
    Map: options.registry.Osmmap,
};