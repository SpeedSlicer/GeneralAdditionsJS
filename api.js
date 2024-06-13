/**
 * Sets a cookie with the given name, value, and expiration days.
 * @param {string} name - The name of the cookie.
 * @param {string} value - The value of the cookie.
 * @param {number} [days] - Number of days until the cookie expires.
 */
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Example usage:
// setCookie("username", "JohnDoe", 7);

/**
 * Gets the value of the cookie with the given name.
 * @param {string} name - The name of the cookie.
 * @returns {string|null} The value of the cookie, or null if not found.
 */
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Example usage:
// var username = getCookie("username");

/**
 * Deletes the cookie with the given name.
 * @param {string} name - The name of the cookie to delete.
 */
function deleteCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}

// Example usage:
// deleteCookie("username");

/**
 * Clears all cookies associated with the current domain.
 */
function clearAllCookies() {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf('=');
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + '=; Max-Age=-99999999;';
    }
}

// Example usage:
// clearAllCookies();

/**
 * Returns the value of a query parameter from the current URL.
 * @param {string} name - The name of the query parameter.
 * @returns {string|null} The value of the query parameter, or null if not found.
 */
function getQueryParam(name) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Example usage:
// If the current URL is "http://example.com/?product=123&category=tech"
// var productId = getQueryParam('product'); // returns "123"

/**
 * Generates a random alphanumeric string of a given length.
 * @param {number} length - The length of the generated string.
 * @returns {string} The randomly generated string.
 */
/**
 * Generates a random alphanumeric string of a given length.
 * @param {number} length - The length of the generated string.
 * @returns {string} The randomly generated string.
 */
function generateRandomString(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

// Example usage:
//var randomToken = generateRandomString(10);
//console.log(randomToken); // Outputs a 10-character random string



/**
 * Converts a base64 string to a Blob object.
 * @param {string} base64 - The base64 string to convert.
 * @param {string} contentType - The content type of the Blob (e.g., 'image/png').
 * @returns {Blob} The Blob object created from the base64 string.
 */
function base64ToBlob(base64, contentType) {
    var byteCharacters = atob(base64);
    var byteArrays = [];
    for (var offset = 0; offset < byteCharacters.length; offset += 512) {
        var slice = byteCharacters.slice(offset, offset + 512);
        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
}

// Example usage:
// var blob = base64ToBlob('base64-encoded-string', 'image/jpeg');

/**
 * Formats a date object into a string in the format "YYYY-MM-DD HH:MM:SS".
 * @param {Date} date - The date object to format.
 * @returns {string} The formatted date string.
 */
function formatDate(date) {
    var year = date.getFullYear();
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var day = ('0' + date.getDate()).slice(-2);
    var hours = ('0' + date.getHours()).slice(-2);
    var minutes = ('0' + date.getMinutes()).slice(-2);
    var seconds = ('0' + date.getSeconds()).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Example usage:
// var formattedDate = formatDate(new Date()); // returns something like "2024-06-13 15:30:00"

/**
 * Stores data in the browser's local storage with an expiration time.
 * @param {string} key - The key under which to store the data.
 * @param {any} value - The value to store.
 * @param {number} [expirationMins] - Expiration time in minutes. If not provided, it will be stored indefinitely.
 */
function setLocalStorageWithExpiration(key, value, expirationMins) {
    var expirationMS = expirationMins * 60 * 1000;
    var record = { value: value, timestamp: new Date().getTime() + expirationMS };
    localStorage.setItem(key, JSON.stringify(record));
}

// Example usage:
// setLocalStorageWithExpiration('dataKey', { name: 'John' }, 30); // stores data for 30 minutes

/**
 * Retrieves data from the browser's local storage if not expired.
 * @param {string} key - The key of the data to retrieve.
 * @returns {any|null} The stored data or null if not found or expired.
 */
function getLocalStorageWithExpiration(key) {
    var record = localStorage.getItem(key);
    if (!record) {
        return null;
    }
    record = JSON.parse(record);
    if (new Date().getTime() < record.timestamp) {
        return record.value;
    }
    localStorage.removeItem(key);
    return null;
}

// Example usage:
// var cachedData = getLocalStorageWithExpiration('dataKey');

/**
 * Stores data in the browser's session storage.
 * @param {string} key - The key under which to store the data.
 * @param {any} value - The value to store.
 */
function setSessionStorage(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
}

// Example usage:
// setSessionStorage('sessionKey', { id: 1, name: 'Jane' });

/**
 * Retrieves data from the browser's session storage.
 * @param {string} key - The key of the data to retrieve.
 * @returns {any|null} The stored data or null if not found.
 */
function getSessionStorage(key) {
    var item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
}

// Example usage:
// var sessionData = getSessionStorage('sessionKey');

/**
 * Clears all items from the browser's local storage.
 */
function clearLocalStorage() {
    localStorage.clear();
}

// Example usage:
// clearLocalStorage();

/**
 * Clears all items from the browser's session storage.
 */
function clearSessionStorage() {
    sessionStorage.clear();
}

// Example usage:
// clearSessionStorage();

/**
 * Creates a new window with an iframe displaying the given URL.
 * Optionally sets the title and favicon of the new window.
 * @param {string} url - The URL to display in the iframe.
 * @param {string} [title] - The title of the new window.
 * @param {string} [faviconURL] - The URL of the favicon.
 */
function createAbout(url, title, faviconURL) {
    var win = window.open();
    win.document.body.style.margin = '0';
    win.document.body.style.height = '100vh';
    
    if (faviconURL) {
        var favicon = win.document.createElement('link');
        favicon.rel = 'shortcut icon';
        favicon.type = 'image/x-icon';
        favicon.href = faviconURL;
        win.document.head.appendChild(favicon);
    }
    
    if (title) {
        win.document.title = title;
    }
    
    var iframe = win.document.createElement('iframe');
    iframe.style.border = 'none';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.margin = '0';
    iframe.src = url;
    
    win.document.body.appendChild(iframe);
}

// Example usage:
// With title and favicon
// createAbout('about.html', 'About Page', 'path_to_favicon.ico');

// Without title and favicon
// createAbout('about.html');

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * @param {number} min - The minimum value of the range.
 * @param {number} max - The maximum value of the range.
 * @returns {number} A random integer between min and max.
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Example usage:
// var randomNum = getRandomInt(1, 10); // returns a random integer between 1 and 10

/**
 * Converts a base64 string to a Blob object.
 * @param {string} base64 - The base64 string to convert.
 * @param {string} contentType - The content type of the Blob (e.g., 'image/png').
 * @returns {Blob} The Blob object created from the base64 string.
 */
function base64ToBlob(base64, contentType) {
    var byteCharacters = atob(base64);
    var byteArrays = [];
    for (var offset = 0; offset < byteCharacters.length; offset += 512) {
        var slice = byteCharacters.slice(offset, offset + 512);
        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
}

// Example usage:
// var blob = base64ToBlob('base64-encoded-string', 'image/jpeg');

/**
 * Formats a date object into a string in the format "YYYY-MM-DD HH:MM:SS".
 * @param {Date} date - The date object to format.
 * @returns {string} The formatted date string.
 */
function formatDate(date) {
    var year = date.getFullYear();
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var day = ('0' + date.getDate()).slice(-2);
    var hours = ('0' + date.getHours()).slice(-2);
    var minutes = ('0' + date.getMinutes()).slice(-2);
    var seconds = ('0' + date.getSeconds()).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Example usage:
// var formattedDate = formatDate(new Date()); // returns something like "2024-06-13 15:30:00"

/**
 * Returns the current UTC timestamp in milliseconds.
 * @returns {number} The current UTC timestamp in milliseconds.
 */
function getCurrentUTCTimestamp() {
    return new Date().getTime();
}

// Example usage:
// var timestamp = getCurrentUTCTimestamp(); // returns the current UTC timestamp in milliseconds

/**
 * Retrieves data from the browser's local storage with error handling.
 * @param {string} key - The key under which the data is stored.
 * @returns {any|null} The retrieved data or null if not found or error occurs.
 */
function safeGetLocalStorage(key) {
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch (error) {
        console.error(`Error retrieving localStorage item "${key}":`, error);
        return null;
    }
}

// Example usage:
// var data = safeGetLocalStorage('userData');

/**
 * Converts bytes to a human-readable string representing the file size.
 * @param {number} bytes - The number of bytes.
 * @returns {string} The human-readable file size string (e.g., '2.3 MB').
 */
function bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return `${Math.round(bytes / Math.pow(1024, i), 2)} ${sizes[i]}`;
}

// Example usage:
// var sizeString = bytesToSize(1024); // returns '1 KB'

/**
 * Generates a universally unique identifier (UUID).
 * @returns {string} A UUID string.
 */
function generateUUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

// Example usage:
// var uuid = generateUUID(); // returns a UUID like "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"

/**
 * Copies a string to the clipboard.
 * @param {string} text - The text to copy to the clipboard.
 * @returns {boolean} True if the operation was successful, otherwise false.
 */
function copyToClipboard(text) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    var success = false;
    try {
        success = document.execCommand('copy');
    } catch (error) {
        console.error('Error copying to clipboard:', error);
    } finally {
        document.body.removeChild(textarea);
    }
    return success;
}

// Example usage:
// var copied = copyToClipboard('Text to copy'); // returns true if successful

/**
 * Checks if a string is a valid email address.
 * @param {string} email - The email address to validate.
 * @returns {boolean} True if the email address is valid, otherwise false.
 */
function isValidEmail(email) {
    // Regular expression for basic email validation
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Example usage:
// var valid = isValidEmail('example@email.com'); // returns true or false

/**
 * Checks if a string is a valid URL.
 * @param {string} url - The URL to validate.
 * @returns {boolean} True if the URL is valid, otherwise false.
 */
function isValidURL(url) {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
}

// Example usage:
// var valid = isValidURL('http://example.com'); // returns true or false

/**
 * Fetches data from a URL using the Fetch API with error handling.
 * @param {string} url - The URL from which to fetch data.
 * @param {object} [options] - Fetch options like headers, method, etc.
 * @returns {Promise<any>} A promise that resolves to the fetched data or null if an error occurs.
 */
async function fetchData(url, options) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// Example usage:
// fetchData('https://api.example.com/data')
//     .then(data => console.log('Fetched data:', data))
//     .catch(error => console.error('Error:', error));

/**
 * Sets the title of the current document.
 * @param {string} title - The new title of the document.
 */
function setDocumentTitle(title) {
    document.title = title;
}

// Example usage:
// setDocumentTitle('New Page Title');

/**
 * Scrolls to the top of the page smoothly.
 */
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Example usage:
// scrollToTop();

/**
 * Scrolls to a specific element on the page smoothly.
 * @param {string|HTMLElement} selector - The CSS selector or element to scroll to.
 */
function scrollToElement(selector) {
    var element = typeof selector === 'string' ? document.querySelector(selector) : selector;
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Example usage:
// scrollToElement('#section2');

/**
 * Detects if the current device is a mobile device.
 * @returns {boolean} True if the current device is a mobile device, otherwise false.
 */
function isMobileDevice() {
    return /Mobi/.test(navigator.userAgent);
}

// Example usage:
// var isMobile = isMobileDevice(); // returns true or false

/**
 * Detects if the current browser is Internet Explorer (IE).
 * @returns {boolean} True if the current browser is IE, otherwise false.
 */
function isInternetExplorer() {
    return /MSIE|Trident/.test(window.navigator.userAgent);
}

// Example usage:
// var isIE = isInternetExplorer(); // returns true or false

/**
 * Returns a promise that resolves after a specified delay.
 * @param {number} ms - The delay in milliseconds.
 * @returns {Promise<void>} A promise that resolves after the specified delay.
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Example usage:
// delay(1000).then(() => console.log('Delayed operation'));

/**
 * Checks if the current page is in dark mode.
 * @returns {boolean} True if the current page is in dark mode, otherwise false.
 */
function isDarkMode() {
    // Check if prefers-color-scheme is supported and dark mode is enabled
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// Example usage:
// var darkModeEnabled = isDarkMode(); // returns true or false

/**
 * Detects if the browser supports the Intersection Observer API.
 * @returns {boolean} True if the browser supports the Intersection Observer API, otherwise false.
 */
function supportsIntersectionObserver() {
    return 'IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype;
}

// Example usage:
// var supportsIO = supportsIntersectionObserver(); // returns true or false

/**
 * Parses a JSON string into an object with error handling.
 * @param {string} jsonString - The JSON string to parse.
 * @returns {any|null} The parsed object or null if parsing fails.
 */
function safeParseJSON(jsonString) {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return null;
    }
}

// Example usage:
// var parsedObject = safeParseJSON('{"name":"John","age":30}');

/**
 * Capitalizes the first letter of a string.
 * @param {string} str - The string to capitalize.
 * @returns {string} The capitalized string.
 */
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Example usage:
// var capitalized = capitalizeFirstLetter('hello'); // returns 'Hello'

/**
 * Converts a number to currency format with commas.
 * @param {number} num - The number to format.
 * @param {string} [currencySymbol] - The currency symbol to prepend.
 * @param {number} [decimalPlaces] - The number of decimal places to round to.
 * @returns {string} The number formatted as currency.
 */
function formatCurrency(num, currencySymbol = '$', decimalPlaces = 2) {
    return currencySymbol + num.toFixed(decimalPlaces).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

// Example usage:
// var formattedCurrency = formatCurrency(123456.789); // returns '$123,456.79'

/**
 * Limits the number of times a function can be called within a specified time frame.
 * @param {Function} fn - The function to throttle.
 * @param {number} limit - The number of milliseconds to throttle the function.
 * @returns {Function} The throttled function.
 */
function throttle(fn, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            fn.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Example usage:
// var throttledFn = throttle(() => console.log('Throttled function'), 1000);

/**
 * Limits the number of times a function can be called after it stops being called for a specified time.
 * @param {Function} fn - The function to debounce.
 * @param {number} delay - The number of milliseconds to debounce the function.
 * @returns {Function} The debounced function.
 */
function debounce(fn, delay) {
    let timeoutId;
    return function() {
        const args = arguments;
        const context = this;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(context, args), delay);
    };
}

// Example usage:
// var debouncedFn = debounce(() => console.log('Debounced function'), 500);

/**
 * Converts a string to title case.
 * @param {string} str - The string to convert to title case.
 * @returns {string} The title cased string.
 */
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
}

// Example usage:
// var titleCaseString = toTitleCase('hello world'); // returns 'Hello World'

/**
 * Generates a range of numbers as an array.
 * @param {number} start - The start of the range (inclusive).
 * @param {number} end - The end of the range (inclusive).
 * @param {number} [step] - The step between each number (default is 1).
 * @returns {Array<number>} An array containing the range of numbers.
 */
function range(start, end, step = 1) {
    const len = Math.floor((end - start) / step) + 1;
    return Array(len).fill().map((_, idx) => start + (idx * step));
}

// Example usage:
// var numRange = range(1, 10); // returns [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

/**
 * Generates a random hexadecimal color.
 * @returns {string} A random hexadecimal color string.
 */
function getRandomHexColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

// Example usage:
// var randomColor = getRandomHexColor(); // returns a random hex color like '#1a2b3c'

/**
 * Escapes special characters in a regular expression string.
 * @param {string} str - The string to escape for regex.
 * @returns {string} The escaped string for regex.
 */
function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Example usage:
// var escapedString = escapeRegExp('Hello (world)'); // returns 'Hello \(world\)'

/**
 * Removes HTML tags from a string.
 * @param {string} str - The string from which to remove HTML tags.
 * @returns {string} The string without HTML tags.
 */
function removeHtmlTags(str) {
    return str.replace(/<[^>]*>?/gm, '');
}

// Example usage:
// var plainText = removeHtmlTags('<p>Hello <strong>world</strong></p>'); // returns 'Hello world'

/**
 * Sorts an array of objects by a specified key in ascending order.
 * @param {Array<Object>} arr - The array of objects to sort.
 * @param {string} key - The key by which to sort the objects.
 * @returns {Array<Object>} The sorted array of objects.
 */
function sortByKey(arr, key) {
    return arr.sort((a, b) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0));
}

// Example usage:
// var sortedArray = sortByKey([{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }], 'age');

/**
 * Fetches an image from a URL and returns a promise with the image element.
 * @param {string} url - The URL of the image to fetch.
 * @returns {Promise<HTMLImageElement>} A promise that resolves to the fetched image element.
 */
function fetchImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = url;
    });
}

// Example usage:
// fetchImage('https://example.com/image.jpg')
//     .then(img => console.log('Image loaded:', img))
//     .catch(error => console.error('Error loading image:', error));

/**
 * Trims leading and trailing whitespace from a string.
 * @param {string} str - The string to trim.
 * @returns {string} The trimmed string.
 */
function trimWhitespace(str) {
    return str.trim();
}

// Example usage:
// var trimmedString = trimWhitespace('   hello world   '); // returns 'hello world'

/**
 * Returns a promise that resolves after a specified delay.
 * @param {number} ms - The delay in milliseconds.
 * @returns {Promise<void>} A promise that resolves after the specified delay.
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Example usage:
// delay(1000).then(() => console.log('Delayed operation'));

/**
 * Checks if the current page is in dark mode.
 * @returns {boolean} True if the current page is in dark mode, otherwise false.
 */
function isDarkMode() {
    // Check if prefers-color-scheme is supported and dark mode is enabled
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// Example usage:
// var darkModeEnabled = isDarkMode(); // returns true or false

/**
 * Detects if the browser supports the Intersection Observer API.
 * @returns {boolean} True if the browser supports the Intersection Observer API, otherwise false.
 */
function supportsIntersectionObserver() {
    return 'IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype;
}

// Example usage:
// var supportsIO = supportsIntersectionObserver(); // returns true or false

// Exponential function (e^x)
function exp(x) {
    return Math.exp(x);
}

// Natural logarithm function (ln(x))
function log(x) {
    return Math.log(x);
}

// Base-10 logarithm function (log10(x))
function log10(x) {
    return Math.log10(x);
}
// Power function (x^y)
function pow(x, y) {
    return Math.pow(x, y);
}

// Square root function (√x)
function sqrt(x) {
    return Math.sqrt(x);
}
// Sine function
function sin(angle) {
    return Math.sin(angle);
}

// Cosine function
function cos(angle) {
    return Math.cos(angle);
}

// Tangent function
function tan(angle) {
    return Math.tan(angle);
}
