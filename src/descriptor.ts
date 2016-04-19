import extend from './extend';

export enum Shape {
	Square = 0,
	Sawtooth = 1,
	Sine = 2,
	Noise = 3
}

export interface Descriptor {
	wave_type: Shape;

	p_base_freq: number;
	p_freq_limit: number;
	p_freq_ramp: number;
	p_freq_dramp: number;
	p_duty: number;
	p_duty_ramp: number;

	p_vib_strength: number;
	p_vib_speed: number;
	p_vib_delay: number;

	p_env_attack: number;
	p_env_sustain: number;
	p_env_decay: number;
	p_env_punch: number;

	p_lpf_resonance: number;
	p_lpf_freq: number;
	p_lpf_ramp: number;
	p_hpf_freq: number;
	p_hpf_ramp: number;

	p_pha_offset: number;
	p_pha_ramp: number;

	p_repeat_speed: number;

	p_arp_speed: number;
	p_arp_mod: number;

	sound_vol: number;

	[key: string]: number;
}

export function makeDescriptor(params?: any) {
	return <Descriptor> extend({
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
