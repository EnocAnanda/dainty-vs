const { cloneDeep } = require("../utils");
const {
  generateColorConstantReplacements,
  applyColorConstantReplacement,
  isHexColor,
  checkScaleRange
} = require("../colors");

function getCategoryReplacements(configuration, colors) {
  const { editor } = configuration;
  const dark = configuration.variant === "dark";
  const { blue, blueLessChroma, blueMoreChroma, blueGray, orange } = colors;

  function edfc(index) {
    return checkScaleRange(index + editor.foregroundLightness);
  }

  const replacements = {
    Environment: {
      MainWindowActiveIconDefault: [blue[24], null],
      MainWindowActiveIconBuilding: [blue[24], null],
      MainWindowActiveIconDebugging: [blue[24], null],
      MainWindowActiveIconNoSolution: [blue[24], null],
      RaftedWindowActiveIconDefault: [blue[24], null],
      RaftedWindowActiveIconBuilding: [blue[24], null],
      RaftedWindowActiveIconDebugging: [blue[24], null],
      RaftedWindowActiveIconNoSolution: [blue[24], null],
      RaftedWindowInactiveIconDefault: [blue[24], null],
      RaftedWindowInactiveIconBuilding: [blue[24], null],
      RaftedWindowInactiveIconDebugging: [blue[24], null],
      StartPageTextControlLinkSelected: [blue[34], null],
      StartPageTextControlLinkSelectedHover: [blueLessChroma[36], null]
    },
    "ColorizedSignatureHelp colors": {
      "HTML Attribute Value": [null, dark ? orange[33] : orange[18]],
      punctuation: [null, blueGray[edfc(26)]],
      urlformat: [null, dark ? blueMoreChroma[28] : blueMoreChroma[16]]
    },
    "Text Editor Text Marker Items": {
      "Current Statement": ["#eff284", null] // Revert
    }
  };

  return mergeConfigurationCategoryReplacements(
    replacements,
    configuration,
    colors
  );
}

function getSearchReplaceReplacements(configuration, colors) {
  const { environment, editor } = configuration;
  const {
    blue,
    blueGray,
    blueLessChroma,
    blueMoreChroma,
    green,
    orange,
    purple
  } = colors;
  const dark = configuration.variant === "dark";

  function envbc(index) {
    return checkScaleRange(index - environment.backgroundLightness);
  }

  function envfc(index) {
    return checkScaleRange(index + environment.foregroundLightness);
  }

  function edbc(index) {
    return checkScaleRange(index - editor.backgroundLightness);
  }

  function edfc(index) {
    return checkScaleRange(index + editor.foregroundLightness);
  }

  const replacements = [
    //
    // Backgrounds
    //

    // Active tab, statusbar
    ["#007acc", blueGray[envbc(6)]],

    // Menu bar item hover
    ["#3e3e40", blueGray[envbc(6)]],

    // Menu
    ["#1b1b1c", blueGray[envbc(2)]],

    // Menu item hover
    ["#333334", blueGray[envbc(6)]],

    // Hover tab
    ["#1c97ea", blueGray[envbc(4)]],

    // Inactive tab hover close
    ["#52b0ef", blueGray[envbc(8)]],

    // Inactive tab active close
    ["#0e6198", blueGray[envbc(10)]],

    // Editor
    ["#1e1e1e", blueGray[edbc(0)]],

    // Toolbar separator
    ["#222222", blueGray[edbc(0)]],

    // Solution Explorer, Properties
    ["#252526", blueGray[edbc(0)]],

    // Title bar, menu bar
    ["#2d2d30", blueGray[envbc(2)]],

    // Breakpoints bar
    ["#333333", blueGray[envbc(1)]],

    // Search Solution Explorer, Quick Launch, Package Manager, menu separator line and borders around menu/menu item
    ["#333337", blueGray[edbc(0)]],

    // Scrollbar containers
    [
      "#3e3e42",
      environment.transparentScrollbarContainers
        ? blueGray[edbc(0)]
        : blueGray[edbc(1)]
    ],

    // Scrollbar
    [
      "#686868",
      environment.additionalScrollbarsContrast
        ? blueGray[edbc(6)]
        : blueGray[edbc(4)]
    ],

    // Scrollbar hover
    [
      "#9e9e9e",
      environment.additionalScrollbarsContrast
        ? blueGray[edbc(8)]
        : blueGray[edbc(6)]
    ],

    // Scrollbar active
    [
      "#efebef",
      environment.additionalScrollbarsContrast
        ? blueGray[edbc(10)]
        : blueGray[edbc(8)]
    ],

    // Scrollbar glyph disabled
    ["#555558", blueGray[envbc(4)]],

    // Selected item in Solution Explorer, thin borders across app
    [
      "#3f3f46",
      environment.transparentBorders ? blueGray[envbc(2)] : blueGray[envbc(4)]
    ],

    // Package Manger border
    ["#434346", blueGray[envbc(8)]],

    // Current line border
    ["#464646", blueGray[edbc(2)]],

    // Grip – inactive tool window
    [
      "#46464a",
      environment.transparentToolWindowGrips
        ? blueGray[envbc(2)]
        : blueGray[envbc(8)]
    ],

    // Grip – active tool window
    [
      "#59a8de",
      environment.transparentToolWindowGrips
        ? blueGray[envbc(4)]
        : blueGray[envbc(16)]
    ],

    // File changes indicator, current debugging statement
    ["#eff284", blueGray[edbc(2)]],

    // File changes after save indicator
    ["#577430", blueGray[edbc(2)]],

    // Outline area
    ["#232323", blueGray[edbc(2)]],

    // File preview
    ["#68217a", blue[0]],

    // Tooltip
    ["#424245", blueGray[edbc(2)]],

    // Tooltip border
    ["#4d4d50", blueGray[edbc(2)]],

    // Extensions item hover
    ["#3f3f40", blueGray[envbc(2)]],

    // Yellowy tooltip line
    ["#fefcc8", orange[39]],

    // Start page arrow
    ["#4f4f53", blue[16]],

    // Start page arrow hover
    ["#606060", blue[20]],

    // Notification badge
    ["#8631c7", blueMoreChroma[8]],

    // `100%` box arrow hover
    ["#1f1f20", blueGray[envbc(16)]],

    // Inactive tool window glyph hover
    ["#393939", blueGray[envbc(4)]],

    // Team Explorer `Changes` label
    ["#2d2d2d", blueGray[envbc(4)]],

    // Team Explorer `Changes` label icon
    ["#3d3d3d", blueGray[envbc(8)]],

    // Team Explorer `Changes` label icon hover
    ["#525252", blueGray[envbc(12)]],

    // Team Explorer `Changes` icon
    ["#c8c8c8", blue[36]],

    // Team Explorer `Settings` blue indicator
    ["#0079ce", blue[20]],

    // Team Explorer `Changes` red indicator
    ["#f05033", dark ? blue[34] : blue[16]],

    // Diagnostic Tools tab hover
    ["#555555", blueGray[envbc(4)]],

    //
    // Foregrounds
    //

    // Editor tooltip
    ["#dadada", blueGray[edfc(32)]],

    // Start page `NEW`
    ["#ff8c00", dark ? green[32] : green[16]],

    // Preview Selected Items border
    ["#3399ff", blue[28]],

    // `using`, `public class`
    ["#569cd6", blue[26]],

    // `form`, `option` (bold)
    ["#008080", blue[26]],

    // `&nbsp;`
    ["#00a0a0", dark ? blueLessChroma[30] : blue[20]],

    // `Program`, `WebHost`, `Startup`
    ["#4ec9b0", dark ? blueLessChroma[30] : blue[20]],

    // HTML attribute
    ["#9cdcfe", dark ? blueLessChroma[30] : blue[20]],

    // Active tool window tab, `Import theme`
    ["#0097fb", blueGray[envfc(32)]],

    // launchSettings.json property
    ["#d7ba7d", blueGray[edfc(34)]],

    // Punctuation, method names
    ["#dcdcdc", blueGray[edfc(34)]],

    // Status bar, Visual Studio logo, active tab, selected Solution Explorer item
    ["#ffffff", dark ? blue[30] : blue[8]],

    // Close and pin icons on active tab
    ["#d0e6f5", blueGray[envfc(32)]],

    // `<` and `>`
    ["#808080", blueGray[edfc(26)]],

    // Operator and HTML operator
    ["#b4b4b4", blueGray[edfc(30)]],

    // Most UI text (menu bar items, tabs, non-selected tabs, console output, Solution Explorer item …)
    ["#f1f1f1", blueGray[envfc(32)]],

    // Inactive tabs in tool windows, tool window titles
    ["#d0d0d0", blueGray[envfc(26)]],

    // `Microsoft Visual Studio`
    ["#999999", blueGray[envfc(22)]],

    // Disabled menu item
    ["#656565", blueGray[envfc(18)]],

    // Inactive tabs hover in tool windows
    ["#55aaff", blueGray[envfc(32)]],

    // Comments
    [
      "#57a64a",
      environment.additionalCommentsContrast
        ? blueGray[edfc(20)]
        : blueGray[edfc(16)]
    ],

    // XML doc comment
    [
      "#608b4e",
      environment.additionalCommentsContrast
        ? blueGray[edfc(20)]
        : blueGray[edfc(16)]
    ],

    // Numbers
    ["#b5cea8", dark ? green[36] : green[16]],

    // `IWebHostBuilder`
    ["#b8d7a3", dark ? purple[30] : purple[20]],

    // Less variable
    ["#c563bd", dark ? purple[30] : purple[20]],

    // Strings
    ["#d69d85", dark ? orange[33] : orange[18]],

    // Start page heading
    ["#84ceff", blueLessChroma[34]],

    // `Import Theme` hover
    ["#88ccfe", blueGray[envfc(36)]]
  ];

  return mergeConfigurationSearchReplaceReplacements(
    replacements,
    configuration,
    colors
  );
}

function mergeConfigurationCategoryReplacements(
  existingReplacements,
  configuration,
  colors
) {
  let resultReplacements = cloneDeep(existingReplacements);
  const { categories } = configuration.replacements.overrides;
  const colorReplacements = generateColorConstantReplacements(colors, false);
  const colorReplacementsKeys = colorReplacements.map(r => r[0]);

  for (const categoryKey of Object.keys(categories)) {
    const category = categories[categoryKey];

    if (!resultReplacements[categoryKey]) {
      resultReplacements[categoryKey] = {};
    }

    for (const colorGroupKey of Object.keys(category)) {
      const colorGroup = category[colorGroupKey];

      if (!(Array.isArray(colorGroup) && colorGroup.length === 2)) {
        throw new Error(
          `Value of category replacement \`${colorGroupKey}\` in \`configuration.json\` must be an array with length of 2. The first value is a tuple with background and text color for the dark variant. The second value is a tuple with background and text color for the light variant. Each colors must either be a color hex value or a Dainty color constant.`
        );
      }

      const darkColors = colorGroup[0];
      const lightColors = colorGroup[1];

      if (!(Array.isArray(darkColors) && darkColors.length === 2)) {
        throw new Error(
          `Array index 0 of category replacement color group \`${colorGroupKey}\` in \`configuration.json\` must be an array with length of 2. The first value is the background color for the dark variant. The second value is the text color for the dark variant. Each colors must either be a color hex value or a Dainty color constant.`
        );
      }

      if (!(Array.isArray(lightColors) && lightColors.length === 2)) {
        throw new Error(
          `Array index 1 of category replacement color group \`${colorGroupKey}\` in \`configuration.json\` must be an array with length of 2. The first value is the background color for the light variant. The second value is the text color for the light variant. Each colors must either be a color hex value or a Dainty color constant.`
        );
      }

      if (
        !(
          darkColors[0] === null ||
          isHexColor(darkColors[0]) ||
          colorReplacementsKeys.includes(darkColors[0])
        )
      ) {
        throw new Error(
          `Array index 0 of category replacement color group  \`${colorGroupKey}\` for dark variant in \`configuration.json\` is not valid. The value must either be a color hex value or a Dainty color constant.`
        );
      }

      if (
        !(
          darkColors[1] === null ||
          isHexColor(darkColors[1]) ||
          colorReplacementsKeys.includes(darkColors[1])
        )
      ) {
        throw new Error(
          `Array index 1 of category replacement color group  \`${colorGroupKey}\` for dark variant in \`configuration.json\` is not valid. The value must either be a color hex value or a Dainty color constant.`
        );
      }

      if (
        !(
          lightColors[0] === null ||
          isHexColor(lightColors[0]) ||
          colorReplacementsKeys.includes(lightColors[0])
        )
      ) {
        throw new Error(
          `Array index 0 of category replacement color group  \`${colorGroupKey}\` for light variant in \`configuration.json\` is not valid. The value must either be a color hex value or a Dainty color constant.`
        );
      }

      if (
        !(
          lightColors[1] === null ||
          isHexColor(lightColors[1]) ||
          colorReplacementsKeys.includes(lightColors[1])
        )
      ) {
        throw new Error(
          `Array index 1 of category replacement color group  \`${colorGroupKey}\` for light variant in \`configuration.json\` is not valid. The value must either be a color hex value or a Dainty color constant.`
        );
      }

      const variantIndex = configuration.variant === "dark" ? 0 : 1;
      resultReplacements[categoryKey][colorGroupKey] = colorGroup[variantIndex];
    }
  }

  return resultReplacements;
}

function mergeConfigurationSearchReplaceReplacements(
  existingReplacements,
  configuration,
  colors
) {
  let resultReplacements = cloneDeep(existingReplacements);
  const { searchReplace: replacements } = configuration.replacements.overrides;
  const colorReplacements = generateColorConstantReplacements(colors, false);
  const colorReplacementsKeys = colorReplacements.map(c => c[0]);
  const existingReplacementsKeys = existingReplacements.map(c => c[0]);

  for (const replacement of Object.keys(replacements)) {
    if (!isHexColor(replacement)) {
      throw new Error(
        `Search–replace-replacement \`${replacement}\` in \`configuration.json\` is not a valid color hex value.`
      );
    }

    if (
      !(
        Array.isArray(replacements[replacement]) &&
        replacements[replacement].length === 2
      )
    ) {
      throw new Error(
        `Value of search–replace replacement \`${replacement}\` in \`configuration.json\` must be an array with length of 2. The first value is a color hex value or Dainty color constant for the dark variant. The second value is a color hex value or Dainty color constant for the light variant.`
      );
    }

    if (
      !(
        replacements[replacement][0] === null ||
        isHexColor(replacements[replacement][0]) ||
        colorReplacementsKeys.includes(replacements[replacement][0])
      )
    ) {
      throw new Error(
        `Array index 0 of search–replace replacement \`${replacement}\` in \`configuration.json\` must either be a hex color value or a Dainty color constant.`
      );
    }

    if (
      !(
        replacements[replacement][1] === null ||
        isHexColor(replacements[replacement][1]) ||
        colorReplacementsKeys.includes(replacements[replacement][1])
      )
    ) {
      throw new Error(
        `Array index 1 of search–replace-replacement \`${replacement}\` in \`configuration.json\` must either be a hex color value or a Dainty color constant.`
      );
    }

    const variantIndex = configuration.variant === "dark" ? 0 : 1;

    if (existingReplacementsKeys.includes(replacement)) {
      const index = resultReplacements.findIndex(r => r[0] === replacement);

      resultReplacements[index] = [
        replacement,
        applyColorConstantReplacement(
          replacements[replacement][variantIndex],
          colorReplacements,
          colorReplacementsKeys
        )
      ];
    } else {
      resultReplacements.push([
        replacement,
        applyColorConstantReplacement(
          replacements[replacement][variantIndex],
          colorReplacements,
          colorReplacementsKeys
        )
      ]);
    }
  }

  return resultReplacements;
}

module.exports = {
  getCategoryReplacements,
  getSearchReplaceReplacements
};
