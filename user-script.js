// ==UserScript==
// @name        Canard PC - Page de connexion automatique
// @namespace   https://github.com/The4thLaw/
// @match       *://www.canardpc.com/*
// @grant       none
// @version     1.1
// @author      Xavier 'Xr' Dalem
// @description Connexion automatique sur le site de Canard PC quand l'utilisateur a déjà un compte. Facilite la transition entre différents appareils.
// @downloadURL https://raw.githubusercontent.com/The4thLaw/canard-pc-user-script-auto-connect/main/user-script.js
// @updateURL   https://raw.githubusercontent.com/The4thLaw/canard-pc-user-script-auto-connect/main/user-script.js
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

/*
Copyright 2024-present Xavier Dalem

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the “Software”), to
deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

'use strict';

function addSettingsToPage() {
  // Add the settings to the footer
  const copyright = document.querySelector('#copyright-footer')
  const settings = document.createElement('p')
  settings.innerHTML = '<label><input type="checkbox" id="cpc-auto-settings-login">Valider la connexion automatiquement</label>'
  // Match the footer style
  settings.style.fontSize = '0.55rem'
  copyright.appendChild(settings)
  const input = document.getElementById('cpc-auto-settings-login')
  input.style.width = 'auto'
  input.style.marginRight = '.5em'

  // Save/load the auto-login setting
  const autoLogin = GM_getValue('autoLogin', false)
  console.log({autoLogin})
  input.checked = autoLogin
  input.addEventListener('click', () => {
    GM_setValue('autoLogin', !GM_getValue('autoLogin', false))
  })
}

if (!window.location.pathname.startsWith('/se-connecter')) {
  // Go to the connection page if we're not connected
  const connectLink = document.querySelector('.user-section.Navigation-3 a:first-of-type')
  if (connectLink.textContent.trim() === 'Se connecter') {
    connectLink.click()
  }
} else {
  const autoLogin = GM_getValue('autoLogin', false)
  if (autoLogin) {
    // If the user explicitly asked for it, automatically submit the connection form
    document.querySelector('input[name="remember"]').checked = true
    // Wait a second, else the server has some trouble processing the request
    setTimeout(() => document.querySelector('form[action$="se-connecter"]').submit(), 1000)
  }
}

addSettingsToPage()
