/******/ (function(modules) { // webpackBootstrap
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
	var synth_1 = __webpack_require__(3);
	var generators = __webpack_require__(4);
	function getInputElementById(id) {
	    return document.getElementById(id);
	}
	var wav_bits = 16;
	var wav_freq = 44100;
	var currentDescriptor = descriptor_1.makeDescriptor();
	function setDescriptor(desc, shouldUpdateUI) {
	    if (shouldUpdateUI === void 0) { shouldUpdateUI = true; }
	    currentDescriptor = desc;
	    playDescriptor(desc);
	    if (shouldUpdateUI) {
	        updateUI(desc);
	    }
	}
	document.addEventListener('DOMContentLoaded', function () {
	    updateUI(currentDescriptor);
	});
	function playDescriptor(desc) {
	    var samples = synth_1["default"](desc);
	    playSamples(samples, wav_freq);
	}
	function playSamples(samples, sampleRate) {
	    var ctx = new AudioContext();
	    var buffer = ctx.createBuffer(1, samples.length, sampleRate);
	    var data = buffer.getChannelData(0);
	    for (var i = 0; i < samples.length; i++) {
	        data[i] = samples[i];
	    }
	    var proc = ctx.createBufferSource();
	    proc.buffer = buffer;
	    proc.connect(ctx.destination);
	    proc.start();
	}
	function updateUI(desc) {
	    switch (desc.wave_type) {
	        case descriptor_1.Shape.Square:
	            getInputElementById('wave_type_square').checked = true;
	            break;
	        case descriptor_1.Shape.Sawtooth:
	            getInputElementById('wave_type_sawtooth').checked = true;
	            break;
	        case descriptor_1.Shape.Sine:
	            getInputElementById('wave_type_sine').checked = true;
	            break;
	        case descriptor_1.Shape.Noise:
	            getInputElementById('wave_type_noise').checked = true;
	            break;
	    }
	    getInputElementById('sound_vol').value = '' + desc.sound_vol;
	    getInputElementById('p_env_attack').value = '' + desc.p_env_attack;
	    getInputElementById('p_env_sustain').value = '' + desc.p_env_sustain;
	    getInputElementById('p_env_punch').value = '' + desc.p_env_punch;
	    getInputElementById('p_env_decay').value = '' + desc.p_env_decay;
	    getInputElementById('p_base_freq').value = '' + desc.p_base_freq;
	    getInputElementById('p_freq_limit').value = '' + desc.p_freq_limit;
	    getInputElementById('p_freq_ramp').value = '' + desc.p_freq_ramp;
	    getInputElementById('p_freq_dramp').value = '' + desc.p_freq_dramp;
	    getInputElementById('p_vib_strength').value = '' + desc.p_vib_strength;
	    getInputElementById('p_vib_speed').value = '' + desc.p_vib_speed;
	    getInputElementById('p_arp_mod').value = '' + desc.p_arp_mod;
	    getInputElementById('p_arp_speed').value = '' + desc.p_arp_speed;
	    getInputElementById('p_duty').value = '' + desc.p_duty;
	    getInputElementById('p_duty_ramp').value = '' + desc.p_duty_ramp;
	    getInputElementById('p_repeat_speed').value = '' + desc.p_repeat_speed;
	    getInputElementById('p_pha_offset').value = '' + desc.p_pha_offset;
	    getInputElementById('p_pha_ramp').value = '' + desc.p_pha_ramp;
	    getInputElementById('p_lpf_freq').value = '' + desc.p_lpf_freq;
	    getInputElementById('p_lpf_ramp').value = '' + desc.p_lpf_ramp;
	    getInputElementById('p_lpf_resonance').value = '' + desc.p_lpf_resonance;
	    getInputElementById('p_hpf_freq').value = '' + desc.p_hpf_freq;
	    getInputElementById('p_hpf_ramp').value = '' + desc.p_hpf_ramp;
	    switch (wav_freq) {
	        case 44100:
	            getInputElementById('wav_freq_44100').checked = true;
	            break;
	        case 22050:
	            getInputElementById('wav_freq_22050').checked = true;
	            break;
	    }
	    switch (wav_bits) {
	        case 8:
	            getInputElementById('wav_bits_8').checked = true;
	            break;
	        case 16:
	            getInputElementById('wav_bits_16').checked = true;
	            break;
	    }
	}
	window.onGeneratorClick = function onGeneratorClick(event, gen) {
	    switch (gen) {
	        case 0:
	            setDescriptor(generators.pickupCoin());
	            break;
	        case 1:
	            setDescriptor(generators.laserShoot());
	            break;
	        case 2:
	            setDescriptor(generators.explosion());
	            break;
	        case 3:
	            setDescriptor(generators.powerup());
	            break;
	        case 4:
	            setDescriptor(generators.hitHurt());
	            break;
	        case 5:
	            setDescriptor(generators.jump());
	            break;
	        case 6:
	            setDescriptor(generators.blipSelect());
	            break;
	    }
	};
	window.onRandomizeClick = function onRandomizeClick() {
	    setDescriptor(generators.randomize());
	};
	window.onMutateClick = function onMutateClick() {
	    setDescriptor(generators.mutate(currentDescriptor));
	};
	window.onWaveTypeClick = function onWaveTypeClick(event) {
	    var target = event.target;
	    var desc = descriptor_1.makeDescriptor(currentDescriptor);
	    switch (parseInt(target.value, 10)) {
	        case 0:
	            desc.wave_type = descriptor_1.Shape.Square;
	            break;
	        case 1:
	            desc.wave_type = descriptor_1.Shape.Sawtooth;
	            break;
	        case 2:
	            desc.wave_type = descriptor_1.Shape.Sine;
	            break;
	        case 3:
	            desc.wave_type = descriptor_1.Shape.Noise;
	            break;
	    }
	    setDescriptor(desc, false);
	};
	window.onSliderChange = function onSliderChange(event) {
	    var target = event.target;
	    var desc = descriptor_1.makeDescriptor(currentDescriptor);
	    desc[target.name] = +target.value;
	    setDescriptor(desc, false);
	};
	window.onWaveFrequencyClick = function onWaveFrequencyClick(event) {
	    var target = event.target;
	    wav_freq = parseInt(target.value, 10);
	};
	window.onWaveBitsClick = function onWaveBitsClick(event) {
	    var target = event.target;
	    wav_bits = parseInt(target.value, 10);
	};


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


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var random_1 = __webpack_require__(5);
	var descriptor_1 = __webpack_require__(1);
	function pickupCoin() {
	    var desc = descriptor_1.makeDescriptor();
	    desc.p_base_freq = 0.4 + random_1.frnd(0.5);
	    desc.p_env_attack = 0.0;
	    desc.p_env_sustain = random_1.frnd(0.1);
	    desc.p_env_decay = 0.1 + random_1.frnd(0.4);
	    desc.p_env_punch = 0.3 + random_1.frnd(0.3);
	    if (random_1.rnd(1)) {
	        desc.p_arp_speed = 0.5 + random_1.frnd(0.2);
	        desc.p_arp_mod = 0.2 + random_1.frnd(0.4);
	    }
	    return desc;
	}
	exports.pickupCoin = pickupCoin;
	function laserShoot() {
	    var desc = descriptor_1.makeDescriptor();
	    desc.wave_type = random_1.pick([descriptor_1.Shape.Square, descriptor_1.Shape.Sawtooth, descriptor_1.Shape.Sine]);
	    if (desc.wave_type === descriptor_1.Shape.Sine && random_1.rnd(1)) {
	        desc.wave_type = random_1.pick([descriptor_1.Shape.Square, descriptor_1.Shape.Sawtooth]);
	    }
	    desc.p_base_freq = 0.5 + random_1.frnd(0.5);
	    desc.p_freq_limit = desc.p_base_freq - 0.2 - random_1.frnd(0.6);
	    if (desc.p_freq_limit < 0.2) {
	        desc.p_freq_limit = 0.2;
	    }
	    desc.p_freq_ramp = -0.15 - random_1.frnd(0.2);
	    if (random_1.rnd(2) === 0) {
	        desc.p_base_freq = 0.3 + random_1.frnd(0.6);
	        desc.p_freq_limit = random_1.frnd(0.1);
	        desc.p_freq_ramp = -0.35 - random_1.frnd(0.3);
	    }
	    if (random_1.rnd(1)) {
	        desc.p_duty = random_1.frnd(0.5);
	        desc.p_duty_ramp = random_1.frnd(0.2);
	    }
	    else {
	        desc.p_duty = 0.4 + random_1.frnd(0.5);
	        desc.p_duty_ramp = -random_1.frnd(0.7);
	    }
	    desc.p_env_attack = 0.0;
	    desc.p_env_sustain = 0.1 + random_1.frnd(0.2);
	    desc.p_env_decay = random_1.frnd(0.4);
	    if (random_1.rnd(1)) {
	        desc.p_env_punch = random_1.frnd(0.3);
	    }
	    if (random_1.rnd(2) === 0) {
	        desc.p_pha_offset = random_1.frnd(0.2);
	        desc.p_pha_ramp = -random_1.frnd(0.2);
	    }
	    if (random_1.rnd(1)) {
	        desc.p_hpf_freq = random_1.frnd(0.3);
	    }
	    return desc;
	}
	exports.laserShoot = laserShoot;
	function explosion() {
	    var desc = descriptor_1.makeDescriptor();
	    desc.wave_type = descriptor_1.Shape.Noise;
	    if (random_1.rnd(1)) {
	        desc.p_base_freq = 0.1 + random_1.frnd(0.4);
	        desc.p_freq_ramp = -0.1 + random_1.frnd(0.4);
	    }
	    else {
	        desc.p_base_freq = 0.2 + random_1.frnd(0.7);
	        desc.p_freq_ramp = -0.2 - random_1.frnd(0.2);
	    }
	    desc.p_base_freq *= desc.p_base_freq;
	    if (random_1.rnd(4) === 0) {
	        desc.p_freq_ramp = 0.0;
	    }
	    if (random_1.rnd(2) === 0) {
	        desc.p_repeat_speed = 0.3 + random_1.frnd(0.5);
	    }
	    desc.p_env_attack = 0.0;
	    desc.p_env_sustain = 0.1 + random_1.frnd(0.3);
	    desc.p_env_decay = random_1.frnd(0.5);
	    if (random_1.rnd(1) === 0) {
	        desc.p_pha_offset = -0.3 + random_1.frnd(0.9);
	        desc.p_pha_ramp = -random_1.frnd(0.3);
	    }
	    desc.p_env_punch = 0.2 + random_1.frnd(0.6);
	    if (random_1.rnd(1)) {
	        desc.p_vib_strength = random_1.frnd(0.7);
	        desc.p_vib_speed = random_1.frnd(0.6);
	    }
	    if (random_1.rnd(2) === 0) {
	        desc.p_arp_speed = 0.6 + random_1.frnd(0.3);
	        desc.p_arp_mod = 0.8 - random_1.frnd(1.6);
	    }
	    return desc;
	}
	exports.explosion = explosion;
	function powerup() {
	    var desc = descriptor_1.makeDescriptor();
	    if (random_1.rnd(1)) {
	        desc.wave_type = descriptor_1.Shape.Sawtooth;
	    }
	    else {
	        desc.p_duty = random_1.frnd(0.6);
	    }
	    if (random_1.rnd(1)) {
	        desc.p_base_freq = 0.2 + random_1.frnd(0.3);
	        desc.p_freq_ramp = 0.1 + random_1.frnd(0.4);
	        desc.p_repeat_speed = 0.4 + random_1.frnd(0.4);
	    }
	    else {
	        desc.p_base_freq = 0.2 + random_1.frnd(0.3);
	        desc.p_freq_ramp = 0.05 + random_1.frnd(0.2);
	        if (random_1.rnd(1)) {
	            desc.p_vib_strength = random_1.frnd(0.7);
	            desc.p_vib_speed = random_1.frnd(0.6);
	        }
	    }
	    desc.p_env_attack = 0.0;
	    desc.p_env_sustain = random_1.frnd(0.4);
	    desc.p_env_decay = 0.1 + random_1.frnd(0.4);
	    return desc;
	}
	exports.powerup = powerup;
	function hitHurt() {
	    var desc = descriptor_1.makeDescriptor();
	    desc.wave_type = random_1.pick([descriptor_1.Shape.Square, descriptor_1.Shape.Sawtooth, descriptor_1.Shape.Noise]);
	    if (desc.wave_type === 0) {
	        desc.p_duty = random_1.frnd(0.6);
	    }
	    desc.p_base_freq = 0.2 + random_1.frnd(0.6);
	    desc.p_freq_ramp = -0.3 - random_1.frnd(0.4);
	    desc.p_env_attack = 0.0;
	    desc.p_env_sustain = random_1.frnd(0.1);
	    desc.p_env_decay = 0.1 + random_1.frnd(0.2);
	    if (random_1.rnd(1)) {
	        desc.p_hpf_freq = random_1.frnd(0.3);
	    }
	    return desc;
	}
	exports.hitHurt = hitHurt;
	function jump() {
	    var desc = descriptor_1.makeDescriptor();
	    desc.wave_type = descriptor_1.Shape.Square;
	    desc.p_duty = random_1.frnd(0.6);
	    desc.p_base_freq = 0.3 + random_1.frnd(0.3);
	    desc.p_freq_ramp = 0.1 + random_1.frnd(0.2);
	    desc.p_env_attack = 0.0;
	    desc.p_env_sustain = 0.1 + random_1.frnd(0.3);
	    desc.p_env_decay = 0.1 + random_1.frnd(0.2);
	    if (random_1.rnd(1)) {
	        desc.p_hpf_freq = random_1.frnd(0.3);
	    }
	    if (random_1.rnd(1)) {
	        desc.p_lpf_freq = 1.0 - random_1.frnd(0.6);
	    }
	    return desc;
	}
	exports.jump = jump;
	function blipSelect() {
	    var desc = descriptor_1.makeDescriptor();
	    desc.wave_type = random_1.rnd(1);
	    if (desc.wave_type === descriptor_1.Shape.Square) {
	        desc.p_duty = random_1.frnd(0.6);
	    }
	    desc.p_base_freq = 0.2 + random_1.frnd(0.4);
	    desc.p_env_attack = 0.0;
	    desc.p_env_sustain = 0.1 + random_1.frnd(0.1);
	    desc.p_env_decay = random_1.frnd(0.2);
	    desc.p_hpf_freq = 0.1;
	    return desc;
	}
	exports.blipSelect = blipSelect;
	function randomize() {
	    var desc = descriptor_1.makeDescriptor();
	    desc.p_base_freq = Math.pow(random_1.frnd(2.0) - 1.0, 2.0);
	    if (random_1.rnd(1)) {
	        desc.p_base_freq = Math.pow(random_1.frnd(2.0) - 1.0, 3.0) + 0.5;
	    }
	    desc.p_freq_limit = 0.0;
	    desc.p_freq_ramp = Math.pow(random_1.frnd(2.0) - 1.0, 5.0);
	    if (desc.p_base_freq > 0.7 && desc.p_freq_ramp > 0.2) {
	        desc.p_freq_ramp = -desc.p_freq_ramp;
	    }
	    if (desc.p_base_freq < 0.2 && desc.p_freq_ramp < -0.05) {
	        desc.p_freq_ramp = -desc.p_freq_ramp;
	    }
	    desc.p_freq_dramp = Math.pow(random_1.frnd(2.0) - 1.0, 3.0);
	    desc.p_duty = random_1.frnd(2.0) - 1.0;
	    desc.p_duty_ramp = Math.pow(random_1.frnd(2.0) - 1.0, 3.0);
	    desc.p_vib_strength = Math.pow(random_1.frnd(2.0) - 1.0, 3.0);
	    desc.p_vib_speed = random_1.frnd(2.0) - 1.0;
	    desc.p_vib_delay = random_1.frnd(2.0) - 1.0;
	    desc.p_env_attack = Math.pow(random_1.frnd(2.0) - 1.0, 3.0);
	    desc.p_env_sustain = Math.pow(random_1.frnd(2.0) - 1.0, 2.0);
	    desc.p_env_decay = random_1.frnd(2.0) - 1.0;
	    desc.p_env_punch = Math.pow(random_1.frnd(0.8), 2.0);
	    if (desc.p_env_attack + desc.p_env_sustain + desc.p_env_decay < 0.2) {
	        desc.p_env_sustain += 0.2 + random_1.frnd(0.3);
	        desc.p_env_decay += 0.2 + random_1.frnd(0.3);
	    }
	    desc.p_lpf_resonance = random_1.frnd(2.0) - 1.0;
	    desc.p_lpf_freq = 1.0 - Math.pow(random_1.frnd(1.0), 3.0);
	    desc.p_lpf_ramp = Math.pow(random_1.frnd(2.0) - 1.0, 3.0);
	    if (desc.p_lpf_freq < 0.1 && desc.p_lpf_ramp < -0.05) {
	        desc.p_lpf_ramp = -desc.p_lpf_ramp;
	    }
	    desc.p_hpf_freq = Math.pow(random_1.frnd(1.0), 5.0);
	    desc.p_hpf_ramp = Math.pow(random_1.frnd(2.0) - 1.0, 5.0);
	    desc.p_pha_offset = Math.pow(random_1.frnd(2.0) - 1.0, 3.0);
	    desc.p_pha_ramp = Math.pow(random_1.frnd(2.0) - 1.0, 3.0);
	    desc.p_repeat_speed = random_1.frnd(2.0) - 1.0;
	    desc.p_arp_speed = random_1.frnd(2.0) - 1.0;
	    desc.p_arp_mod = random_1.frnd(2.0) - 1.0;
	    return desc;
	}
	exports.randomize = randomize;
	function mutate(base) {
	    var desc = descriptor_1.makeDescriptor(base);
	    if (random_1.rnd(1))
	        desc.p_base_freq += random_1.frnd(0.1) - 0.05;
	    // if (rnd(1)) desc.p_freq_limit += frnd(0.1) - 0.05;
	    if (random_1.rnd(1))
	        desc.p_freq_ramp += random_1.frnd(0.1) - 0.05;
	    if (random_1.rnd(1))
	        desc.p_freq_dramp += random_1.frnd(0.1) - 0.05;
	    if (random_1.rnd(1))
	        desc.p_duty += random_1.frnd(0.1) - 0.05;
	    if (random_1.rnd(1))
	        desc.p_duty_ramp += random_1.frnd(0.1) - 0.05;
	    if (random_1.rnd(1))
	        desc.p_vib_strength += random_1.frnd(0.1) - 0.05;
	    if (random_1.rnd(1))
	        desc.p_vib_speed += random_1.frnd(0.1) - 0.05;
	    if (random_1.rnd(1))
	        desc.p_vib_delay += random_1.frnd(0.1) - 0.05;
	    if (random_1.rnd(1))
	        desc.p_env_attack += random_1.frnd(0.1) - 0.05;
	    if (random_1.rnd(1))
	        desc.p_env_sustain += random_1.frnd(0.1) - 0.05;
	    if (random_1.rnd(1))
	        desc.p_env_decay += random_1.frnd(0.1) - 0.05;
	    if (random_1.rnd(1))
	        desc.p_env_punch += random_1.frnd(0.1) - 0.05;
	    if (random_1.rnd(1))
	        desc.p_lpf_resonance += random_1.frnd(0.1) - 0.05;
	    if (random_1.rnd(1))
	        desc.p_lpf_freq += random_1.frnd(0.1) - 0.05;
	    if (random_1.rnd(1))
	        desc.p_lpf_ramp += random_1.frnd(0.1) - 0.05;
	    if (random_1.rnd(1))
	        desc.p_hpf_freq += random_1.frnd(0.1) - 0.05;
	    if (random_1.rnd(1))
	        desc.p_hpf_ramp += random_1.frnd(0.1) - 0.05;
	    if (random_1.rnd(1))
	        desc.p_pha_offset += random_1.frnd(0.1) - 0.05;
	    if (random_1.rnd(1))
	        desc.p_pha_ramp += random_1.frnd(0.1) - 0.05;
	    if (random_1.rnd(1))
	        desc.p_repeat_speed += random_1.frnd(0.1) - 0.05;
	    if (random_1.rnd(1))
	        desc.p_arp_speed += random_1.frnd(0.1) - 0.05;
	    if (random_1.rnd(1))
	        desc.p_arp_mod += random_1.frnd(0.1) - 0.05;
	    return desc;
	}
	exports.mutate = mutate;


/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	function rnd(n) {
	    return Math.floor(Math.random() * (n + 1));
	}
	exports.rnd = rnd;
	function frnd(range) {
	    return Math.random() * range;
	}
	exports.frnd = frnd;
	function pick(choices) {
	    return choices[Math.floor(Math.random() * choices.length)];
	}
	exports.pick = pick;


/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map