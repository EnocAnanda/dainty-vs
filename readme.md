# Dainty for Visual Studio

**This project is currently not maintained. If you would like to maintain it, please email me at ateinum@gmail.com. —Alexander**

Dainty is a color theme generator with support for Visual Studio Code. Dainty Light and Dainty Dark are the default presets. They’re balanced and refined color themes, using carefully selected colors within the Lab color space.

See https://dainty.site/vs for more information.

## Setup

    git clone https://github.com/alexanderte/dainty-vs.git
    cd dainty-vs
    yarn

## Build

    yarn build

The build script generates `dist/dainty.vstheme` and `dist/dainty.vssettings`.

## Configuration

See https://dainty.site/configuration for more information.

### Visual Studio-specific customizations

It is possible to tap into the customizations done by Dainty through the objects `__searchReplace` and `__categories`. For `__categories`, the tuple specifies the background and foreground color, respectively:

    {
      "colors": {
        "myCustomColor": {
          "hex": "#f5901f"
        }
      },
      "customizations": {
        "__searchReplace": {
            "#686868ff": "red-14"
        },
        "__categories": {
          "ColorizedSignatureHelp colors": {
            "enum name": [null, "myCustomColor-exact"]
          }
        }
      }
    }

## License

Dainty is licensed under the [MIT License](https://github.com/alexanderte/dainty-vs/blob/master/license.md).
