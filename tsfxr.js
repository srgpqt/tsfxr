(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["tsfxr"] = factory();
	else
		root["tsfxr"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var descriptor_1 = __webpack_require__(1);
	exports.Shape = descriptor_1.Shape;
	exports.makeDescriptor = descriptor_1.makeDescriptor;
	var synth_1 = __webpack_require__(3);
	exports.synthesizeSamples = synth_1.default;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var extend_1 = __webpack_require__(2);
	(function (Shape) {
	    Shape[Shape["Square"] = 0] = "Square";
	    Shape[Shape["Sawtooth"] = 1] = "Sawtooth";
	    Shape[Shape["Sine"] = 2] = "Sine";
	    Shape[Shape["Noise"] = 3] = "Noise";
	})(exports.Shape || (exports.Shape = {}));
	var Shape = exports.Shape;
	function makeDescriptor(params) {
	    return extend_1["default"]({
	        wave_type: Shape.Square,
	        p_base_freq: 0.3,
	        p_freq_limit: 0.0,
	        p_freq_ramp: 0.0,
	        p_freq_dramp: 0.0,
	        p_duty: 0.0,
	        p_duty_ramp: 0.0,
	        p_vib_strength: 0.0,
	        p_vib_speed: 0.0,
	        p_vib_delay: 0.0,
	        p_env_attack: 0.0,
	        p_env_sustain: 0.3,
	        p_env_decay: 0.4,
	        p_env_punch: 0.0,
	        p_lpf_resonance: 0.0,
	        p_lpf_freq: 1.0,
	        p_lpf_ramp: 0.0,
	        p_hpf_freq: 0.0,
	        p_hpf_ramp: 0.0,
	        p_pha_offset: 0.0,
	        p_pha_ramp: 0.0,
	        p_repeat_speed: 0.0,
	        p_arp_speed: 0.0,
	        p_arp_mod: 0.0,
	        sound_vol: 0.25
	    }, params);
	}
	exports.makeDescriptor = makeDescriptor;


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	var hasOwn = {}.hasOwnProperty;
	function extend(target) {
	    var sources = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        sources[_i - 1] = arguments[_i];
	    }
	    for (var i = 0; i < sources.length; ++i) {
	        var src = sources[i];
	        if (src) {
	            for (var key in src) {
	                if (hasOwn.call(src, key)) {
	                    target[key] = src[key];
	                }
	            }
	        }
	    }
	    return target;
	}
	exports.__esModule = true;
	exports["default"] = extend;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var descriptor_1 = __webpack_require__(1);
	function synthesizeSamples(desc) {
	    var phase = 0;
	    var fperiod = 0;
	    var fmaxperiod = 0;
	    var fslide = 0;
	    var fdslide = 0;
	    var period = 0;
	    var square_duty = 0;
	    var square_slide = 0;
	    // reset filter
	    var fltp = 0.0;
	    var fltdp = 0.0;
	    var fltw = Math.pow(desc.p_lpf_freq, 3.0) * 0.1;
	    var fltw_d = 1.0 + desc.p_lpf_ramp * 0.0001;
	    var fltdmp = 5.0 / (1.0 + Math.pow(desc.p_lpf_resonance, 2.0) * 20.0) * (0.01 + fltw);
	    if (fltdmp > 0.8)
	        fltdmp = 0.8;
	    var fltphp = 0.0;
	    var flthp = Math.pow(desc.p_hpf_freq, 2.0) * 0.1;
	    var flthp_d = 1.0 + desc.p_hpf_ramp * 0.0003;
	    // reset vibrato
	    var vib_phase = 0.0;
	    var vib_speed = Math.pow(desc.p_vib_speed, 2.0) * 0.01;
	    var vib_amp = desc.p_vib_strength * 0.5;
	    // reset envelope
	    var env_vol = 0.0;
	    var env_stage = 0;
	    var env_time = 0;
	    var env_length = [
	        Math.round(desc.p_env_attack * desc.p_env_attack * 100000.0),
	        Math.round(desc.p_env_sustain * desc.p_env_sustain * 100000.0),
	        Math.round(desc.p_env_decay * desc.p_env_decay * 100000.0)
	    ];
	    var fphase = Math.pow(desc.p_pha_offset, 2.0) * 1020.0;
	    if (desc.p_pha_offset < 0.0)
	        fphase = -fphase;
	    var fdphase = Math.pow(desc.p_pha_ramp, 2.0) * 1.0;
	    if (desc.p_pha_ramp < 0.0)
	        fdphase = -fdphase;
	    var iphase = Math.abs(Math.round(fphase));
	    var ipp = 0;
	    var phaser_buffer = [];
	    for (var i = 0; i < 1024; i++) {
	        phaser_buffer.push(0.0);
	    }
	    var noise_buffer = [];
	    for (var i = 0; i < 32; i++) {
	        noise_buffer.push(Math.random() * 2.0 - 1.0);
	    }
	    var rep_time = 0;
	    var rep_limit = Math.round(Math.pow(1.0 - desc.p_repeat_speed, 2.0) * 20000 + 32);
	    if (desc.p_repeat_speed === 0.0) {
	        rep_limit = 0;
	    }
	    var arp_time = 0;
	    var arp_limit = 0;
	    var arp_mod = 0.0;
	    function restart() {
	        fperiod = 100.0 / (desc.p_base_freq * desc.p_base_freq + 0.001);
	        period = Math.round(fperiod);
	        fmaxperiod = 100.0 / (desc.p_freq_limit * desc.p_freq_limit + 0.001);
	        fslide = 1.0 - Math.pow(desc.p_freq_ramp, 3.0) * 0.01;
	        fdslide = -Math.pow(desc.p_freq_dramp, 3.0) * 0.000001;
	        square_duty = 0.5 - desc.p_duty * 0.5;
	        square_slide = -desc.p_duty_ramp * 0.00005;
	        if (desc.p_arp_mod >= 0.0) {
	            arp_mod = 1.0 - Math.pow(desc.p_arp_mod, 2.0) * 0.9;
	        }
	        else {
	            arp_mod = 1.0 + Math.pow(desc.p_arp_mod, 2.0) * 10.0;
	        }
	        arp_time = 0;
	        arp_limit = Math.round(Math.pow(1.0 - desc.p_arp_speed, 2.0) * 20000 + 32);
	        if (desc.p_arp_speed === 1.0) {
	            arp_limit = 0;
	        }
	    }
	    restart();
	    var synthesizing = true, samples = [];
	    while (synthesizing) {
	        rep_time++;
	        if (rep_limit !== 0 && rep_time >= rep_limit) {
	            rep_time = 0;
	            restart();
	        }
	        // frequency envelopes / arpeggios
	        arp_time++;
	        if (arp_limit !== 0 && arp_time >= arp_limit) {
	            arp_limit = 0;
	            fperiod *= arp_mod;
	        }
	        fslide += fdslide;
	        fperiod *= fslide;
	        if (fperiod > fmaxperiod) {
	            fperiod = fmaxperiod;
	            if (desc.p_freq_limit > 0.0) {
	                synthesizing = false;
	            }
	        }
	        var rfperiod = fperiod;
	        if (vib_amp > 0.0) {
	            vib_phase += vib_speed;
	            rfperiod = fperiod * (1.0 + Math.sin(vib_phase) * vib_amp);
	        }
	        period = Math.round(rfperiod);
	        if (period < 8)
	            period = 8;
	        square_duty += square_slide;
	        if (square_duty < 0.0)
	            square_duty = 0.0;
	        if (square_duty > 0.5)
	            square_duty = 0.5;
	        // volume envelope
	        env_time++;
	        if (env_time > env_length[env_stage]) {
	            env_time = 0;
	            env_stage++;
	            if (env_stage === 3) {
	                synthesizing = false;
	            }
	        }
	        if (env_stage === 0) {
	            env_vol = env_time / env_length[0];
	        }
	        if (env_stage === 1) {
	            env_vol = 1.0 + Math.pow(1.0 - env_time / env_length[1], 1.0) * 2.0 * desc.p_env_punch;
	        }
	        if (env_stage === 2) {
	            env_vol = 1.0 - env_time / env_length[2];
	        }
	        // phaser step
	        fphase += fdphase;
	        iphase = Math.abs(Math.round(fphase));
	        if (iphase > 1023)
	            iphase = 1023;
	        if (flthp_d !== 0.0) {
	            flthp *= flthp_d;
	            if (flthp < 0.00001)
	                flthp = 0.00001;
	            if (flthp > 0.1)
	                flthp = 0.1;
	        }
	        var ssample = 0.0;
	        for (var si = 0; si < 8; si++) {
	            var sample = 0.0;
	            phase++;
	            if (phase >= period) {
	                //				phase = 0;
	                phase %= period;
	                if (desc.wave_type === descriptor_1.Shape.Noise) {
	                    for (var i = 0; i < 32; i++) {
	                        noise_buffer[i] = Math.random() * 2.0 - 1.0;
	                    }
	                }
	            }
	            // base waveform
	            var fp = phase / period;
	            switch (desc.wave_type) {
	                case descriptor_1.Shape.Square:
	                    sample = (fp < square_duty) ? 0.5 : -0.5;
	                    break;
	                case descriptor_1.Shape.Sawtooth:
	                    sample = 1.0 - fp * 2;
	                    break;
	                case descriptor_1.Shape.Sine:
	                    sample = Math.sin(fp * 2 * Math.PI);
	                    break;
	                case descriptor_1.Shape.Noise:
	                    sample = noise_buffer[Math.floor(phase * 32 / period)];
	                    break;
	            }
	            // lp filter
	            var pp = fltp;
	            fltw *= fltw_d;
	            if (fltw < 0.0)
	                fltw = 0.0;
	            if (fltw > 0.1)
	                fltw = 0.1;
	            if (desc.p_lpf_freq !== 1.0) {
	                fltdp += (sample - fltp) * fltw;
	                fltdp -= fltdp * fltdmp;
	            }
	            else {
	                fltp = sample;
	                fltdp = 0.0;
	            }
	            fltp += fltdp;
	            // hp filter
	            fltphp += fltp - pp;
	            fltphp -= fltphp * flthp;
	            sample = fltphp;
	            // phaser
	            phaser_buffer[ipp & 1023] = sample;
	            sample += phaser_buffer[(ipp - iphase + 1024) & 1023];
	            ipp = (ipp + 1) & 1023;
	            // final accumulation and envelope application
	            ssample += sample * env_vol;
	        }
	        ssample = ssample / 8 * 2.0 * desc.sound_vol;
	        if (ssample > 1.0)
	            ssample = 1.0;
	        if (ssample < -1.0)
	            ssample = -1.0;
	        samples.push(ssample);
	    }
	    return samples;
	}
	exports.__esModule = true;
	exports["default"] = synthesizeSamples;


/***/ }
/******/ ])
});
;
//# sourceMappingURL=tsfxr.js.map