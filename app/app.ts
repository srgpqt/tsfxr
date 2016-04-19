import {Descriptor, Shape, makeDescriptor} from '../src/descriptor';
import synthesizeSamples from '../src/synth';
import * as generators from '../src/generators';

function getInputElementById(id: string) {
	return <HTMLInputElement> document.getElementById(id);
}

var wav_bits = 16;
var wav_freq = 44100;
var currentDescriptor = makeDescriptor();

function setDescriptor(desc: Descriptor, shouldUpdateUI = true) {
	currentDescriptor = desc;
	playDescriptor(desc);

	if (shouldUpdateUI) {
		updateUI(desc);
	}
}

document.addEventListener('DOMContentLoaded', function() {
	updateUI(currentDescriptor);
})

function playDescriptor(desc: Descriptor) {
	const samples = synthesizeSamples(desc);
	playSamples(samples, wav_freq);
}

function playSamples(samples: Array<number>, sampleRate: number) {
	const ctx = new AudioContext();
	const buffer = ctx.createBuffer(1, samples.length, sampleRate);
	const data = buffer.getChannelData(0);

	for (let i = 0; i < samples.length; i++) {
		data[i] = samples[i];
	}

	const proc = ctx.createBufferSource();
	proc.buffer = buffer;
	proc.connect(ctx.destination);
	proc.start();
}

function updateUI(desc: Descriptor) {
	switch (desc.wave_type) {
	case Shape.Square: getInputElementById('wave_type_square').checked = true; break;
	case Shape.Sawtooth: getInputElementById('wave_type_sawtooth').checked = true; break;
	case Shape.Sine: getInputElementById('wave_type_sine').checked = true; break;
	case Shape.Noise: getInputElementById('wave_type_noise').checked = true; break;
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
	case 44100: getInputElementById('wav_freq_44100').checked = true; break;
	case 22050: getInputElementById('wav_freq_22050').checked = true; break;
	}

	switch (wav_bits) {
	case 8: getInputElementById('wav_bits_8').checked = true; break;
	case 16: getInputElementById('wav_bits_16').checked = true; break;
	}
}

(window as any).onGeneratorClick = function onGeneratorClick(event: Event, gen: number) {
	switch (gen) {
		case 0: setDescriptor(generators.pickupCoin()); break;
		case 1: setDescriptor(generators.laserShoot()); break;
		case 2: setDescriptor(generators.explosion()); break;
		case 3: setDescriptor(generators.powerup()); break;
		case 4: setDescriptor(generators.hitHurt()); break;
		case 5: setDescriptor(generators.jump()); break;
		case 6: setDescriptor(generators.blipSelect()); break;
	}
};

(window as any).onRandomizeClick = function onRandomizeClick() {
	setDescriptor(generators.randomize());
};

(window as any).onMutateClick = function onMutateClick() {
	setDescriptor(generators.mutate(currentDescriptor));
};

(window as any).onWaveTypeClick = function onWaveTypeClick(event: MouseEvent) {
	const target = <HTMLInputElement> event.target;
	let desc = makeDescriptor(currentDescriptor);
	switch (parseInt(target.value, 10)) {
	case 0: desc.wave_type = Shape.Square; break;
	case 1: desc.wave_type = Shape.Sawtooth; break;
	case 2: desc.wave_type = Shape.Sine; break;
	case 3: desc.wave_type = Shape.Noise; break;
	}
	setDescriptor(desc, false);
};

(window as any).onSliderChange = function onSliderChange(event: Event) {
	const target = <HTMLInputElement>event.target;
	let desc = makeDescriptor(currentDescriptor);
	desc[target.name] = +target.value;
	setDescriptor(desc, false);
};

(window as any).onWaveFrequencyClick = function onWaveFrequencyClick(event: MouseEvent) {
	const target = <HTMLInputElement>event.target;
	wav_freq = parseInt(target.value, 10);
};

(window as any).onWaveBitsClick = function onWaveBitsClick(event: MouseEvent) {
	const target = <HTMLInputElement>event.target;
	wav_bits = parseInt(target.value, 10);
};
