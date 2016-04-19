
/*
bool ExportWAV(char* filename)
{
	unsigned int dword = 0;
	unsigned short word = 0;
	fwrite("RIFF", 4, 1); // "RIFF"
	dword = 0;
	fwrite(&dword, 1, 4); // remaining file size
	fwrite("WAVE", 4, 1); // "WAVE"

	fwrite("fmt ", 4, 1); // "fmt "
	dword = 16;
	fwrite(&dword, 1, 4); // chunk size
	word = 1;
	fwrite(&word, 1, 2); // compression code
	word = 1;
	fwrite(&word, 1, 2); // channels
	dword = wav_freq;
	fwrite(&dword, 1, 4); // sample rate
	dword = wav_freq * wav_bits / 8;
	fwrite(&dword, 1, 4); // bytes / sec
	word = wav_bits / 8;
	fwrite(&word, 1, 2); // block align
	word = wav_bits;
	fwrite(&word, 1, 2); // bits per sample

	fwrite("data", 4, 1); // "data"
	dword = 0;
	int foutstream_datasize = ftell(foutput);
	fwrite(&dword, 1, 4); // chunk size

	// write sample data
	let file_sampleswritten = 0;
	let filesample = 0.0;
	let fileacc = 0;

	let samples = synthesizeSamples(currentDescriptor);

			// quantize depending on format
			// accumulate / count to accomodate variable sample rate?
			ssample *= 4.0; // arbitrary gain to get reasonable output volume...
			if (ssample > 1.0) ssample = 1.0;
			if (ssample < -1.0) ssample = -1.0;
			filesample += ssample;
			fileacc++;
			if (wav_freq === 44100 || fileacc === 2)
			{
				filesample /= fileacc;
				fileacc = 0;
				if (wav_bits === 16)
				{
					short isample = (short)(filesample * 32000);
					fwrite(&isample, 1, 2, file);
				}
				else
				{
					unsigned char isample = (unsigned char)(filesample * 127 + 128);
					fwrite(&isample, 1, 1, file);
				}
				filesample = 0.0;
			}
			file_sampleswritten++;


	// seek back to header and write size info
	fseek(foutput, 4, SEEK_SET);
	dword = 0;
	dword = foutstream_datasize - 4 + file_sampleswritten * wav_bits / 8;
	fwrite(&dword, 1, 4); // remaining file size
	fseek(foutput, foutstream_datasize, SEEK_SET);
	dword = file_sampleswritten * wav_bits / 8;
	fwrite(&dword, 1, 4); // chunk size (data)
	
	return true;
}
*/
