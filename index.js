/**
 * @file mofron-effect-hovshadow/index.js
 * @brief effect module template for developper
 * @license MIT
 */
//const Click   = require("mofron-event-click"); 
const MouseUp   = require("mofron-event-mouseup");
const MouseDown = require("mofron-event-mousedown");
const Shadow    = require("mofron-effect-shadow");
const ConfArg   = mofron.class.ConfArg;
const comutl    = mofron.util.common;

module.exports = class extends mofron.class.Effect {
    /**
     * initialize effect
     * 
     * @param (mixed) 
     *                key-value: effect config
     * @short
     * @type private
     */
    constructor (p1) {
        try {
            super();
            this.modname("clkbutton");
            this.shortForm("value");
            
	    super.eid(-100);
            this.confmng().add("value", { type:"size", init:"0.06rem" });
            this.confmng().add("direct_top", { type:"boolean", init:true });
            this.confmng().add("direct_left", { type:"boolean", init:false });
            
            /* init config */
	    if (0 < arguments.length) {
                this.config(p1);
	    }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    direct (p1,p2) {
        try {
            if (undefined === p1) {
                return [this.confmng("direct_top"),this.confmng("direct_left")];
            }
            if (undefined !== p1) {
                this.confmng("direct_top",p1);
            }
            if (undefined !== p2) {
                this.confmng("direct_left",p2);
            }
        } catch (e) {   
            console.error(e.stack);
            throw e;    
        }
    }

    value (prm) {
        try {
            return this.confmng("value",prm);
        } catch (e) { 
            console.error(e.stack);
            throw e;
        }
    }
    
    component (prm) {
        try {
            let ret = super.component(prm);
            if (undefined !== prm) {
                let eff_btn = this;
                let mouse_evt = (p1,p2,p3) => {
                    try {
                        eff_btn.contents(eff_btn, p3, eff_btn.component());
		    } catch (e) {
                        console.error(e.stack);
                        throw e;
                    }
		};
                prm.event([
                    new MouseUp(new ConfArg(mouse_evt,false)),
		    new MouseDown(new ConfArg(mouse_evt,true))
		]);
                prm.style({ 'position':'relative' });
	    }
	    return ret;
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * effect contents
     * 
     * @type private
     */
    contents (p1,p2,p3) {
        try {
	    let direct = this.direct();
            if (true === p2) {
	        if (true === direct[0]) {
                    p3.style({ 'top': p1.value() });
		}
		if (true === direct[1]) {
                    p3.style({ 'left': p1.value() });
		}
            } else {
                if (true === direct[0]) {
                    p3.style({ 'top': '0rem' });
                }
                if (true === direct[1]) {
                    p3.style({ 'left': '0rem' });
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
