"use strict";
var extend_1 = require('./extend');
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
