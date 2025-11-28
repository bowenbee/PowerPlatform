# KPI Responsive Gallery Cards

![Image1](assets/kpicards_tablet.png)

![Image1](assets/kpicards_mobile.png)

## Description

This component features KPI datacards within a gallery that adapts to a responsive design. It features use of subtle svg gradient images for both the background as well as the icon. In additional, an html control is used for the value to also reflect the subtle gradient design.

### Component Property Details

The table below explains the various input properties you can customize in the component.

| Property              | Type    | Description                                              |
|-----------------------|---------|----------------------------------------------------------|
| ColorTheme            | Record  | Contains the colors used for the theme                  |
| KPI Items             | Table   | The collection of KPI items                             |
| Background Image      | Image   | The SVG gradient background image                       |
| Title Font Size       | Number  | The font size of the title                              |
| Value Font Size       | Number  | The font size of the value                              |
| Show Icon             | Boolean | Shows or hides the SVG icons                            |
| Card Template Height  | Number  | The gallery template height of each card                |

### Intallation Details

1. Download the msapp file and import the component file into your Canvas App or Global Component Library
2. When adding into an app, change the Width property to Parent.Width and Height to Parent.Height
3. Update the KPI Items property with data that matches the default schema  

