/* Rom Patcher JS v20230331 - Marc Robledo 2016-2023 - http://www.marcrobledo.com/license */

self.importScripts(
	'./MarcFile.js',
	'./crc.js',
	'./formats/bps.js',

);


self.onmessage = event => { // listen for messages from the main thread
	var romFile=new MarcFile(event.data.romFileU8Array);
	var patchFile=new MarcFile(event.data.patchFileU8Array);

	var errorMessage=false;

	var patch;
	var header=patchFile.readString(6);

	if(header.startsWith(BPS_MAGIC)){
		patch=parseBPSFile(patchFile);

	}else{
		errorMessage='error_invalid_patch';
	}

	//console.log('apply');
	var patchedRom;
	if(patch){
		try{
			patchedRom=patch.apply(romFile, event.data.validateChecksums);
		}catch(evt){
			errorMessage=evt.message;
		}
	}
	
	//console.log('postMessage');
	if(patchedRom){
		self.postMessage(
			{
				romFileU8Array:event.data.romFileU8Array,
				patchFileU8Array:event.data.patchFileU8Array,
				patchedRomU8Array:patchedRom._u8array,
				errorMessage:errorMessage
			},
			[
				event.data.romFileU8Array.buffer,
				event.data.patchFileU8Array.buffer,
				patchedRom._u8array.buffer
			]
		);
	}else{
		self.postMessage(
			{
				romFileU8Array:event.data.romFileU8Array,
				patchFileU8Array:event.data.patchFileU8Array,
				errorMessage:errorMessage
			},
			[
				event.data.romFileU8Array.buffer,
				event.data.patchFileU8Array.buffer
			]
		);
	}
};