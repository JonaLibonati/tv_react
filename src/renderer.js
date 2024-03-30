/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import { channels } from './assets/data/channels.js';

let domainNum = 10;
let domain;

const channelDomains = ['Canal13', 'TyC', 'ESPN', 'ESPN2', 'ESPN3', 'ESPN', 'FOX', 'ESPNpremium', 'TNT', 'NBA']

function testURL(url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                console.log(xhr.status);
            resolve();
            } else {
            reject(new Error("HTTP request failed with status " + xhr.status));
            }
        }
        };
        xhr.open("GET", url);
        xhr.send();
    });
}

const setDomain = () => {
    testURL(`https://flow${domainNum}.txt.boats/cvatt.html`)
    .then ( () => {
        domain = `https://flow${domainNum}.txt.boats/cvatt.html`;
        console.log(domain);

        channels.map( (channel) => {
            if (channelDomains.find((element) => element == channel.name)) {
                channel.url = `${domain}${channel.url}`
            }
        } )
    })
    .catch ( (e) => {
        console.log(e);
        domainNum = domainNum + 1;
        setDomain(`https://flow${domainNum}.txt.boats/cvatt.html`);
    })
}

setDomain()

import './index.css';
import './App.jsx';

console.log('👋 This message is being logged by "renderer.js", included via Vite');
