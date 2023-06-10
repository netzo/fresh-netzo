export default {
  "timeline": {
    "soundtrack": {
      "src": "{{soundTrack}}",
      "effect": "{{effect}}"
    },
    "background": "{{background}}",
    "cache": false,
    "tracks": [
      {
        "clips": [
          {
            "asset": {
              "type": "html",
              "html": "<p data-html-type=\"text\">{{badge}}</p>",
              "css": "p { color: #ffffff; font-size: 100px; font-family: Montserrat ExtraBold; text-align: left; }",
              "width": 844,
              "height": 180
            },
            "start": 0,
            "length": 4,
            "fit": "none",
            "scale": 1,
            "offset": {
              "x": -0.239,
              "y": -0.139
            },
            "position": "center",
            "transition": {
              "in": "slideUp",
              "out": "slideDown"
            }
          }
        ]
      },
      {
        "clips": [
          {
            "asset": {
              "type": "html",
              "html": "<p data-html-type=\"text\">{{topic}}</p>",
              "css": "p { color: #ffffff; font-size: 80px; font-family: Montserrat ExtraBold; text-align: left }",
              "width": 1031,
              "height": 114
            },
            "fit": "none",
            "scale": 1,
            "offset": {
              "x": -0.191,
              "y": -0.218
            },
            "position": "center",
            "transition": {
              "in": "slideUp",
              "out": "slideDown"
            },
            "start": 0.5,
            "length": 3.5
          }
        ]
      },
      {
        "clips": [
          {
            "asset": {
              "type": "html",
              "html": "<p data-html-type=\"text\">{{ammenities}}</p>",
              "css": "p { color: #ffffff; font-size: 80px; font-family: Montserrat SemiBold; text-align: left; }",
              "width": 1019,
              "height": 77
            },
            "fit": "none",
            "scale": 1,
            "offset": {
              "x": -0.191,
              "y": -0.294
            },
            "position": "center",
            "start": 1,
            "length": 3,
            "transition": {
              "out": "slideDown",
              "in": "slideUp"
            }
          },
          {
            "asset": {
              "type": "html",
              "html": "<p data-html-type=\"text\">{{description}}</p>",
              "css": "p { color: #ffffff; font-size: 40px; font-family: Montserrat SemiBold; text-align: left; }",
              "width": 1648,
              "height": 90
            },
            "fit": "none",
            "scale": 1,
            "offset": {
              "x": -0.024,
              "y": -0.365
            },
            "position": "center",
            "transition": {
              "out": "slideDown",
              "in": "slideUp"
            },
            "start": 1.2,
            "length": 2.8
          }
        ]
      },
      {
        "clips": [
          {
            "asset": {
              "type": "image",
              "src": "{{firstImage}}"
            },
            "start": 0,
            "length": 5,
            "effect": "zoomIn",
            "transition": {
              "in": "fade",
              "out": "fade"
            },
            "offset": {
              "x": 0.002,
              "y": -0.024
            },
            "position": "center",
            "fit": "crop",
            "opacity": 0.4
          }
        ]
      },
      {
        "clips": [
          {
            "asset": {
              "type": "html",
              "html": "<p data-html-type=\"text\">{{dream}}</p>",
              "css": "p { color: #ffffff; font-size: 40px; font-family: Montserrat SemiBold; text-align: left }",
              "width": 620,
              "height": 72
            },
            "length": 5,
            "start": 5,
            "transition": {
              "out": "slideDown",
              "in": "slideUp"
            },
            "fit": "none",
            "scale": 1,
            "offset": {
              "x": -0.266,
              "y": -0.032
            },
            "position": "center"
          },
          {
            "asset": {
              "type": "html",
              "html": "<p data-html-type=\"text\">{{kilometers}}</p>",
              "css": "p { color: #ffffff; font-size: 70px; font-family: Montserrat ExtraBold; text-align: left; }",
              "width": 600,
              "height": 109
            },
            "length": 5,
            "start": 5,
            "transition": {
              "out": "slideDown",
              "in": "slideUp"
            },
            "fit": "none",
            "scale": 1,
            "offset": {
              "x": -0.276,
              "y": 0.027
            },
            "position": "center"
          }
        ]
      },
      {
        "clips": [
          {
            "asset": {
              "type": "image",
              "src": "https://drive.google.com/uc?export=download&id=1ngVkdeoD7RDvk3FA5cIU07l1_V84xS5t"
            },
            "length": 5,
            "start": 5,
            "offset": {
              "x": -0.49,
              "y": -0.004
            },
            "position": "center",
            "scale": 0.07,
            "transition": {
              "in": "carouselDown",
              "out": "slideDown"
            }
          }
        ]
      },
      {
        "clips": [
          {
            "asset": {
              "type": "image",
              "src": "{{secondImage}}"
            },
            "start": 5.7,
            "length": 4.3,
            "offset": {
              "x": 0.2,
              "y": 0
            },
            "position": "center",
            "scale": 0.479,
            "transition": {
              "in": "slideLeft",
              "out": "slideRight"
            },
            "fit": "crop"
          }
        ]
      },
      {
        "clips": [
          {
            "asset": {
              "type": "image",
              "src": "{{thirdImage}}"
            },
            "position": "center",
            "offset": {
              "x": 0,
              "y": 0
            },
            "transition": {
              "in": "fade",
              "out": "fade"
            },
            "start": 4,
            "length": 6,
            "scale": 1,
            "opacity": 0.4,
            "fit": "crop"
          }
        ]
      },
      {
        "clips": [
          {
            "asset": {
              "type": "image",
              "src": "{{fourthImage}}"
            },
            "effect": "zoomIn",
            "offset": {
              "x": 0,
              "y": 0
            },
            "position": "center",
            "fit": "crop",
            "scale": 1,
            "transition": {
              "in": "fade",
              "out": "fade"
            },
            "start": 9,
            "length": 3
          }
        ]
      },
      {
        "clips": [
          {
            "asset": {
              "type": "image",
              "src": "https://drive.google.com/uc?export=download&id=1ngVkdeoD7RDvk3FA5cIU07l1_V84xS5t"
            },
            "length": 5.5,
            "start": 11.5,
            "offset": {
              "x": -0.492,
              "y": -0.007
            },
            "position": "center",
            "transition": {
              "in": "carouselDown",
              "out": "slideDown"
            },
            "scale": 0.07
          }
        ]
      },
      {
        "clips": [
          {
            "asset": {
              "type": "image",
              "src": "{{fifthImage}}"
            },
            "start": 11,
            "length": 7,
            "effect": "zoomIn",
            "offset": {
              "x": 0,
              "y": 0
            },
            "position": "center",
            "transition": {
              "in": "fade",
              "out": "fade"
            },
            "fit": "crop",
            "scale": 1
          }
        ]
      },
      {
        "clips": [
          {
            "asset": {
              "type": "image",
              "src": "{{sixthImage}}"
            },
            "start": 17,
            "length": 4,
            "effect": "zoomIn",
            "offset": {
              "x": 0,
              "y": 0
            },
            "position": "center",
            "transition": {
              "in": "fade",
              "out": "fade"
            }
          }
        ]
      },
      {
        "clips": [
          {
            "asset": {
              "type": "image",
              "src": "{{seventhImage}}"
            },
            "start": 20,
            "length": 6,
            "effect": "zoomIn",
            "offset": {
              "x": 0,
              "y": 0
            },
            "position": "center",
            "transition": {
              "in": "fade",
              "out": "fade"
            }
          }
        ]
      },
      {
        "clips": [
          {
            "asset": {
              "type": "html",
              "html": "<p data-html-type=\"text\">{{price}}</p>",
              "css": "p { color: #ffffff; font-size: 120px; font-family: Montserrat ExtraBold; text-align: center; }",
              "width": 1311,
              "height": 180
            },
            "start": 28,
            "length": 3,
            "transition": {
              "out": "slideUp",
              "in": "slideDown"
            },
            "fit": "none",
            "scale": 1,
            "offset": {
              "x": -0.029,
              "y": -0.005
            },
            "position": "center"
          },
          {
            "asset": {
              "type": "html",
              "html": "<p data-html-type=\"text\">{{priceDisclaimer}}</p>",
              "css": "p { color: #ffffff; font-size: 36px; font-family: Montserrat SemiBold; text-align: left; }",
              "width": 883,
              "height": 93
            },
            "transition": {
              "out": "slideUp",
              "in": "slideDown"
            },
            "start": 28,
            "length": 3,
            "fit": "none",
            "scale": 1,
            "offset": {
              "x": 0.223,
              "y": -0.134
            },
            "position": "center"
          },
          {
            "asset": {
              "type": "html",
              "html": "<p data-html-type=\"text\">{{priceMethod}}</p>",
              "css": "p { color: #ffffff; font-size: 50px; font-family: Montserrat ExtraBold; text-align: left; }",
              "width": 672,
              "height": 107
            },
            "start": 28,
            "length": 3,
            "fit": "none",
            "scale": 1,
            "offset": {
              "x": 0.164,
              "y": -0.087
            },
            "position": "center",
            "transition": {
              "in": "slideDown",
              "out": "slideUp"
            }
          }
        ]
      },
      {
        "clips": [
          {
            "asset": {
              "type": "image",
              "src": "{{dealerLogo}}"
            },
            "start": 30.8,
            "length": 5.2,
            "fit": "none",
            "offset": {
              "x": 0,
              "y": 0
            },
            "transition": {
              "in": "slideUp"
            },
            "position": "center",
            "scale": 0.5
          },
          {
            "asset": {
              "type": "html",
              "html": "<p data-html-type=\"text\">{{dealerWebsite}}</p>",
              "css": "p { color: #ffffff; font-size: 50px; font-family: Montserrat SemiBold; text-align: center; }",
              "width": 1025,
              "height": 167
            },
            "length": 5,
            "offset": {
              "x": 0.006,
              "y": -0.178
            },
            "start": 31,
            "transition": {
              "in": "slideUp"
            },
            "fit": "none",
            "scale": 1,
            "position": "center"
          }
        ]
      },
      {
        "clips": [
          {
            "asset": {
              "type": "image",
              "src": "{{eighthImage}}"
            },
            "start": 25,
            "length": 8,
            "effect": "zoomIn",
            "transition": {
              "out": "fade"
            },
            "offset": {
              "x": 0,
              "y": 0
            },
            "position": "center",
            "fit": "crop",
            "scale": 1,
            "opacity": 0.4
          }
        ]
      }
    ]
  },
  "output": {
    "format": "mp4",
    "size": {
      "width": 1920,
      "height": 1080
    }
  }
}