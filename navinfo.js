var lang;
var nodeInternet;

if (navigator) {
    lang = navigator.language.toLowerCase() || navigator.userLanguage.toLowerCase() || Intl.DateTimeFormat().resolvedOptions().locale.toLowerCase();
}else{
    lang = Intl.DateTimeFormat().resolvedOptions().locale.toLowerCase();
}
let extendC = {
  "cn": " (China mainland)",
  "tw": " (Taiwan)",
  "us": " (United States)",
  "um": " (United States Minor Outlying Islands)",
  "gb": " (United Kingdom)",
  "ca": " (Canada)",
  "au": " (Australia)",
  "nz": " (New Zealand)",
  "in": " (India)",
  "jp": " (Japan)",
  "kr": " (South Korea)",
  "de": " (Germany)",
  "fr": " (France)",
  "it": " (Italy)",
  "es": " (Spain)",
  "mx": " (Mexico)",
  "br": " (Brazil)",
  "ru": " (Russia)",
  "sa": " (Saudi Arabia)",
  "ae": " (United Arab Emirates)",
  "eg": " (Egypt)"
}

let extendL = {
  "ar": "Arabic",
  "zh": "Chinese",
  "nl": "Dutch",
  "en": "English",
  "fr": "French",
  "de": "German",
  "id": "Indonesian",
  "it": "Italian",
  "ja": "Japanese",
  "ko": "Korean",
  "pl": "Polish",
  "pt": "Portuguese",
  "ru": "Russian",
  "es": "Spanish",
  "th": "Thai",
  "tr": "Turkish",
  "vi": "Vietnamese"
}

if(!navigator){
    require('node:dns').resolve('www.google.com', function(err) {
        if (err) {
            nodeInternet = false;
        } else {
            nodeInternet = true;
        }
    });
}

class Language {
  constructor(langCode) {
    this.language = {
        "raw": langCode.toLowerCase(),
        "code": langCode.toLowerCase().split('-')[0] || null,
        "countryCode": langCode.toLowerCase().split('-')[1] || null,
        "shortcutsSupport": (langCode.toLowerCase().split('-')[0] || null) in extendL
    }
  }
  extend() {
    var langCode = this.language.raw.split('-')[0].toLowerCase();
    var countryCode = this.language.raw.split('-')[1].toLowerCase();
    var extendedLanguage = extendL[langCode] || null;
    var extendedRegion = extendC[countryCode] || null;

    var extended = extendedLanguage;
    if (extendedRegion) {
        extended += extendedRegion;
    }
  
    return extended;
  }
}
String.prototype.removeAll = function(toRemove) {
  return this.split(toRemove).join('');
};

String.prototype.removeFirst = function(toRemove) {
  return this.replace(toRemove, '');
};

String.prototype.removeAt = function(toRemove, n) {
  const regex = new RegExp(toRemove, 'g');
  let count = 0;
  return this.replace(regex, match => {
    count++;
    return count === n ? '' : match;
  });
};

module.exports = {Language}