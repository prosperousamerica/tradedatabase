window.formatValue = function(number) {
  var negative = number < 0 ? "-" : "";
  var absVal = Math.abs(number);
  var formattedNumber = absVal.toLocaleString();
  var prefix = "$";
  var suffix = "B";
  return negative + prefix + formattedNumber + suffix;
};

var countryCodes = {
  Afghanistan: "af",
  Albania: "al",
  Algeria: "dz",
  "American Samoa": "as",
  Andorra: "ad",
  Angola: "ao",
  "Antigua and Barbuda": "ag",
  Argentina: "ar",
  Armenia: "am",
  Australia: "au",
  Austria: "at",
  Azerbaijan: "az",
  Bahrain: "bh",
  "Bajo Nuevo Bank (Petrel Is.)": "bu",
  Bangladesh: "bd",
  Barbados: "bb",
  Belarus: "by",
  Belgium: "be",
  Belize: "bz",
  Benin: "bj",
  Bhutan: "bt",
  Bolivia: "bo",
  "Bosnia and Herzegovina": "ba",
  Botswana: "bw",
  Brazil: "br",
  Brunei: "bn",
  Bulgaria: "bg",
  "Burkina Faso": "bf",
  Burundi: "bi",
  Cambodia: "kh",
  Cameroon: "cm",
  Canada: "ca",
  "Cape Verde": "cv",
  "Central African Republic": "cf",
  Chad: "td",
  Chile: "cl",
  China: "cn",
  Colombia: "co",
  Comoros: "km",
  "Costa Rica": "cr",
  Croatia: "hr",
  Cuba: "cu",
  "Cyprus No Mans Area": "cnm",
  Cyprus: "cy",
  "Czech Republic": "cz",
  "Democratic Republic of the Congo": "cd",
  Denmark: "dk",
  Djibouti: "dj",
  Dominica: "dm",
  "Dominican Republic": "do",
  "East Timor": "tl",
  Ecuador: "ec",
  Egypt: "eg",
  "El Salvador": "sv",
  "Equatorial Guinea": "gq",
  Eritrea: "er",
  Estonia: "ee",
  Ethiopia: "et",
  "Faroe Islands": "fo",
  "Federated States of Micronesia": "fm",
  Fiji: "fj",
  Finland: "fi",
  France: "fr",
  Gabon: "ga",
  Gambia: "gm",
  Georgia: "ge",
  Germany: "de",
  Ghana: "gh",
  Greece: "gr",
  Greenland: "gl",
  Grenada: "gd",
  Guam: "gu",
  Guatemala: "gt",
  "Guinea Bissau": "gw",
  Guinea: "gn",
  Guyana: "gy",
  Haiti: "ht",
  Honduras: "hn",
  Hungary: "hu",
  Iceland: "is",
  India: "in",
  Indonesia: "id",
  Iran: "ir",
  Iraq: "iq",
  Ireland: "ie",
  Israel: "il",
  Italy: "it",
  "Ivory Coast": "ci",
  Jamaica: "jm",
  Japan: "jp",
  Jordan: "jo",
  Kazakhstan: "kz",
  Kenya: "ke",
  Kiribati: "ki",
  Kosovo: "kv",
  Kuwait: "kw",
  Kyrgyzstan: "kg",
  Laos: "la",
  Latvia: "lv",
  Lebanon: "lb",
  Lesotho: "ls",
  Liberia: "lr",
  Libya: "ly",
  Liechtenstein: "li",
  Lithuania: "lt",
  Luxembourg: "lu",
  Macedonia: "mk",
  Madagascar: "mg",
  Malawi: "mw",
  Malaysia: "my",
  Maldives: "mv",
  Mali: "ml",
  Malta: "mt",
  "Marshall Islands": "mh",
  Mauritania: "mr",
  Mauritius: "mu",
  Mexico: "mx",
  Moldova: "md",
  Monaco: "mc",
  Mongolia: "mn",
  Montenegro: "me",
  Morocco: "ma",
  Mozambique: "mz",
  Myanmar: "mm",
  Namibia: "na",
  Nauru: "nr",
  Nepal: "np",
  Netherlands: "nl",
  "New Zealand": "nz",
  Nicaragua: "ni",
  Niger: "ne",
  Nigeria: "ng",
  "North Korea": "kp",
  "Northern Cyprus": "nc",
  "Northern Mariana Islands": "mp",
  Norway: "no",
  Oman: "om",
  Pakistan: "pk",
  Palau: "pw",
  Panama: "pa",
  "Papua New Guinea": "pg",
  Paraguay: "py",
  Peru: "pe",
  Philippines: "ph",
  Poland: "pl",
  Portugal: "pt",
  "Puerto Rico": "pr",
  Qatar: "qa",
  "Republic of Congo": "cg",
  "Republic of Serbia": "rs",
  Romania: "ro",
  Russia: "ru",
  Rwanda: "rw",
  "Saint Kitts and Nevis": "kn",
  "Saint Lucia": "lc",
  "Saint Vincent and the Grenadines": "vc",
  Samoa: "ws",
  "San Marino": "sm",
  "Sao Tome and Principe": "st",
  "Saudi Arabia": "sa",
  "Scarborough Reef": "sh",
  Senegal: "sn",
  "Serranilla Bank": "sw",
  Seychelles: "sc",
  "Siachen Glacier": "jk",
  "Sierra Leone": "sl",
  Singapore: "sg",
  Slovakia: "sk",
  Slovenia: "si",
  "Solomon Islands": "sb",
  Somalia: "so",
  Somaliland: "sx",
  "South Africa": "za",
  "South Korea": "kr",
  "South Sudan": "ss",
  Spain: "es",
  "Spratly Islands": "sp",
  "Sri Lanka": "lk",
  Sudan: "sd",
  Suriname: "sr",
  Swaziland: "sz",
  Sweden: "se",
  Switzerland: "ch",
  Syria: "sy",
  Taiwan: "tw",
  Tajikistan: "tj",
  Thailand: "th",
  "The Bahamas": "bs",
  Togo: "tg",
  Tonga: "to",
  "Trinidad and Tobago": "tt",
  Tunisia: "tn",
  Turkey: "tr",
  Turkmenistan: "tm",
  Tuvalu: "tv",
  Uganda: "ug",
  Ukraine: "ua",
  "United Arab Emirates": "ae",
  "United Kingdom": "gb",
  "United Republic of Tanzania": "tz",
  "United States Minor Outlying Islands": "um",
  "United States of America": "us",
  "United States": "us", // Alias
  "United States Virgin Islands": "vi",
  Uruguay: "uy",
  Uzbekistan: "uz",
  Vanuatu: "vu",
  Vatican: "va",
  Venezuela: "ve",
  Vietnam: "vn",
  "Western Sahara": "eh",
  Yemen: "ye",
  Zambia: "zm",
  Zimbabwe: "zw"
};

var chartData = [
  { country: "Argentina", value: "5.1", rank: "10" },
  { country: "Australia", value: "15.2", rank: "3" },
  { country: "Austria", value: "-9.9", rank: "20" },
  { country: "Bahamas", value: "2.7", rank: "14" },
  { country: "Belgium", value: "14.2", rank: "5" },
  { country: "Brazil", value: "8.3", rank: "6" },
  { country: "Canada", value: "-19.8", rank: "10" },
  { country: "Chile", value: "4.0", rank: "11" },
  { country: "China", value: "-419.2", rank: "1" },
  { country: "Costa Rica", value: "1.5", rank: "20" },
  { country: "Dominican Republic", value: "3.3", rank: "12" },
  { country: "Egypt", value: "2.6", rank: "15" },
  { country: "France", value: "-16.2", rank: "14" },
  { country: "Germany", value: "-68.3", rank: "3" },
  { country: "Guatemala", value: "2.4", rank: "16" },
  { country: "Hong Kong", value: "31.1", rank: "1" },
  { country: "India", value: "-21.3", rank: "9" },
  { country: "Indonesia", value: "-12.6", rank: "17" },
  { country: "Iraq", value: "-10.6", rank: "18" },
  { country: "Ireland", value: "-46.8", rank: "5" },
  { country: "Italy", value: "-31.6", rank: "7" },
  { country: "Jamaica", value: "2.3", rank: "17" },
  { country: "Japan", value: "-67.6", rank: "4" },
  { country: "South Korea", value: "-17.9", rank: "13" },
  { country: "Malaysia", value: "-26.5", rank: "8" },
  { country: "Mexico", value: "-81.5", rank: "2" },
  { country: "Netherlands", value: "24.8", rank: "2" },
  { country: "Panama", value: "6.4", rank: "7" },
  { country: "Paraguay", value: "2.2", rank: "18" },
  { country: "Peru", value: "1.8", rank: "19" },
  { country: "Qatar", value: "2.9", rank: "13" },
  { country: "Russia", value: "-14.1", rank: "16" },
  { country: "Saudi Arabia", value: "-10.5", rank: "19" },
  { country: "Singapore", value: "5.9", rank: "8" },
  { country: "Switzerland", value: "-18.9", rank: "12" },
  { country: "Taiwan", value: "-15.5", rank: "15" },
  { country: "Thailand", value: "-19.3", rank: "11" },
  { country: "United Arab Emirates", value: "14.5", rank: "4" },
  { country: "United Kingdom", value: "5.4", rank: "9" },
  { country: "Vietnam", value: "-39.5", rank: "6" }
];

var data = [];

$.each(chartData, function(index, item) {
  if (!countryCodes[item.country]) {
    return;
  }
  data.push({
    countryKey: countryCodes[item.country],
    name: item.country,
    value: parseFloat(item.value),
    rank: item.rank
  });
});

console.log(data);

// Instantiate the map
var chart = Highcharts.mapChart("mapcontainer", {
  credits: {
    enabled: false
  },

  chart: {
    map: "custom/world",
    spacingTop: 20,
    spacingBottom: 20,
    backgroundColor: "#eee"
  },

  title: {
    text: undefined
  },

  legend: {
    enabled: false
  },

  dataLabels: {
    enabled: true
  },

  mapNavigation: {
    enabled: true,
    buttonOptions: {
      verticalAlign: "top",
      align: 'right'
    }
  },
  colorAxis: {
    dataClasses: [
      {
        from: -9999999999,
        to: 0,
        color: '#ef0606' // "hsl(0, 95%, 48%)"
      },
      {
        from: 0,
        to: 9999999999999,
        color: '#0a47c2' // "hsl(220, 90%, 40%)"
      }
    ]
  },
  tooltip: {
    formatter: function() {
      var point = this.point;
      var rankSuffix =
        point.value < 0 ? " deficit country" : " surplus country";
      return (
        "<strong>" +
        point.name +
        ":</strong> " +
        window.formatValue(point.value) +
        "<br> #" +
        point.rank +
        rankSuffix
      );
    }
  },

  plotOptions: {
    map: {
      borderColor: "hsla(0,0%,0%, .3)",
      // allAreas: false,
      joinBy: ["hc-key", "countryKey"],
      dataLabels: {
        /* enabled: true, */
      },
      tooltip: {
        enabled: true,
        headerFormat: ""
        /* pointFormat: '{point.name}: <b>{series.name}</b>' */
      }
    }
  },

  series: [
    {
      data: data
    }
  ]
});