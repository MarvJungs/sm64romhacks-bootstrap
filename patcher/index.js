document.addEventListener("DOMContentLoaded", main);

function main() {
    const mainSection = document.getElementsByTagName('main')[0];
    mainSection.innerHTML = `
        <h1>Online Patcher</h1>
        <ol>
            <li>Select your UNMODIFIED ROM <b>Make sure it has a <i>.z64</i> extension)</b></li>
            <li>Select the bps-Patch you want to apply (it may also be a .zip file with the .bps file in it)</li>
            <li>Press on &quot;Apply Patch&quot;</li>
            <li>Profit!</li>
        </ol>
        <div class="bg-body-secondary">
				<div class="tab">
					<div class="m-b">
						<div class="col text-right">
                            <label for="input-file-rom" data-localize="rom_file">ROM file:</label>
						    <input type="file" id="input-file-rom" class="form-control enabled" />
                        </div>
					</div>
					<div id="rom-info">
                        <div class="m-b">
                            <div class="col text-muted">
                                CRC32:  <span id="crc32"></span>
                            </div>
                        </div>
                        <div class="m-b text-muted">
                            <div class="col">
                                MD5:   <span id="md5"></span>
                            </div>
                        </div>
                        <div class="m-b text-muted">
                            <div class="col">
                                SHA-1:  <span id="sha1"></span>
                            </div>
                        </div>
					</div>

					<div class="m-b" id="row-file-patch">
						<div class="col">
                            <label for="input-file-patch" data-localize="patch_file">Patch file:</label>
                            <input type="file" id="input-file-patch" accept=".bps,.zip" />
                        </div>
					</div>

					<div class="buttons">
						<span id="message-apply" class="message"></span>
						<button id="button-apply" data-localize="apply_patch" class="disabled" disabled>Apply patch</button>
					</div>
				</div>
			</div>

			<!-- FOOTER -->
			<div>
				Rom Patcher JS <small>v2.8.1</small> by <a href="https://github.com/marcrobledo/">Marc Robledo</a>
				<br />
				<img src="/_assets/_img/icons/icon_github.svg" class="icon github" /> <a href="https://github.com/marcrobledo/RomPatcher.js/" target="_blank">See on GitHub</a>
				<img src="/_assets/_img/icons/icon_heart.svg" class="icon heart" /> <a href="https://www.paypal.me/marcrobledo/5" target="_blank" rel="nofollow">Donate</a>
			</div>

		</div>
	</div>
	<br/><br/>
    `
}